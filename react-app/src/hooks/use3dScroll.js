import { useEffect } from "react";

export function use3dScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 860px)").matches || window.matchMedia("(pointer: coarse)").matches;

    // 1. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll("[data-reveal]");
    if (prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add("is-visible"));
    } else {
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
      revealElements.forEach((el) => observer.observe(el));
    }

    if (prefersReducedMotion) return;

    // 2. Physics & Parallax State
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = window.scrollY || 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let isRunning = false;

    const hero = document.getElementById("hero");
    const heroBg = document.querySelector(".hero-bg");
    const heroCard = document.querySelector(".hero-card");
    const heroCopy = document.querySelector(".hero-copy");

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function clamp(val, min, max) {
      return val < min ? min : val > max ? max : val;
    }

    function updateHero() {
      if (!hero) return;
      const heroH = hero.offsetHeight || window.innerHeight;
      const progress = clamp(currentScrollY / heroH, 0, 1.25);
      const mobileFactor = isMobile ? 0.35 : 1.0;
      const pointerFactor = isMobile ? 0 : 1.0;

      if (heroBg) {
        const zBg = -110 - progress * 80 * mobileFactor;
        const scaleBg = 1.08 + progress * 0.05;
        const yBg = progress * 35 * mobileFactor;
        heroBg.style.transform = `translate3d(0, ${yBg.toFixed(2)}px, ${zBg.toFixed(2)}px) scale(${scaleBg.toFixed(4)})`;
      }

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
        requestAnimationFrame(renderLoop);
      } else {
        isRunning = false;
      }
    }

    function wakeLoop() {
      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(renderLoop);
      }
    }

    function onScroll() {
      targetScrollY = window.scrollY || 0;
      wakeLoop();
    }

    function onPointerMove(e) {
      if (isMobile) return;
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

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    wakeLoop();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);
}
