import React from "react";
import { Phone, Calendar, Clock, MessageCircle, Utensils, MapPin, ExternalLink, Sparkles } from "lucide-react";
import bscLogo from "../assets/bsc-logo-crop.webp";

export default function VendorMeet() {
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Vendor+Meet&dates=20261013T050000Z/20261013T090000Z&details=BSC+Shivamogga+Vendors+Meet.+Followed+by+Function+%26+Lunch.+Kindly+RSVP+at+9900014212%2C+9900014214.&location=Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga";

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20for%20the%20Vendor%20Meet%20on%2013th%20October%202026.";

  const mapUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <section className="section vendors vendors-structured" id="vendors" data-reveal-section aria-labelledby="vendors-title">
      <div className="container">
        {/* Section Header */}
        <header className="section-head text-center" data-reveal>
          <div className="badge-heritage badge-center">
            <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
            <span>Day Two Assembly</span>
          </div>
          <h2 id="vendors-title" className="vendor-meet-title">
            SHIVAMOGGA VENDORS’ MEET
          </h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            We warmly invite you to share happiness as we move ahead to a new chapter of BSC with our new showroom.
          </p>
        </header>

        {/* Structured Business Card Shell */}
        <div className="vendor-business-shell" data-reveal>
          {/* Top Brand & Title Area */}
          <div className="vendor-corporate-top" data-reveal>
            <div className="vendor-logo-emblem">
              <img
                src={bscLogo}
                alt="BSC Exclusive Logo"
                width="84"
                height="56"
                loading="lazy"
                decoding="async"
                className="vendor-brand-logo"
              />
            </div>

            <div className="vendor-title-stack">
              <span className="vendor-eyebrow-tag">BSC SHIVAMOGGA VENDOR MEET</span>
              <p className="vendor-greeting-quote">
                “We warmly invite you to share happiness as we move ahead to a new chapter of BSC with our new showroom.”
              </p>
              <div className="vendor-flourish" aria-hidden="true">❦ ❦ ❦</div>
            </div>
          </div>

          {/* 3 Structured Event Information Cards */}
          <div className="vendor-details-trio">
            {/* Card 1: Date */}
            <div className="vendor-spec-card" data-reveal data-depth="true">
              <div className="spec-card-icon-circle">
                <Calendar size={22} className="spec-icon" aria-hidden="true" />
              </div>
              <div className="spec-card-content">
                <span className="spec-label">EVENT DATE</span>
                <strong className="spec-value">Tuesday, 13<sup>th</sup> Oct 2026</strong>
                <span className="spec-note">Day Two Opening Ceremony</span>
              </div>
            </div>

            {/* Card 2: Time */}
            <div className="vendor-spec-card" data-reveal data-depth="true">
              <div className="spec-card-icon-circle">
                <Clock size={22} className="spec-icon" aria-hidden="true" />
              </div>
              <div className="spec-card-content">
                <span className="spec-label">SCHEDULE</span>
                <strong className="spec-value">10:30 AM onwards</strong>
                <span className="spec-note">Morning Partner Assembly</span>
              </div>
            </div>

            {/* Card 3: Programme */}
            <div className="vendor-spec-card" data-reveal data-depth="true">
              <div className="spec-card-icon-circle">
                <Utensils size={22} className="spec-icon" aria-hidden="true" />
              </div>
              <div className="spec-card-content">
                <span className="spec-label">PROGRAMME</span>
                <strong className="spec-value">Function &amp; Lunch</strong>
                <span className="spec-note">Followed by Banquet Fellowship</span>
              </div>
            </div>
          </div>

          {/* Dedicated RSVP Action Bar */}
          <div className="vendor-action-bar" data-reveal>
            <div className="vendor-action-bar-label">
              <span className="bar-tag">RSVP &amp; VENUE ACCESS</span>
              <p className="bar-call-numbers">
                Connect: <a href="tel:+919900014212" className="vendor-tel-link">99000 14212</a>
                <span className="bar-dot">·</span>
                <a href="tel:+919900014214" className="vendor-tel-link">99000 14214</a>
              </p>
            </div>

            <div className="vendor-action-btn-group">
              <a
                className="btn btn-primary btn-vendor-action"
                href="tel:+919900014212"
                aria-label="Call RSVP contact 99000 14212"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call 99000 14212</span>
              </a>

              <a
                className="btn btn-primary btn-vendor-action"
                href="tel:+919900014214"
                aria-label="Call RSVP contact 99000 14214"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call 99000 14214</span>
              </a>

              <a
                className="btn btn-gala-whatsapp btn-vendor-action"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSVP via WhatsApp to 99000 14212"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>WhatsApp RSVP</span>
              </a>

              <a
                className="btn btn-gala-secondary btn-vendor-action"
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add Vendor Meet to Google Calendar"
              >
                <Calendar size={15} aria-hidden="true" />
                <span>Add to Calendar</span>
              </a>

              <a
                className="btn btn-gala-secondary btn-vendor-action"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shivamogga showroom location on Google Maps"
              >
                <MapPin size={15} aria-hidden="true" />
                <span>Location Map</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
