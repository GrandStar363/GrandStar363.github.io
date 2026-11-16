import { describe, expect, it } from "vitest";
import { formatMonth, formatRange, formatYearRange } from "./dates";

describe("dates", () => {
  it("formats a year-month", () => {
    expect(formatMonth("2021-09")).toBe("Sep 2021");
  });

  it("rejects malformed input", () => {
    expect(() => formatMonth("2021-13")).toThrow();
  });

  it("formats closed and ongoing ranges", () => {
    expect(formatRange("2018-06", "2021-09")).toBe("Jun 2018 – Sep 2021");
    expect(formatRange("2025-08", null)).toBe("Aug 2025 – Present");
  });

  it("collapses single-year ranges", () => {
    expect(formatYearRange(2017, 2021)).toBe("2017 – 2021");
    expect(formatYearRange(2020, 2020)).toBe("2020");
  });
});
