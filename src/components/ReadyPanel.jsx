import React, { useRef, useEffect, useState, useCallback } from "react";

export default function ReadyPanel() {
  const panelRef = useRef(null);
  const lightRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // IntersectionObserver for scroll-based reveal
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer 3D interaction (desktop only)
  const handlePointerMove = useCallback((e) => {
    if (prefersReduced.current) return;
    const el = panelRef.current;
    if (!el || window.innerWidth < 1024) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;

    const rotateY = dx * 4;   // max ±4deg
    const rotateX = -dy * 3;  // max ±3deg
    const translateZ = 4;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;

      // Subtle light shift
      if (lightRef.current) {
        const lx = 50 + dx * 30;
        const ly = 50 + dy * 30;
        lightRef.current.style.background = `radial-gradient(ellipse at ${lx}% ${ly}%, rgba(216, 190, 133, 0.12) 0%, transparent 70%)`;
      }
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transform = "";
    if (lightRef.current) {
      lightRef.current.style.background = "";
    }
  }, []);

  return (
    <div
      ref={panelRef}
      className={`ready-panel ${isVisible ? "ready-panel--visible" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Are you ready for Shivamogga?"
    >
      {/* Subtle moving light overlay */}
      <div ref={lightRef} className="ready-panel__light" aria-hidden="true" />

      {/* Inner border accent */}
      <div className="ready-panel__inner-border" aria-hidden="true" />

      {/* Top gold accent line */}
      <div className="ready-panel__accent ready-panel__accent--top" aria-hidden="true" />

      {/* Content */}
      <div className="ready-panel__content">
        <h2 className="ready-panel__heading">
          <span className="ready-panel__line ready-panel__line--1">ARE YOU READY</span>
          <span className="ready-panel__line ready-panel__line--2">FOR SHIVAMOGGA?</span>
        </h2>

        <p className="ready-panel__body">
          Shivamogga, a new chapter of elegance,
          celebration and BSC tradition is about to
          begin.
        </p>

        <blockquote className="ready-panel__quote">
          <span>"Where tradition meets tomorrow,</span>
          <span>a grand new experience begins."</span>
        </blockquote>
      </div>

      {/* Bottom gold accent line */}
      <div className="ready-panel__accent ready-panel__accent--bottom" aria-hidden="true" />
    </div>
  );
}
