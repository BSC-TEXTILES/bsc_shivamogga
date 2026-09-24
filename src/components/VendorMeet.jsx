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
    <section className="section vendors" id="vendors" data-reveal-section aria-labelledby="vendors-title">
      <div className="container narrow">
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

        <div className="vendor-invitation-card" data-reveal>
          <div className="vendor-card-header">
            <img
              src={bscLogo}
              alt="BSC Exclusive Logo"
              width="80"
              height="53"
              loading="lazy"
              decoding="async"
              className="vendor-brand-logo"
            />
            <p className="vendor-card-subtitle">
              We warmly invite you to share happiness as we move ahead to a new chapter of BSC with our new showroom
            </p>
          </div>

          <div className="vendor-card-body">
            <h3 className="vendor-highlight-title">BSC SHIVAMOGGA VENDOR MEET</h3>
            <span className="ornament-divider" aria-hidden="true">❦ ❦ ❦</span>

            <dl className="event-facts centered vendor-facts">
              <div className="fact-card">
                <dt>
                  <Calendar size={15} className="fact-icon" aria-hidden="true" />
                  <span>Date</span>
                </dt>
                <dd>Tuesday, 13<sup>th</sup> October 2026</dd>
              </div>
              <div className="fact-card">
                <dt>
                  <Clock size={15} className="fact-icon" aria-hidden="true" />
                  <span>Time</span>
                </dt>
                <dd>10:30 AM onwards</dd>
              </div>
              <div className="fact-card full-span">
                <dt>
                  <Utensils size={15} className="fact-icon" aria-hidden="true" />
                  <span>Programme</span>
                </dt>
                <dd>Followed by Function &amp; Lunch</dd>
              </div>
            </dl>

            <div className="gala-actions-wrapper vendor-rsvp-box">
              <p className="rsvp-title">Kindly RSVP &amp; Connect</p>
              <div className="gala-actions">
                <a
                  className="btn btn-gala-primary"
                  href="tel:+919900014212"
                  aria-label="Call RSVP contact 99000 14212"
                >
                  <Phone size={14} aria-hidden="true" />
                  <span>Call 99000 14212</span>
                </a>
                <a
                  className="btn btn-gala-primary"
                  href="tel:+919900014214"
                  aria-label="Call RSVP contact 99000 14214"
                >
                  <Phone size={14} aria-hidden="true" />
                  <span>Call 99000 14214</span>
                </a>
                <a
                  className="btn btn-gala-whatsapp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RSVP via WhatsApp to 99000 14212"
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  <span>WhatsApp RSVP</span>
                </a>
                <a
                  className="btn btn-gala-secondary"
                  href={gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Add Vendor Meet to Google Calendar"
                >
                  <Calendar size={14} aria-hidden="true" />
                  <span>Add to Calendar</span>
                </a>
                <a
                  className="btn btn-gala-secondary"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Shivamogga showroom location on Google Maps"
                >
                  <MapPin size={14} aria-hidden="true" />
                  <span>Location Map</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
