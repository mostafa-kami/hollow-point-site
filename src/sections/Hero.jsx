const MARQUEE = [
  'Hollow Point',
  'Reveal — Q2 2027',
  'Northline Works',
  'PC / PS5 / Series X|S',
  'Six hours of silence',
];

function Reticle() {
  return (
    <svg className="reticle" viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <circle cx="120" cy="120" r="104" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 7" />
      <circle cx="120" cy="120" r="78" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="120" cy="120" r="54" stroke="currentColor" strokeWidth="0.7" strokeDasharray="18 12" />
      <circle className="ret-signal" cx="120" cy="120" r="30" stroke="currentColor" strokeWidth="0.9" />
      <path d="M120 4v46M120 190v46M4 120h46M190 120h46" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M120 100v40M100 120h40"
        stroke="currentColor"
        strokeWidth="1.1"
        className="ret-signal"
      />
      <circle cx="120" cy="120" r="3.2" fill="#ff5a1f" />
      <path d="M36 62l16 16M204 62l-16 16M36 178l16-16M204 178l-16-16" stroke="currentColor" strokeWidth="0.7" />
      <path d="M120 16v10M120 214v10M16 120h10M214 120h10" stroke="#ff5a1f" strokeWidth="1.4" opacity="0.75" />
    </svg>
  );
}

export default function Hero({ go }) {
  return (
    <>
      <div className="hero__main">
        <div className="hero__lead">
          <p className="eyebrow" data-anim style={{ '--d': '0.05s' }}>
            <span className="eyebrow__idx">00</span> Official reveal — Northline Works
          </p>

          <h1 className="hero__title">
            <span className="hero__line">
              <span style={{ '--d': '0.12s' }}>Hollow</span>
            </span>
            <span className="hero__line hero__line--ghost">
              <span style={{ '--d': '0.24s' }}>Point</span>
            </span>
          </h1>

          <p className="hero__sub" data-anim style={{ '--d': '0.46s' }}>
            Six hours of silence. One block of contested city. The four-person crew that refused to let
            it fall.
          </p>

          <div className="hero__cta" data-anim style={{ '--d': '0.6s' }}>
            <button className="btn btn--signal" onClick={() => go(2)}>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__label">Preview the operative</span>
              <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
            <button className="btn" onClick={() => go(1)}>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__label">Read the intel</span>
            </button>
          </div>
        </div>

        <aside className="hero__aside" data-anim style={{ '--d': '0.72s' }}>
          <Reticle />
          <dl className="hero__meta">
            <div>
              <dt>Release</dt>
              <dd>Q2 2027</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>PC · PS5 · Series X|S</dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>Solo + 3-player co-op</dd>
            </div>
          </dl>
          <div className="hero__scroll">
            <span aria-hidden="true" />
            Scroll to advance
          </div>
        </aside>
      </div>

      <div className="marquee" aria-hidden="true">
        {[0, 1].map((row) => (
          <div className="marquee__row" key={row}>
            {[0, 1, 2].map((group) => (
              <div className="marquee__group" key={group}>
                {MARQUEE.map((item) => (
                  <span className="marquee__item" key={item}>
                    <span className="marquee__star">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
