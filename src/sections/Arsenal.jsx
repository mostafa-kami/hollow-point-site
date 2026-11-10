function RifleArt() {
  return (
    <svg viewBox="0 0 260 92" role="img" aria-label="Assault rifle blueprint">
      <g className="gun">
        <path d="M6 38 L34 33 L48 34 L48 53 L30 57 L10 50 Z" className="gun__fill" />
        <rect x="46" y="33" width="68" height="21" rx="3" />
        <rect x="112" y="36" width="72" height="13" rx="2" />
        <rect x="182" y="40" width="50" height="6" rx="1" />
        <rect x="228" y="36" width="10" height="13" rx="1" />
        <path d="M78 54 L94 54 L100 82 L82 82 Z" className="gun__fill" />
        <path d="M58 54 L72 54 L67 80 L52 80 Z" className="gun__fill" />
        <rect x="86" y="21" width="36" height="10" rx="2" />
        <rect x="98" y="12" width="9" height="10" />
        <rect x="46" y="33" width="68" height="3" className="gun__accent" />
        <path d="M120 30 h20" className="gun__accent-line" />
      </g>
    </svg>
  );
}

function ShotgunArt() {
  return (
    <svg viewBox="0 0 260 92" role="img" aria-label="Breaching shotgun blueprint">
      <g className="gun">
        <path d="M6 36 L34 31 L50 33 L50 52 L32 56 L10 48 Z" className="gun__fill" />
        <rect x="48" y="32" width="62" height="22" rx="3" />
        <rect x="108" y="35" width="128" height="9" rx="2" />
        <rect x="108" y="47" width="120" height="6" rx="3" />
        <rect x="118" y="55" width="48" height="12" rx="3" className="gun__fill" />
        <path d="M64 54 L78 54 L73 82 L58 82 Z" className="gun__fill" />
        <rect x="120" y="22" width="22" height="9" rx="2" />
        <circle cx="131" cy="19" r="4" />
        <rect x="48" y="32" width="62" height="3" className="gun__accent" />
        <path d="M196 34 h24" className="gun__accent-line" />
      </g>
    </svg>
  );
}

function SmgArt() {
  return (
    <svg viewBox="0 0 260 92" role="img" aria-label="Submachine gun blueprint">
      <g className="gun">
        <path d="M14 38 L40 34 L52 40 L52 52 L34 54 L16 48 Z" className="gun__fill" />
        <rect x="58" y="33" width="66" height="23" rx="3" />
        <rect x="122" y="38" width="42" height="8" rx="2" />
        <rect x="162" y="33" width="30" height="16" rx="6" className="gun__fill" />
        <path d="M84 56 L88 84 L104 84 L100 56 Z" className="gun__fill" />
        <rect x="88" y="66" width="12" height="4" rx="1" className="gun__accent" />
        <path d="M62 56 L76 56 L71 82 L56 82 Z" className="gun__fill" />
        <rect x="68" y="22" width="30" height="10" rx="2" />
        <rect x="58" y="33" width="66" height="3" className="gun__accent" />
        <path d="M132 36 h26" className="gun__accent-line" />
      </g>
    </svg>
  );
}

const CARDS = [
  {
    name: 'VK-9 Loom',
    className: 'Assault rifle',
    art: <RifleArt />,
    note: 'The crew default',
    specs: [
      ['Calibre', '5.56'],
      ['RPM', '720'],
      ['Range', 'Mid'],
    ],
  },
  {
    name: 'R-40 Hammer',
    className: 'Breaching shotgun',
    art: <ShotgunArt />,
    note: 'Doors and doubts',
    specs: [
      ['Calibre', '12 ga'],
      ['Feed', 'Pump'],
      ['Range', 'Close'],
    ],
  },
  {
    name: 'Spectre-11',
    className: 'Submachine gun',
    art: <SmgArt />,
    note: 'Room-clearing cadence',
    specs: [
      ['Calibre', '9 mm'],
      ['RPM', '940'],
      ['Range', 'Close'],
    ],
  },
];

export default function Arsenal() {
  return (
    <>
      <div className="slide-head">
        <div>
          <p className="eyebrow" data-anim style={{ '--d': '0.04s' }}>
            <span className="eyebrow__idx">04</span> Arsenal — selection
          </p>
          <h2 className="slide-head__title" data-anim style={{ '--d': '0.12s' }}>
            Three tools. No inventory screens.
          </h2>
        </div>
        <p className="slide-head__note" data-anim style={{ '--d': '0.2s' }}>
          Kit is fixed per operation
          <br />
          Attachments are found, not bought
        </p>
      </div>

      <div className="arsenal">
        <div className="cards">
          {CARDS.map((card, i) => (
            <article
              className="card"
              key={card.name}
              data-anim
              style={{ '--d': `${0.24 + i * 0.12}s` }}
            >
              <div className="card__top">
                <span className="card__idx">{String(i + 1).padStart(2, '0')}</span>
                <span>{card.note}</span>
              </div>

              <div className="card__art">{card.art}</div>

              <span className="card__class">{card.className}</span>
              <h3 className="card__name">{card.name}</h3>

              <dl className="card__specs">
                {card.specs.map(([k, v]) => (
                  <div className="card__spec" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
