import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import bscLogo from "../assets/bsc-logo-crop.webp";

const NAV_ITEMS = [
  { label: "Legacy", href: "#legacy" },
  { label: "Showroom", href: "#showroom" },
  { label: "Grand Opening", href: "#opening" },
  { label: "Gala Dinner", href: "#gala" },
  { label: "Vendor Meet", href: "#vendors" },
  { label: "Invitees", href: "#invitees" },
  { label: "Locations", href: "#locations" },
  { label: "Venue Map", href: "#qr" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setIsScrolled(scrollY > 40);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerY = scrollY + 120;
          let currentId = "hero";

          for (let i = 0; i < NAV_ITEMS.length; i++) {
            const id = NAV_ITEMS[i].href.replace("#", "");
            const el = document.getElementById(id);
            if (el && el.offsetTop <= triggerY) {
              currentId = id;
            }
          }
          setActiveSection(currentId);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
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
            width="58"
            height="38"
            className="brand-mark"
          />
          <div className="brand-text">
            <span className="brand-title">BSC Shivamogga</span>
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
        </nav>

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
    </header>
  );
}
