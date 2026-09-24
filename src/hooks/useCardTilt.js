import { useEffect } from "react";

export function useCardTilt(cardRef, options = {}) {
  const { maxTiltDesktop = 4, maxTiltTablet = 3 } = options;

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
    let cachedRect = null;

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
      cachedRect = card.getBoundingClientRect();
      card.classList.add("is-tilting");
      window.addEventListener("scroll", invalidateRect, { passive: true, capture: true });
    };

    const invalidateRect = () => {
      cachedRect = null;
    };

    const onPointerMove = (event) => {
      if (!canTilt(event)) return;
      if (!cachedRect || cachedRect.width === 0) {
        cachedRect = card.getBoundingClientRect();
      }
      const rect = cachedRect;
      if (rect.width === 0 || rect.height === 0) return;

      const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
      const maxTilt = window.innerWidth <= 1024 ? maxTiltTablet : maxTiltDesktop;

      pending = {
        rx: `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`,
        ry: `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`,
        mx: `${(px * 100).toFixed(1)}%`,
        my: `${(py * 100).toFixed(1)}%`
      };

      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    };

    const resetTilt = () => {
      cachedRect = null;
      window.removeEventListener("scroll", invalidateRect, { capture: true });
      card.classList.remove("is-tilting");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };

    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerleave", resetTilt);
    card.addEventListener("pointercancel", resetTilt);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", invalidateRect, { capture: true });
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", resetTilt);
      card.removeEventListener("pointercancel", resetTilt);
    };
  }, [cardRef, maxTiltDesktop, maxTiltTablet]);
}
