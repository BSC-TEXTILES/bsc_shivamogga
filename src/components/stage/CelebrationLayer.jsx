import React, { useEffect, useMemo, useState } from "react";

const PALETTE = ["#D8BE85", "#B08A4A", "#F5EBDD", "#C41220", "#7A5C28"];

function buildPieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 6 + ((i * 19 + 5) % 88),
    delay: (i % 14) * 0.08,
    duration: 2.2 + (i % 6) * 0.35,
    size: 4 + (i % 4) * 2,
    color: PALETTE[i % PALETTE.length],
    rot: (i * 53) % 360,
    drift: ((i % 11) - 5) * 14
  }));
}

export default function CelebrationLayer({ active }) {
  const [count, setCount] = useState(42);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCount(mq.matches ? 16 : 42);
    apply();
    const onChange = () => apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const pieces = useMemo(() => buildPieces(count), [count]);

  if (!active) return null;

  return (
    <div className="gos-celebration" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="gos-celebration__bit"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.id % 3 === 0 ? p.size * 1.7 : p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--gos-rot": `${p.rot}deg`,
            "--gos-drift": `${p.drift}px`
          }}
        />
      ))}
    </div>
  );
}
