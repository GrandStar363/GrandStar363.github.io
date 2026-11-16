import { afterEach, describe, expect, it } from "vitest";
import { createCursorController } from "./cursor-controller";
import { supportsCustomCursor } from "./cursor-support";

function setup() {
  document.body.innerHTML = `
    <div id="layer"><div data-cursor-ring></div><div data-cursor-dot></div></div>
    <a id="link" href="#">Link</a><p id="text">Text</p>`;
  const layer = document.getElementById("layer")!;
  return { layer, destroy: createCursorController(layer) };
}

const move = (target: Element, x: number, y: number) =>
  target.dispatchEvent(
    new PointerEvent("pointermove", {
      bubbles: true,
      clientX: x,
      clientY: y,
      pointerType: "mouse",
    }),
  );

describe("createCursorController", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("hides the system cursor while active and restores it on destroy", () => {
    const { destroy } = setup();
    expect(document.documentElement.classList.contains("custom-cursor")).toBe(
      true,
    );
    destroy();
    expect(document.documentElement.classList.contains("custom-cursor")).toBe(
      false,
    );
  });

  it("shows the dot at the pointer and flags interactive targets", () => {
    const { layer, destroy } = setup();
    move(document.getElementById("text")!, 40, 20);
    expect("visible" in layer.dataset).toBe(true);
    expect("hover" in layer.dataset).toBe(false);
    expect(
      layer.querySelector<HTMLElement>("[data-cursor-dot]")!.style.translate,
    ).toBe("40px 20px");
    move(document.getElementById("link")!, 50, 25);
    expect("hover" in layer.dataset).toBe(true);
    destroy();
  });

  it("ignores touch input", () => {
    const { layer, destroy } = setup();
    document.body.dispatchEvent(
      new PointerEvent("pointermove", { bubbles: true, pointerType: "touch" }),
    );
    expect("visible" in layer.dataset).toBe(false);
    destroy();
  });
});

describe("supportsCustomCursor", () => {
  const media = (matches: Record<string, boolean>) => ({
    matchMedia: (query: string) =>
      ({ matches: matches[query] ?? false }) as MediaQueryList,
  });

  it("requires a fine hovering pointer and no reduced-motion preference", () => {
    const fine = "(hover: hover) and (pointer: fine)";
    const reduced = "(prefers-reduced-motion: reduce)";
    expect(supportsCustomCursor(media({ [fine]: true }))).toBe(true);
    expect(supportsCustomCursor(media({ [fine]: true, [reduced]: true }))).toBe(
      false,
    );
    expect(supportsCustomCursor(media({}))).toBe(false);
  });
});
