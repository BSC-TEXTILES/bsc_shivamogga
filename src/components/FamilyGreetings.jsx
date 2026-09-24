import React, { useEffect, useRef, useState } from "react";
import { COMPLIMENTS } from "../data/compliments";
import ComplimentCard from "./ComplimentCard";

export default function FamilyGreetings() {
  const gridShellRef = useRef(null);

  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "ready";
    if (!("IntersectionObserver" in window)) return "ready";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "ready";
    return "pending";
  });

  useEffect(() => {
    if (phase !== "pending") return undefined;
    const el = gridShellRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("ready");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  return (
    <section className="section family best-compliments" id="family" data-reveal-section aria-labelledby="family-title">
      <div className="family-band" aria-hidden="true" />
      <div className="container">
        <header className="section-head text-center" data-reveal>
          <p className="eyebrow">Warm Greetings</p>
          <h2 id="family-title">With Best Compliments From</h2>
          <span className="rule gold-divider" aria-hidden="true" />
          <span className="family-heading-accent" aria-hidden="true" />
        </header>

        <div className="compliments-grid-shell" ref={gridShellRef}>
          <div
            className={`compliments-grid ${phase === "ready" ? "is-ready" : "is-pending"}`}
          >
            {COMPLIMENTS.map((item, idx) => (
              <ComplimentCard key={item.name} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
