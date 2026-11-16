import { art, stagger } from "./art";
import { linePath, polygonPath, type Point } from "./geometry";

const ROADS = [
  "M20 300 C150 285 240 205 360 212 S530 150 590 118",
  "M118 470 C150 362 214 300 300 252 S420 120 432 10",
  "M0 162 C140 172 262 132 420 300 S520 420 600 446",
];

const PARCELS: readonly (readonly Point[])[] = [
  [
    [268, 262],
    [330, 240],
    [344, 286],
    [282, 306],
  ],
  [
    [338, 236],
    [398, 214],
    [410, 258],
    [350, 280],
  ],
  [
    [284, 312],
    [346, 292],
    [358, 336],
    [296, 356],
  ],
  [
    [354, 286],
    [414, 264],
    [428, 310],
    [366, 330],
  ],
  [
    [214, 280],
    [262, 264],
    [274, 306],
    [226, 322],
  ],
  [
    [404, 210],
    [452, 192],
    [464, 234],
    [416, 252],
  ],
  [
    [300, 190],
    [352, 172],
    [362, 212],
    [310, 230],
  ],
  [
    [420, 318],
    [470, 300],
    [482, 344],
    [432, 362],
  ],
];

const CONTOUR =
  "M150 70 C205 66 238 102 226 140 C214 178 160 190 122 170 C86 150 92 74 150 70 Z";
const CONTOUR_SCALES = [1, 0.7, 0.4];
const PINS: readonly Point[] = [
  [306, 274],
  [390, 298],
  [434, 222],
];
const PIN = "M0 0 C-8 -10 -8 -22 0 -24 C8 -22 8 -10 0 0 Z";

function Pin({ at: [x, y], index }: { at: Point; index: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={8}
        className={art("line", "faint", "pulse")}
        style={stagger(index)}
      />
      <g className={art("pop")} style={stagger(8 + index)}>
        <path d={PIN} className={art("line", "face")} />
        <circle cy={-15} r={3} className={art("line")} />
      </g>
    </g>
  );
}

function Legend() {
  return (
    <g className={art("rise")} style={stagger(12)}>
      <text x={24} y={452} className={art("label")}>
        51.1079° N · 17.0385° E
      </text>
      <path
        d="M470 446 H560 M470 441 V451 M515 443 V449 M560 441 V451"
        className={art("line")}
      />
      <text x={538} y={434} className={art("label")}>
        500 m
      </text>
      <path d="M560 36 l7 18 l-7 -5 l-7 5 Z" className={art("line", "tint")} />
      <text x={556} y={28} className={art("label")}>
        N
      </text>
    </g>
  );
}

export function GisScene() {
  return (
    <>
      {CONTOUR_SCALES.map((scale, i) => (
        <path
          key={scale}
          d={CONTOUR}
          pathLength={1}
          transform={`translate(160 128) scale(${scale}) translate(-160 -128)`}
          className={art("line", "faint", "draw")}
          style={stagger(i * 2)}
        />
      ))}
      {ROADS.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={art("line", "draw")}
          style={stagger(i)}
        />
      ))}
      {PARCELS.map((points, i) => (
        <path
          key={points.join()}
          d={polygonPath(points)}
          className={art("line", "tint", "rise")}
          style={stagger(3 + i)}
        />
      ))}
      <path
        d={linePath(PINS)}
        strokeDasharray="4 6"
        className={art("line", "flow")}
      />
      {PINS.map((point, i) => (
        <Pin key={point.join()} at={point} index={i} />
      ))}
      <Legend />
    </>
  );
}
