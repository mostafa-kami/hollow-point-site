import { useEffect, useState } from 'react';

const TARGET = new Date('2027-05-14T00:00:00Z').getTime();

function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, TARGET - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.floor(left / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    mins: Math.floor(total / 60) % 60,
    secs: total % 60,
  };
}

const pad = (n, size = 2) => String(n).padStart(size, '0');

export default function Deploy() {
  const { days, hours, mins, secs } = useCountdown();

  return (
    <>
      <div className="slide-head">
        <div>
          <p className="eyebrow" data-anim style={{ '--d': '0.04s' }}>
            <span className="eyebrow__idx">05</span> Deploy — release
          </p>
        </div>
        <p className="slide-head__note" data-anim style={{ '--d': '0.12s' }}>
          Nothing to buy. Nothing to pre-order.
          <br />
          Just the date and the crew.
        </p>
      </div>

      <div className="deploy">
        <div>
          <h2 className="deploy__big" data-anim style={{ '--d': '0.14s' }}>
            Q2 <em>2027</em>
          </h2>

          <p className="deploy__date" data-anim style={{ '--d': '0.24s' }}>
            <b>14 May 2027</b> — Worldwide
          </p>

          <p className="deploy__note" data-anim style={{ '--d': '0.32s' }}>
            A single-player campaign at launch, with three-player co-op strikes arriving post-release.
            Hollow Point is a showcase build — no store, no cart, no microtransactions anywhere on this
            site.
          </p>

          <div className="deploy__foot" data-anim style={{ '--d': '0.42s' }}>
            <span>© 2026 Northline Works — fictional game showcase</span>
            <span className="deploy__social">
              <span>@hollowpoint</span>
              <span>#HollowPoint</span>
            </span>
          </div>
        </div>

        <div className="countdown" data-anim style={{ '--d': '0.26s' }}>
          <div className="count__head">
            <span>Countdown to deploy</span>
            <span>UTC</span>
          </div>

          <div className="count__grid">
            <div className="count__cell">
              <span className="count__num">{pad(days, 3)}</span>
              <span className="count__label">Days</span>
            </div>
            <div className="count__cell">
              <span className="count__num">{pad(hours)}</span>
              <span className="count__label">Hours</span>
            </div>
            <div className="count__cell">
              <span className="count__num">{pad(mins)}</span>
              <span className="count__label">Min</span>
            </div>
            <div className="count__cell">
              <span className="count__num">{pad(secs)}</span>
              <span className="count__label">Sec</span>
            </div>
          </div>

          <div className="platforms">
            <span className="platform">Windows PC</span>
            <span className="platform">PlayStation 5</span>
            <span className="platform">Xbox Series X|S</span>
          </div>
        </div>
      </div>
    </>
  );
}
