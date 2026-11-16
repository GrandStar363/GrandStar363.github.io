import type { LanguageLevel } from "@/content/schema";

const THRESHOLDS: ReadonlyArray<readonly [number, LanguageLevel]> = [
  [90, "Fluent"],
  [70, "Advanced"],
  [40, "Intermediate"],
];

/** Maps Twine's 0–100 language proficiency onto the labels Twine displays. */
export function languageLevel(proficiency: number): LanguageLevel {
  return (
    THRESHOLDS.find(([minimum]) => proficiency >= minimum)?.[1] ?? "Beginner"
  );
}
