import React from "react";

/**
 * Ceremonial scissors — each half is one rigid group (blade + handle)
 * so open/close never disconnects the object.
 * Pivot at (120, 172) in viewBox 240×360.
 */
export default function ScissorsLayer({ show, cutting, settled }) {
  return (
    <div
      className={[
        "gos-scissors",
        show ? "is-in" : "",
        cutting ? "is-cutting" : "",
        settled ? "is-settled" : ""
      ].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="gos-scissors__shadow" />
      <div className="gos-scissors__glow" />

      <svg viewBox="0 0 240 360" className="gos-scissors__svg" overflow="visible">
        <defs>
          <linearGradient id="gos-blade-a" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="28%" stopColor="#dce3ec" />
            <stop offset="58%" stopColor="#a8b3c2" />
            <stop offset="100%" stopColor="#6e7989" />
          </linearGradient>
          <linearGradient id="gos-blade-b" x1="80%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#f3f6fa" />
            <stop offset="32%" stopColor="#cfd7e2" />
            <stop offset="70%" stopColor="#96a1b1" />
            <stop offset="100%" stopColor="#657080" />
          </linearGradient>
          <linearGradient id="gos-gold-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e7b0" />
            <stop offset="35%" stopColor="#d8be85" />
            <stop offset="70%" stopColor="#b08a4a" />
            <stop offset="100%" stopColor="#7a5c28" />
          </linearGradient>
          <linearGradient id="gos-gold-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0e0b4" />
            <stop offset="45%" stopColor="#c4a05a" />
            <stop offset="100%" stopColor="#8a6a30" />
          </linearGradient>
          <linearGradient id="gos-edge-hi" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="gos-scissor-drop" x="-40%" y="-30%" width="180%" height="170%">
            <feDropShadow dx="2" dy="8" stdDeviation="7" floodColor="#120208" floodOpacity="0.45" />
          </filter>
        </defs>

        <g filter="url(#gos-scissor-drop)">
          {/* LEFT HALF: blade + handle rotate together around pivot */}
          <g className="gos-scissors__half gos-scissors__half--l">
            <path
              d="M120,170
                 C112,128 96,72 68,30
                 L58,24 L54,32
                 C82,78 100,132 110,172
                 Z"
              fill="url(#gos-blade-a)"
              stroke="#5a6472"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* cutting edge highlight */}
            <path
              className="gos-scissors__edge-hi"
              d="M70,34 C96,80 112,130 120,168"
              fill="none"
              stroke="url(#gos-edge-hi)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* bolster into handle */}
            <path
              d="M110,170 L128,178 L122,192 L106,182 Z"
              fill="url(#gos-gold-a)"
              stroke="#6a5020"
              strokeWidth="1"
            />
            {/* handle loop */}
            <path
              d="M114,188
                 C86,214 70,258 84,296
                 C98,332 148,328 154,294
                 C160,262 142,226 126,196"
              fill="none"
              stroke="url(#gos-gold-a)"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <path
              d="M114,188
                 C86,214 70,258 84,296
                 C98,332 148,328 154,294
                 C160,262 142,226 126,196"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* RIGHT HALF */}
          <g className="gos-scissors__half gos-scissors__half--r">
            <path
              d="M120,170
                 C128,128 144,72 172,30
                 L182,24 L186,32
                 C158,78 140,132 130,172
                 Z"
              fill="url(#gos-blade-b)"
              stroke="#5a6472"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              className="gos-scissors__edge-hi"
              d="M170,34 C144,80 128,130 120,168"
              fill="none"
              stroke="url(#gos-edge-hi)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M130,170 L112,178 L118,192 L134,182 Z"
              fill="url(#gos-gold-b)"
              stroke="#6a5020"
              strokeWidth="1"
            />
            <path
              d="M126,188
                 C154,214 170,258 156,296
                 C142,332 92,328 86,294
                 C80,262 98,226 114,196"
              fill="none"
              stroke="url(#gos-gold-b)"
              strokeWidth="17"
              strokeLinecap="round"
            />
            <path
              d="M126,188
                 C154,214 170,258 156,296
                 C142,332 92,328 86,294
                 C80,262 98,226 114,196"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Pivot (always on top, fixed) */}
          <circle cx="120" cy="172" r="12" fill="url(#gos-gold-a)" stroke="#654d1e" strokeWidth="2" />
          <circle cx="120" cy="172" r="5" fill="#f6e8c4" />
          <circle cx="118" cy="170" r="2" fill="#fff" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
