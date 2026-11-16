import { describe, expect, it } from "vitest";
import { firstSentence } from "./text";

describe("firstSentence", () => {
  it("cuts at the first sentence end", () => {
    expect(firstSentence("Built a portal. Then more.")).toBe("Built a portal.");
  });

  it("does not cut inside names like Three.js", () => {
    expect(firstSentence("Uses Three.js and React. Fast.")).toBe(
      "Uses Three.js and React.",
    );
  });

  it("returns unpunctuated text whole", () => {
    expect(firstSentence("No full stop here")).toBe("No full stop here");
  });
});
