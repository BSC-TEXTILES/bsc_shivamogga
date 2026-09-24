import React from "react";

const BRAND_WORDS = ["BSC", "SHIVAMOGGA"];
const QUESTION_WORDS = "ARE YOU READY FOR THE GRAND OPENING?".split(" ");
const SUPPORTING = "An extraordinary new BSC experience is about to begin.";

export default function IntroContent({ step }) {
  return (
    <div className="go-intro__content">
      <p className={`go-intro__eyebrow ${step >= 3 ? "is-in" : ""}`}>
        Grand Opening Celebration
      </p>

      <h1
        className={`go-intro__heading go-intro__heading--brand ${step >= 4 ? "is-in" : ""}`}
        aria-label="BSC Shivamogga"
      >
        {BRAND_WORDS.map((word, index) => (
          <span
            key={word}
            className="go-intro__brand-word"
            style={{ "--brand-i": index }}
            aria-hidden="true"
          >
            <span className="go-intro__brand-text">{word}</span>
          </span>
        ))}
      </h1>

      <p className={`go-intro__subhead ${step >= 4 ? "is-in" : ""}`}>
        <span className="go-intro__subhead-rule" aria-hidden="true" />
        <span>GRAND OPENING</span>
        <span className="go-intro__subhead-rule" aria-hidden="true" />
      </p>

      <p
        className={`go-intro__question ${step >= 5 ? "is-in" : ""}`}
        aria-label="Are you ready for the grand opening?"
      >
        {QUESTION_WORDS.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="go-intro__word"
            style={{ "--word-i": index }}
            aria-hidden="true"
          >
            {word}
          </span>
        ))}
      </p>

      <p className={`go-intro__support ${step >= 6 ? "is-in" : ""}`}>
        {SUPPORTING}
      </p>
    </div>
  );
}
