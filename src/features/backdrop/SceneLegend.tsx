"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { cn } from "@/shared/lib/cn";
import { TagList } from "@/shared/ui/TagList";
import { activeScene } from "./active-scene";
import styles from "./backdrop.module.css";
import type { ResolvedScene } from "./resolve-scenes";

const pad = (value: number) => String(value).padStart(2, "0");

interface SceneLegendProps {
  scenes: readonly ResolvedScene[];
  intervalMs: number;
}

/** Strip naming the topic the background is showing: project, industry, tech and the full index. */
export function SceneLegend({ scenes, intervalMs }: SceneLegendProps) {
  const index = useSyncExternalStore(
    activeScene.subscribe,
    activeScene.get,
    () => 0,
  );
  const scene = scenes[index] ?? scenes[0];
  if (!scene) return null;
  return (
    <div
      aria-hidden="true"
      style={{ "--scene-ms": `${intervalMs}ms` } as CSSProperties}
      className="rounded-2xl border border-line bg-paper/85 px-6 py-4"
    >
      <div key={index} className={cn(styles.legend, "flex items-center gap-6")}>
        <p className="shrink-0 text-xs font-medium tracking-[0.14em] text-sky-700">
          {pad(index + 1)} / {pad(scenes.length)}
        </p>
        <div className="min-w-0">
          <p className="font-serif text-2xl leading-tight text-ink">
            {scene.label}
          </p>
          <p className="truncate text-sm text-ink-muted">
            {scene.project}
            {scene.industry ? ` · ${scene.industry}` : ""}
          </p>
        </div>
        <TagList items={scene.stack} className="ml-auto shrink-0 justify-end" />
      </div>
      <div key={`timer-${index}`} className={styles.timer} />
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {scenes.map((item, i) => (
          <li
            key={item.id}
            className={cn(
              i === index ? "font-semibold text-sky-700" : "text-ink-muted",
            )}
          >
            {item.topic}
          </li>
        ))}
      </ol>
    </div>
  );
}
