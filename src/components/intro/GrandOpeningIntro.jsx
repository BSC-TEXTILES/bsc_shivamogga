import React, { useCallback, useEffect, useRef, useState } from "react";
import IntroBackground from "./IntroBackground";
import IntroLogo from "./IntroLogo";
import IntroContent from "./IntroContent";
import ConfettiLayer from "./ConfettiLayer";
import BalloonLayer from "./BalloonLayer";
import LoadingProgress from "./LoadingProgress";
import "./intro.css";

const MAX_MS = 20000;
const EARLY_READY_MS = 8000;
const EXIT_MS = 1100;
const PROGRESS_LABEL = "PREPARING THE GRAND OPENING";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function GrandOpeningIntro({ onComplete, siteReady = false }) {
  const [isReduced] = useState(prefersReducedMotion);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(prefersReducedMotion);
  const [step, setStep] = useState(() => (prefersReducedMotion() ? 6 : 0));
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 100 : 0));
  const [celebrate, setCelebrate] = useState(false);

  const completedRef = useRef(false);
  const exitTimerRef = useRef(0);
  const phaseTimersRef = useRef([]);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const skipRef = useRef(null);
  const siteReadyRef = useRef(siteReady);
  const exitingRef = useRef(false);

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
    setCelebrate(true);
    setProgress(100);
    exitTimerRef.current = window.setTimeout(finish, EXIT_MS);
  }, [finish]);

  const skipIntro = useCallback(() => {
    phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
    phaseTimersRef.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    beginExit();
  }, [beginExit]);

  useEffect(() => {
    if (done) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    startRef.current = performance.now();

    const schedule = (ms, fn) => {
      const id = window.setTimeout(fn, ms);
      phaseTimersRef.current.push(id);
    };

    if (isReduced) {
      schedule(400, beginExit);
      return () => {
        phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
        phaseTimersRef.current = [];
        if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.body.style.overflow = prevOverflow;
      };
    }

    schedule(200, () => setStep(1));
    schedule(900, () => setStep(2));
    schedule(1600, () => setStep(3));
    schedule(2800, () => setStep(4));
    schedule(4000, () => setStep(5));
    schedule(5500, () => setStep(6));
    schedule(9000, () => setCelebrate(true));

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const ready = siteReadyRef.current;
      const timePct = Math.min(ready ? 100 : 94, (elapsed / MAX_MS) * 94);
      const readyPct = ready
        ? Math.min(100, 55 + (elapsed / EARLY_READY_MS) * 45)
        : 0;
      const next = Math.max(timePct, readyPct, ready && elapsed > 1000 ? 100 : 0);
      setProgress((prev) => (next > prev ? next : prev));

      if ((ready && elapsed >= EARLY_READY_MS) || elapsed >= MAX_MS) {
        beginExit();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
      phaseTimersRef.current = [];
      if (exitTimerRef.current) window.clearTimeout(exitTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, [done, isReduced, beginExit]);

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

  const showCelebrate = celebrate || step >= 6;
  const showParty = showCelebrate && !isReduced;

  return (
    <div
      className={`go-intro ${exiting ? "is-exiting" : "is-active"}`}
      role="region"
      aria-label="Grand opening introduction"
      aria-busy={!exiting}
    >
      <IntroBackground />

      <button
        ref={skipRef}
        type="button"
        className="go-intro__skip"
        onClick={skipIntro}
      >
        Skip Intro
      </button>

      <div className="go-intro__stage">
        <IntroLogo />

        <div className={`go-intro__brand-block ${step >= 3 ? "is-in" : ""}`}>
          <IntroContent step={step} />

          <div className={`go-intro__cta-row ${step >= 5 ? "is-in" : ""}`}>
            <button type="button" className="go-intro__enter" onClick={beginExit}>
              Enter Grand Opening
            </button>
          </div>
        </div>

        <LoadingProgress progress={progress} label={PROGRESS_LABEL} />
      </div>

      <BalloonLayer active={showParty} />
      <ConfettiLayer active={showParty} />

      <div className="go-intro__transition-veil" aria-hidden="true" />
    </div>
  );
}
