import { useEffect } from "react";

const SECTION_SELECTOR = "[data-reveal-section]:not([data-reveal-section='immediate'])";
const REVEAL_SELECTOR = "[data-reveal]";

function makeRevealObserver(rootMargin) {
  const revealed = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (revealed.has(el)) return;
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          revealed.add(el);
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { rootMargin, threshold: 0.01 }
  );

  return {
    observer,
    revealed,
    observe(el) {
      if (el && !revealed.has(el)) observer.observe(el);
    },
    disconnect() {
      observer.disconnect();
    }
  };
}

export function use3dScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse =
      window.matchMedia("(max-width: 960px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    const sectionTargets = Array.from(document.querySelectorAll(SECTION_SELECTOR));
    const revealTargets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    const allTargets = [...sectionTargets, ...revealTargets];

    if (prefersReducedMotion) {
      allTargets.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const vh = window.innerHeight || 800;
    const margin = 250;

    // Mark already-visible targets BEFORE enabling hide CSS (no blank first paint).
    allTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + margin) {
        el.classList.add("is-visible");
      }
    });

    document.documentElement.classList.add("js-reveal");

    // Observe-once only — no scroll-event layout thrashing.
    const sectionReveal = makeRevealObserver("0px 0px 250px 0px");
    const blockReveal = makeRevealObserver("0px 0px 250px 0px");

    sectionTargets.forEach((el) => {
      if (!el.classList.contains("is-visible")) sectionReveal.observe(el);
    });
    revealTargets.forEach((el) => {
      if (!el.classList.contains("is-visible")) blockReveal.observe(el);
    });

    // Late-mounted sections (DeferredSection / React.lazy) join the same observers.
    // No getBoundingClientRect loops on scroll — IO handles entry.
    const observeNew = (root) => {
      if (!root || root.nodeType !== 1) return;
      const candidates = [];
      if (root.matches?.(SECTION_SELECTOR) || root.matches?.(REVEAL_SELECTOR)) {
        candidates.push(root);
      }
      root.querySelectorAll?.(`${SECTION_SELECTOR},${REVEAL_SELECTOR}`).forEach((n) => {
        candidates.push(n);
      });
      candidates.forEach((node) => {
        if (node.classList.contains("is-visible")) return;
        if (node.matches?.(SECTION_SELECTOR)) sectionReveal.observe(node);
        else blockReveal.observe(node);
      });
    };

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => observeNew(node));
      });
    });
    mutationObserver.observe(document.getElementById("main") || document.body, {
      childList: true,
      subtree: true
    });

    // Desktop hero pointer parallax only (transform/opacity). No scroll-driven physics.
    let cleanupParallax = null;

    if (!isCoarse) {
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let isRunning = false;
      let rafId = 0;

      const heroCard = document.querySelector(".hero-card");
      const heroCopy = document.querySelector(".hero-copy");

      const clamp = (val, min, max) => (val < min ? min : val > max ? max : val);
      const lerp = (start, end, factor) => start + (end - start) * factor;

      const updateHero = () => {
        if (heroCard) {
          const rotXCard = currentMouseY * 3.5;
          const rotYCard = currentMouseX * -4.0;
          const xCard = currentMouseX * 10;
          heroCard.style.transform = `translate3d(${xCard.toFixed(2)}px, 0px, 0px) rotateX(${rotXCard.toFixed(2)}deg) rotateY(${rotYCard.toFixed(2)}deg)`;
        }
        if (heroCopy) {
          const xCopy = currentMouseX * 6;
          heroCopy.style.transform = `translate3d(${xCopy.toFixed(2)}px, 0px, 0px)`;
        }
      };

      const renderLoop = () => {
        const mxDiff = targetMouseX - currentMouseX;
        const myDiff = targetMouseY - currentMouseY;
        if (Math.abs(mxDiff) > 0.002 || Math.abs(myDiff) > 0.002) {
          currentMouseX = lerp(currentMouseX, targetMouseX, 0.12);
          currentMouseY = lerp(currentMouseY, targetMouseY, 0.12);
        } else {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        }

        updateHero();

        const stillSettling =
          Math.abs(targetMouseX - currentMouseX) > 0.003 ||
          Math.abs(targetMouseY - currentMouseY) > 0.003;

        if (stillSettling) {
          rafId = requestAnimationFrame(renderLoop);
        } else {
          isRunning = false;
          rafId = 0;
        }
      };

      const wakeLoop = () => {
        if (!isRunning) {
          isRunning = true;
          rafId = requestAnimationFrame(renderLoop);
        }
      };

      const onPointerMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetMouseX = clamp((e.clientX - cx) / cx, -1, 1);
        targetMouseY = clamp((e.clientY - cy) / cy, -1, 1);
        wakeLoop();
      };

      const onPointerLeave = () => {
        targetMouseX = 0;
        targetMouseY = 0;
        wakeLoop();
      };

      window.addEventListener("mousemove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);

      cleanupParallax = () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onPointerMove);
        document.documentElement.removeEventListener("mouseleave", onPointerLeave);
        if (heroCard) heroCard.style.transform = "";
        if (heroCopy) heroCopy.style.transform = "";
      };
    }

    return () => {
      sectionReveal.disconnect();
      blockReveal.disconnect();
      mutationObserver.disconnect();
      if (cleanupParallax) cleanupParallax();
    };
  }, []);
}
