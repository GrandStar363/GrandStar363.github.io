import type { CSSProperties } from "react";
import styles from "./backdrop.module.css";

/** Class names for scene elements, e.g. art("line", "draw"). */
export function art(...names: (keyof typeof styles)[]): string {
  return names.map((name) => styles[name]).join(" ");
}

/** Position in an entrance sequence; scales the CSS animation delay. */
export function stagger(
  index: number,
  extra: Record<string, string> = {},
): CSSProperties {
  return { "--i": index, ...extra } as CSSProperties;
}
