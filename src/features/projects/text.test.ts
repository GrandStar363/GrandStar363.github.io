import { describe, expect, it } from "vitest";
import { splitLeadLabel } from "./text";

describe("splitLeadLabel", () => {
  it("splits a short label", () => {
    expect(splitLeadLabel("Client need: a map platform.")).toEqual({
      label: "Client need",
      body: "a map platform.",
    });
  });

  it("ignores colons inside long sentences", () => {
    const text = "Developed complete boat booking platform for clients: fast.";
    expect(splitLeadLabel(text)).toEqual({ label: null, body: text });
  });
});
