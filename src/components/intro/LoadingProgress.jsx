import React from "react";

export default function LoadingProgress({ progress, label }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div className="go-intro__progress" role="status" aria-live="polite">
      <span className="go-intro__progress-label">{label}</span>
      <div className="go-intro__progress-track">
        <div
          className="go-intro__progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="go-intro__progress-pct">{pct}%</span>
    </div>
  );
}
