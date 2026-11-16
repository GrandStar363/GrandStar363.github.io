import { describe, expect, it } from "vitest";
import { buildingShape } from "./building";
import { isoPoint, polygonPath } from "./geometry";

describe("isoPoint", () => {
  it("keeps the origin and lifts points by their height", () => {
    expect(isoPoint(0, 0, 0, [100, 200])).toEqual([100, 200]);
    expect(isoPoint(0, 0, 30, [100, 200])).toEqual([100, 170]);
  });

  it("moves x down-right and y down-left on screen", () => {
    const [rx, ry] = isoPoint(10, 0, 0, [0, 0]);
    const [lx, ly] = isoPoint(0, 10, 0, [0, 0]);
    expect(rx).toBeGreaterThan(0);
    expect(lx).toBeLessThan(0);
    expect(ry).toBe(ly);
  });
});

describe("polygonPath", () => {
  it("rounds coordinates and closes the shape", () => {
    expect(
      polygonPath([
        [0, 0],
        [10.04, 0],
        [10, 5.55],
      ]),
    ).toBe("M0 0 L10 0 L10 5.6 Z");
  });
});

describe("buildingShape", () => {
  it("produces one outline per floor with windows on both visible faces", () => {
    const shape = buildingShape(
      { x: 0, y: 0, width: 36, depth: 18, floors: 3, floorHeight: 20 },
      [0, 0],
    );
    expect(shape.floors).toHaveLength(3);
    expect(shape.floors[0]?.windows.match(/Z/g)).toHaveLength(2 + 1);
    expect(shape.roof.endsWith("Z")).toBe(true);
  });
});
