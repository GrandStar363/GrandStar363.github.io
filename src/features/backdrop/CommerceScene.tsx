import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { circlePath, roundedRectPath } from "./geometry";

/** Simple smart-home product icons, drawn around (x, y). */
const ICONS: readonly ((x: number, y: number) => string)[] = [
  (x, y) =>
    `${circlePath(x, y, 15)} ${circlePath(x, y, 5)} M${x} ${y + 15} v10`,
  (x, y) =>
    `${roundedRectPath(x - 13, y - 4, 26, 22, 5)} M${x - 8} ${y - 4} v-6 a8 8 0 0 1 16 0 v6`,
  (x, y) =>
    `${circlePath(x, y + 6, 6)} M${x - 14} ${y - 6} a18 18 0 0 1 28 0 M${x - 9} ${y - 1} a11 11 0 0 1 18 0`,
  (x, y) =>
    `${circlePath(x, y - 4, 12)} M${x - 6} ${y + 12} h12 M${x - 4} ${y + 18} h8`,
  (x, y) =>
    `${roundedRectPath(x - 9, y - 16, 18, 32, 9)} ${circlePath(x, y + 4, 5)}`,
  (x, y) =>
    `${roundedRectPath(x - 12, y - 10, 24, 22, 6)} M${x - 5} ${y - 16} v6 M${x + 5} ${y - 16} v6`,
];

const CARDS = ICONS.map((icon, i) => ({
  icon,
  x: 170 + (i % 3) * 135,
  y: 110 + Math.floor(i / 3) * 140,
}));

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "Responsive Design", from: [576, 380], to: [575, 438], align: "end" },
  { tag: "UI/UX Prototyping", from: [440, 92], to: [468, 30] },
  { tag: "Front-End Development", from: [180, 380], to: [150, 440] },
];

function Storefront() {
  return (
    <>
      <path
        d={roundedRectPath(150, 60, 430, 340, 16)}
        pathLength={1}
        className={art("line", "face", "draw")}
        style={stagger(0)}
      />
      <path
        d={`M150 92 H580 ${circlePath(170, 76, 4)} ${circlePath(186, 76, 4)} ${circlePath(202, 76, 4)}`}
        className={art("line", "faint")}
      />
      <path
        d={roundedRectPath(250, 68, 200, 16, 8)}
        className={art("line", "faint")}
      />
      <path d="M532 70 h5 l4 14 h15 l4 -10 h-21" className={art("line")} />
      <g className={art("pop")} style={stagger(12)}>
        <path d={circlePath(562, 68, 7)} className={art("line", "strong")} />
      </g>
    </>
  );
}

function Products() {
  return CARDS.map(({ icon, x, y }, i) => (
    <g key={`${x}-${y}`} className={art("rise")} style={stagger(2 + i)}>
      <path
        d={roundedRectPath(x, y, 120, 124, 12)}
        className={art("line", "face")}
      />
      <path d={icon(x + 60, y + 44)} className={art("line", "shade")} />
      <path
        d={`M${x + 16} ${y + 84} h70 M${x + 16} ${y + 98} h40`}
        className={art("line", "faint")}
      />
      <path
        d={roundedRectPath(x + 76, y + 92, 30, 16, 8)}
        className={art("line", "tint")}
      />
    </g>
  ));
}

function Signal() {
  return [16, 26, 36].map((radius, i) => (
    <path
      key={radius}
      d={`M${230 - radius} ${150 - radius / 2} a${radius} ${radius} 0 0 1 ${radius * 2} 0`}
      className={art("line", "pulse")}
      style={stagger(i)}
    />
  ));
}

export function CommerceScene({ tags }: { tags: readonly string[] }) {
  return (
    <>
      <Storefront />
      <Products />
      <Signal />
      <Callouts specs={CALLOUTS} tags={tags} start={14} />
    </>
  );
}
