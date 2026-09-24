import React, { useState, useEffect, useCallback, useRef } from "react";
import bscLogo from "../assets/bsc-logo-crop.png";

export default function DoorEntrance({ onComplete }) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const enterRef = useRef(null);
  const dismissTimerRef = useRef(null);

  const focusMain = useCallback(() => {
    const main = document.getElementById("main");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    dismissTimerRef.current = setTimeout(() => {
      setIsDismissed(true);
      focusMain();
      if (onComplete) onComplete();
    }, 1100);
  }, [onComplete, focusMain]);

  useEffect(() => {
    if (isDismissed) return undefined;

    // Prevent background page scroll while intro is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      handleOpen();
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, [isDismissed, handleOpen]);

  useEffect(() => {
    if (!isDismissed && enterRef.current) {
      enterRef.current.focus({ preventScroll: true });
    }
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`door-entrance-portal ${isOpen ? "doors-opened" : ""}`}
      role="region"
      aria-label="Welcome to BSC Shivamogga"
    >
      <div className="door-viewport">
        {/* Left Door Panel */}
        <div className="door-panel door-left" aria-hidden="true">
          <div className="door-inner-molding">
            <div className="door-handle door-handle-left">
              <span className="handle-metal" />
            </div>
            <div className="door-gold-crest">
              <span className="crest-monogram">BSC</span>
              <span className="crest-sub">ESTD 1938</span>
            </div>
          </div>
        </div>

        {/* Right Door Panel */}
        <div className="door-panel door-right" aria-hidden="true">
          <div className="door-inner-molding">
            <div className="door-handle door-handle-right">
              <span className="handle-metal" />
            </div>
            <div className="door-gold-crest">
              <span className="crest-monogram">BSC</span>
              <span className="crest-sub">SHIVAMOGGA</span>
            </div>
          </div>
        </div>

        {/* Center Welcome Crest & Action */}
        <div className={`door-center-emblem ${isOpen ? "emblem-fade" : ""}`}>
          <div className="emblem-card">
            <div className="emblem-logo-wrap">
              <img
                src={bscLogo}
                alt="BSC Exclusive"
                width="110"
                height="73"
                className="emblem-logo"
                decoding="async"
              />
            </div>
            <p className="emblem-eyebrow">A FIVE-GENERATION LEGACY</p>
            <p className="emblem-title">SHIVAMOGGA GRAND OPENING</p>
            <p className="emblem-subtitle">Step Inside the Digital Showroom</p>

            <div className="emblem-actions">
              <button
                ref={enterRef}
                type="button"
                className="btn btn-entrance-enter"
                onClick={handleOpen}
              >
                <span>Enter Showroom</span>
                <span className="btn-enter-arrow" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="btn btn-entrance-skip"
                onClick={handleOpen}
              >
                Skip Intro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
