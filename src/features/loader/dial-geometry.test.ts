import { describe, expect, it } from "vitest";
import { bearingLabels, counterDigits, dialTicks } from "./dial-geometry";

describe("dialTicks", () => {
  it("places 72 ticks with a major tick every 30°", () => {
    const ticks = dialTicks();
    expect(ticks).toHaveLength(72);
    expect(
      ticks.filter((tick) => tick.major).map((tick) => tick.angle),
    ).toEqual([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
  });
});

describe("bearingLabels", () => {
  it("starts at north and runs clockwise", () => {
    const [north, , , east] = bearingLabels(100);
    expect(north).toEqual({ text: "000", x: 0, y: -100 });
    expect(east).toEqual({ text: "090", x: 100, y: 0 });
  });
});

describe("counterDigits", () => {
  it.each([
    [0, ["00", "0"]],
    [7, ["00", "7"]],
    [68, ["0", "68"]],
    [100, ["", "100"]],
    [140, ["", "100"]],
  ] as const)("formats %i", (value, expected) => {
    expect(counterDigits(value)).toEqual(expected);
  });
});
