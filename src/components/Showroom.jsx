import React from "react";
import showroomWebp from "../assets/loc-shivamogga.webp";
import showroomWebpSm from "../assets/loc-shivamogga-sm.webp";

export default function Showroom() {
  return (
    <section className="section showroom" id="showroom" data-reveal-section aria-labelledby="showroom-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">A New Chapter</p>
          <h2 id="showroom-title">Shivamogga Showroom</h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            We warmly invite you to share happiness as we move ahead to a new chapter of BSC with our new showroom.
          </p>
        </header>

        <figure className="showroom-visual" data-reveal>
          <div className="showroom-frame">
            <img
              src={showroomWebp}
              srcSet={`${showroomWebpSm} 512w, ${showroomWebp} 1024w`}
              sizes="(max-width: 640px) 512px, 1024px"
              alt="BSC Exclusive new showroom at Parekh Vinayaka Mall, Shivamogga"
              width="1024"
              height="928"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="showroom-caption">
            <div className="caption-brand">
              <strong>BSC Exclusive</strong>
              <span className="caption-tag">Shivamogga Destination</span>
            </div>
            <div className="caption-address">
              <span>Parekh Vinayaka Mall · BH Road · Shivamogga</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
