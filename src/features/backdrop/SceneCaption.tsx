import styles from "./backdrop.module.css";
import type { ResolvedScene } from "./resolve-scenes";

const pad = (value: number) => String(value).padStart(2, "0");

interface SceneCaptionProps {
  scene: ResolvedScene;
  index: number;
  total: number;
}

export function SceneCaption({ scene, index, total }: SceneCaptionProps) {
  return (
    <div className={styles.caption}>
      <p className="text-[11px] font-medium tracking-[0.14em] text-sky-700">
        {pad(index + 1)} / {pad(total)} · {scene.label}
      </p>
      <p className="mt-1.5 font-serif text-lg leading-snug text-ink">
        {scene.project}
      </p>
      {scene.stack.length > 0 ? (
        <p className="mt-1 text-xs text-ink-muted">{scene.stack.join(" · ")}</p>
      ) : null}
      {scene.industry ? (
        <p className="mt-0.5 text-xs text-ink-muted">{scene.industry}</p>
      ) : null}
    </div>
  );
}
