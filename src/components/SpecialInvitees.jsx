import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
  Sparkles
} from "lucide-react";

const ALL_INVITEES = [
  {
    name: "SHRI S. S. MALLIKARJUN",
    role: "Hon’ble Minister, Govt. of Karnataka & MLA, Davanagere North",
    category: "minister-mp",
    tag: "HON'BLE MINISTER"
  },
  {
    name: "SHRI B. Y. RAGHAVENDRA",
    role: "Hon’ble Member of Parliament, Shivamogga Lok Sabha Constituency",
    category: "minister-mp",
    tag: "HON'BLE MP"
  },
  {
    name: "SHRI BASAVARAJ BOMMAI",
    role: "Hon’ble Member of Parliament, Haveri & Former Chief Minister of Karnataka",
    category: "minister-mp",
    tag: "HON'BLE MP & FORMER CM"
  },
  {
    name: "SHRI G. M. SIDDESHWAR",
    role: "Former Union Minister & Former Member of Parliament",
    category: "minister-mp",
    tag: "FORMER UNION MINISTER"
  },
  {
    name: "SHRI K. S. ESHWARAPPA",
    role: "Former Deputy Chief Minister, Government of Karnataka",
    category: "minister-mp",
    tag: "FORMER DEPUTY CM"
  },
  {
    name: "SHRI M. P. RENUKACHARYA",
    role: "Former Minister, Government of Karnataka",
    category: "minister-mp",
    tag: "FORMER MINISTER"
  },
  {
    name: "SHRI MURUGESH R. NIRANI",
    role: "Former Minister, Govt. of Karnataka",
    category: "minister-mp",
    tag: "FORMER MINISTER"
  },
  {
    name: "SHRI B. Y. VIJAYENDRA",
    role: "Hon’ble MLA, Shikaripura & State President, BJP Karnataka",
    category: "mla-mlc",
    tag: "HON'BLE MLA & PRESIDENT"
  },
  {
    name: "SHRI S. N. CHANNABASAPPA",
    role: "Hon’ble MLA, Shivamogga",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SMT. SHARADA PURYANAIK",
    role: "Hon’ble MLA, Shivamogga Rural",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI ARAGA JNANENDRA",
    role: "Hon’ble MLA, Tirthahalli & Former Home Minister",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI GOPAL KRISHNA BELUR",
    role: "Hon’ble MLA, Sagar",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI B. K. SANGAMESHWARA",
    role: "Hon’ble MLA, Bhadravati",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI H. D. THAMMAIAH",
    role: "Hon’ble MLA, Chikkamagaluru",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI D. G. SHANTHANA GOWDA",
    role: "Hon’ble MLA, Honnali",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI BASAVARAJU V. SHIVAGANGA",
    role: "Hon’ble MLA, Channagiri",
    category: "mla-mlc",
    tag: "HON'BLE MLA"
  },
  {
    name: "SHRI MADAL VIRUPAKSHAPPA",
    role: "Former MLA, Channagiri",
    category: "mla-mlc",
    tag: "FORMER MLA"
  },
  {
    name: "SHRI D. S. ARUN",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "HON'BLE MLC"
  },
  {
    name: "DR. DHANANJAYA SARJI",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "HON'BLE MLC"
  },
  {
    name: "SHRI C. T. RAVI",
    role: "Hon’ble Member of Karnataka Legislative Council",
    category: "mla-mlc",
    tag: "HON'BLE MLC"
  },
  {
    name: "DR. PRABHAKAR KORE",
    role: "Chairman, KLE Society & Former Member of Parliament",
    category: "prominent",
    tag: "CHAIRMAN & FORMER MP"
  },
  {
    name: "DR. VIJAY SANKESHWAR",
    role: "Chairman & Managing Director, VRL Group & Former MP",
    category: "prominent",
    tag: "CMD & FORMER MP"
  },
  {
    name: "SHRI K. MAYANNA GOWDA",
    role: "Hon’ble Mayor, Shivamogga City Corporation",
    category: "prominent",
    tag: "HON'BLE MAYOR"
  }
];

const CATEGORIES = [
  { id: "all", label: "ALL DIGNITARIES", count: ALL_INVITEES.length },
  {
    id: "minister-mp",
    label: "MINISTERS & MPS",
    count: ALL_INVITEES.filter((i) => i.category === "minister-mp").length
  },
  {
    id: "mla-mlc",
    label: "MLAS & MLCS",
    count: ALL_INVITEES.filter((i) => i.category === "mla-mlc").length
  },
  {
    id: "prominent",
    label: "PROMINENT LEADERS",
    count: ALL_INVITEES.filter((i) => i.category === "prominent").length
  }
];

export default function SpecialInvitees() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvitees =
    activeTab === "all"
      ? ALL_INVITEES
      : ALL_INVITEES.filter((item) => item.category === activeTab);

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20inquiring%20about%20the%20Grand%20Opening%20ceremony%20and%20Special%20Invitees.";

  const mapsUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <section className="section invitees" id="invitees" aria-labelledby="invitees-title">
      <div className="container">
        <header className="section-head text-center" data-reveal>
          <div className="badge-heritage badge-center">
            <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
            <span>Honoured Guests</span>
          </div>
          <h2 id="invitees-title" className="invitees-main-title">
            SPECIAL INVITEES
          </h2>
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

        {/* Uniform Dignitary Cards Grid */}
        <div className="invitees-uniform-grid" data-reveal>
          {filteredInvitees.map((item) => (
            <div key={item.name} className="invitee-uniform-card">
              <div className="invitee-card-header">
                <span className="invitee-badge">{item.tag}</span>
              </div>
              <strong className="invitee-name">{item.name}</strong>
              <p className="invitee-role">{item.role}</p>
            </div>
          ))}
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
      </div>
    </section>
  );
}
