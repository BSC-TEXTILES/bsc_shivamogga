import React from "react";
import { ExternalLink } from "lucide-react";
import inviteP5Webp from "../assets/invite-p5.webp";
import inviteP5Sm from "../assets/invite-p5-sm.webp";

export default function GrandOpening() {
  const dignitaries = [
    {
      name: "Shri B. S. Yediyurappa",
      designation: "Former Chief Minister of Karnataka"
    },
    {
      name: "Sri V. Somanna",
      designation: "Honorable Minister of State for Jal Shakthi & Railways, Govt. of India"
    },
    {
      name: "Sri Madhu Bangarappa",
      designation: "Minister of Primary & Secondary Education & Sakala, Govt. of Karnataka"
    }
  ];

  return (
    <section className="section opening" id="opening" aria-labelledby="opening-title">
      <div className="container">
        <div className="event-layout">
          <div className="event-art" data-reveal>
            <div className="invite-frame">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${inviteP5Sm} 768w, ${inviteP5Webp} 1200w`}
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 560px"
                />
                <img
                  src={inviteP5Webp}
                  alt="Grand Opening invitation with heavenly blessings, inauguration by Shri B.S. Yediyurappa, Sri V. Somanna, and Sri Madhu Bangarappa on Monday, 12 October 2026, 10:30 AM onwards"
                  width="1600"
                  height="1131"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>

          <div className="event-detail" data-reveal>
            <p className="eyebrow">Ceremonial Invitation</p>
            <h2 id="opening-title">Grand Opening</h2>
            <span className="rule" aria-hidden="true" />

            <div className="blessings">
              <p className="mantra">II Sri Ulavi Channabasaveshwara Prasanna II</p>
              <p className="blessing-sub">With Their Heavenly Blessings</p>
              <p className="elder">Sri Bankapur S. Nanjundappa</p>
              <p className="elder">
                Sri B.S. Channabasappa &amp; Smt. Susheelamma <span className="place">Davanagere</span>
              </p>
            </div>

            <p className="invite-line">
              We request the honour of your gracious presence on the joyful and auspicious occasion of the Grand Opening of our new showroom.
            </p>

            <div className="inauguration">
              <h3>Inauguration By</h3>
              <ul className="dignitary-list">
                {dignitaries.map((dignitary) => (
                  <li key={dignitary.name}>
                    <strong>{dignitary.name}</strong>
                    <span>{dignitary.designation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="event-facts">
              <div className="fact-card">
                <dt>Date</dt>
                <dd>Monday, 12<sup>th</sup> October 2026</dd>
              </div>
              <div className="fact-card">
                <dt>Time</dt>
                <dd>10:30 AM onwards</dd>
              </div>
              <div className="fact-card full-span">
                <dt>Venue</dt>
                <dd>Parekh Vinayaka Mall, BH Road, Shivamogga</dd>
              </div>
            </dl>

            <div className="event-cta">
              <a
                className="btn btn-primary"
                href="https://www.canvaqr.com/RGS6_7gEBf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shivamogga showroom location on Google Maps"
              >
                <span>Open Mall Location</span>
                <ExternalLink size={14} className="btn-external-icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
