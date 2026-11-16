import { art, stagger } from "./art";
import { circlePath, roundedRectPath } from "./geometry";

const ROWS = [0, 1, 2, 3, 4];
const BARS = [22, 36, 28, 46, 32];
const CALENDAR = Array.from({ length: 12 }, (_, i) => ({
  col: i % 4,
  row: Math.floor(i / 4),
  booked: [1, 4, 6, 11].includes(i),
}));

function Phone({ x, y, index }: { x: number; y: number; index: number }) {
  return (
    <g>
      <path
        d={roundedRectPath(x, y, 150, 300, 24)}
        pathLength={1}
        className={art("line", "face", "draw")}
        style={stagger(index)}
      />
      <path d={`M${x + 55} ${y + 14} h40`} className={art("line", "faint")} />
    </g>
  );
}

function ListScreen() {
  return (
    <>
      <path
        d={roundedRectPath(158, 100, 114, 26, 8)}
        className={art("line", "tint", "rise")}
        style={stagger(2)}
      />
      {ROWS.map((row) => {
        const y = 142 + row * 40;
        return (
          <g key={row} className={art("rise")} style={stagger(3 + row)}>
            <path
              d={circlePath(172, y + 12, 9)}
              className={art("line", "shade")}
            />
            <path
              d={roundedRectPath(188, y + 4, 70, 7, 3.5)}
              className={art("line")}
            />
            <path
              d={roundedRectPath(188, y + 16, 44, 6, 3)}
              className={art("line", "faint")}
            />
          </g>
        );
      })}
    </>
  );
}

function DashboardScreen() {
  return (
    <>
      <path
        d={roundedRectPath(338, 146, 114, 78, 10)}
        className={art("line", "rise")}
        style={stagger(3)}
      />
      {BARS.map((height, i) => (
        <path
          key={i}
          d={roundedRectPath(350 + i * 20, 210 - height, 10, height, 3)}
          className={art("line", "tint", "grow")}
          style={stagger(5 + i)}
        />
      ))}
      {CALENDAR.map(({ col, row, booked }, i) => (
        <path
          key={i}
          d={roundedRectPath(338 + col * 30, 244 + row * 26, 22, 18, 4)}
          className={art("line", booked ? "tint" : "faint", "pop")}
          style={stagger(6 + i / 2)}
        />
      ))}
      <path
        d={roundedRectPath(338, 362, 114, 30, 10)}
        className={art("line", "tint", "rise")}
        style={stagger(11)}
      />
    </>
  );
}

function Notification() {
  return (
    <g className={art("float")}>
      <g className={art("rise")} style={stagger(9)}>
        <path
          d={roundedRectPath(250, 46, 128, 44, 12)}
          className={art("line", "face")}
        />
        <path d={circlePath(272, 68, 9)} className={art("line", "tint")} />
        <path d="M290 62 h68 M290 75 h42" className={art("line", "faint")} />
      </g>
    </g>
  );
}

export function MobileScene() {
  return (
    <>
      <Phone x={140} y={70} index={0} />
      <Phone x={320} y={110} index={1} />
      <ListScreen />
      <DashboardScreen />
      <Notification />
    </>
  );
}
