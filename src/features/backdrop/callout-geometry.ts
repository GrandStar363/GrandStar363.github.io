import type { Point } from "./geometry";

export interface CalloutSpec {
  /** Tag name; the callout only renders if the scene's project lists it. */
  tag: string;
  /** Point on the artwork the leader line starts from. */
  from: Point;
  /** Where the leader ends and the label pill attaches. */
  to: Point;
  /** "start": pill extends right of `to`; "end": pill extends left of it. */
  align?: "start" | "end";
}

export interface CalloutBox {
  x: number;
  y: number;
  width: number;
  height: number;
  textX: number;
  textY: number;
}

const CHAR_WIDTH = 6.2;
const PADDING = 16;
const HEIGHT = 20;

/** Pill rectangle for a label, sized from its character count (10px sans text). */
export function calloutBox(spec: CalloutSpec, label: string): CalloutBox {
  const width = Math.round(label.length * CHAR_WIDTH + PADDING);
  const [x0, y0] = spec.to;
  const x = spec.align === "end" ? x0 - width : x0;
  return {
    x,
    y: y0 - HEIGHT / 2,
    width,
    height: HEIGHT,
    textX: x + width / 2,
    textY: y0 + 3.5,
  };
}
