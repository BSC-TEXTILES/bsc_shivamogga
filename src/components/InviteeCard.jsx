import React, { useRef } from "react";
import { useCardTilt } from "../hooks/useCardTilt";

function InviteeCard({ invitee, index }) {
  const cardRef = useRef(null);
  useCardTilt(cardRef, { maxTiltDesktop: 4, maxTiltTablet: 2.5 });

  return (
    <article
      className="invitee-card-slot"
      style={{ "--i": index }}
      aria-label={`${invitee.name}, ${invitee.designation}`}
    >
      <div className="invitee-3d-stage">
        <div className="invitee-3d-card" ref={cardRef} tabIndex={0}>
          <span className="invitee-card-shine" aria-hidden="true" />
          <div className="invitee-card-inner">
            <div className="invitee-card-header">
              <span className="invitee-badge">{invitee.designation}</span>
            </div>
            <span className="invitee-gold-line" aria-hidden="true" />
            <h3 className="invitee-name">{invitee.name}</h3>
            <p className="invitee-role">{invitee.description}</p>
            <div className="invitee-card-footer">
              <span className="invitee-type-chip">{invitee.type}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default React.memo(InviteeCard);
