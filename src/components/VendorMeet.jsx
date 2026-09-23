import React from "react";
import { Phone, Calendar, Clock, MessageCircle, Utensils } from "lucide-react";
import inviteP6 from "../assets/invite-p6.jpg";

export default function VendorMeet() {
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BSC+Shivamogga+-+Vendor+Meet&dates=20261013T050000Z/20261013T090000Z&details=BSC+Shivamogga+Vendors+Meet.+Followed+by+Function+%26+Lunch.+Kindly+RSVP+at+9900014212%2C+9900014214.&location=Parekh+Vinayaka+Mall%2C+BH+Road%2C+Shivamogga";

  const whatsappUrl =
    "https://wa.me/919900014212?text=Greetings%20BSC%2C%20I%20would%20like%20to%20confirm%20my%20attendance%20for%20the%20Vendor%20Meet%20on%2013th%20October%202026.";

  return (
    <section className="section vendors" id="vendors" aria-labelledby="vendors-title">
      <div className="container">
        <div className="event-layout reverse">
          <div className="event-detail" data-reveal>
            <p className="eyebrow">Day Two Assembly</p>
            <h2 id="vendors-title">BSC Shivamogga Vendor Meet</h2>
            <span className="rule" aria-hidden="true" />

            <p className="invite-line">
              We warmly invite you to share happiness as we move ahead to a new chapter of BSC with our new showroom.
            </p>

            <dl className="event-facts">
              <div className="fact-card">
                <dt>
                  <Calendar size={13} className="fact-icon" aria-hidden="true" />
                  <span>Date</span>
                </dt>
                <dd>Tuesday, 13<sup>th</sup> Oct 2026</dd>
              </div>
              <div className="fact-card">
                <dt>
                  <Clock size={13} className="fact-icon" aria-hidden="true" />
                  <span>Time</span>
                </dt>
                <dd>10:30 AM onwards</dd>
              </div>
              <div className="fact-card full-span">
                <dt>
                  <Utensils size={13} className="fact-icon" aria-hidden="true" />
                  <span>Programme</span>
                </dt>
                <dd>Followed by Function &amp; Lunch</dd>
              </div>
            </dl>

            <div className="gala-actions-wrapper vendor-rsvp">
              <p className="rsvp-title">Kindly RSVP</p>
              <div className="gala-actions gala-actions-start">
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
              </div>
            </div>
          </div>

          <div className="event-art" data-reveal>
            <div className="invite-frame">
              <img
                src={inviteP6}
                alt="Shivamogga Vendors Meet invitation on Tuesday, 13 October 2026, 10:30 AM onwards followed by function and lunch"
                width="1600"
                height="1131"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
