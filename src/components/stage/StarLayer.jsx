import React from "react";

const STARS = [
  { id: 1, x: 50, y: 4, s: 1.35, d: 0 },
  { id: 2, x: 42, y: 6, s: 1.1, d: 0.07 },
  { id: 3, x: 58, y: 6, s: 1.1, d: 0.1 },
  { id: 4, x: 34, y: 10, s: 0.95, d: 0.15 },
  { id: 5, x: 66, y: 10, s: 0.95, d: 0.18 },
  { id: 6, x: 27, y: 15, s: 0.85, d: 0.24 },
  { id: 7, x: 73, y: 15, s: 0.85, d: 0.28 },
  { id: 8, x: 21, y: 22, s: 0.75, d: 0.32 },
  { id: 9, x: 79, y: 22, s: 0.75, d: 0.36 },
  { id: 10, x: 46, y: 3, s: 0.8, d: 0.08 },
  { id: 11, x: 54, y: 3, s: 0.8, d: 0.12 }
];

function StarSvg() {
  return (
    <svg viewBox="0 0 24 24" className="gos-star__svg" focusable="false">
      <path
        fill="currentColor"
        d="M12 1.8l2.7 6.6 7.1.6-5.4 4.7 1.6 6.9L12 17.2 5.9 20.6l1.6-6.9L2.1 9l7.1-.6L12 1.8z"
      />
    </svg>
  );
}

export default function StarLayer({ show }) {
  return (
    <div className={`gos-stars ${show ? "is-in" : ""}`} aria-hidden="true">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="gos-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}rem`,
            height: `${star.s}rem`,
            animationDelay: `${star.d}s, ${star.d + 0.75}s`
          }}
        >
          <StarSvg />
        </span>
      ))}
    </div>
  );
}
