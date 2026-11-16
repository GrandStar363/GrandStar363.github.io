import { describe, expect, it } from "vitest";
import { displayUrl } from "./urls";

describe("displayUrl", () => {
  it("drops the protocol, www and trailing slash", () => {
    expect(displayUrl("https://www.linkedin.com/in/mhrusheuski/")).toBe(
      "linkedin.com/in/mhrusheuski",
    );
  });

  it("keeps bare hosts readable", () => {
    expect(displayUrl("https://example.com/")).toBe("example.com");
  });
});
