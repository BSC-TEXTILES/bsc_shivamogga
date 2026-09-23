import React from "react";
import dirUmapathy from "../assets/dir-umapathy.jpg";
import dirChandrashekar from "../assets/dir-chandrashekar.jpg";
import dirVed from "../assets/dir-ved.jpg";

export default function Legacy() {
  const leaders = [
    {
      name: "B.C. Umapathy",
      role: "Director",
      image: dirUmapathy,
      width: 275,
      height: 335
    },
    {
      name: "B.U. Chandrashekar",
      role: "Managing Director",
      image: dirChandrashekar,
      width: 280,
      height: 335
    },
    {
      name: "Ved Bankapur",
      role: "Director",
      image: dirVed,
      width: 280,
      height: 335
    }
  ];

  return (
    <section className="section legacy" id="legacy" aria-labelledby="legacy-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Since 1938</p>
          <h2 id="legacy-title">BSC Legacy</h2>
          <span className="rule" aria-hidden="true" />
        </header>

        <div className="legacy-grid">
          <div className="legacy-copy" data-reveal>
            <p className="lead-para">
              <strong>Established in 1938</strong>, BSC has grown from humble beginnings in Davanagere into a trusted name in fashion and textiles — a legacy shaped by quality, tradition, and enduring relationships.
            </p>
            <p>
              Carried forward through <strong>five generations</strong>, BSC today stands as a leading family fashion destination, with a growing presence across <strong>Davanagere, Belagavi &amp; Shivamogga</strong>.
            </p>
            <p>
              Blending timeless tradition with contemporary fashion and exceptional choice, BSC continues to redefine the family shopping experience — an <strong>exceptional choice for complete family shopping</strong>.
            </p>
            <p className="legacy-footnote">
              Led by Mr. Umapathy Bankapur, Mr. Chandrashekar Bankapur &amp; Mr. Ved Bankapur, BSC proudly carries forward its rich five-generation legacy into a new era.
            </p>
          </div>

          <ul className="leaders" data-reveal>
            {leaders.map((leader) => (
              <li key={leader.name} className="leader-card">
                <div className="leader-photo">
                  <img
                    src={leader.image}
                    alt={`${leader.name}, ${leader.role}`}
                    width={leader.width}
                    height={leader.height}
                    loading="lazy"
                  />
                </div>
                <div className="leader-info">
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
