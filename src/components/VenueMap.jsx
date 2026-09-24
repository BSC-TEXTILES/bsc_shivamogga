import React from "react";
import { ExternalLink } from "lucide-react";
import qrLocation from "../assets/qr-location.png";
import qrLocationWebp from "../assets/qr-location.webp";

export default function VenueMap() {
  const mapUrl = "https://www.canvaqr.com/RGS6_7gEBf";

  return (
    <section className="section qr-section" id="qr" data-reveal-section aria-labelledby="qr-title">
      <div className="container">
        <div className="qr-panel" data-reveal>
          <div className="qr-copy">
            <p className="eyebrow">Easy Navigation</p>
            <h2 id="qr-title">SCAN FOR LOCATION</h2>
            <span className="rule" aria-hidden="true" />
            <p className="qr-description">
              Parekh Vinayaka Mall, BH Road, Shivamogga — scan the QR code with your mobile camera or tap the button below to get direct driving directions on Google Maps.
            </p>
            <div className="qr-actions">
              <a
                className="btn btn-primary"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Shivamogga showroom location on Google Maps"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} className="btn-external-icon" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="qr-code-wrap">
            <a
              className="qr-link"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Shivamogga showroom location on Google Maps"
            >
              <div className="qr-inner-frame">
                <picture>
                  <source srcSet={qrLocationWebp} type="image/webp" />
                  <img
                    src={qrLocation}
                    alt="High-resolution QR code for Parekh Vinayaka Mall Shivamogga Location"
                    width="260"
                    height="260"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <span className="qr-caption">SCAN FOR LOCATION</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
