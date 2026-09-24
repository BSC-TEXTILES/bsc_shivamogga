import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Legacy from "./components/Legacy";
import Showroom from "./components/Showroom";
import GrandOpening from "./components/GrandOpening";
import GalaDinner from "./components/GalaDinner";
import VendorMeet from "./components/VendorMeet";
import SpecialInvitees from "./components/SpecialInvitees";
import Locations from "./components/Locations";
import FamilyGreetings from "./components/FamilyGreetings";
import VenueMap from "./components/VenueMap";
import Footer from "./components/Footer";
import DoorEntrance from "./components/DoorEntrance";
import { use3dScroll } from "./hooks/use3dScroll";

export default function App() {
  use3dScroll();

  return (
    <div className="app-root">
      <DoorEntrance />

      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Legacy />
        <Showroom />
        <GrandOpening />
        <GalaDinner />
        <VendorMeet />
        <SpecialInvitees />
        <Locations />
        <FamilyGreetings />
        <VenueMap />
      </main>

      <Footer />
    </div>
  );
}
