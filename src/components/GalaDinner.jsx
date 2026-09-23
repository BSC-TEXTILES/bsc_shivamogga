import React from "react";
import { Phone, Calendar, MapPin, Clock, ExternalLink, MessageCircle } from "lucide-react";

export default function GalaDinner() {
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Business+Partner%27s+Gala+Dinner&dates=20261012T143000Z/20261012T183000Z&details=Business+Partner%27s+Gala+Dinner+at+Royal+Orchid%2C+Shivamogga.+Kindly+RSVP+at+9900014212%2C+9900014214.&location=Royal+Orchid%2C+Shivamogga";

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Royal+Orchid+Shivamogga";

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20for%20the%20Gala%20Dinner%20on%2012th%20October%202026.";

  return (
    <section className="section gala" id="gala" aria-labelledby="gala-title">
      <div className="container narrow">
        <div className="event-banner">
          <p className="eyebrow">Evening Reception</p>
          <h2 id="gala-title">Business Partner’s Gala Dinner</h2>
          <span className="rule" aria-hidden="true" />

          <p className="gala-intro">
            An exclusive celebratory banquet welcoming our esteemed business partners, dignitaries, and patrons at Royal Orchid, Shivamogga.
          </p>

          <dl className="event-facts centered">
            <div className="fact-card">
              <dt>
                <Calendar size={15} className="fact-icon" aria-hidden="true" />
                <span>Date</span>
              </dt>
              <dd>Monday, 12<sup>th</sup> Oct 2026</dd>
            </div>
            <div className="fact-card">
              <dt>
                <Clock size={15} className="fact-icon" aria-hidden="true" />
                <span>Time</span>
              </dt>
              <dd>8:00 PM onwards</dd>
            </div>
            <div className="fact-card">
              <dt>
                <MapPin size={15} className="fact-icon" aria-hidden="true" />
                <span>Venue</span>
              </dt>
              <dd>Royal Orchid, Shivamogga</dd>
            </div>
          </dl>

          {/* Interactive Action Hub */}
          <div className="gala-actions-wrapper">
            <p className="rsvp-title">Kindly RSVP &amp; Connect</p>
            <div className="gala-actions">
              <a
                className="btn btn-gala-primary"
                href="tel:+919900014212"
                aria-label="Call RSVP contact 99000 14212"
              >
                <Phone size={15} aria-hidden="true" />
                <span>Call 99000 14212</span>
              </a>

              <a
                className="btn btn-gala-primary"
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
                className="btn btn-gala-secondary"
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add Gala Dinner to Google Calendar"
              >
                <Calendar size={15} aria-hidden="true" />
                <span>Add to Calendar</span>
              </a>

              <a
                className="btn btn-gala-secondary"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to Royal Orchid on Google Maps"
              >
                <MapPin size={15} aria-hidden="true" />
                <span>Get Directions</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
