import React from "react";
import dirUmapathy from "../assets/dir-umapathy.jpg";
import dirChandrashekar from "../assets/dir-chandrashekar.jpg";
import dirVed from "../assets/dir-ved.jpg";

function StatCounter({ target, suffix = "", prefix = "" }) {
  const [count, setCount] = React.useState(0);
  const elRef = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = performance.now();

          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out expo
            const current = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elRef} className="stat-number">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Legacy() {
  const leaders = [
    {
      name: "B.C. UMAPATHY",
      role: "Director",
      image: dirUmapathy,
      width: 275,
      height: 335
    },
    {
      name: "B.U. CHANDRASHEKAR",
      role: "Managing Director",
      image: dirChandrashekar,
      width: 280,
      height: 335
    },
    {
      name: "VED BANKAPUR",
      role: "Director",
      image: dirVed,
      width: 280,
      height: 335
    }
  ];

  const stats = [
    { label: "FOUNDED IN", value: 1938, prefix: "", suffix: "", note: "Davangere Roots" },
    { label: "YEARS OF TRUST", value: 88, prefix: "", suffix: "+", note: "Living Heritage" },
    { label: "GENERATIONS", value: 5, prefix: "", suffix: "", note: "Family Continuity" },
    { label: "MEGA SHOWROOMS", value: 3, prefix: "", suffix: "", note: "Karnataka Presence" },
    { label: "HAPPY SHOPPERS", value: 100, prefix: "", suffix: "K+", note: "Generations of Smiles" }
  ];

  return (
    <section className="section legacy" id="legacy" data-reveal-section aria-labelledby="legacy-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Since 1938</p>
          <h2 id="legacy-title">BSC Legacy</h2>
          <span className="rule" aria-hidden="true" />
        </header>

        {/* Brand Story and Leadership */}
        <div className="legacy-grid">
          <div className="legacy-copy" data-reveal>
            <p className="lead-para">
              <strong>Established in 1938</strong>, BSC has grown from humble beginnings in Davanagere into a trusted name in fashion and textiles — a legacy shaped by quality, tradition, and enduring relationships.
            </p>
            <p>
              Carried forward through <strong>five generations</strong>, BSC today stands as a leading family fashion destination, with a growing presence across <strong>Davanagere, Belagavi &amp; Shivamogga</strong>.
            </p>
            <p>
              Blending timeless tradition with contemporary fashion and exceptional choice, BSC continues to redefine the family shopping experience — an <strong>exceptional choice for complete family shopping</strong>.
            </p>
            <p className="legacy-footnote">
              Led by MR. UMAPATHY BANKAPUR, MR. CHANDRASHEKAR BANKAPUR &amp; MR. VED BANKAPUR, BSC proudly carries forward its rich five-generation legacy into a new era.
            </p>
          </div>

          <ul className="leaders">
            {leaders.map((leader) => (
              <li key={leader.name} className="leader-card" data-reveal>
                <div className="leader-photo">
                  <img
                    src={leader.image}
                    alt={`${leader.name}, ${leader.role}`}
                    width={leader.width}
                    height={leader.height}
                    loading="lazy"
                  />
                </div>
                <div className="leader-info">
                  <h3>{leader.name}</h3>
                  <p>{leader.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated Statistics Hub */}
        <div className="legacy-stats-bar" data-reveal>
          <div className="stats-inner-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-val-wrap">
                  <StatCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="stat-label">{stat.label}</p>
                <span className="stat-note">{stat.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
