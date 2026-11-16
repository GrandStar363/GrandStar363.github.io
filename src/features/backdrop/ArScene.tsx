import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { roundedRectPath } from "./geometry";

const ROOM = [
  "M170 70 H430 V250 H170 Z",
  "M170 70 L40 0 M430 70 L560 0",
  "M170 250 L30 470 M430 250 L570 470",
];

/** Floor and wall tiles drawn in one-point perspective toward the back wall. */
const TILES = [
  ...[0, 1, 2, 3, 4, 5, 6].map(
    (k) => `M${170 + (k * 260) / 6} 250 L${30 + (k * 540) / 6} 470`,
  ),
  ...[280, 320, 380, 450].map((y) => {
    const t = (y - 250) / 220;
    return `M${170 - 140 * t} ${y} H${430 + 140 * t}`;
  }),
  ...[222, 274, 326, 378].map((x) => `M${x} 70 V250`),
  ...[115, 160, 205].map((y) => `M170 ${y} H430`),
];

const BRACKETS = [
  "M222 236 v-14 h14",
  "M378 236 v-14 h-14",
  "M222 348 v14 h14",
  "M378 348 v14 h-14",
];

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "Three.js", from: [382, 262], to: [440, 222] },
  { tag: "WebXR", from: [364, 398], to: [440, 432] },
  { tag: "Unity", from: [348, 150], to: [440, 116] },
];

function Room() {
  return (
    <>
      {ROOM.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={art("line", "draw")}
          style={stagger(i)}
        />
      ))}
      {TILES.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={art("line", "faint", "draw")}
          style={stagger(2 + i / 3)}
        />
      ))}
    </>
  );
}

function Vanity() {
  return (
    <g className={art("rise")} style={stagger(8)}>
      <path
        d={roundedRectPath(268, 104, 80, 104, 40)}
        className={art("line", "faint")}
      />
      <path
        d="M235 262 L252 246 H382 L365 262 Z"
        className={art("line", "shade")}
      />
      <path
        d={roundedRectPath(235, 262, 130, 74, 6)}
        className={art("line", "face")}
      />
      <path
        d="M365 262 L382 246 V318 L365 336 Z"
        className={art("line", "shade")}
      />
      <ellipse
        cx={308}
        cy={254}
        rx={38}
        ry={5}
        className={art("line", "tint")}
      />
      <path
        d="M308 249 V232 Q308 226 316 228 M262 286 H338 M262 306 H338"
        className={art("line")}
      />
    </g>
  );
}

function ArOverlay() {
  return (
    <>
      {BRACKETS.map((d, i) => (
        <path
          key={d}
          d={d}
          className={art("line", "pop")}
          style={stagger(11 + i)}
        />
      ))}
      <path
        d="M228 230 H372"
        className={art("line", "scan")}
        style={stagger(0, { "--scan": "126px" })}
      />
      <ellipse
        cx={300}
        cy={398}
        rx={64}
        ry={12}
        strokeDasharray="4 6"
        className={art("line", "flow")}
      />
      <ellipse
        cx={300}
        cy={398}
        rx={22}
        ry={4}
        className={art("line", "pulse")}
      />
    </>
  );
}

export function ArScene({ tags }: { tags: readonly string[] }) {
  return (
    <>
      <Room />
      <Vanity />
      <ArOverlay />
      <Callouts specs={CALLOUTS} tags={tags} start={15} />
    </>
  );
}
