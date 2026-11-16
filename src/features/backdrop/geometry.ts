export type Point = readonly [x: number, y: number];

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;
const round = (value: number) => Math.round(value * 10) / 10;

/** Isometric projection: x runs down-right, y down-left, z straight up. */
export function isoPoint(
  x: number,
  y: number,
  z: number,
  origin: Point,
): Point {
  return [origin[0] + (x - y) * COS30, origin[1] - (x + y) * SIN30 - z];
}

export function linePath(points: readonly Point[]): string {
  return `M${points.map(([x, y]) => `${round(x)} ${round(y)}`).join(" L")}`;
}

export function polygonPath(points: readonly Point[]): string {
  return `${linePath(points)} Z`;
}

export function roundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const r = Math.min(radius, width / 2, height / 2);
  return [
    `M${x + r} ${y}`,
    `H${x + width - r} A${r} ${r} 0 0 1 ${x + width} ${y + r}`,
    `V${y + height - r} A${r} ${r} 0 0 1 ${x + width - r} ${y + height}`,
    `H${x + r} A${r} ${r} 0 0 1 ${x} ${y + height - r}`,
    `V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`,
  ].join(" ");
}

export function circlePath(cx: number, cy: number, r: number): string {
  return `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
}
