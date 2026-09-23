import React from "react";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from "lucide-react";
import floralLeftWebp from "../assets/floral-left.webp";
import floralLeftPng from "../assets/floral-left.png";
import floralRightWebp from "../assets/floral-right.webp";
import floralRightPng from "../assets/floral-right.png";

export default function GrandOpening() {
  const dignitaries = [
    {
      name: "SHRI B. S. YEDIYURAPPA",
      designation: "Former Chief Minister of Karnataka",
      highlight: true
    },
    {
      name: "SRI V. SOMANNA",
      designation: "Honorable Minister of State for Jal Shakthi & Railways, Govt. of India",
      highlight: true
    },
    {
      name: "SRI N. CHALUVARAYA SWAMY",
      designation: "Hon'ble Minister for Agriculture, Govt. of Karnataka",
      highlight: true
    },
    {
      name: "SRI MADHU BANGARAPPA",
      designation: "Minister of Primary & Secondary Education & Sakala, Govt. of Karnataka",
      highlight: true
    }
  ];

  const mapUrl = "https://www.canvaqr.com/RGS6_7gEBf";
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Grand+Opening&dates=20261012T050000Z/20261012T163000Z&details=Grand+Opening+celebration+of+BSC+Shivamogga+at+Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga.&location=Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga";

  return (
    <section className="section opening" id="opening" aria-labelledby="opening-title">
      <div className="container narrow">
        <div className="opening-floral-decor" aria-hidden="true">
          <picture className="opening-floral opening-floral--left">
            <source srcSet={floralLeftWebp} type="image/webp" />
            <img
              src={floralLeftPng}
              alt=""
              width="230"
              height="631"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </picture>
          <picture className="opening-floral opening-floral--right">
            <source srcSet={floralRightWebp} type="image/webp" />
            <img
              src={floralRightPng}
              alt=""
              width="229"
              height="628"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </picture>
        </div>

        <header className="section-head text-center" data-reveal>
          <div className="badge-heritage badge-center">
            <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
            <span>Ceremonial Invitation</span>
          </div>
          <h2 id="opening-title" className="grand-opening-title">
            GRAND OPENING
          </h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            We request the honour of your gracious presence on the joyful and auspicious occasion of the Grand Opening of our new showroom.
          </p>
        </header>

        <div className="opening-ceremony-card" data-reveal>
          <div className="blessings-card">
            <p className="mantra">॥ SRI ULAVI CHANNABASAVESHWARA PRASANNA ॥</p>
            <p className="blessing-sub">WITH THEIR HEAVENLY BLESSINGS</p>
            <div className="blessing-names">
              <p className="elder">SRI BANKAPUR S. NANJUNDAPPA</p>
              <p className="elder">
                SRI B.S. CHANNABASAPPA &amp; SMT. SUSHEELAMMA <span className="place">DAVANAGERE</span>
              </p>
            </div>
          </div>

          <div className="inauguration-section">
            <div className="inauguration-header">
              <span className="inauguration-pill">INAUGURATED BY</span>
            </div>

            <div className="inauguration-grid">
              {dignitaries.map((dignitary) => (
                <div key={dignitary.name} className="inauguration-card" data-reveal>
                  <div className="inauguration-card-inner">
                    <strong className="dignitary-name">{dignitary.name}</strong>
                    <span className="dignitary-role">{dignitary.designation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <dl className="event-facts centered opening-facts">
            <div className="fact-card">
              <dt>
                <Calendar size={15} className="fact-icon" aria-hidden="true" />
                <span>Date</span>
              </dt>
              <dd>Monday, 12<sup>th</sup> October 2026</dd>
            </div>
            <div className="fact-card">
              <dt>
                <Clock size={15} className="fact-icon" aria-hidden="true" />
                <span>Time</span>
              </dt>
              <dd>10:30 AM onwards</dd>
            </div>
            <div className="fact-card full-span">
              <dt>
                <MapPin size={15} className="fact-icon" aria-hidden="true" />
                <span>Venue</span>
              </dt>
              <dd>Parekh Vinayaka Mall, BH Road, Shivamogga</dd>
            </div>
          </dl>

          <div className="opening-actions">
            <a
              className="btn btn-primary"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shivamogga showroom location on Google Maps"
            >
              <MapPin size={15} aria-hidden="true" />
              <span>Open Mall Location</span>
              <ExternalLink size={14} className="btn-external-icon" aria-hidden="true" />
            </a>

            <a
              className="btn btn-gala-secondary"
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Add Grand Opening to Google Calendar"
            >
              <Calendar size={15} aria-hidden="true" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
