import React from "react";
import { COMPLIMENTS } from "../data/compliments";

export default function FamilyGreetings() {
  return (
    <section
      className="section family best-compliments"
      id="family"
      data-reveal-section
      aria-labelledby="family-title"
    >
      <div className="container">
        <header className="section-head text-center" data-reveal>
          <h2 id="family-title" className="compliments-title">
            With Best Compliments From
          </h2>
        </header>

        <ul className="compliments-list" data-reveal>
          {COMPLIMENTS.map((item) => (
            <li key={item.name} className="compliments-list-item">
              {item.name}
            </li>
          ))}
        </ul>

        <div className="compliments-flourish" aria-hidden="true" data-reveal>
          <svg viewBox="0 0 240 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 18c18-14 36-14 54 0-18 14-36 14-54 0Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M228 18c-18-14-36-14-54 0 18 14 36 14 54 0Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M78 18c12-8 24-8 36 0-12 8-24 8-36 0Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M162 18c-12-8-24-8-36 0 12 8 24 8 36 0Z"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M120 10l3.2 6.4L130 20l-6.8 3.6L120 30l-3.2-6.4L110 20l6.8-3.6L120 10Z"
              fill="currentColor"
            />
            <path d="M66 18h12M162 18h12" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="60" cy="18" r="2" fill="currentColor" />
            <circle cx="180" cy="18" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
