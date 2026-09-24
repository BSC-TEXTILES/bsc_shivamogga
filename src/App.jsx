import React, { useState, useCallback, Suspense, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import DoorEntrance from "./components/DoorEntrance";
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

function DeferredSection({ id, minHeight, index, bootstrap, children }) {
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
        { rootMargin: "900px 0px" }
      );
      io.observe(el);
    }

    let timer = 0;
    if (bootstrap) {
      timer = window.setTimeout(reveal, index * 70);
    }

    return () => {
      io?.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHash);
    };
  }, [id, show, bootstrap, index]);

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
      style={{ minHeight: show ? undefined : minHeight }}
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
  const [bootstrap, setBootstrap] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  useEffect(() => {
    const start = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => setBootstrap(true), { timeout: 2000 });
      } else {
        window.setTimeout(() => setBootstrap(true), 800);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <div className="app-root">
      <DoorEntrance onComplete={handleIntroComplete} />

      <div className="app-content" inert={introDone ? undefined : true}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        <Navbar />

        <main id="main" tabIndex={-1}>
          <Hero />
          <DeferredSection id="legacy" minHeight="720px" index={0} bootstrap={bootstrap}>
            <Legacy />
          </DeferredSection>
          <DeferredSection id="showroom" minHeight="760px" index={1} bootstrap={bootstrap}>
            <Showroom />
          </DeferredSection>
          <DeferredSection id="opening" minHeight="900px" index={2} bootstrap={bootstrap}>
            <GrandOpening />
          </DeferredSection>
          <DeferredSection id="gala" minHeight="780px" index={3} bootstrap={bootstrap}>
            <GalaDinner />
          </DeferredSection>
          <DeferredSection id="vendors" minHeight="780px" index={4} bootstrap={bootstrap}>
            <VendorMeet />
          </DeferredSection>
          <DeferredSection id="invitees" minHeight="1400px" index={5} bootstrap={bootstrap}>
            <SpecialInvitees />
          </DeferredSection>
          <DeferredSection id="locations" minHeight="900px" index={6} bootstrap={bootstrap}>
            <Locations />
          </DeferredSection>
          <DeferredSection id="family" minHeight="720px" index={7} bootstrap={bootstrap}>
            <FamilyGreetings />
          </DeferredSection>
          <DeferredSection id="qr" minHeight="560px" index={8} bootstrap={bootstrap}>
            <VenueMap />
          </DeferredSection>
        </main>

        <Footer />
      </div>
    </div>
  );
}
