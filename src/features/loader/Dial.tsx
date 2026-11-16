import { bearingLabels, dialTicks } from "./dial-geometry";
import styles from "./loader.module.css";

const OUTER = 150;
const TICK_RING = 138;
const INNER = 100;
const CORE = 64;

function TickRing() {
  return (
    <g className={styles.ticks}>
      {dialTicks().map(({ angle, major }) => (
        <line
          key={angle}
          y1={-TICK_RING}
          y2={-TICK_RING + (major ? 10 : 5)}
          transform={`rotate(${angle})`}
          className={major ? styles.major : styles.minor}
        />
      ))}
      {bearingLabels(TICK_RING - 20).map((label) => (
        <text
          key={label.text}
          x={label.x}
          y={label.y}
          className={styles.bearing}
        >
          {label.text}
        </text>
      ))}
    </g>
  );
}

function Compass({ location }: { location: string }) {
  return (
    <g>
      <g className={styles.inner}>
        <circle r={INNER} className={styles.dashed} />
        {[0, 90, 180, 270].map((angle) => (
          <path
            key={angle}
            d={`M0 ${-INNER - 4} l4 4 l-4 4 l-4 -4 Z`}
            transform={`rotate(${angle})`}
            className={styles.diamond}
          />
        ))}
      </g>
      <path
        d={`M0 ${-INNER + 8} V${-CORE} M0 ${CORE} V${INNER - 8} M${-INNER + 8} 0 H${-CORE} M${CORE} 0 H${INNER - 8}`}
        className={styles.minor}
      />
      <circle r={CORE} className={styles.ring} />
      <text y={8} className={styles.monogram}>
        MH
      </text>
      <text y={30} className={styles.place}>
        {location}
      </text>
    </g>
  );
}

/** Compass-style progress dial; the arc and marker follow the CSS --progress value. */
export function Dial({ location }: { location: string }) {
  return (
    <svg viewBox="-160 -160 320 320" className={styles.dial}>
      <circle r={OUTER} className={styles.track} />
      <circle r={OUTER} pathLength={100} className={styles.arc} />
      <g className={styles.marker}>
        <path d={`M0 ${-OUTER - 6} l5 6 l-5 6 l-5 -6 Z`} />
      </g>
      <TickRing />
      <Compass location={location} />
    </svg>
  );
}
