import React, { useCallback, useEffect, useRef, useState } from "react";
import StageBackground from "./StageBackground";
import CurtainLayer from "./CurtainLayer";
import StarLayer from "./StarLayer";
import GrandOpeningTitle from "./GrandOpeningTitle";
import RibbonLayer from "./RibbonLayer";
import ScissorsLayer from "./ScissorsLayer";
import EventDetails from "./EventDetails";
import ReadyQuotePanel from "./ReadyQuotePanel";
import CelebrationLayer from "./CelebrationLayer";
import "./stage.css";

const MAX_MS = 20000;
const EARLY_READY_MS = 6500;
const CORE_MS = 5200;
const EXIT_MS = 1200;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isDesktopPointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * GrandOpeningStage — premium curtain/scissors/ribbon intro
 * Coordinated timeline, multi-plane depth, optional pointer parallax.
 */
export default function GrandOpeningStage({ onComplete, siteReady = false }) {
  const [isReduced] = useState(prefersReducedMotion);
  const [done, setDone] = useState(prefersReducedMotion);
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? 8 : 0));
  const [exiting, setExiting] = useState(false);

  const completedRef = useRef(false);
  const exitingRef = useRef(false);
  const phaseTimersRef = useRef([]);
  const exitTimerRef = useRef(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const siteReadyRef = useRef(siteReady);
  const stageRef = useRef(null);

  useEffect(() => {
    siteReadyRef.current = siteReady;
  }, [siteReady]);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setDone(true);
    if (typeof onComplete === "function") onComplete();
  }, [onComplete]);

  const beginExit = useCallback(() => {
    if (completedRef.current || exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    setPhase(9);
    exitTimerRef.current = window.setTimeout(finish, EXIT_MS);
  }, [finish]);

  const skipIntro = useCallback(() => {
    phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
    phaseTimersRef.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    beginExit();
  }, [beginExit]);

  /* Coordinated animation timeline */
  useEffect(() => {
    if (done) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    startRef.current = performance.now();

    const at = (ms, fn) => {
      const id = window.setTimeout(fn, ms);
      phaseTimersRef.current.push(id);
    };

    if (isReduced) {
      at(500, beginExit);
      return () => {
        phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
        phaseTimersRef.current = [];
        if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.body.style.overflow = prevOverflow;
      };
    }

    // 0.3s light → 0.6s curtains → stars → titles → ribbon → scissors → details → snip → cut → celebrate
    at(300, () => setPhase(1));
    at(600, () => setPhase(2));
    at(1200, () => setPhase(3));
    at(1500, () => setPhase(4));
    at(1800, () => setPhase(5));
    at(2200, () => setPhase(6));
    at(2600, () => setPhase(6.5));
    at(3000, () => setPhase(7));
    at(3500, () => setPhase(7.5));
    at(3800, () => setPhase(7.75));
    at(4200, () => setPhase(8));
    at(4700, () => setPhase(8.5));
    // Side ready-panel reveal starts with opening lockup (staggered in CSS ~2.8s)

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      if (elapsed >= CORE_MS) {
        if (siteReadyRef.current || elapsed >= MAX_MS) {
          beginExit();
          return;
        }
      }
      if (elapsed >= MAX_MS) {
        beginExit();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // If site becomes ready after core sequence, exit soon after
    const readyCheck = window.setInterval(() => {
      const elapsed = performance.now() - startRef.current;
      if (siteReadyRef.current && elapsed >= EARLY_READY_MS) {
        window.clearInterval(readyCheck);
        beginExit();
      }
      if (elapsed >= MAX_MS) {
        window.clearInterval(readyCheck);
        beginExit();
      }
    }, 200);
    phaseTimersRef.current.push(readyCheck);

    return () => {
      phaseTimersRef.current.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
      phaseTimersRef.current = [];
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, [done, isReduced, beginExit]);

  /* Desktop pointer parallax — tiny depth shifts only */
  useEffect(() => {
    if (done || isReduced || !isDesktopPointer()) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let running = false;

    const apply = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      stage.style.setProperty("--gos-px", curX.toFixed(3));
      stage.style.setProperty("--gos-py", curY.toFixed(3));
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(apply);
      } else {
        running = false;
        raf = 0;
      }
    };

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / cx));
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / cy));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      stage.style.removeProperty("--gos-px");
      stage.style.removeProperty("--gos-py");
    };
  }, [done, isReduced]);

  useEffect(() => {
    if (done) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") skipIntro();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, skipIntro]);

  useEffect(() => {
    if (!done) return;
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, [done]);

  if (done) return null;

  const showCurtainsOpen = phase >= 2;
  const showStars = phase >= 3;
  const showGrand = phase >= 4;
  const showOpening = phase >= 5;
  const showReady = phase >= 5;
  const showRibbon = phase >= 6;
  const showScissors = phase >= 6.5;
  const showDetails = phase >= 7;
  const cutting = phase >= 7.5 && phase < 7.75;
  const settled = phase >= 7.75;
  const cut = phase >= 7.75;
  const celebrate = phase >= 8;

  return (
    <div
      ref={stageRef}
      className={`gos ${exiting ? "is-exiting" : "is-active"} ${isReduced ? "is-reduced" : ""}`}
      role="region"
      aria-label="Grand Opening stage introduction"
      aria-busy={!exiting}
      style={{ "--gos-px": 0, "--gos-py": 0 }}
    >
      <div className="gos__depth gos__depth--bg">
        <StageBackground />
      </div>

      <div className="gos__depth gos__depth--mid">
        <StarLayer show={showStars} />
        <GrandOpeningTitle showGrand={showGrand} showOpening={showOpening} />
        <EventDetails show={showDetails} />
      </div>

      <div className="gos__depth gos__depth--ready">
        <ReadyQuotePanel show={showReady} />
      </div>

      <div className="gos__depth gos__depth--fg">
        <RibbonLayer show={showRibbon} cut={cut} />
        <ScissorsLayer show={showScissors} cutting={cutting} settled={settled} />
      </div>

      <div className="gos__depth gos__depth--curtain">
        <CurtainLayer open={showCurtainsOpen} />
      </div>

      <CelebrationLayer active={celebrate && !isReduced} />

      <div className="gos__chrome">
        <p className={`gos__eyebrow ${showGrand ? "is-in" : ""}`}>
          BSC Shivamogga · Established 1938
        </p>
        <div className={`gos__actions ${showDetails ? "is-in" : ""}`}>
          <button type="button" className="gos__enter" onClick={beginExit}>
            Enter Grand Opening
          </button>
        </div>
        <button type="button" className="gos__skip" onClick={skipIntro}>
          Skip Intro
        </button>
      </div>

      <div className="gos__transition-veil" aria-hidden="true" />
    </div>
  );
}
