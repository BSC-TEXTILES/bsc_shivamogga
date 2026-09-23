import React, { useState, useEffect, useCallback } from "react";
import bscLogo from "../assets/bsc-logo-crop.webp";

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

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    const dismissTimer = setTimeout(() => {
      setIsDismissed(true);
      if (onComplete) onComplete();
    }, 1100);
    return () => clearTimeout(dismissTimer);
  }, [onComplete]);

  useEffect(() => {
    if (isDismissed) return;

    // Auto-open after initial brand greeting
    const timer = setTimeout(() => {
      handleOpen();
    }, 1200);

    return () => clearTimeout(timer);
  }, [isDismissed, handleOpen]);

  if (isDismissed) return null;

  return (
    <div
      className={`door-entrance-portal ${isOpen ? "doors-opened" : ""}`}
      role="dialog"
      aria-label="Welcome to BSC Shivamogga"
      aria-modal="true"
    >
      <div className="door-viewport">
        {/* Left Door Panel */}
        <div className="door-panel door-left">
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
        <div className="door-panel door-right">
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
              />
            </div>
            <p className="emblem-eyebrow">A FIVE-GENERATION LEGACY</p>
            <h1 className="emblem-title">SHIVAMOGGA GRAND OPENING</h1>
            <p className="emblem-subtitle">Step Inside the Grand Digital Showroom</p>

            <div className="emblem-actions">
              <button
                type="button"
                className="btn btn-entrance-enter"
                onClick={handleOpen}
                autoFocus
              >
                <span>Enter Showroom</span>
                <span className="btn-enter-arrow">→</span>
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
