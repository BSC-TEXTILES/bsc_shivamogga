import React from "react";
import bscLogo from "../../assets/bsc-logo-crop.png";

export default function IntroLogo() {
  return (
    <div className="go-intro__logo-wrap" aria-hidden="true">
      <div className="go-intro__logo-glow" />
      <img
        src={bscLogo}
        alt=""
        width="120"
        height="80"
        className="go-intro__logo"
        decoding="async"
        fetchpriority="high"
      />
    </div>
  );
}
