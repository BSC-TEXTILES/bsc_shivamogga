import { useEffect } from "react";

const SECTION_SELECTOR = "[data-reveal-section]:not([data-reveal-section='immediate'])";
const REVEAL_SELECTOR = "[data-reveal]";

function makeRevealObserver(rootMargin) {
  const revealed = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (revealed.has(el)) return;
        // Reveal when in/near viewport, or already scrolled past (fast scroll / deep link)
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

    // Mark everything already on/near screen BEFORE enabling hide CSS.
    // Guarantees first paint and in-view content are never blank.
    const pending = new Set();
    allTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + margin) {
        el.classList.add("is-visible");
      } else {
        pending.add(el);
      }
    });

    document.documentElement.classList.add("js-reveal");

    // Sections + inner blocks: ~250px preload (progressive reveal, observe-once)
    const sectionReveal = makeRevealObserver("0px 0px 250px 0px");
    const blockReveal = makeRevealObserver("0px 0px 250px 0px");

    sectionTargets.forEach((el) => {
      if (!el.classList.contains("is-visible")) sectionReveal.observe(el);
    });
    revealTargets.forEach((el) => {
      if (!el.classList.contains("is-visible")) blockReveal.observe(el);
    });

    // Safety net: rAF-throttled passive scroll only while targets remain hidden.
    let rafId = 0;
    let stopped = false;

    const flushPassed = () => {
      rafId = 0;
      if (stopped || pending.size === 0) return;
      const height = window.innerHeight || 800;
      pending.forEach((el) => {
        if (el.classList.contains("is-visible")) {
          pending.delete(el);
          return;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < height + margin) {
          el.classList.add("is-visible");
          sectionReveal.observer.unobserve(el);
          blockReveal.observer.unobserve(el);
          pending.delete(el);
        }
      });
      if (pending.size === 0) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    function onScroll() {
      if (rafId || stopped) return;
      rafId = requestAnimationFrame(flushPassed);
    }

    if (pending.size > 0) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Late-mounted sections (React.lazy / DeferredSection) must join the same observers.
    const observeNew = (el) => {
      if (!el || el.nodeType !== 1) return;
      const candidates = [];
      if (el.matches?.(SECTION_SELECTOR) || el.matches?.(REVEAL_SELECTOR)) candidates.push(el);
      el.querySelectorAll?.(SECTION_SELECTOR + "," + REVEAL_SELECTOR).forEach((n) => candidates.push(n));
      candidates.forEach((node) => {
        if (node.classList.contains("is-visible")) return;
        const rect = node.getBoundingClientRect();
        if (rect.top < vh + margin || rect.top < 0) {
          node.classList.add("is-visible");
          pending.delete(node);
          return;
        }
        pending.add(node);
        if (node.matches?.(SECTION_SELECTOR)) sectionReveal.observe(node);
        else blockReveal.observe(node);
      });
      if (pending.size > 0) {
        window.addEventListener("scroll", onScroll, { passive: true });
      }
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

    // Desktop-Only Physics & 3D Parallax with Zero Forced Reflows
    let cleanupParallax = null;

    if (!isCoarse) {
      let targetScrollY = window.scrollY || 0;
      let currentScrollY = window.scrollY || 0;
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let isRunning = false;
      let rafParallaxId = 0;

      const heroCard = document.querySelector(".hero-card");
      const heroCopy = document.querySelector(".hero-copy");

      function measureLayout() {
        // reserved for future depth cards; hero parallax does not need metrics
      }

      const initTimer = setTimeout(measureLayout, 150);

      function lerp(start, end, factor) {
        return start + (end - start) * factor;
      }

      function clamp(val, min, max) {
        return val < min ? min : val > max ? max : val;
      }

      function updateHero() {
        if (!heroCard && !heroCopy) return;

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
      }

      function renderLoop() {
        const scrollDiff = targetScrollY - currentScrollY;
        if (Math.abs(scrollDiff) > 0.1) {
          currentScrollY = lerp(currentScrollY, targetScrollY, 0.14);
        } else {
          currentScrollY = targetScrollY;
        }

        const mxDiff = targetMouseX - currentMouseX;
        const myDiff = targetMouseY - currentMouseY;
        if (Math.abs(mxDiff) > 0.002 || Math.abs(myDiff) > 0.002) {
          currentMouseX = lerp(currentMouseX, targetMouseX, 0.08);
          currentMouseY = lerp(currentMouseY, targetMouseY, 0.08);
        } else {
          currentMouseX = targetMouseX;
          currentMouseY = targetMouseY;
        }

        updateHero();

        const isStillSettling =
          Math.abs(targetScrollY - currentScrollY) > 0.15 ||
          Math.abs(targetMouseX - currentMouseX) > 0.003 ||
          Math.abs(targetMouseY - currentMouseY) > 0.003;

        if (isStillSettling) {
          rafParallaxId = requestAnimationFrame(renderLoop);
        } else {
          isRunning = false;
        }
      }

      function wakeLoop() {
        if (!isRunning) {
          isRunning = true;
          rafParallaxId = requestAnimationFrame(renderLoop);
        }
      }

      function onParallaxScroll() {
        targetScrollY = window.scrollY || 0;
        wakeLoop();
      }

      function onPointerMove(e) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetMouseX = clamp((e.clientX - cx) / cx, -1, 1);
        targetMouseY = clamp((e.clientY - cy) / cy, -1, 1);
        wakeLoop();
      }

      function onPointerLeave() {
        targetMouseX = 0;
        targetMouseY = 0;
        wakeLoop();
      }

      let resizeTimer;
      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          measureLayout();
          wakeLoop();
        }, 150);
      }

      window.addEventListener("scroll", onParallaxScroll, { passive: true });
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);

      wakeLoop();

      cleanupParallax = () => {
        if (rafParallaxId) cancelAnimationFrame(rafParallaxId);
        clearTimeout(initTimer);
        clearTimeout(resizeTimer);
        window.removeEventListener("scroll", onParallaxScroll);
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("resize", onResize);
        document.documentElement.removeEventListener("mouseleave", onPointerLeave);
        if (heroCard) heroCard.style.transform = "";
        if (heroCopy) heroCopy.style.transform = "";
      };
    }

    return () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      sectionReveal.disconnect();
      blockReveal.disconnect();
      mutationObserver.disconnect();
      if (cleanupParallax) cleanupParallax();
    };
  }, []);
}
