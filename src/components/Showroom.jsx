import React from "react";
import showroomPhoto from "../assets/showroom-photo.jpg";
import showroomWebp from "../assets/showroom-photo.webp";

export default function Showroom() {
  return (
    <section className="section showroom" id="showroom" aria-labelledby="showroom-title">
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
              <source srcSet={showroomWebp} type="image/webp" />
              <img
                src={showroomPhoto}
                alt="BSC Textiles new showroom at Parekh Vinayaka Mall, Shivamogga"
                width="1600"
                height="1131"
                loading="lazy"
              />
            </picture>
          </div>
          <figcaption className="showroom-caption">
            <div className="caption-brand">
              <strong>BSC Textiles</strong>
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
