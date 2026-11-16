import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { buildingShape, type Block } from "./building";
import { isoPoint, linePath, type Point } from "./geometry";

const ORIGIN: Point = [300, 420];
const GRID = [-80, -40, 0, 40, 80, 120, 160, 200, 240];

type TimedBlock = Block & { delay: number };

/** Painted back to front so nearer buildings cover the ones behind them. */
const BLOCKS: readonly TimedBlock[] = [
  { x: 110, y: 90, width: 50, depth: 50, floors: 4, floorHeight: 24, delay: 5 },
  {
    x: 130,
    y: -20,
    width: 60,
    depth: 55,
    floors: 6,
    floorHeight: 24,
    delay: 3,
  },
  {
    x: -10,
    y: 110,
    width: 60,
    depth: 60,
    floors: 5,
    floorHeight: 24,
    delay: 2,
  },
  { x: 40, y: 40, width: 70, depth: 70, floors: 9, floorHeight: 24, delay: 0 },
];

function Ground() {
  const lines = GRID.flatMap((u) => [
    linePath([isoPoint(-80, u, 0, ORIGIN), isoPoint(260, u, 0, ORIGIN)]),
    linePath([isoPoint(u, -80, 0, ORIGIN), isoPoint(u, 260, 0, ORIGIN)]),
  ]);
  return lines.map((d, i) => (
    <path
      key={d}
      d={d}
      pathLength={1}
      className={art("line", "faint", "draw")}
      style={stagger(i / 3)}
    />
  ));
}

function Building({ block }: { block: TimedBlock }) {
  const shape = buildingShape(block, ORIGIN);
  return (
    <g>
      {shape.floors.map((floor, level) => (
        <g
          key={level}
          className={art("rise")}
          style={stagger(block.delay + level)}
        >
          <path d={floor.right} className={art("line", "face")} />
          <path d={floor.left} className={art("line", "shade")} />
          <path d={floor.windows} className={art("line", "faint")} />
        </g>
      ))}
      <path
        d={shape.roof}
        className={art("line", "face", "rise")}
        style={stagger(block.delay + block.floors)}
      />
    </g>
  );
}

function Crane({ block }: { block: Block }) {
  const at = buildingShape(block, ORIGIN).anchor;
  const steel = [
    linePath([at(12, 12, 0), at(12, 12, 96)]),
    linePath([at(-34, 12, 96), at(126, 12, 96)]),
    linePath([at(-34, 12, 96), at(12, 12, 118), at(126, 12, 96)]),
  ];
  const [hookX, hookY] = at(104, 12, 96);
  return (
    <g>
      {steel.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={art("line", "draw")}
          style={stagger(11 + i)}
        />
      ))}
      <g className={art("swing")}>
        <path
          d={`M${hookX} ${hookY} v46 m-5 0 h10 m-5 0 v7 a4 4 0 1 1 -6 3`}
          className={art("line")}
        />
      </g>
    </g>
  );
}

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "Three.js", from: [300, 164], to: [372, 112] },
  { tag: "WebGL", from: [482, 235], to: [518, 200] },
  { tag: "React", from: [438, 400], to: [478, 432] },
];

export function CityScene({ tags }: { tags: readonly string[] }) {
  const tallest = BLOCKS.at(-1);
  return (
    <>
      <Ground />
      {BLOCKS.map((block) => (
        <Building key={`${block.x}-${block.y}`} block={block} />
      ))}
      {tallest ? <Crane block={tallest} /> : null}
      <Callouts specs={CALLOUTS} tags={tags} start={14} />
    </>
  );
}
