import React from "react";

export default function GrandOpeningTitle({ showGrand, showOpening }) {
  return (
    <div className="gos-title" aria-label="BSC Shivamogga Grand Opening">
      <div className={`gos-title__crest ${showGrand ? "is-in" : ""}`}>
        <span className="gos-title__crest-line" />
        <span className="gos-title__crest-text">EST. 1938 · SHIVAMOGGA</span>
        <span className="gos-title__crest-line" />
      </div>

      <p className={`gos-title__brand ${showGrand ? "is-in" : ""}`}>
        BSC SHIVAMOGGA
      </p>

      <div className={`gos-title__lockup ${showGrand ? "is-in" : ""}`}>
        <span className="gos-title__ornament" aria-hidden="true">✦</span>
        <h1 className="gos-title__grand">
          <span className="gos-title__grand-script">Grand</span>
        </h1>
        <span className="gos-title__ornament" aria-hidden="true">✦</span>
      </div>

      <p className={`gos-title__opening ${showOpening ? "is-in" : ""}`}>
        <span className="gos-title__opening-rule" aria-hidden="true" />
        <span className="gos-title__opening-text">OPENING</span>
        <span className="gos-title__opening-rule" aria-hidden="true" />
      </p>

      <p className={`gos-title__tagline ${showOpening ? "is-in" : ""}`}>
        A New Chapter Begins
      </p>
    </div>
  );
}
