import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
  Sparkles
} from "lucide-react";
import inviteP7Webp from "../assets/invite-p7.webp";
import inviteP7Sm from "../assets/invite-p7-sm.webp";

const ALL_INVITEES = [
  // Column 1
  {
    name: "Shri S. S. Mallikarjun",
    role: "Hon’ble Minister, Govt. of Karnataka & MLA, Davanagere North",
    category: "minister-mp",
    tag: "Hon'ble Minister"
  },
  {
    name: "Dr. Prabhakar Kore",
    role: "Chairman, KLE Society & Former Member of Parliament",
    category: "prominent",
    tag: "Former MP & Chairman"
  },
  {
    name: "Shri G. M. Siddeshwar",
    role: "Former Union Minister & Former Member of Parliament",
    category: "minister-mp",
    tag: "Former Union Minister"
  },
  {
    name: "Shri D. G. Shanthana Gowda",
    role: "Hon’ble MLA, Honnali",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri M. P. Renukacharya",
    role: "Former Minister, Government of Karnataka",
    category: "minister-mp",
    tag: "Former Minister"
  },
  {
    name: "Shri Basavaraju V. Shivaganga",
    role: "Hon’ble MLA, Channagiri",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri Madal Virupakshappa",
    role: "Former MLA, Channagiri",
    category: "mla-mlc",
    tag: "Former MLA"
  },

  // Column 2
  {
    name: "Shri B. Y. Raghavendra",
    role: "Hon’ble Member of Parliament, Shivamogga Lok Sabha Constituency",
    category: "minister-mp",
    tag: "Hon'ble MP"
  },
  {
    name: "Shri Basavaraj Bommai",
    role: "Hon’ble Member of Parliament, Haveri & Former Chief Minister of Karnataka",
    category: "minister-mp",
    tag: "Hon'ble MP & Former CM"
  },
  {
    name: "Shri S. N. Channabasappa",
    role: "Hon’ble MLA, Shivamogga",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Smt. Sharada Puryanaik",
    role: "Hon’ble MLA, Shivamogga Rural",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri D. S. Arun",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "Hon'ble MLC"
  },
  {
    name: "Dr. Dhananjaya Sarji",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "Hon'ble MLC"
  },
  {
    name: "Shri Murugesh R. Nirani",
    role: "Former Minister, Govt. of Karnataka",
    category: "minister-mp",
    tag: "Former Minister"
  },
  {
    name: "Dr. Vijay Sankeshwar",
    role: "Chairman & Managing Director, VRL Group & Former Member of Parliament",
    category: "prominent",
    tag: "Former MP & CMD"
  },

  // Column 3
  {
    name: "Shri B. Y. Vijayendra",
    role: "Hon’ble MLA, Shikaripura & State President, BJP Karnataka",
    category: "mla-mlc",
    tag: "Hon'ble MLA & President"
  },
  {
    name: "Shri K. S. Eshwarappa",
    role: "Former Deputy Chief Minister, Government of Karnataka",
    category: "minister-mp",
    tag: "Former Deputy CM"
  },
  {
    name: "Shri B. K. Sangameshwara",
    role: "Hon’ble MLA, Bhadravati",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri Araga Jnanendra",
    role: "Hon’ble MLA, Tirthahalli",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri Gopal Krishna Belur",
    role: "Hon’ble MLA, Sagar",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri H. D. Thammaiah",
    role: "Hon’ble MLA, Chikkamagaluru",
    category: "mla-mlc",
    tag: "Hon'ble MLA"
  },
  {
    name: "Shri C. T. Ravi",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "Hon'ble MLC"
  },
  {
    name: "Shri K. Mayanna Gowda",
    role: "Hon’ble Mayor, Shivamogga City Corporation",
    category: "prominent",
    tag: "Hon'ble Mayor"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Dignitaries", count: ALL_INVITEES.length },
  {
    id: "minister-mp",
    label: "Ministers & MPs",
    count: ALL_INVITEES.filter((i) => i.category === "minister-mp").length
  },
  {
    id: "mla-mlc",
    label: "MLAs & MLCs",
    count: ALL_INVITEES.filter((i) => i.category === "mla-mlc").length
  },
  {
    id: "prominent",
    label: "Prominent Leaders",
    count: ALL_INVITEES.filter((i) => i.category === "prominent").length
  }
];

export default function SpecialInvitees() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvitees =
    activeTab === "all"
      ? ALL_INVITEES
      : ALL_INVITEES.filter((item) => item.category === activeTab);

  // Group into columns for balanced grid presentation
  const colSize = Math.ceil(filteredInvitees.length / 3);
  const col1 = filteredInvitees.slice(0, colSize);
  const col2 = filteredInvitees.slice(colSize, colSize * 2);
  const col3 = filteredInvitees.slice(colSize * 2);

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20inquiring%20about%20the%20Grand%20Opening%20ceremony%20and%20Special%20Invitees.";

  const mapsUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <section className="section invitees" id="invitees" aria-labelledby="invitees-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Dignitaries &amp; Guests</p>
          <h2 id="invitees-title">Special Invitees</h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            Distinguished leaders, ministers, parliamentarians, and civic dignitaries honouring our Grand Opening.
          </p>
        </header>

        {/* Interactive Filter Actions */}
        <div className="invitees-filter-bar" data-reveal>
          <div className="filter-pills" role="tablist" aria-label="Filter Special Invitees">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`filter-pill ${activeTab === cat.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="pill-badge">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dignitary Cards Grid */}
        <div className="invitee-columns" data-reveal>
          <ul className="invitee-list">
            {col1.map((item) => (
              <li key={item.name} className="invitee-item">
                <div className="invitee-top">
                  <strong>{item.name}</strong>
                  <span className="invitee-badge">{item.tag}</span>
                </div>
                <span>{item.role}</span>
              </li>
            ))}
          </ul>

          <ul className="invitee-list">
            {col2.map((item) => (
              <li key={item.name} className="invitee-item">
                <div className="invitee-top">
                  <strong>{item.name}</strong>
                  <span className="invitee-badge">{item.tag}</span>
                </div>
                <span>{item.role}</span>
              </li>
            ))}
          </ul>

          {col3.length > 0 && (
            <ul className="invitee-list">
              {col3.map((item) => (
                <li key={item.name} className="invitee-item">
                  <div className="invitee-top">
                    <strong>{item.name}</strong>
                    <span className="invitee-badge">{item.tag}</span>
                  </div>
                  <span>{item.role}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section Action Hub */}
        <div className="invitees-actions-hub" data-reveal>
          <div className="invitees-actions-header">
            <Sparkles size={16} className="sparkle-gold" aria-hidden="true" />
            <span>Join the Grand Celebration with Our Esteemed Guests</span>
          </div>

          <div className="invitees-actions">
            <a
              className="btn btn-gala-primary"
              href="#opening"
              aria-label="View Grand Opening invitation details"
            >
              <Calendar size={15} aria-hidden="true" />
              <span>Inauguration Programme</span>
            </a>

            <a
              className="btn btn-gala-secondary"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shivamogga showroom location on Google Maps"
            >
              <MapPin size={15} aria-hidden="true" />
              <span>Showroom Location</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>

            <a
              className="btn btn-gala-whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSVP and enquire via WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>WhatsApp RSVP</span>
            </a>

            <a
              className="btn btn-gala-secondary"
              href="tel:+919900014212"
              aria-label="Call RSVP contact 99000 14212"
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call 99000 14212</span>
            </a>
          </div>
        </div>

        {/* Official Invitation Artwork */}
        <div className="invitees-art" data-reveal>
          <div className="invite-frame slim">
            <picture>
              <source
                type="image/webp"
                srcSet={`${inviteP7Sm} 768w, ${inviteP7Webp} 1200w`}
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 70vw, 980px"
              />
              <img
                src={inviteP7Webp}
                alt="Special Invitees official invitation artwork"
                width="1600"
                height="1131"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
