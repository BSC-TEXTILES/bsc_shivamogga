import React from "react";
import showroomImg from "../assets/loc-shivamogga.png";
import showroomWebp from "../assets/loc-shivamogga.webp";

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
            <picture>
              <source
                type="image/webp"
                srcSet={showroomWebp}
              />
              <img
                src={showroomImg}
                alt="BSC Exclusive new showroom at Parekh Vinayaka Mall, Shivamogga"
                width="1800"
                height="1633"
                loading="lazy"
                decoding="async"
              />
            </picture>
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
