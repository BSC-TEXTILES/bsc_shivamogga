import React from "react";
import inviteP7 from "../assets/invite-p7.jpg";

export default function SpecialInvitees() {
  const column1 = [
    { name: "Shri S. S. Mallikarjun", role: "Hon’ble Minister, Govt. of Karnataka & MLA, Davanagere North" },
    { name: "Dr. Prabhakar Kore", role: "Chairman, KLE Society & Former Member of Parliament" },
    { name: "Shri G. M. Siddeshwar", role: "Former Union Minister & Former Member of Parliament" },
    { name: "Shri D. G. Shanthana Gowda", role: "Hon’ble MLA, Honnali" },
    { name: "Shri M. P. Renukacharya", role: "Former Minister, Government of Karnataka" },
    { name: "Shri Basavaraju V. Shivaganga", role: "Hon’ble MLA, Channagiri" },
    { name: "Shri Madal Virupakshappa", role: "Former MLA, Channagiri" }
  ];

  const column2 = [
    { name: "Shri B. Y. Raghavendra", role: "Hon’ble Member of Parliament, Shivamogga Lok Sabha Constituency" },
    { name: "Shri Basavaraj Bommai", role: "Hon’ble Member of Parliament, Haveri & Former Chief Minister of Karnataka" },
    { name: "Shri S. N. Channabasappa", role: "Hon’ble MLA, Shivamogga" },
    { name: "Smt. Sharada Puryanaik", role: "Hon’ble MLA, Shivamogga Rural" },
    { name: "Shri D. S. Arun", role: "Hon’ble Member of Karnataka Legislative Council" },
    { name: "Dr. Dhananjaya Sarji", role: "Hon’ble Member of Karnataka Legislative Council" },
    { name: "Shri Murugesh R. Nirani", role: "Former Minister, Govt. of Karnataka" },
    { name: "Dr. Vijay Sankeshwar", role: "Chairman & Managing Director, VRL Group & Former Member of Parliament" }
  ];

  const column3 = [
    { name: "Shri B. Y. Vijayendra", role: "Hon’ble MLA, Shikaripura & State President, BJP Karnataka" },
    { name: "Shri K. S. Eshwarappa", role: "Former Deputy Chief Minister, Government of Karnataka" },
    { name: "Shri B. K. Sangameshwara", role: "Hon’ble MLA, Bhadravati" },
    { name: "Shri Araga Jnanendra", role: "Hon’ble MLA, Tirthahalli" },
    { name: "Shri Gopal Krishna Belur", role: "Hon’ble MLA, Sagar" },
    { name: "Shri H. D. Thammaiah", role: "Hon’ble MLA, Chikkamagaluru" },
    { name: "Shri C. T. Ravi", role: "Hon’ble Member of Karnataka Legislative Council" },
    { name: "Shri K. Mayanna Gowda", role: "Hon’ble Mayor, Shivamogga City Corporation" }
  ];

  return (
    <section className="section invitees" id="invitees" aria-labelledby="invitees-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Dignitaries &amp; Guests</p>
          <h2 id="invitees-title">Special Invitees</h2>
          <span className="rule" aria-hidden="true" />
        </header>

        <div className="invitee-columns">
          <ul className="invitee-list" data-reveal>
            {column1.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ul>

          <ul className="invitee-list" data-reveal>
            {column2.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ul>

          <ul className="invitee-list" data-reveal>
            {column3.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="invitees-art" data-reveal>
          <div className="invite-frame slim">
            <img
              src={inviteP7}
              alt="Special Invitees official invitation artwork"
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
