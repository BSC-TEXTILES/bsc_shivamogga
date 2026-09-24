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

    // Desktop pointer parallax + subtle scroll depth (transform/opacity only).
    // Scroll depth returns to identity at scrollY = 0 — no accumulated offset.
    let cleanupParallax = null;

    const heroEl = document.querySelector(".hero");
    const heroCard = document.querySelector(".hero-card");
    const heroCopy = document.querySelector(".hero-copy");
    const heroStage = document.querySelector(".hero-stage");

    // Entrance animation uses fill:both and would pin transform forever —
    // release it so scroll/pointer transforms can take over (geometry unchanged).
    let cardAnimTimer = 0;
    const releaseCardEntrance = () => {
      if (heroCard) heroCard.style.animation = "none";
    };
    if (heroCard && !prefersReducedMotion) {
      heroCard.addEventListener("animationend", releaseCardEntrance, { once: true });
      cardAnimTimer = window.setTimeout(releaseCardEntrance, 1500);
    }

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollDepth = 0;
    let isRunning = false;
    let rafId = 0;

    const clamp = (val, min, max) => (val < min ? min : val > max ? max : val);
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const readScrollDepth = () => {
      if (prefersReducedMotion || !heroEl) {
        scrollDepth = 0;
        return;
      }
      const range = Math.max(heroEl.offsetHeight * 0.85, 1);
      // 0 at page top → 1 as hero leaves; never exceeds 1 (capped movement)
      scrollDepth = clamp((window.scrollY || 0) / range, 0, 1);
    };

    const updateHero = () => {
      // Scroll depth: max ~16px image / ~8px copy — pure transform, layout untouched
      const yCard = scrollDepth * 16;
      const yCopy = scrollDepth * -8;
      const yStage = scrollDepth * 6;

      if (heroCard) {
        const rotXCard = currentMouseY * 3.5;
        const rotYCard = currentMouseX * -4.0;
        const xCard = currentMouseX * 10;
        heroCard.style.transform = `translate3d(${xCard.toFixed(2)}px, ${yCard.toFixed(2)}px, 0) rotateX(${rotXCard.toFixed(2)}deg) rotateY(${rotYCard.toFixed(2)}deg)`;
      }
      if (heroCopy) {
        const xCopy = currentMouseX * 6;
        heroCopy.style.transform = `translate3d(${xCopy.toFixed(2)}px, ${yCopy.toFixed(2)}px, 0)`;
      }
      if (heroStage) {
        heroStage.style.transform = `translate3d(0, ${yStage.toFixed(2)}px, 0)`;
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
      if (isCoarse || prefersReducedMotion) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetMouseX = clamp((e.clientX - cx) / cx, -1, 1);
      targetMouseY = clamp((e.clientY - cy) / cy, -1, 1);
      wakeLoop();
    };

    const onPointerLeave = () => {
      if (isCoarse) return;
      targetMouseX = 0;
      targetMouseY = 0;
      wakeLoop();
    };

    let lastScrollY = -1;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y === lastScrollY) return;
      lastScrollY = y;
      readScrollDepth();
      // At exact top, force identity so scroll-up always returns cleanly
      if (y <= 0) {
        scrollDepth = 0;
        currentMouseX = targetMouseX;
        currentMouseY = targetMouseY;
      }
      wakeLoop();
    };

    if (!prefersReducedMotion) {
      readScrollDepth();
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      // Initial paint in case page restored mid-scroll
      if ((window.scrollY || 0) > 0) wakeLoop();
    }

    cleanupParallax = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (cardAnimTimer) window.clearTimeout(cardAnimTimer);
      window.removeEventListener("mousemove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (heroCard) {
        heroCard.removeEventListener("animationend", releaseCardEntrance);
        heroCard.style.transform = "";
        heroCard.style.animation = "";
      }
      if (heroCopy) heroCopy.style.transform = "";
      if (heroStage) heroStage.style.transform = "";
    };

    return () => {
      sectionReveal.disconnect();
      blockReveal.disconnect();
      mutationObserver.disconnect();
      if (cleanupParallax) cleanupParallax();
    };
  }, []);
}
