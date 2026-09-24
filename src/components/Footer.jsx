import React from "react";
import { Phone, MapPin, Sparkles, MessageCircle, ExternalLink } from "lucide-react";
import bscLogo from "../assets/bsc-logo-crop.png";

export default function Footer() {
  const whatsappUrl = "https://wa.me/919900014212?text=Greetings%20BSC%20Textiles%2C%20I%20would%20like%20to%20inquire.";
  const mapsUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <footer className="site-footer" id="footer" data-reveal-section aria-labelledby="footer-brand-title">
      <div className="container">
        {/* Strictly Centered BSC Branding Area */}
        <div className="footer-hero-branding" data-reveal>
          <div className="footer-logo-center-wrapper">
            <img
              src={bscLogo}
              alt="BSC Exclusive Logo"
              width="140"
              height="93"
              loading="lazy"
              decoding="async"
              className="footer-logo-img"
            />
          </div>

          <p id="footer-brand-title" className="brand-legacy-title">
            B.S.C ESTABLISHED 1938
          </p>
          <p className="brand-legacy-sub">
            FIVE GENERATIONS OF TRUST · DAVANAGERE · BELAGAVI · SHIVAMOGGA
          </p>
          <span className="rule footer-rule" aria-hidden="true" />
        </div>

        {/* Structured Multi-Column Footer Grid (Requirement 22 & 23) */}
        <div className="footer-columns-grid" data-reveal>
          {/* Col 1: About */}
          <div className="footer-col">
            <h2 className="footer-col-title">About BSC</h2>
            <p className="footer-col-text">
              Since 1938, BSC has redefined family fashion and silk sarees in Karnataka. Carrying a five-generation heritage of authentic craftsmanship, trust, and premium selection.
            </p>
            <div className="footer-badge-pill">
              <Sparkles size={13} className="badge-sparkle" aria-hidden="true" />
              <span>88+ Years of Heritage</span>
            </div>
          </div>

          {/* Col 2: Ceremonies */}
          <div className="footer-col">
            <h2 className="footer-col-title">Opening Events</h2>
            <ul className="footer-nav-list">
              <li>
                <a href="#opening">Grand Opening (12 Oct 2026)</a>
              </li>
              <li>
                <a href="#gala">Gala Dinner Reception (12 Oct)</a>
              </li>
              <li>
                <a href="#vendors">Vendors’ Meet (13 Oct 2026)</a>
              </li>
              <li>
                <a href="#invitees">Special Invitees &amp; Dignitaries</a>
              </li>
              <li>
                <a href="#family">Family Greetings &amp; Compliments</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Stores & RSVP */}
          <div className="footer-col">
            <h2 className="footer-col-title">Showroom &amp; RSVP</h2>
            <div className="footer-contact-info">
              <div className="contact-row">
                <MapPin size={14} className="contact-icon" aria-hidden="true" />
                <span>Parekh Vinayaka Mall, BH Road, Shivamogga</span>
              </div>
              <div className="contact-row">
                <Phone size={14} className="contact-icon" aria-hidden="true" />
                <div className="phone-group">
                  <a href="tel:+919900014212">99000 14212</a>
                  <span> · </span>
                  <a href="tel:+919900014214">99000 14214</a>
                </div>
              </div>
            </div>

            <div className="footer-cta-btns">
              <a
                className="btn btn-footer-rsvp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RSVP via WhatsApp"
              >
                <MessageCircle size={14} aria-hidden="true" />
                <span>RSVP via WhatsApp</span>
              </a>

              <a
                className="btn btn-footer-map"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shivamogga location on Google Maps"
              >
                <MapPin size={14} aria-hidden="true" />
                <span>Google Maps</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base / Copyright */}
        <div className="footer-bottom-base">
          <div className="footer-base-inner">
            <p className="copyright-text">
              © {new Date().getFullYear()} BSC Textiles. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <span className="legal-item">Parekh Vinayaka Mall, Shivamogga</span>
              <span className="legal-dot">·</span>
              <span className="legal-item">Five Generations of Trust</span>
              <span className="legal-dot">·</span>
              <span className="legal-item">An Exceptional Choice for Complete Family Shopping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
