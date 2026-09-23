import React from "react";
import locDavanagere from "../assets/loc-davanagere.png";
import locShivamogga from "../assets/loc-shivamogga.jpeg";
import locBelagavi from "../assets/loc-belagavi.jpg";

export default function Locations() {
  const locations = [
    {
      name: "Davanagere",
      label: "Flagship Showroom",
      image: locDavanagere,
      alt: "BSC Davanagere flagship showroom",
      width: 1800,
      height: 1012,
      highlight: false
    },
    {
      name: "Shivamogga",
      label: "New Showroom",
      image: locShivamogga,
      alt: "BSC Shivamogga new showroom at Parekh Vinayaka Mall",
      width: 1800,
      height: 1633,
      highlight: true
    },
    {
      name: "Belagavi",
      label: "The Textile Mall",
      image: locBelagavi,
      alt: "BSC Belagavi The Textile Mall showroom",
      width: 803,
      height: 570,
      highlight: false
    }
  ];

  return (
    <section className="section locations" id="locations" aria-labelledby="locations-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Our Presence</p>
          <h2 id="locations-title">BSC Locations</h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            A growing legacy of textiles and family fashion across Karnataka.
          </p>
        </header>

        <ul className="location-grid">
          {locations.map((loc) => (
            <li
              key={loc.name}
              className={`location-card ${loc.highlight ? "highlight" : ""}`}
              data-reveal
            >
              <div className="location-media">
                <img
                  src={loc.image}
                  alt={loc.alt}
                  width={loc.width}
                  height={loc.height}
                  loading="lazy"
                />
              </div>
              <div className="location-label">
                <h3>{loc.name}</h3>
                <p>{loc.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
