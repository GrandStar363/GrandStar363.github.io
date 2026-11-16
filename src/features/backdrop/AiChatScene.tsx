import { art, stagger } from "./art";
import type { CalloutSpec } from "./callout-geometry";
import { Callouts } from "./Callouts";
import { circlePath, roundedRectPath } from "./geometry";

interface Bubble {
  x: number;
  y: number;
  width: number;
  height: number;
  fromAi: boolean;
}

const BUBBLES: readonly Bubble[] = [
  { x: 192, y: 104, width: 150, height: 36, fromAi: false },
  { x: 238, y: 154, width: 172, height: 54, fromAi: true },
  { x: 192, y: 222, width: 124, height: 36, fromAi: false },
  { x: 228, y: 272, width: 182, height: 64, fromAi: true },
];

const CALLOUTS: readonly CalloutSpec[] = [
  { tag: "OpenAI API", from: [410, 180], to: [452, 132] },
  { tag: "Flutter", from: [432, 330], to: [470, 372] },
  { tag: "Laravel", from: [432, 90], to: [470, 58] },
];

/** Four-pointed sparkle centred on (x, y). */
const sparkle = (x: number, y: number, size: number) =>
  `M${x} ${y - size} Q${x} ${y} ${x + size} ${y} Q${x} ${y} ${x} ${y + size} Q${x} ${y} ${x - size} ${y} Q${x} ${y} ${x} ${y - size} Z`;

function Messages() {
  return BUBBLES.map((bubble, i) => (
    <g key={bubble.y} className={art("rise")} style={stagger(3 + i * 2)}>
      <path
        d={roundedRectPath(bubble.x, bubble.y, bubble.width, bubble.height, 14)}
        className={art("line", bubble.fromAi ? "tint" : "shade")}
      />
      <path
        d={`M${bubble.x + 14} ${bubble.y + 16} h${bubble.width - 40} M${bubble.x + 14} ${bubble.y + bubble.height - 14} h${bubble.width / 2}`}
        className={art("line", "faint")}
      />
    </g>
  ));
}

function Typing() {
  return (
    <g className={art("rise")} style={stagger(11)}>
      <path
        d={roundedRectPath(192, 352, 76, 32, 16)}
        className={art("line", "shade")}
      />
      {[212, 230, 248].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={368}
          r={4}
          className={art("dot", "bounce")}
          style={stagger(i)}
        />
      ))}
    </g>
  );
}

export function AiChatScene({ tags }: { tags: readonly string[] }) {
  return (
    <>
      <path
        d={roundedRectPath(168, 40, 264, 400, 28)}
        pathLength={1}
        className={art("line", "face", "draw")}
        style={stagger(0)}
      />
      <g className={art("rise")} style={stagger(1)}>
        <path d={circlePath(198, 72, 12)} className={art("line", "strong")} />
        <path d="M220 68 h70 M220 80 h40" className={art("line", "faint")} />
      </g>
      <Messages />
      <Typing />
      <path
        d={roundedRectPath(188, 400, 224, 26, 13)}
        className={art("line", "faint")}
      />
      <path d={circlePath(398, 413, 9)} className={art("line", "strong")} />
      <g className={art("float")}>
        <path
          d={sparkle(492, 156, 16)}
          className={art("line", "tint", "pop")}
          style={stagger(6)}
        />
        <path
          d={sparkle(120, 300, 11)}
          className={art("line", "tint", "pop")}
          style={stagger(9)}
        />
      </g>
      <Callouts specs={CALLOUTS} tags={tags} start={14} />
    </>
  );
}
