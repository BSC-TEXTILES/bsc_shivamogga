import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import bscLogo from "../assets/bsc-logo-crop.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { label: "Legacy", href: "#legacy" },
    { label: "Showroom", href: "#showroom" },
    { label: "Grand Opening", href: "#opening" },
    { label: "Gala Dinner", href: "#gala" },
    { label: "Vendor Meet", href: "#vendors" },
    { label: "Invitees", href: "#invitees" },
    { label: "Locations", href: "#locations" },
    { label: "Venue Map", href: "#qr" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setIsScrolled(scrollY > 40);

      const triggerY = scrollY + window.innerHeight * 0.35;
      let currentId = "hero";

      navItems.forEach((item) => {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (triggerY >= top) {
            currentId = id;
          }
        }
      });
      setActiveSection(currentId);
    };

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

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : "is-top"}`}
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
            <span className="brand-sub">B.S. Channabasappa &amp; Sons &bull; Since 1938</span>
          </div>
        </a>

        <nav className={`nav ${isOpen ? "is-open" : ""}`} id="site-nav" aria-label="Primary Navigation">
          {navItems.map((item) => (
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
