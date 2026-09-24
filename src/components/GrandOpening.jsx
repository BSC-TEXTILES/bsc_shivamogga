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
      designation: "Former Chief Minister of Karnataka"
    },
    {
      name: "SRI V. SOMANNA",
      designation: "Honorable Minister of State for Jal Shakthi & Railways, Govt. of India"
    },
    {
      name: "SRI N. CHALUVARAYA SWAMY",
      designation: "Hon'ble Minister for Agriculture, Govt. of Karnataka"
    },
    {
      name: "SRI MADHU BANGARAPPA",
      designation: "Minister of Primary & Secondary Education & Sakala, Govt. of Karnataka"
    }
  ];

  const mapUrl = "https://www.canvaqr.com/RGS6_7gEBf";
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Grand+Opening&dates=20261012T050000Z/20261012T163000Z&details=Grand+Opening+celebration+of+BSC+Shivamogga+at+Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga.&location=Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga";

  return (
    <section className="section opening opening-flagship" id="opening" data-reveal-section aria-labelledby="opening-title">
      <div className="container">
        {/* Background Decorative Florals */}
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

        {/* Section Header */}
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

        {/* Two-Column Editorial Layout */}
        <div className="opening-editorial-layout" data-reveal>
          {/* Left Column: Ceremonial Hierarchy & Dignitaries */}
          <div className="opening-ceremony-left">
            {/* Blessings Card */}
            <div className="blessings-card" data-reveal>
              <p className="mantra">॥ SRI ULAVI CHANNABASAVESHWARA PRASANNA ॥</p>
              <p className="blessing-sub">WITH THEIR HEAVENLY BLESSINGS</p>
              <div className="blessing-names">
                <p className="elder">SRI BANKAPUR S. NANJUNDAPPA</p>
                <p className="elder">
                  SRI B.S. CHANNABASAPPA &amp; SMT. SUSHEELAMMA{" "}
                  <span className="place">DAVANAGERE</span>
                </p>
              </div>
            </div>

            {/* Inaugurated By Section */}
            <div className="inauguration-section" data-reveal>
              <div className="inauguration-header">
                <span className="inauguration-pill">INAUGURATED BY</span>
              </div>

              <div className="inauguration-grid">
                {dignitaries.map((dignitary) => (
                  <div key={dignitary.name} className="inauguration-card" data-reveal>
                    <div className="inauguration-card-inner">
                      <strong className="dignitary-name">{dignitary.name}</strong>
                      <span className="dignitary-gold-divider" aria-hidden="true" />
                      <span className="dignitary-role">{dignitary.designation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Event Panel (3D Depth Card) */}
          <div className="opening-event-panel" data-reveal data-depth="true">
            <div className="event-panel-crest" aria-hidden="true">
              <span className="crest-monogram">BSC</span>
              <span className="crest-sub">EST. 1938</span>
            </div>

            <div className="event-panel-header">
              <span className="event-panel-tag">INAUGURAL CEREMONY</span>
              <h3 className="event-panel-title">Grand Showroom Opening</h3>
            </div>

            <div className="panel-divider" aria-hidden="true" />

            {/* Date Block */}
            <div className="panel-data-item">
              <div className="panel-icon-wrap" aria-hidden="true">
                <Calendar size={22} className="panel-icon" />
              </div>
              <div className="panel-data-content">
                <span className="panel-label">DATE</span>
                <strong className="panel-val">Monday, 12<sup>th</sup> October 2026</strong>
              </div>
            </div>

            {/* Time Block */}
            <div className="panel-data-item">
              <div className="panel-icon-wrap" aria-hidden="true">
                <Clock size={22} className="panel-icon" />
              </div>
              <div className="panel-data-content">
                <span className="panel-label">TIME</span>
                <strong className="panel-val">10:30 AM onwards</strong>
              </div>
            </div>

            {/* Venue Block */}
            <div className="panel-data-item panel-data-venue">
              <div className="panel-icon-wrap" aria-hidden="true">
                <MapPin size={22} className="panel-icon" />
              </div>
              <div className="panel-data-content">
                <span className="panel-label">VENUE</span>
                <strong className="panel-val">Parekh Vinayaka Mall</strong>
                <span className="panel-venue-sub">BH Road, Shivamogga</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="panel-actions">
              <a
                className="btn btn-primary btn-panel-primary"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shivamogga showroom location on Google Maps"
              >
                <MapPin size={16} aria-hidden="true" />
                <span>Open Mall Location</span>
                <ExternalLink size={14} className="btn-external-icon" aria-hidden="true" />
              </a>

              <a
                className="btn btn-gala-secondary btn-panel-secondary"
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add Grand Opening to Google Calendar"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Add to Calendar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
