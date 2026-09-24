import React from "react";

export default function IntroBackground() {
  return (
    <div className="go-intro__background" aria-hidden="true">
      <div className="go-intro__base" />
      <div className="go-intro__gradient" />
      <div className="go-intro__glow go-intro__glow--tl" />
      <div className="go-intro__glow go-intro__glow--br" />
      <div className="go-intro__gold-beam" />
      <div className="go-intro__geo go-intro__geo--ring" />
      <div className="go-intro__geo go-intro__geo--diamond" />
      <div className="go-intro__vignette" />
    </div>
  );
}
