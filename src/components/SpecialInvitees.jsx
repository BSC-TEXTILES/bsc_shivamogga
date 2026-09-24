import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
  Sparkles
} from "lucide-react";
import { INVITEES, FILTERS, SUMMARY } from "../data/invitees";
import InviteeCard from "./InviteeCard";

export default function SpecialInvitees() {
  const [activeFilter, setActiveFilter] = useState("all");
  const gridShellRef = useRef(null);

  const [phase, setPhase] = useState(() => {
    if (typeof window === "undefined") return "ready";
    if (!("IntersectionObserver" in window)) return "ready";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "ready";
    return "pending";
  });

  useEffect(() => {
    if (phase !== "pending") return undefined;
    const el = gridShellRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("ready");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  const filteredInvitees = useMemo(() => {
    if (activeFilter === "all") return INVITEES;
    return INVITEES.filter((invitee) => invitee.tags.includes(activeFilter));
  }, [activeFilter]);

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20inquiring%20about%20the%20Grand%20Opening%20ceremony%20and%20Special%20Invitees.";

  const mapsUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <section className="section invitees" id="invitees" data-reveal-section aria-labelledby="invitees-title">
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

        <dl className="invitees-summary" data-reveal>
          {SUMMARY.map((item) => (
            <div key={item.id} className="summary-cell">
              <dt className="summary-label">{item.label}</dt>
              <dd className="summary-value">{item.count}</dd>
            </div>
          ))}
        </dl>

        <div className="invitees-controls" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="invitees-filter-bar">
            <div className="filter-pills" role="group" aria-label="Filter Special Invitees">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={activeFilter === filter.id}
                  className={`filter-pill ${activeFilter === filter.id ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span>{filter.label}</span>
                  <span className="pill-badge">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredInvitees.length > 0 && (
          <p className="invitees-result-count" role="status" aria-live="polite">
            {filteredInvitees.length === INVITEES.length
              ? `Showing all ${INVITEES.length} invitees`
              : `${filteredInvitees.length} invitee${filteredInvitees.length === 1 ? "" : "s"} found`}
          </p>
        )}

        <div className="invitees-grid-shell" ref={gridShellRef}>
          <div
            className={`invitees-uniform-grid ${phase === "ready" ? "is-ready" : "is-pending"}`}
            key={activeFilter}
          >
            {filteredInvitees.map((item, idx) => (
              <InviteeCard key={item.name} invitee={item} index={idx} />
            ))}
          </div>

          {filteredInvitees.length === 0 && (
            <p className="invitees-empty" role="status">
              No invitees found.
            </p>
          )}
        </div>

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
              aria-label="RSVP via WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>RSVP via WhatsApp</span>
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
