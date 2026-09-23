import React from "react";
import { Sparkles, MessageCircle, MapPin, ArrowRight } from "lucide-react";

export default function Collections() {
  const collections = [
    {
      id: "bridal-silks",
      tag: "FLAGSHIP WEDDING WEAR",
      title: "Wedding & Bridal Silks",
      subtitle: "Pure Kanchipuram, Banarasi & Dharmavaram",
      description:
        "Timeless bridal heirlooms handcrafted by master artisans, woven with authentic zari and exquisite ceremonial borders.",
      highlights: ["Pure Mulberry Silk", "Heritage Temple Borders", "Bridal trousseau styling"],
      accent: "gold"
    },
    {
      id: "mens-couture",
      tag: "ROYAL ATTIRE",
      title: "Men’s Royal Coutures",
      subtitle: "Sherwanis, Italian Suitings & Bandhgalas",
      description:
        "Sophisticated bespoke tailoring, ceremonial sherwanis, fine wool suits, and handcrafted kurtas for distinguished occasions.",
      highlights: ["Bespoke Tailoring", "Italian Wool Blends", "Regal Embellishments"],
      accent: "navy"
    },
    {
      id: "designer-sarees",
      tag: "CONTEMPORARY GRACE",
      title: "Designer & Festive Sarees",
      subtitle: "Organza, Tissue Silk & Chiffons",
      description:
        "Effortless modern elegance featuring hand-embroidered motifs, lightweight festive drapes, and modern celebratory hues.",
      highlights: ["Hand Embroidery", "Featherweight Drapes", "Curated Palette"],
      accent: "gold"
    },
    {
      id: "kids-teens",
      tag: "CELEBRATION WEAR",
      title: "Kids & Teens Festivity",
      subtitle: "Ethnic Lehengas & Indo-Western Sets",
      description:
        "Vibrant festive wear designed for comfort and flair, bringing festive joy to the youngest members of the family.",
      highlights: ["Comfort Linings", "Vibrant Traditional Cuts", "Festive Ensembles"],
      accent: "navy"
    },
    {
      id: "handloom-heritage",
      tag: "FIVE GENERATION TRADITION",
      title: "Handloom & Heritage Weaves",
      subtitle: "Pure Silk Dhotis & Handcrafted Angavastrams",
      description:
        "Traditional ritual wear, authentic south Indian silk dhotis, and master-woven textiles celebrating timeless cultural customs.",
      highlights: ["100% Handloom", "Pavitra Silk Dhotis", "Master Craftsmanship"],
      accent: "gold"
    },
    {
      id: "family-fashion",
      tag: "COMPLETE FAMILY SHOPPING",
      title: "Complete Family Fashion",
      subtitle: "Every Generation, One Destination",
      description:
        "Karnataka's premier family shopping experience with thousands of curated styles across five expansive shopping levels.",
      highlights: ["Five Generations of Trust", "Extensive Multi-Brand Range", "All Ages Under One Roof"],
      accent: "navy"
    }
  ];

  const whatsappBase =
    "https://wa.me/919900014212?text=Greetings%20BSC%20Shivamogga%2C%20I%20would%20like%20to%20inquire%20about%20your%20";

  return (
    <section className="section collections-section" id="collections" aria-labelledby="collections-title">
      <div className="container">
        <header className="section-head text-center" data-reveal>
          <div className="badge-heritage badge-center">
            <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
            <span>Digital Showroom Showcase</span>
          </div>
          <h2 id="collections-title" className="collections-main-title">
            SIGNATURE COLLECTIONS
          </h2>
          <span className="rule" aria-hidden="true" />
          <p className="section-intro">
            Experience our curated world of luxury silks, bespoke menswear, and grand festive attire at the new Shivamogga showroom.
          </p>
        </header>

        <div className="collections-grid">
          {collections.map((col, idx) => (
            <article
              key={col.id}
              className={`collection-card-3d ${col.accent === "gold" ? "card-accent-gold" : "card-accent-navy"}`}
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="collection-card-inner">
                <div className="collection-top-badge">
                  <span className="col-badge-text">{col.tag}</span>
                </div>

                <div className="collection-content">
                  <h3 className="collection-title">{col.title}</h3>
                  <p className="collection-subtitle">{col.subtitle}</p>
                  <p className="collection-desc">{col.description}</p>

                  <ul className="collection-features">
                    {col.highlights.map((item, i) => (
                      <li key={i}>
                        <span className="bullet-dot" aria-hidden="true">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="collection-footer">
                  <a
                    className="btn btn-collection-inquire"
                    href={`${whatsappBase}${encodeURIComponent(col.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inquire about ${col.title} on WhatsApp`}
                  >
                    <MessageCircle size={14} aria-hidden="true" />
                    <span>Inquire Collection</span>
                    <ArrowRight size={13} className="btn-arrow" aria-hidden="true" />
                  </a>

                  <a
                    className="btn btn-collection-visit"
                    href="#showroom"
                    aria-label={`Visit Shivamogga showroom for ${col.title}`}
                  >
                    <MapPin size={13} aria-hidden="true" />
                    <span>Experience In-Store</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
