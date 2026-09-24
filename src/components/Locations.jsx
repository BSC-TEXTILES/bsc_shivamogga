import React from "react";
import locDavanagere from "../assets/loc-davanagere.webp";
import locShivamogga from "../assets/loc-shivamogga.webp";
import locBelagavi from "../assets/loc-belagavi.webp";

import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";

export default function Locations() {
  const locations = [
    {
      name: "DAVANAGERE",
      label: "Flagship Showroom",
      address: "Channabasappa Circle, Main Road, Davanagere - 577002",
      hours: "10:00 AM – 9:30 PM (All 7 Days)",
      phone: "+91 99000 14212",
      mapUrl: "https://maps.google.com/?q=BSC+Textiles+Davanagere",
      image: locDavanagere,
      alt: "BSC Davanagere flagship showroom",
      width: 1024,
      height: 535
    },
    {
      name: "SHIVAMOGGA",
      label: "New Grand Showroom",
      address: "Parekh Vinayaka Mall, BH Road, Shivamogga - 577201",
      hours: "10:00 AM – 9:30 PM (All 7 Days)",
      phone: "+91 99000 14214",
      mapUrl: "https://www.canvaqr.com/RGS6_7gEBf",
      image: locShivamogga,
      alt: "BSC Shivamogga new showroom at Parekh Vinayaka Mall",
      width: 1024,
      height: 928,
      isHighlighted: true
    },
    {
      name: "BELAGAVI",
      label: "The Textile Mall",
      address: "Khade Bazar / College Road, Belagavi - 590001",
      hours: "10:00 AM – 9:30 PM (All 7 Days)",
      phone: "+91 99000 14212",
      mapUrl: "https://maps.google.com/?q=BSC+Textiles+Belagavi",
      image: locBelagavi,
      alt: "BSC Belagavi The Textile Mall showroom",
      width: 803,
      height: 570
    }
  ];

  return (
    <section className="section locations" id="locations" data-reveal-section aria-labelledby="locations-title">
      <div className="container">
        <header className="section-head text-center" data-reveal>
          <p className="eyebrow">Our Presence</p>
          <h2 id="locations-title">BSC SHOWROOMS</h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            Experience our five-generation legacy of trust and family fashion across landmark destinations in Karnataka.
          </p>
        </header>

        <ul className="location-grid">
          {locations.map((loc, idx) => (
            <li
              key={loc.name}
              className={`location-card ${loc.isHighlighted ? "is-featured-location" : ""}`}
              data-reveal
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="location-media">
                <img
                  src={loc.image}
                  alt={loc.alt}
                  width={loc.width}
                  height={loc.height}
                  loading="lazy"
                  decoding="async"
                />
                {loc.isHighlighted && (
                  <span className="location-feature-badge">NEW OPENING</span>
                )}
              </div>

              <div className="location-label">
                <div className="location-title-row">
                  <h3>{loc.name}</h3>
                  <span className="location-sub-pill">{loc.label}</span>
                </div>

                <div className="location-details-list">
                  <div className="loc-detail-item">
                    <MapPin size={14} className="loc-icon" aria-hidden="true" />
                    <span>{loc.address}</span>
                  </div>

                  <div className="loc-detail-item">
                    <Clock size={14} className="loc-icon" aria-hidden="true" />
                    <span>{loc.hours}</span>
                  </div>

                  <div className="loc-detail-item">
                    <Phone size={14} className="loc-icon" aria-hidden="true" />
                    <a href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`} className="loc-phone-link">
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <div className="location-action-wrap">
                  <a
                    className="btn btn-location-map"
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${loc.name} showroom`}
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
