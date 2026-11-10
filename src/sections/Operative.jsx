import OperativeViewer from '../components/OperativeViewer.jsx';

const SPECS = [
  ['Role', 'Point scout · breacher'],
  ['Height', '1.72 m'],
  ['Loadout', 'VK-9 / sidearm'],
  ['Clearance', 'Tier II'],
];

const GEAR = [
  ['Comms rig', 'Dual-band, bone-conduction, 9 h battery'],
  ['Plate carrier MK.IV', 'Level III ceramic, front and back'],
  ['Drop holster', 'Right thigh, quick-release retention'],
  ['Cargo trousers', 'Ripstop, articulated knee inserts'],
];

export default function Operative({ active }) {
  return (
    <>
      <div className="slide-head">
        <div>
          <p className="eyebrow" data-anim style={{ '--d': '0.04s' }}>
            <span className="eyebrow__idx">03</span> Operative — real-time 3D
          </p>
          <h2 className="slide-head__title" data-anim style={{ '--d': '0.12s' }}>
            Point scout, breacher, first through the door.
          </h2>
        </div>
        <p className="slide-head__note" data-anim style={{ '--d': '0.2s' }}>
          Rendered live in your browser
          <br />
          Drag to rotate · Scroll to zoom
        </p>
      </div>

      <div className="operative">
        <OperativeViewer active={active} />

        <aside className="dossier" data-no-swipe data-anim style={{ '--d': '0.24s' }}>
          <span className="label-mono">Dossier — 01</span>
          <p className="dossier__call">Callsign — Sparrow</p>
          <h3 className="dossier__name">Mara Voss</h3>

          <p className="dossier__text">
            Fast on stairs, faster on comms. Sparrow moves ahead of the crew to read a room before it
            becomes a firefight — clearing angles, calling contacts, and holding the door until the
            rest of the team is through it.
          </p>

          <dl className="spec-list">
            {SPECS.map(([k, v]) => (
              <div className="spec" key={k}>
                <dt className="spec__k">{k}</dt>
                <dd className="spec__v">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="gear">
            {GEAR.map(([name, detail], i) => (
              <div className="gear__item" key={name}>
                <span className="gear__idx">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="gear__name">{name}</span>
                  <span className="gear__detail">{detail}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="dossier__note">
            Markers 01–03 highlight issued equipment. This model is the in-game preview rig, shown
            here at final art detail.
          </p>
        </aside>
      </div>
    </>
  );
}
