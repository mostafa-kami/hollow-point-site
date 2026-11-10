import { useEffect, useRef, useState } from 'react';
import { createOperativeScene } from '../three/operativeScene.js';

const MARKERS = [
  { id: 'head', n: '01', label: 'Comms rig — dual-band' },
  { id: 'chest', n: '02', label: 'Plate carrier — level III' },
  { id: 'leg', n: '03', label: 'Drop holster — quick release' },
];

export default function OperativeViewer({ active }) {
  const hostRef = useRef(null);
  const labels = useRef({});
  const api = useRef(null);
  const [auto, setAuto] = useState(true);
  const [wire, setWire] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let scene;
    try {
      scene = createOperativeScene(host, { getLabels: () => labels.current });
    } catch (error) {
      console.error('[operative] could not start the 3D preview', error);
      setFailed(true);
      return undefined;
    }

    api.current = scene;
    return () => {
      api.current = null;
      scene.dispose();
    };
  }, []);

  useEffect(() => {
    api.current?.setActive(!!active);
  }, [active]);

  useEffect(() => {
    api.current?.setAutoRotate(auto);
  }, [auto]);

  useEffect(() => {
    api.current?.setWireframe(wire);
  }, [wire]);

  return (
    <div className="viewer" data-no-swipe>
      <div className="viewer__grid" aria-hidden="true" />
      <div className="viewer__canvas" ref={hostRef} />

      {failed ? (
        <div className="viewer__fallback">
          3D preview unavailable — this browser could not start WebGL.
        </div>
      ) : null}

      <div className="viewer__hud" aria-hidden={failed ? 'true' : undefined}>
        <span className="hud-corner hud-corner--tl" />
        <span className="hud-corner hud-corner--tr" />
        <span className="hud-corner hud-corner--bl" />
        <span className="hud-corner hud-corner--br" />

        <span className="viewer__tag">
          <span className="live-dot" /> Live 3D — <b>Mara Voss</b>
        </span>
        <span className="viewer__hint">Drag to rotate · Scroll to zoom</span>

        <div className="viewer__controls">
          <button
            type="button"
            className="chip-btn"
            data-on={auto}
            aria-pressed={auto}
            onClick={() => setAuto((value) => !value)}
          >
            Auto-rotate
          </button>
          <button
            type="button"
            className="chip-btn"
            data-on={wire}
            aria-pressed={wire}
            onClick={() => setWire((value) => !value)}
          >
            Wireframe
          </button>
          <button
            type="button"
            className="chip-btn"
            onClick={() => api.current?.resetView()}
          >
            Reset view
          </button>
        </div>

        <span className="viewer__scale" aria-hidden="true">
          <i />
          Scale 1.72 m
        </span>
      </div>

      {MARKERS.map((marker) => (
        <button
          key={marker.id}
          type="button"
          tabIndex={-1}
          className="hotspot"
          aria-label={marker.label}
          ref={(element) => {
            labels.current[marker.id] = element;
          }}
        >
          <span className="hotspot__dot">{marker.n}</span>
          <span className="hotspot__label">{marker.label}</span>
        </button>
      ))}
    </div>
  );
}
