import { useCallback, useEffect, useRef, useState } from 'react';
import Hero from './sections/Hero.jsx';
import Intel from './sections/Intel.jsx';
import Operative from './sections/Operative.jsx';
import Arsenal from './sections/Arsenal.jsx';
import Deploy from './sections/Deploy.jsx';

const SLIDES = [
  { id: 'briefing', label: 'Briefing', short: 'Brief' },
  { id: 'intel', label: 'Intel', short: 'Intel' },
  { id: 'operative', label: 'Operative 3D', short: '3D' },
  { id: 'arsenal', label: 'Arsenal', short: 'Gear' },
  { id: 'release', label: 'Deploy', short: 'Release' },
];

const clamp = (n) => Math.max(0, Math.min(SLIDES.length - 1, n));

export default function App() {
  const [index, setIndex] = useState(0);
  const [deckMode, setDeckMode] = useState(false);
  const [booted, setBooted] = useState(false);
  const deckRef = useRef(null);

  /* let the first slide paint in its resting state, then play the reveal */
  useEffect(() => {
    const id = requestAnimationFrame(() => setBooted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const go = useCallback(
    (next) => {
      const target = clamp(next);
      setIndex(target);
      if (!deckMode) {
        document
          .getElementById(`slide-${SLIDES[target].id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [deckMode],
  );

  /* desktop deck mode */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const sync = () => setDeckMode(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', deckMode);
    return () => document.body.classList.remove('is-locked');
  }, [deckMode]);

  /* wheel navigation */
  useEffect(() => {
    if (!deckMode) return undefined;
    let lockedUntil = 0;

    const onWheel = (event) => {
      if (event.target.closest?.('[data-no-swipe]')) return;
      event.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      if (Math.abs(event.deltaY) < 8) return;
      lockedUntil = now + 1000;
      setIndex((current) => clamp(current + (event.deltaY > 0 ? 1 : -1)));
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [deckMode]);

  /* keyboard navigation */
  useEffect(() => {
    if (!deckMode) return undefined;

    const onKey = (event) => {
      if (event.target.closest?.('input, textarea, select')) return;
      const key = event.key;
      if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(key)) {
        event.preventDefault();
        setIndex((current) => clamp(current + 1));
      } else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(key)) {
        event.preventDefault();
        setIndex((current) => clamp(current - 1));
      } else if (key === 'Home') {
        event.preventDefault();
        setIndex(0);
      } else if (key === 'End') {
        event.preventDefault();
        setIndex(SLIDES.length - 1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deckMode]);

  /* touch / pointer swipe */
  useEffect(() => {
    if (!deckMode) return undefined;
    const node = deckRef.current;
    if (!node) return undefined;

    let startX = null;
    let startY = null;

    const onDown = (event) => {
      if (event.target.closest?.('[data-no-swipe]')) return;
      startX = event.clientX;
      startY = event.clientY;
    };

    const onUp = (event) => {
      if (startX === null || startY === null) return;
      const dy = event.clientY - startY;
      const dx = event.clientX - startX;
      startX = null;
      startY = null;
      if (Math.abs(dy) < 64 || Math.abs(dy) < Math.abs(dx) * 1.2) return;
      setIndex((current) => clamp(current + (dy < 0 ? 1 : -1)));
    };

    const onCancel = () => {
      startX = null;
      startY = null;
    };

    node.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
    return () => {
      node.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
    };
  }, [deckMode]);

  /* stacked layout: keep the active index in sync with scroll position */
  useEffect(() => {
    if (deckMode) return undefined;
    const nodes = SLIDES.map((slide) => document.getElementById(`slide-${slide.id}`)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
          const found = nodes.indexOf(entry.target);
          if (found >= 0) setIndex(found);
        });
      },
      { threshold: [0.45, 0.6, 0.85] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [deckMode]);

  /* ambient light follows the pointer */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    let x = 72;
    let y = 22;

    const onMove = (event) => {
      x = (event.clientX / window.innerWidth) * 100;
      y = (event.clientY / window.innerHeight) * 100;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const root = document.documentElement;
        root.style.setProperty('--mx', `${x.toFixed(2)}%`);
        root.style.setProperty('--my', `${y.toFixed(2)}%`);
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const panels = [
    <Hero go={go} />,
    <Intel />,
    <Operative active={index === 2} />,
    <Arsenal />,
    <Deploy />,
  ];

  return (
    <div className="app">
      <div className="ambient" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      <header className="site-header">
        <button className="brand" onClick={() => go(0)} aria-label="Hollow Point — back to briefing">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            <span className="brand__name">Hollow Point</span>
            <span className="brand__sub">Northline Works — Reveal</span>
          </span>
        </button>

        <nav className="tabs" aria-label="Sections">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              className="tab"
              data-active={i === index}
              onClick={() => go(i)}
              aria-current={i === index ? 'true' : undefined}
            >
              <span className="tab__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="tab__label">{slide.label}</span>
            </button>
          ))}
        </nav>

        <div className="header__chip">
          <span className="live-dot" aria-hidden="true" />
          Reveal build 0.9 — Q2 2027
        </div>
      </header>

      <main className="deck" ref={deckRef}>
        <div
          className="deck__track"
          style={
            deckMode
              ? { transform: `translate3d(0, calc(${-index} * 100dvh), 0)` }
              : undefined
          }
        >
          {SLIDES.map((slide, i) => (
            <section
              key={slide.id}
              id={`slide-${slide.id}`}
              className={`slide ${i === index && booted ? 'is-active' : ''}`}
              aria-label={slide.label}
            >
              {panels[i]}
            </section>
          ))}
        </div>
      </main>

      <nav className="rail" aria-label="Slide position">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className="rail__btn"
            data-active={i === index}
            onClick={() => go(i)}
            aria-label={`Go to ${slide.label}`}
          >
            <span className="rail__label">{slide.label}</span>
            <span className="rail__bar" aria-hidden="true" />
            <span className="rail__num">{String(i + 1).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>

      <nav className="tabbar" aria-label="Sections">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            className="tabbar__btn"
            data-active={i === index}
            onClick={() => go(i)}
          >
            <span className="tabbar__num">{String(i + 1).padStart(2, '0')}</span>
            {slide.short}
          </button>
        ))}
      </nav>

      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
