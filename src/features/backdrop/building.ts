import { isoPoint, polygonPath, type Point } from "./geometry";

export interface Block {
  x: number;
  y: number;
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;
}

export interface FloorShape {
  left: string;
  right: string;
  windows: string;
}

type Project = (x: number, y: number, z: number) => Point;

const WINDOW_SPACING = 18;

function windowRow(
  length: number,
  face: (u: number, z: number) => Point,
  z0: number,
  height: number,
): string {
  const count = Math.max(1, Math.floor(length / WINDOW_SPACING));
  const step = length / count;
  const [low, high] = [z0 + height * 0.35, z0 + height * 0.75];
  return Array.from({ length: count }, (_, j) => {
    const [u0, u1] = [step * (j + 0.3), step * (j + 0.7)];
    return polygonPath([
      face(u0, low),
      face(u1, low),
      face(u1, high),
      face(u0, high),
    ]);
  }).join(" ");
}

function floorShape(at: Project, block: Block, level: number): FloorShape {
  const { width: w, depth: d, floorHeight: h } = block;
  const [z0, z1] = [level * h, (level + 1) * h];
  return {
    right: polygonPath([
      at(0, 0, z0),
      at(w, 0, z0),
      at(w, 0, z1),
      at(0, 0, z1),
    ]),
    left: polygonPath([at(0, 0, z0), at(0, d, z0), at(0, d, z1), at(0, 0, z1)]),
    windows: [
      windowRow(w, (u, z) => at(u, 0, z), z0, h),
      windowRow(d, (u, z) => at(0, u, z), z0, h),
    ].join(" "),
  };
}

/** Floors (bottom to top) and roof outline of a box-shaped building in isometric view. */
export function buildingShape(block: Block, origin: Point) {
  const at: Project = (x, y, z) =>
    isoPoint(block.x + x, block.y + y, z, origin);
  const top = block.floors * block.floorHeight;
  return {
    floors: Array.from({ length: block.floors }, (_, level) =>
      floorShape(at, block, level),
    ),
    roof: polygonPath([
      at(0, 0, top),
      at(block.width, 0, top),
      at(block.width, block.depth, top),
      at(0, block.depth, top),
    ]),
    anchor: (x: number, y: number, z: number) => at(x, y, top + z),
  };
}
