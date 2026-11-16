import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { circlePath, linePath, roundedRectPath, type Point } from "./geometry";

const STREETS = [120, 220, 320, 420]
  .map((y) => `M20 ${y} H580`)
  .concat([120, 240, 360, 480].map((x) => `M${x} 20 V460`));
const ROUTE: readonly Point[] = [
  [250, 120],
  [360, 120],
  [360, 220],
  [360, 320],
  [462, 320],
];
const STEPS = ["Ordered", "Packed", "On the way"];
const CROSS = "M208 98 h14 v14 h14 v14 h-14 v14 h-14 v-14 h-14 v-14 h14 Z";

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "Flutter", from: [540, 166], to: [560, 200], align: "end" },
  { tag: "UX & UI Design", from: [530, 352], to: [560, 428], align: "end" },
  { tag: "Mobile App", from: [372, 140], to: [330, 176], align: "end" },
];

function Places() {
  return (
    <>
      <g className={art("pop")} style={stagger(3)}>
        <path
          d={roundedRectPath(180, 84, 70, 70, 14)}
          className={art("line", "face")}
        />
        <path d={CROSS} className={art("line", "strong")} />
      </g>
      <g className={art("pop")} style={stagger(6)}>
        <path
          d="M470 312 L500 286 L530 312 V352 H470 Z M492 352 v-18 h16 v18"
          className={art("line", "face")}
        />
        <path d={circlePath(500, 270, 8)} className={art("line", "pulse")} />
      </g>
    </>
  );
}

function Route() {
  const segments = ROUTE.slice(1).map(
    (end, i) => [ROUTE[i] ?? end, end] as const,
  );
  return (
    <>
      <path
        d={linePath(ROUTE)}
        pathLength={1}
        className={art("line", "draw")}
        style={stagger(4)}
      />
      <path
        d={linePath(ROUTE)}
        strokeDasharray="5 7"
        className={art("line", "faint", "flow")}
      />
      {segments.map(([[x0, y0], [x1, y1]], i) => (
        <circle
          key={i}
          cx={x0}
          cy={y0}
          r={6}
          className={art("dot", "travel")}
          style={stagger(i, { "--dx": `${x1 - x0}px`, "--dy": `${y1 - y0}px` })}
        />
      ))}
    </>
  );
}

function OrderStatus() {
  return (
    <g className={art("rise")} style={stagger(5)}>
      <path
        d={roundedRectPath(370, 46, 190, 120, 14)}
        className={art("line", "face")}
      />
      {STEPS.map((step, i) => (
        <g key={step} className={art("pop")} style={stagger(9 + i * 2)}>
          <path
            d={circlePath(394, 76 + i * 30, 8)}
            className={art("line", "strong")}
          />
          <text x={412} y={80 + i * 30} className={art("tag")}>
            {step}
          </text>
        </g>
      ))}
    </g>
  );
}

export function DeliveryScene({ tags }: { tags: readonly string[] }) {
  return (
    <>
      {STREETS.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className={art("line", "faint", "draw")}
          style={stagger(i / 2)}
        />
      ))}
      <Route />
      <Places />
      <OrderStatus />
      <Callouts specs={CALLOUTS} tags={tags} start={15} />
    </>
  );
}
