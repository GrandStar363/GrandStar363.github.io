import { art, stagger } from "./art";
import { circlePath, linePath, type Point } from "./geometry";

interface ServiceNode {
  at: Point;
  r: number;
  label: string;
}

const HUB: ServiceNode = { at: [300, 235], r: 30, label: "API" };

const NODES: readonly ServiceNode[] = [
  { at: [130, 128], r: 22, label: "WEB" },
  { at: [118, 338], r: 22, label: "APP" },
  { at: [300, 62], r: 18, label: "AI" },
  { at: [476, 136], r: 24, label: "DB" },
  { at: [486, 334], r: 22, label: "PAY" },
  { at: [300, 410], r: 18, label: "MAP" },
];

/** The segment between two circles' rims, so edges never cross a node. */
function rimToRim(from: ServiceNode, to: ServiceNode): [Point, Point] {
  const [dx, dy] = [to.at[0] - from.at[0], to.at[1] - from.at[1]];
  const length = Math.hypot(dx, dy);
  const unit: Point = [dx / length, dy / length];
  return [
    [from.at[0] + unit[0] * from.r, from.at[1] + unit[1] * from.r],
    [to.at[0] - unit[0] * to.r, to.at[1] - unit[1] * to.r],
  ];
}

function Node({ node, index }: { node: ServiceNode; index: number }) {
  const [x, y] = node.at;
  return (
    <g className={art("rise")} style={stagger(index)}>
      <path d={circlePath(x, y, node.r)} className={art("line", "face")} />
      <text x={x} y={y + 3.5} textAnchor="middle" className={art("label")}>
        {node.label}
      </text>
    </g>
  );
}

function Link({ node, index }: { node: ServiceNode; index: number }) {
  const outbound = index % 2 === 0;
  const [start, end] = outbound ? rimToRim(HUB, node) : rimToRim(node, HUB);
  const offset = {
    "--dx": `${end[0] - start[0]}px`,
    "--dy": `${end[1] - start[1]}px`,
  };
  return (
    <g>
      <path
        d={linePath([start, end])}
        pathLength={1}
        className={art("line", "draw")}
        style={stagger(2 + index)}
      />
      <circle
        cx={start[0]}
        cy={start[1]}
        r={3.5}
        className={art("dot", "travel")}
        style={stagger(index, offset)}
      />
    </g>
  );
}

export function PlatformScene() {
  return (
    <>
      <path
        d={circlePath(300, 235, 150)}
        pathLength={1}
        strokeDasharray="0.01 0.02"
        className={art("line", "faint")}
      />
      <path
        d={circlePath(300, 235, 42)}
        className={art("line", "faint", "pulse")}
      />
      {NODES.map((node, i) => (
        <Link key={node.label} node={node} index={i} />
      ))}
      <Node node={HUB} index={0} />
      {NODES.map((node, i) => (
        <Node key={node.label} node={node} index={1 + i} />
      ))}
    </>
  );
}
