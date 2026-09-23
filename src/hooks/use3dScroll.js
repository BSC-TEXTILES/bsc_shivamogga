import { useEffect } from "react";

export function use3dScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse =
      window.matchMedia("(max-width: 960px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    // 1. Intersection Observer for Smooth Scroll Reveals
    const revealElements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.05 }
    );

    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
    } else {
      document.documentElement.classList.add("js-reveal");
      revealElements.forEach((el) => observer.observe(el));
    }

    if (prefersReducedMotion) {
      return () => observer.disconnect();
    }

    // 2. Physics & 3D Parallax with Zero Layout Thrashing
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = window.scrollY || 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let isRunning = false;
    let rafId = 0;

    const hero = document.getElementById("hero");
    const heroCard = document.querySelector(".hero-card");
    const heroCopy = document.querySelector(".hero-copy");
    const depthCards = document.querySelectorAll(
      ".invite-frame, .location-card, .leader-card, .qr-panel"
    );

    // Cache metrics to eliminate layout recalculations on scroll frames
    let vh = window.innerHeight || 800;
    let heroH = hero ? hero.offsetHeight || vh : vh;
    let cardMetrics = [];

    function measureLayout() {
      vh = window.innerHeight || 800;
      if (hero) heroH = hero.offsetHeight || vh;
      const scrollY = window.scrollY || 0;
      cardMetrics = Array.from(depthCards).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          top: rect.top + scrollY,
          height: rect.height || 300
        };
      });
    }

    // Measure initially after render
    measureLayout();

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function clamp(val, min, max) {
      return val < min ? min : val > max ? max : val;
    }

    function updateHero() {
      if (!hero) return;
      const progress = clamp(currentScrollY / heroH, 0, 1.25);
      const mobileFactor = isCoarse ? 0.35 : 1.0;
      const pointerFactor = isCoarse ? 0 : 1.0;

      if (heroCard) {
        const zCard = 40 - progress * 90 * mobileFactor;
        const yCard = -progress * 55 * mobileFactor;
        const rotXCard = currentMouseY * 3.5 * pointerFactor + progress * 2.5 * mobileFactor;
        const rotYCard = currentMouseX * -4.0 * pointerFactor;
        const xCard = currentMouseX * 10 * pointerFactor;
        heroCard.style.transform = `translate3d(${xCard.toFixed(2)}px, ${yCard.toFixed(2)}px, ${zCard.toFixed(2)}px) rotateX(${rotXCard.toFixed(2)}deg) rotateY(${rotYCard.toFixed(2)}deg)`;
      }

      if (heroCopy) {
        const zCopy = 60 + progress * 30 * mobileFactor;
        const yCopy = -progress * 90 * mobileFactor;
        const xCopy = currentMouseX * 6 * pointerFactor;
        heroCopy.style.transform = `translate3d(${xCopy.toFixed(2)}px, ${yCopy.toFixed(2)}px, ${zCopy.toFixed(2)}px)`;
      }
    }

    function updateDepthCards() {
      const mobileFactor = isCoarse ? 0.3 : 1.0;
      cardMetrics.forEach(({ el, top, height }) => {
        const elTop = top - currentScrollY;
        if (elTop + height < -80 || elTop > vh + 80) {
          if (el.style.transform) el.style.transform = "";
          return;
        }
        const progress = clamp((vh - elTop) / (vh + height), 0, 1);
        const offset = (0.5 - progress) * 28 * mobileFactor;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
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
      updateDepthCards();

      const isStillSettling =
        Math.abs(targetScrollY - currentScrollY) > 0.15 ||
        Math.abs(targetMouseX - currentMouseX) > 0.003 ||
        Math.abs(targetMouseY - currentMouseY) > 0.003;

      if (isStillSettling) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        isRunning = false;
      }
    }

    function wakeLoop() {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(renderLoop);
      }
    }

    function onScroll() {
      targetScrollY = window.scrollY || 0;
      wakeLoop();
    }

    function onPointerMove(e) {
      if (isCoarse) return;
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    wakeLoop();

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      cardMetrics.forEach(({ el }) => {
        el.style.transform = "";
      });
      if (heroCard) heroCard.style.transform = "";
      if (heroCopy) heroCopy.style.transform = "";
    };
  }, []);
}
