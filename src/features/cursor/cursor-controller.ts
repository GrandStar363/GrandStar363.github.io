import { createEasedTrail, place } from "./eased-trail";

const INTERACTIVE = "a, button, summary, label, video, [role='button']";

function setFlag(element: HTMLElement, flag: string, on: boolean): void {
  if (on) element.dataset[flag] = "";
  else delete element.dataset[flag];
}

const isInteractive = (target: EventTarget | null) =>
  target instanceof Element && target.closest(INTERACTIVE) !== null;

/**
 * Drives a dot that follows the mouse exactly and a ring that eases after it.
 * State is exposed as data attributes (visible, hover, pressed) for CSS to style.
 */
export function createCursorController(layer: HTMLElement): () => void {
  const doc = layer.ownerDocument;
  const dot = layer.querySelector<HTMLElement>("[data-cursor-dot]");
  const ring = createEasedTrail(
    layer.querySelector<HTMLElement>("[data-cursor-ring]"),
  );

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const point = { x: event.clientX, y: event.clientY };
    place(dot, point);
    ring.follow(point, !("visible" in layer.dataset));
    setFlag(layer, "visible", true);
    setFlag(layer, "hover", isInteractive(event.target));
  };
  const onDown = () => setFlag(layer, "pressed", true);
  const onUp = () => setFlag(layer, "pressed", false);
  const onOut = (event: PointerEvent) => {
    if (!event.relatedTarget) setFlag(layer, "visible", false);
  };

  const listeners = [
    ["pointermove", onMove],
    ["pointerdown", onDown],
    ["pointerup", onUp],
    ["pointerout", onOut],
  ] as const;
  for (const [type, handler] of listeners)
    doc.addEventListener(type, handler, { passive: true });
  doc.documentElement.classList.add("custom-cursor");

  return () => {
    for (const [type, handler] of listeners)
      doc.removeEventListener(type, handler);
    ring.stop();
    doc.documentElement.classList.remove("custom-cursor");
  };
}
