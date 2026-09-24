import React from "react";

export default function RibbonLayer({ show, cut }) {
  return (
    <div
      className={[
        "gos-ribbon",
        show ? "is-in" : "",
        cut ? "is-cut" : ""
      ].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 720 160" className="gos-ribbon__svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gos-rb-main" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff5a66" />
            <stop offset="40%" stopColor="#d01828" />
            <stop offset="100%" stopColor="#7a0a14" />
          </linearGradient>
          <linearGradient id="gos-rb-hi" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="gos-rb-shadow" x="-10%" y="-40%" width="120%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.32" />
          </filter>
          <clipPath id="gos-rb-clip-l">
            <rect x="0" y="0" width="352" height="160" />
          </clipPath>
          <clipPath id="gos-rb-clip-r">
            <rect x="368" y="0" width="352" height="160" />
          </clipPath>
        </defs>

        <g className="gos-ribbon__wave" filter="url(#gos-rb-shadow)">
          {/* Intact band (pre-cut) */}
          <g className="gos-ribbon__whole">
            <path
              d="M30,86 C150,28 250,140 360,84 C470,28 570,140 690,86"
              fill="none"
              stroke="#5a0710"
              strokeWidth="44"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              className="gos-ribbon__band"
              d="M30,80 C150,22 250,134 360,78 C470,22 570,134 690,80"
              fill="none"
              stroke="url(#gos-rb-main)"
              strokeWidth="40"
              strokeLinecap="round"
            />
            <path
              d="M40,72 C155,20 250,124 358,70 C465,18 565,124 680,72"
              fill="none"
              stroke="url(#gos-rb-hi)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M40,66 C155,16 250,118 358,64 C465,14 565,118 680,66"
              fill="none"
              stroke="rgba(216,190,133,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 10"
            />
          </g>

          {/* Post-cut halves — slight droop */}
          <g className="gos-ribbon__split">
            <g clipPath="url(#gos-rb-clip-l)" className="gos-ribbon__half gos-ribbon__half--l">
              <path
                d="M30,80 C140,24 240,132 352,86"
                fill="none"
                stroke="url(#gos-rb-main)"
                strokeWidth="40"
                strokeLinecap="round"
              />
              <path
                d="M40,72 C145,22 240,124 350,80"
                fill="none"
                stroke="url(#gos-rb-hi)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path d="M48,92 L10,132 L58,118 L42,152 L92,108 Z" fill="#a0101c" />
            </g>
            <g clipPath="url(#gos-rb-clip-r)" className="gos-ribbon__half gos-ribbon__half--r">
              <path
                d="M368,86 C480,132 580,24 690,80"
                fill="none"
                stroke="url(#gos-rb-main)"
                strokeWidth="40"
                strokeLinecap="round"
              />
              <path
                d="M370,80 C480,124 580,22 680,72"
                fill="none"
                stroke="url(#gos-rb-hi)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path d="M672,92 L710,132 L662,118 L678,152 L628,108 Z" fill="#a0101c" />
            </g>
          </g>

          {/* Soft center knot (decorative, fades on cut) */}
          <g className="gos-ribbon__knot">
            <ellipse cx="360" cy="78" rx="26" ry="20" fill="#b01422" />
            <ellipse cx="360" cy="74" rx="16" ry="11" fill="#d42434" opacity="0.85" />
          </g>
        </g>
      </svg>
    </div>
  );
}
