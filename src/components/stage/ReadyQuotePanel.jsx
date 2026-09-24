import React from "react";

/**
 * Side floating “Are you ready?” panel for the Grand Opening stage.
 * Transparent layered panel — cream/gold on burgundy wash, no white card.
 */
export default function ReadyQuotePanel({ show }) {
  return (
    <aside
      className={`gos-ready ${show ? "is-in" : ""}`}
      aria-label="Grand Opening invitation message"
    >
      <div className="gos-ready__panel">
        <span className="gos-ready__line" aria-hidden="true" />

        <p className="gos-ready__q">
          <span className="gos-ready__q-inner">ARE YOU READY FOR SHIVAMOGGA?</span>
        </p>

        <p className="gos-ready__support">
          Shivamogga, a new chapter of elegance, celebration and BSC tradition is
          about to begin.
        </p>

        <p className="gos-ready__quote">
          <span className="gos-ready__quote-mark" aria-hidden="true">
            “
          </span>
          Where tradition meets tomorrow, a grand new experience begins.
          <span className="gos-ready__quote-mark" aria-hidden="true">
            ”
          </span>
        </p>

        <span className="gos-ready__accent" aria-hidden="true" />
      </div>
    </aside>
  );
}
