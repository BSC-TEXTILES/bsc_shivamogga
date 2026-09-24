import React, { useEffect, useMemo, useState } from "react";

const PALETTE = ["#D8BE85", "#B08A4A", "#F5EBDD", "#5A0718", "#7A5C28"];

function buildPieces(count) {
  return Array.from({ length: count }, (_, i) => {
    const left = 4 + ((i * 17 + 7) % 92);
    const delay = (i % 12) * 0.12 + (i % 5) * 0.08;
    const duration = 2.4 + (i % 7) * 0.35;
    const size = 5 + (i % 4) * 2;
    const color = PALETTE[i % PALETTE.length];
    const rotate = (i * 47) % 360;
    const drift = ((i % 9) - 4) * 12;
    return { id: i, left, delay, duration, size, color, rotate, drift };
  });
}

export default function ConfettiLayer({ active }) {
  const [count, setCount] = useState(48);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCount(mq.matches ? 18 : 48);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pieces = useMemo(() => buildPieces(count), [count]);

  if (!active) return null;

  return (
    <div className="go-intro__confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="go-intro__confetti-bit"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * (piece.id % 3 === 0 ? 1.6 : 1),
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--confetti-rot": `${piece.rotate}deg`,
            "--confetti-drift": `${piece.drift}px`
          }}
        />
      ))}
    </div>
  );
}
