import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { circlePath, roundedRectPath } from "./geometry";

const CELLS = Array.from({ length: 35 }, (_, i) => ({
  col: i % 7,
  row: Math.floor(i / 7),
  index: i,
}));
const BOOKED = new Set([2, 10, 23, 29, 33]);
const SELECTED = [15, 16, 17, 18];

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "FullCalendar", from: [380, 130], to: [400, 50] },
  { tag: "Stripe", from: [330, 392], to: [362, 452] },
  { tag: "React", from: [500, 228], to: [530, 190] },
  { tag: "Laravel", from: [566, 366], to: [598, 440], align: "end" },
];

function Calendar() {
  return (
    <g>
      <path
        d={roundedRectPath(70, 70, 250, 240, 16)}
        pathLength={1}
        className={art("line", "face", "draw")}
        style={stagger(0)}
      />
      <path
        d="M90 100 h70 M250 94 l-8 6 l8 6 M270 94 l8 6 l-8 6"
        className={art("line")}
      />
      {CELLS.map(({ col, row, index }) => {
        const selected = SELECTED.indexOf(index);
        const fill =
          selected >= 0 ? "strong" : BOOKED.has(index) ? "tint" : "faint";
        return (
          <path
            key={index}
            d={roundedRectPath(88 + col * 32, 124 + row * 34, 24, 24, 6)}
            className={art("line", fill, selected >= 0 ? "pop" : "rise")}
            style={stagger(selected >= 0 ? 8 + selected : 1 + index / 7)}
          />
        );
      })}
    </g>
  );
}

function Boat() {
  return (
    <g className={art("float")}>
      <g className={art("rise")} style={stagger(4)}>
        <path
          d="M372 330 H566 L536 366 H404 Z"
          className={art("line", "face")}
        />
        <path
          d={roundedRectPath(424, 296, 92, 34, 8)}
          className={art("line", "shade")}
        />
        {[440, 466, 492].map((x) => (
          <path
            key={x}
            d={circlePath(x, 313, 5)}
            className={art("line", "tint")}
          />
        ))}
        <path
          d="M470 296 V226 M470 230 L508 252 L470 262"
          className={art("line")}
        />
      </g>
    </g>
  );
}

function Waves() {
  return [0, 1, 2].map((row) => {
    const y = 380 + row * 20;
    const arcs = Array.from({ length: 11 }, () => "q15 -7 30 0").join(" ");
    return (
      <path
        key={row}
        d={`M340 ${y} ${arcs}`}
        className={
          row === 0 ? art("line", "wave") : art("line", "faint", "wave")
        }
      />
    );
  });
}

function Payment() {
  return (
    <g className={art("rise")} style={stagger(6)}>
      <path
        d={roundedRectPath(100, 340, 180, 104, 14)}
        className={art("line", "face")}
      />
      <path
        d={roundedRectPath(118, 362, 30, 22, 5)}
        className={art("line", "tint")}
      />
      <path d="M118 410 h96 M118 426 h56" className={art("line", "faint")} />
      <g className={art("pop")} style={stagger(14)}>
        <path d={circlePath(262, 350, 16)} className={art("line", "strong")} />
        <path d="M254 350 l6 6 l11 -12" className={art("line")} />
      </g>
    </g>
  );
}

export function BookingScene({ tags }: { tags: readonly string[] }) {
  return (
    <>
      <g transform="translate(60 0)">
        <Calendar />
      </g>
      <g transform="translate(30 0)">
        <Waves />
      </g>
      <g transform="translate(30 0)">
        <Boat />
      </g>
      <g transform="translate(50 0)">
        <Payment />
      </g>
      <Callouts specs={CALLOUTS} tags={tags} start={14} />
    </>
  );
}
