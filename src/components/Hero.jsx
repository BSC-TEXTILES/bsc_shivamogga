import React from "react";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
const inviteP1Webp = "/assets/invite-p1.webp";
const inviteP1Sm = "/assets/invite-p1-sm.webp";

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Grand Opening Introduction">
      <div className="hero-ambient-glow" aria-hidden="true" />

      <div className="hero-stage" data-hero-stage>
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="badge-heritage">
              <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
              <span>Established 1938 · Five-Generation Legacy</span>
            </div>

            <h1 className="hero-title">BSC Shivamogga</h1>
            <p className="hero-subtitle">Grand Opening Celebration</p>

            <div className="hero-meta-card">
              <div className="meta-row">
                <span className="meta-item">
                  <Calendar size={18} className="meta-icon" aria-hidden="true" />
                  <strong>Monday, 12 October 2026</strong>
                </span>
                <span className="meta-divider" aria-hidden="true">·</span>
                <span className="meta-item">
                  <Clock size={18} className="meta-icon" aria-hidden="true" />
                  <span>10:30 AM onwards</span>
                </span>
              </div>
              <div className="venue-row">
                <MapPin size={18} className="venue-icon" aria-hidden="true" />
                <span>Parekh Vinayaka Mall, BH Road, Shivamogga</span>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="btn btn-hero-primary"
                href="#opening"
                aria-label="View Grand Opening invitation details"
              >
                Explore Invitation
              </a>
              <a
                className="btn btn-hero-secondary"
                href="#qr"
                aria-label="View Venue Map and Location QR code"
              >
                Showroom &amp; Venue Map
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-invitation-frame">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${inviteP1Sm} 768w, ${inviteP1Webp} 1200w`}
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 560px"
                />
                <img
                  src={inviteP1Webp}
                  alt="Welcome to the Grand Opening of BSC Shivamogga on Monday, 12 October 2026 at BH Road, Shivamogga"
                  width="1492"
                  height="1054"
                  fetchPriority="high"
                  decoding="sync"
                  style={{ aspectRatio: "1492 / 1054" }}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      <a className="scroll-indicator" href="#legacy" aria-label="Scroll down to BSC Legacy">
        <span className="scroll-mouse" aria-hidden="true">
          <span className="scroll-wheel" />
        </span>
        <span className="scroll-caption">Explore Legacy</span>
      </a>
    </section>
  );
}
