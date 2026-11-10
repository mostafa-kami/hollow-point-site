const BLOCKS = [
  [22, 34, 62, 46],
  [96, 26, 48, 38],
  [156, 30, 58, 34],
  [226, 22, 42, 52],
  [280, 34, 54, 40],
  [346, 28, 40, 46],
  [20, 98, 52, 44],
  [84, 84, 40, 58],
  [136, 92, 62, 50],
  [212, 92, 34, 40],
  [258, 88, 52, 56],
  [322, 96, 62, 44],
  [30, 160, 46, 58],
  [90, 154, 58, 44],
  [160, 152, 38, 62],
  [210, 146, 56, 50],
  [278, 156, 44, 56],
  [334, 150, 52, 62],
  [24, 234, 64, 38],
  [100, 214, 44, 54],
  [156, 226, 52, 42],
  [220, 214, 46, 54],
  [278, 224, 60, 44],
  [350, 228, 38, 40],
];

const THREATS = [
  { label: 'Hostile density', value: '84%', width: '84%' },
  { label: 'Civilian presence', value: '12%', width: '12%' },
  { label: 'Extraction viability', value: '31%', width: '31%' },
];

export default function Intel() {
  return (
    <>
      <div className="slide-head">
        <div>
          <p className="eyebrow" data-anim style={{ '--d': '0.04s' }}>
            <span className="eyebrow__idx">02</span> Intel — the premise
          </p>
          <h2 className="slide-head__title" data-anim style={{ '--d': '0.12s' }}>
            The city went dark at 04:12.
          </h2>
        </div>
        <p className="slide-head__note" data-anim style={{ '--d': '0.2s' }}>
          District 11 · live tactical feed
          <br />
          Four operators · no relief coming
        </p>
      </div>

      <div className="intel">
        <div className="intel__copy">
          <p className="intel__lead" data-anim style={{ '--d': '0.24s' }}>
            By dawn, only <em>one crew</em> was still answering.
          </p>

          <div className="intel__body" data-anim style={{ '--d': '0.32s' }}>
            <p>
              A blackout rolls through the eastern districts and takes the grid with it. No comms, no
              streetlights, no way to tell a neighbour from a muzzle flash. Hollow Point is a
              close-quarters tactical shooter about moving through a city you can no longer read.
            </p>
            <p>
              You lead Mara Voss and three other operators block by block, clearing stairwells and
              rooftops while the clock runs down. No respawns, no map markers — just sound, sightlines
              and the people beside you.
            </p>
          </div>

          <div className="intel__stats" data-anim style={{ '--d': '0.4s' }}>
            <div className="stat">
              <span className="stat__num">04</span>
              <span className="stat__label">Operators</span>
            </div>
            <div className="stat">
              <span className="stat__num">
                11<span>+</span>
              </span>
              <span className="stat__label">Districts</span>
            </div>
            <div className="stat">
              <span className="stat__num">72<span>h</span></span>
              <span className="stat__label">Of silence</span>
            </div>
          </div>

          <div className="threats" data-anim style={{ '--d': '0.48s' }}>
            {THREATS.map((threat) => (
              <div className="threat" key={threat.label}>
                <span className="threat__k">{threat.label}</span>
                <span className="threat__v">{threat.value}</span>
                <span className="threat__bar">
                  <span className="threat__fill" style={{ '--w': threat.width }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="map" data-anim style={{ '--d': '0.3s' }}>
          <div className="map__chrome">
            <span>District 11 — live feed</span>
            <span>04:12:09</span>
          </div>

          <svg className="map__svg" viewBox="0 0 420 300" aria-label="Abstract district map with the crew route">
            <g className="map__blocks">
              {BLOCKS.map(([x, y, w, h], i) => (
                <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} className={i % 7 === 3 ? 'hot' : undefined} />
              ))}
            </g>

            <path
              className="map__route"
              d="M40 268 L40 236 L124 236 L124 168 L214 168 L214 106 L302 106 L302 54 L374 54"
            />

            <g className="map__target">
              <circle cx="302" cy="106" r="13" />
              <circle cx="302" cy="106" r="25" />
            </g>

            <circle className="map__dot" r="3.6">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path="M40 268 L40 236 L124 236 L124 168 L214 168 L214 106 L302 106 L302 54 L374 54"
              />
            </circle>

            <text x="312" y="96" fill="rgba(236,235,230,.55)" fontSize="7" fontFamily="monospace" letterSpacing="1.5">
              RALLY POINT
            </text>
            <text x="42" y="286" fill="rgba(236,235,230,.35)" fontSize="6.5" fontFamily="monospace" letterSpacing="1.5">
              INSERTION
            </text>
          </svg>

          <span className="map__scan" aria-hidden="true" />

          <div className="map__legend">
            <span>
              <i className="map__key" /> Crew route
            </span>
            <span>
              <i className="map__key map__key--ash" /> Structures
            </span>
            <span>0 hostiles confirmed</span>
          </div>
        </div>
      </div>
    </>
  );
}
