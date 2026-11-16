import { art, stagger } from "./art";
import { calloutBox, type CalloutSpec } from "./callout-geometry";
import { linePath, roundedRectPath } from "./geometry";

interface CalloutsProps {
  specs: readonly CalloutSpec[];
  /** Tags verified against the project's data; specs for other tags are skipped. */
  tags: readonly string[];
  /** Entrance position, after the scene's own drawing. */
  start: number;
}

/** Blueprint-style labels pointing at parts of a scene. */
export function Callouts({ specs, tags, start }: CalloutsProps) {
  const known = new Set(tags.map((tag) => tag.toLowerCase()));
  const visible = specs.filter((spec) => known.has(spec.tag.toLowerCase()));
  return visible.map((spec, i) => {
    const box = calloutBox(spec, spec.tag);
    return (
      <g key={spec.tag}>
        <path
          d={linePath([spec.from, spec.to])}
          pathLength={1}
          className={art("line", "draw")}
          style={stagger(start + i * 2)}
        />
        <circle
          cx={spec.from[0]}
          cy={spec.from[1]}
          r={3}
          className={art("dot", "pop")}
          style={stagger(start + i * 2)}
        />
        <g className={art("pop")} style={stagger(start + i * 2 + 1)}>
          <path
            d={roundedRectPath(box.x, box.y, box.width, box.height, 10)}
            className={art("pill")}
          />
          <text
            x={box.textX}
            y={box.textY}
            textAnchor="middle"
            className={art("tag")}
          >
            {spec.tag}
          </text>
        </g>
      </g>
    );
  });
}
