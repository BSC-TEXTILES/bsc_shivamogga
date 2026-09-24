import React from "react";

const FOLDS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function CurtainLayer({ open }) {
  return (
    <div className={`gos-curtains ${open ? "is-open" : ""}`} aria-hidden="true">
      <div className="gos-curtain gos-curtain--left">
        <div className="gos-curtain__body">
          <div className="gos-curtain__folds">
            {FOLDS.map((i) => (
              <span key={i} className="gos-curtain__fold" style={{ "--f": i }} />
            ))}
          </div>
          <div className="gos-curtain__shade" />
          <div className="gos-curtain__tieback">
            <span className="gos-curtain__cord" />
            <span className="gos-curtain__tassel" />
          </div>
          <div className="gos-curtain__inner-edge" />
        </div>
      </div>

      <div className="gos-curtain gos-curtain--right">
        <div className="gos-curtain__body">
          <div className="gos-curtain__folds">
            {FOLDS.map((i) => (
              <span key={i} className="gos-curtain__fold" style={{ "--f": i }} />
            ))}
          </div>
          <div className="gos-curtain__shade" />
          <div className="gos-curtain__tieback">
            <span className="gos-curtain__cord" />
            <span className="gos-curtain__tassel" />
          </div>
          <div className="gos-curtain__inner-edge" />
        </div>
      </div>

      <div className="gos-curtain gos-curtain--top">
        <div className="gos-curtain__valance">
          <div className="gos-curtain__valance-shade" />
          <div className="gos-curtain__gold-trim" />
        </div>
        <div className="gos-curtain__fringe" />
      </div>

      <div className="gos-curtains__shadow gos-curtains__shadow--l" />
      <div className="gos-curtains__shadow gos-curtains__shadow--r" />
    </div>
  );
}
