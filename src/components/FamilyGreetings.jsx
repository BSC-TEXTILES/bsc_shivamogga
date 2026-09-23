import React from "react";

export default function FamilyGreetings() {
  const familyList = [
    { text: "SMT. GIRIJA & SRI B.C. UMAPATHY" },
    { text: "SMT. POORNIMA & SRI B.C. CHANDRASEKHAR" },
    { text: "SMT. DEEPA & SRI B.C. SHIVAKUMAR" },
    { text: "SMT. MADHU & SRI B.U. CHANDRASHEKAR" },
    { text: "VED BANKAPUR & JIYA BANKAPUR" },
    { text: "SMT. ROOPA & SRI VIJAY SUTTATTI" },
    { text: "SMT. REKHA & DR. NAVEEN SOMANNA" },
    { text: "V. SOMANNA FAMILY, BENGALURU" },
    { text: "HON'BLE MINISTER OF STATE FOR JAL SHAKTHI AND RAILWAYS, GOVT OF INDIA", isAccent: true },
    { text: "C.G. SUTTATTI FAMILY, PUNE" },
    { text: "GUDDODAGI FAMILY, RAYBAG" },
    { text: "BSC TEXTILES PVT LTD, BELAGAVI" },
    { text: "BANKAPUR FAMILY", isHighlight: true },
    { text: "FAMILY & FRIENDS", isHighlight: true }
  ];

  return (
    <section className="section family" id="family" aria-labelledby="family-title">
      <div className="container narrow">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Warm Greetings</p>
          <h2 id="family-title">With Best Compliments From</h2>
          <span className="rule" aria-hidden="true" />
        </header>

        <div className="family-card" data-reveal>
          <ul className="compliment-list">
            {familyList.map((item, idx) => (
              <li
                key={idx}
                className={`${item.isAccent ? "accent" : ""} ${item.isHighlight ? "highlight" : ""}`}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
