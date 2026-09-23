import React from "react";
import bscLogo from "../assets/bsc-logo-crop.webp";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand" data-reveal>
          <img
            src={bscLogo}
            alt="BSC Shivamogga Logo"
            width="120"
            height="66"
            loading="lazy"
            decoding="async"
          />
          <p className="brand-legacy-text">Established 1938 · Five-Generation Legacy</p>
          <p className="brand-subtext">Davanagere · Belagavi · Shivamogga</p>
        </div>

        <div className="footer-meta">
          <p className="footer-opening-badge">
            <strong>Grand Opening</strong> · Monday, 12 October 2026 · 10:30 AM onwards
          </p>
          <p className="footer-address">Parekh Vinayaka Mall, BH Road, Shivamogga</p>
          <p className="footer-tagline">An exceptional choice for complete family shopping</p>
        </div>

        <div className="footer-rsvp">
          <p className="rsvp-label">RSVP Contacts</p>
          <p className="rsvp-numbers">
            <a href="tel:+919900014212" aria-label="Call RSVP contact 99000 14212">
              99000 14212
            </a>
            <span className="rsvp-dot" aria-hidden="true">·</span>
            <a href="tel:+919900014214" aria-label="Call RSVP contact 99000 14214">
              99000 14214
            </a>
          </p>
        </div>
      </div>

      <div className="footer-base">
        <div className="container footer-base-inner">
          <p>© 2026 BSC Textiles. All rights reserved.</p>
          <p className="base-note">Five Generations of Trust &amp; Quality Fashion</p>
        </div>
      </div>
    </footer>
  );
}
