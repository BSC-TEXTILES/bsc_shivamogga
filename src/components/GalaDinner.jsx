import React from "react";
import { Phone, Calendar, MapPin, Clock, ExternalLink, MessageCircle, Moon, Sparkles } from "lucide-react";

export default function GalaDinner() {
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Business+Partner%27s+Gala+Dinner&dates=20261012T143000Z/20261012T183000Z&details=Business+Partner%27s+Gala+Dinner+at+Royal+Orchid%2C+Shivamogga.+Kindly+RSVP+at+9900014212%2C+9900014214.&location=Royal+Orchid%2C+Shivamogga";

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Royal+Orchid+Shivamogga";

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20for%20the%20Gala%20Dinner%20on%2012th%20October%202026.";

  return (
    <section className="section gala gala-evening-luxury" id="gala" data-reveal-section aria-labelledby="gala-title">
      <div className="container">
        <div className="gala-luxury-wrapper" data-reveal>
          {/* Header & Center Motif */}
          <header className="gala-header text-center" data-reveal>
            <div className="gala-pill-badge" data-reveal>
              <Moon size={14} className="gala-moon-icon" aria-hidden="true" />
              <span>EVENING RECEPTION</span>
            </div>

            <h2 id="gala-title" className="gala-grand-title" data-reveal>
              BUSINESS PARTNER’S GALA DINNER
            </h2>

            <div className="gala-gold-motif" aria-hidden="true">
              <span className="motif-line" />
              <Sparkles size={16} className="motif-sparkle" />
              <span className="motif-line" />
            </div>

            <p className="gala-intro-text" data-reveal>
              An exclusive celebratory banquet welcoming our esteemed business partners, dignitaries, and patrons at Royal Orchid, Shivamogga.
            </p>
          </header>

          {/* Grid: Date + Time cards on left/top, Dedicated Venue Card on right/top */}
          <div className="gala-cards-grid">
            {/* Date Block Card */}
            <div className="gala-card gala-date-card" data-reveal data-depth="true">
              <div className="gala-card-glow" aria-hidden="true" />
              <div className="gala-card-top">
                <Calendar size={20} className="gala-icon-gold" aria-hidden="true" />
                <span className="gala-card-tag">DATE</span>
              </div>
              <strong className="gala-card-value">Monday, 12<sup>th</sup> Oct 2026</strong>
              <span className="gala-card-sub">Day One Special Reception</span>
            </div>

            {/* Time Block Card */}
            <div className="gala-card gala-time-card" data-reveal data-depth="true">
              <div className="gala-card-glow" aria-hidden="true" />
              <div className="gala-card-top">
                <Clock size={20} className="gala-icon-gold" aria-hidden="true" />
                <span className="gala-card-tag">TIME</span>
              </div>
              <strong className="gala-card-value">8:00 PM onwards</strong>
              <span className="gala-card-sub">Cocktails &amp; Dinner Banquet</span>
            </div>

            {/* Dedicated Venue Card */}
            <div className="gala-card gala-venue-card" data-reveal data-depth="true">
              <div className="gala-card-glow" aria-hidden="true" />
              <div className="gala-card-top">
                <MapPin size={20} className="gala-icon-gold" aria-hidden="true" />
                <span className="gala-card-tag">EXCLUSIVE VENUE</span>
              </div>
              <strong className="gala-card-value">Royal Orchid</strong>
              <span className="gala-card-sub">Shivamogga, Karnataka</span>
            </div>
          </div>

          {/* Dedicated RSVP & Action Panel */}
          <div className="gala-action-panel" data-reveal data-depth="true">
            <div className="gala-rsvp-header">
              <span className="gala-rsvp-label">RESERVATIONS &amp; ASSISTANCE</span>
              <p className="gala-rsvp-contacts">
                RSVP: <a href="tel:+919900014212" className="rsvp-link">99000 14212</a>
                <span className="rsvp-bullet">·</span>
                <a href="tel:+919900014214" className="rsvp-link">99000 14214</a>
              </p>
            </div>

            <div className="gala-action-buttons">
              <a
                className="btn btn-gala-phone"
                href="tel:+919900014212"
                aria-label="Call RSVP contact 99000 14212"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call 99000 14212</span>
              </a>

              <a
                className="btn btn-gala-phone"
                href="tel:+919900014214"
                aria-label="Call RSVP contact 99000 14214"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call 99000 14214</span>
              </a>

              <a
                className="btn btn-gala-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSVP via WhatsApp to 99000 14212"
              >
                <MessageCircle size={15} aria-hidden="true" />
                <span>RSVP WhatsApp</span>
              </a>

              <a
                className="btn btn-gala-secondary gala-btn-outline"
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add Gala Dinner to Google Calendar"
              >
                <Calendar size={15} aria-hidden="true" />
                <span>Add to Calendar</span>
              </a>

              <a
                className="btn btn-gala-secondary gala-btn-outline"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Royal Orchid on Google Maps"
              >
                <MapPin size={15} aria-hidden="true" />
                <span>Get Directions</span>
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
