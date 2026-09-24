import React, { useRef } from "react";
import { useCardTilt } from "../hooks/useCardTilt";

function ComplimentCard({ item, index }) {
  const cardRef = useRef(null);
  useCardTilt(cardRef, { maxTiltDesktop: 4, maxTiltTablet: 3 });

  const isLong = item.name.length > 55;

  return (
    <article
      className={`compliment-card-slot${isLong ? " is-long-text" : ""}`}
      style={{ "--i": index }}
    >
      <div className="compliment-3d-stage">
        <div className="compliment-3d-card" ref={cardRef} tabIndex={0}>
          <span className="compliment-card-shine" aria-hidden="true" />
          <div className="compliment-card-inner">
            <span className="compliment-ornament" aria-hidden="true">
              <span className="compliment-ornament-diamond" />
            </span>
            <h3 className="compliment-name">{item.name}</h3>
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(ComplimentCard);
