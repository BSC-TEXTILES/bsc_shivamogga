import React from "react";
import inviteP8 from "../assets/invite-p8.jpg";

export default function FamilyGreetings() {
  const familyList = [
    { text: "Smt Girija & Sri B.C.Umapathy." },
    { text: "Smt Poornima & Sri B.C.Chandrasekhar." },
    { text: "Smt Deepa & Sri B.C.Shivakumar." },
    { text: "Smt Madhu & Sri B.U.Chandrashekar." },
    { text: "Ved Bankapur & Jiya Bankapur." },
    { text: "Smt Roopa & Sri Vijay Suttatti." },
    { text: "Smt Rekha & Dr.Naveen Somanna" },
    { text: "V.Somanna Family, Bengaluru." },
    { text: "Hon'ble Minister of State for Jal Shakthi and Railways, Govt of India.", isAccent: true },
    { text: "C.G.Suttatti Family, Pune." },
    { text: "Guddodagi Family, Raybag." },
    { text: "BSC Textiles Pvt Ltd, Belagavi." },
    { text: "Bankapur Family", isHighlight: true },
    { text: "Family & Friends", isHighlight: true }
  ];

  return (
    <section className="section family" id="family" aria-labelledby="family-title">
      <div className="container narrow">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Warm Greetings</p>
          <h2 id="family-title">With Best Compliments From</h2>
          <span className="rule" aria-hidden="true" />
        </header>

        <ul className="compliment-list" data-reveal>
          {familyList.map((item, idx) => (
            <li
              key={idx}
              className={`${item.isAccent ? "accent" : ""} ${item.isHighlight ? "highlight" : ""}`}
            >
              {item.text}
            </li>
          ))}
        </ul>

        <div className="family-art" data-reveal>
          <div className="invite-frame slim">
            <img
              src={inviteP8}
              alt="With Best Compliments From invitation artwork"
              width="1600"
              height="1131"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
