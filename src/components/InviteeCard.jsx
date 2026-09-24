import React, { useEffect, useRef } from "react";

function InviteeCard({ invitee, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const canTilt = (event) =>
      finePointerQuery.matches &&
      !reducedQuery.matches &&
      (!event || event.pointerType !== "touch");

    let rafId = 0;
    let pending = null;

    const applyTilt = () => {
      rafId = 0;
      if (!pending || !card.isConnected) return;
      card.style.setProperty("--rx", pending.rx);
      card.style.setProperty("--ry", pending.ry);
      card.style.setProperty("--mx", pending.mx);
      card.style.setProperty("--my", pending.my);
    };

    const onPointerEnter = (event) => {
      if (!canTilt(event)) return;
      card.classList.add("is-tilting");
    };

    const onPointerMove = (event) => {
      if (!canTilt(event)) return;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      const maxTilt = window.innerWidth <= 1024 ? 3.5 : 5.5;

      pending = {
        rx: `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`,
        ry: `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`,
        mx: `${(px * 100).toFixed(1)}%`,
        my: `${(py * 100).toFixed(1)}%`
      };

      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    };

    const resetTilt = () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };

    const onPointerLeave = () => {
      resetTilt();
    };

    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", onPointerLeave);
    card.addEventListener("pointercancel", onPointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
      card.removeEventListener("pointercancel", onPointerLeave);
    };
  }, []);

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
