import { cn } from "@/shared/lib/cn";
import { TagList } from "@/shared/ui/TagList";
import styles from "./backdrop.module.css";
import type { ResolvedScene } from "./resolve-scenes";

const pad = (value: number) => String(value).padStart(2, "0");

interface SceneCaptionProps {
  scene: ResolvedScene;
  index: number;
  /** Every topic in order, so visitors see the full range with this one highlighted. */
  topics: readonly string[];
}

export function SceneCaption({ scene, index, topics }: SceneCaptionProps) {
  return (
    <div className={styles.captionDock}>
      <div className={styles.caption}>
        <p className="text-xs font-medium tracking-[0.14em] text-sky-700">
          {pad(index + 1)} / {pad(topics.length)}
        </p>
        <p className="mt-1 font-serif text-3xl leading-tight text-ink">
          {scene.label}
        </p>
        <p className="mt-1 text-sm text-ink-muted">{scene.project}</p>
        <TagList items={scene.stack} className="mt-3 justify-end" />
        {scene.industry ? (
          <p className="mt-2 text-xs text-ink-muted">{scene.industry}</p>
        ) : null}
        <div className={styles.timer} />
        <ol className="mt-3 flex flex-wrap justify-end gap-x-2.5 gap-y-1 text-[11px]">
          {topics.map((topic, i) => (
            <li
              key={topic}
              className={cn(
                i === index
                  ? "font-semibold text-sky-700"
                  : "text-ink-muted/70",
              )}
            >
              {topic}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
