import React, { useEffect, useMemo, useState } from "react";

const BALLOON_COLORS = [
  { body: "#5A0718", edge: "rgba(216,190,133,0.45)" },
  { body: "#3D0610", edge: "rgba(176,138,74,0.4)" },
  { body: "#B08A4A", edge: "rgba(245,235,221,0.35)" },
  { body: "#F5EBDD", edge: "rgba(176,138,74,0.5)" },
  { body: "#7A0A21", edge: "rgba(216,190,133,0.4)" },
  { body: "#D8BE85", edge: "rgba(90,7,24,0.3)" }
];

const EDGE_POSITIONS = [
  { left: "4%", bottom: "-12%" },
  { left: "12%", bottom: "-18%" },
  { left: "88%", bottom: "-14%" },
  { left: "94%", bottom: "-20%" },
  { left: "2%", bottom: "-28%" },
  { left: "96%", bottom: "-30%" },
  { left: "18%", bottom: "-24%" },
  { left: "82%", bottom: "-26%" }
];

function buildBalloons(count) {
  return EDGE_POSITIONS.slice(0, count).map((pos, i) => ({
    id: i,
    ...pos,
    ...BALLOON_COLORS[i % BALLOON_COLORS.length],
    delay: (i % 6) * 0.35,
    duration: 7 + (i % 4) * 1.2,
    sway: 10 + (i % 5) * 4,
    scale: 0.75 + (i % 4) * 0.12
  }));
}

export default function BalloonLayer({ active }) {
  const [count, setCount] = useState(8);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCount(mq.matches ? 4 : 8);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const balloons = useMemo(() => buildBalloons(count), [count]);

  if (!active) return null;

  return (
    <div className="go-intro__balloons" aria-hidden="true">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="go-intro__balloon"
          style={{
            left: balloon.left,
            bottom: balloon.bottom,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
            "--balloon-body": balloon.body,
            "--balloon-edge": balloon.edge,
            "--balloon-sway": `${balloon.sway}px`,
            "--balloon-scale": balloon.scale
          }}
        >
          <span className="go-intro__balloon-body" />
          <span className="go-intro__balloon-knot" />
          <span className="go-intro__balloon-string" />
        </div>
      ))}
    </div>
  );
}
