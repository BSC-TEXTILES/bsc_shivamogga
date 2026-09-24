import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import bscLogo from "../assets/bsc-logo-crop.webp";

const NAV_ITEMS = [
  { label: "Legacy", href: "#legacy" },
  { label: "Showroom", href: "#showroom" },
  { label: "Grand Opening", href: "#opening" },
  { label: "Gala Dinner", href: "#gala" },
  { label: "Vendor Meet", href: "#vendors" },
  { label: "Invitees", href: "#invitees" },
  { label: "Showrooms", href: "#locations" },
  { label: "Venue Map", href: "#qr" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let lastScrolled = false;

    const onScroll = () => {
      const nextScrolled = (window.scrollY || 0) > 40;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Native IntersectionObserver for active section tracking (zero forced reflow)
    const targets = ["hero", ...NAV_ITEMS.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px"
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : "is-top"} ${isOpen ? "menu-open" : ""}`}
      id="site-header"
    >
      <div className="header-inner">
        <a className="brand" href="#hero" aria-label="BSC Shivamogga Home">
          <img
            src={bscLogo}
            alt="BSC Logo"
            width="60"
            height="40"
            className="brand-mark"
          />
          <div className="brand-text">
            <span className="brand-title">BSC SHIVAMOGGA</span>
            <span className="brand-sub">ESTABLISHED 1938</span>
          </div>
        </a>

        <nav className={`nav ${isOpen ? "is-open" : ""}`} id="site-nav" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.replace("#", "") ? "is-active" : ""}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="nav-mobile-cta">
            <a
              className="btn btn-nav-cta"
              href="#opening"
              onClick={() => setIsOpen(false)}
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Inauguration Invitation</span>
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <a className="btn btn-header-rsvp" href="#opening">
            <span>RSVP</span>
          </a>

          <button
            className="nav-toggle"
            id="nav-toggle"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="site-nav"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
