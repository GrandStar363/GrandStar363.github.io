export interface Point {
  x: number;
  y: number;
}

/** Fraction of the remaining distance covered per frame. */
const EASE = 0.2;
const SETTLED_PX = 0.1;

export function place(element: HTMLElement | null, point: Point): void {
  if (element) element.style.translate = `${point.x}px ${point.y}px`;
}

/** Moves an element toward a target with easing, animating only until it settles. */
export function createEasedTrail(element: HTMLElement | null) {
  const target: Point = { x: 0, y: 0 };
  const current: Point = { x: 0, y: 0 };
  let frame = 0;

  const step = () => {
    current.x += (target.x - current.x) * EASE;
    current.y += (target.y - current.y) * EASE;
    place(element, current);
    const settled =
      Math.abs(target.x - current.x) < SETTLED_PX &&
      Math.abs(target.y - current.y) < SETTLED_PX;
    frame = settled ? 0 : requestAnimationFrame(step);
  };

  return {
    /** `jump` places the element immediately, e.g. when the cursor first appears. */
    follow(point: Point, jump = false) {
      Object.assign(target, point);
      if (jump) Object.assign(current, point);
      if (!frame) frame = requestAnimationFrame(step);
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}
