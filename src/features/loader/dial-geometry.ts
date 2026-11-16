export interface Tick {
  angle: number;
  major: boolean;
}

export interface DialLabel {
  text: string;
  x: number;
  y: number;
}

/** Rounds to 2 decimals; `|| 0` turns -0 into 0. */
const round = (value: number) => Math.round(value * 100) / 100 || 0;

/** A tick every `step` degrees; every `majorEvery` degrees is a major tick. */
export function dialTicks(step = 5, majorEvery = 30): Tick[] {
  return Array.from({ length: 360 / step }, (_, i) => ({
    angle: i * step,
    major: (i * step) % majorEvery === 0,
  }));
}

/** Bearing labels ("000", "030", …) placed on a circle, measured clockwise from north. */
export function bearingLabels(radius: number, every = 30): DialLabel[] {
  return Array.from({ length: 360 / every }, (_, i) => {
    const angle = i * every;
    const radians = (angle * Math.PI) / 180;
    return {
      text: String(angle).padStart(3, "0"),
      x: round(Math.sin(radians) * radius),
      y: round(-Math.cos(radians) * radius),
    };
  });
}

/** Splits a percentage into dimmed leading zeros and significant digits: 68 → ["0", "68"]. */
export function counterDigits(
  value: number,
): [lead: string, significant: string] {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));
  const significant = String(clamped);
  return ["0".repeat(3 - significant.length), significant];
}
