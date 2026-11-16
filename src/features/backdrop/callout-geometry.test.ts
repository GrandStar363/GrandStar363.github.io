import { describe, expect, it } from "vitest";
import { calloutBox } from "./callout-geometry";

describe("calloutBox", () => {
  const spec = { tag: "Mapbox", from: [0, 0] as const, to: [100, 50] as const };

  it("sizes the pill from the label and centres the text in it", () => {
    expect(calloutBox(spec, "Mapbox")).toEqual({
      x: 100,
      y: 40,
      width: 53,
      height: 20,
      textX: 126.5,
      textY: 53.5,
    });
  });

  it("extends to the left of the leader end when aligned to the end", () => {
    const box = calloutBox({ ...spec, align: "end" }, "Mapbox");
    expect(box.x + box.width).toBe(100);
  });
});
