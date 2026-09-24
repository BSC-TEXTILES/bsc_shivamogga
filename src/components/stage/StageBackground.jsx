import React from "react";

export default function StageBackground() {
  return (
    <div className="gos-bg" aria-hidden="true">
      <div className="gos-bg__base" />
      <div className="gos-bg__damask" />
      <div className="gos-bg__arch" />
      <div className="gos-bg__spotlight" />
      <div className="gos-bg__beam gos-bg__beam--l" />
      <div className="gos-bg__beam gos-bg__beam--r" />
      <div className="gos-bg__floor" />
      <div className="gos-bg__vignette" />
    </div>
  );
}
