import React, { useState, useCallback, Suspense, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import GrandOpeningStage from "./components/stage/GrandOpeningStage";
import { use3dScroll } from "./hooks/use3dScroll";

const Legacy = React.lazy(() => import("./components/Legacy"));
const Showroom = React.lazy(() => import("./components/Showroom"));
const GrandOpening = React.lazy(() => import("./components/GrandOpening"));
const GalaDinner = React.lazy(() => import("./components/GalaDinner"));
const VendorMeet = React.lazy(() => import("./components/VendorMeet"));
const SpecialInvitees = React.lazy(() => import("./components/SpecialInvitees"));
const Locations = React.lazy(() => import("./components/Locations"));
const FamilyGreetings = React.lazy(() => import("./components/FamilyGreetings"));
const VenueMap = React.lazy(() => import("./components/VenueMap"));

function DeferredSection({ id, minHeight, ready, children }) {
  const ref = useRef(null);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.location.hash === `#${id}`;
  });

  useEffect(() => {
    if (show) return undefined;

    const reveal = () => setShow(true);
    const onHash = () => {
      if (window.location.hash === `#${id}`) reveal();
    };
    window.addEventListener("hashchange", onHash);

    const el = ref.current;
    let io;
    if (el) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            reveal();
            io.disconnect();
          }
        },
        { rootMargin: "600px 0px" }
      );
      io.observe(el);
    }

    if (ready) reveal();

    return () => {
      io?.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, [id, show, ready]);

  useEffect(() => {
    if (!show) return;
    if (window.location.hash !== `#${id}`) return;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: "start" });
  }, [show, id]);

  return (
    <div
      ref={ref}
      data-deferred-section={id}
      style={{ minHeight }}
      aria-hidden={show ? undefined : true}
    >
      {show ? (
        <Suspense
          fallback={<div className="section-skel" style={{ minHeight }} aria-hidden="true" />}
        >
          {children}
        </Suspense>
      ) : (
        <div className="section-skel" style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  );
}

export default function App() {
  use3dScroll();
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [ready, setReady] = useState(false);
  const [siteReady, setSiteReady] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.readyState === "complete";
  });

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  // Mark site ready as soon as documents/resources settle (drives early intro exit).
  // Only event handlers call setState — no sync setState in effect body.
  useEffect(() => {
    if (document.readyState === "complete") return undefined;
    const onLoad = () => setSiteReady(true);
    const onReady = () => {
      if (document.readyState === "complete") setSiteReady(true);
    };
    window.addEventListener("load", onLoad, { once: true });
    document.addEventListener("readystatechange", onReady);
    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("readystatechange", onReady);
    };
  }, []);

  // Mount all deferred sections in ONE batch after load (single layout pass, no stagger jumps).
  useEffect(() => {
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      } else {
        window.setTimeout(() => setReady(true), 400);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <div className="app-root">
      <GrandOpeningStage onComplete={handleIntroComplete} siteReady={siteReady} />

      <div className="app-content" inert={introDone ? undefined : true}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <Navbar />

        <main id="main" tabIndex={-1}>
          <Hero />
          <DeferredSection id="legacy" minHeight="720px" ready={ready}>
            <Legacy />
          </DeferredSection>
          <DeferredSection id="showroom" minHeight="760px" ready={ready}>
            <Showroom />
          </DeferredSection>
          <DeferredSection id="opening" minHeight="900px" ready={ready}>
            <GrandOpening />
          </DeferredSection>
          <DeferredSection id="gala" minHeight="780px" ready={ready}>
            <GalaDinner />
          </DeferredSection>
          <DeferredSection id="vendors" minHeight="780px" ready={ready}>
            <VendorMeet />
          </DeferredSection>
          <DeferredSection id="invitees" minHeight="1400px" ready={ready}>
            <SpecialInvitees />
          </DeferredSection>
          <DeferredSection id="locations" minHeight="900px" ready={ready}>
            <Locations />
          </DeferredSection>
          <DeferredSection id="family" minHeight="560px" ready={ready}>
            <FamilyGreetings />
          </DeferredSection>
          <DeferredSection id="qr" minHeight="560px" ready={ready}>
            <VenueMap />
          </DeferredSection>
        </main>

        <Footer />
      </div>
    </div>
  );
}
