import type { ReactNode } from "react";
import type { Project } from "@/content";
import styles from "./backdrop.module.css";
import { CityScene } from "./CityScene";
import { GisScene } from "./GisScene";
import { MobileScene } from "./MobileScene";
import { PlatformScene } from "./PlatformScene";
import { resolveScenes } from "./resolve-scenes";
import { SceneCaption } from "./SceneCaption";
import { SceneCycle } from "./SceneCycle";
import { SCENES, type SceneId } from "./scenes";

const ARTWORK: Record<SceneId, () => ReactNode> = {
  city: CityScene,
  gis: GisScene,
  mobile: MobileScene,
  platform: PlatformScene,
};

const SCENE_MS = 7500;

interface WorkBackdropProps {
  projects: readonly Project[];
  sectors: readonly string[];
}

/** Line-art scenes of real portfolio work that take turns behind the hero. Decorative only. */
export function WorkBackdrop({ projects, sectors }: WorkBackdropProps) {
  const scenes = resolveScenes(SCENES, projects, sectors);
  return (
    <SceneCycle intervalMs={SCENE_MS} className={styles.root}>
      {scenes.map((scene, index) => {
        const Artwork = ARTWORK[scene.id];
        return (
          <div
            key={scene.id}
            data-scene=""
            data-active={index === 0 ? "" : undefined}
            className={styles.scene}
          >
            <svg
              viewBox="0 0 600 470"
              preserveAspectRatio="xMidYMid meet"
              className={styles.art}
            >
              <Artwork />
            </svg>
            <SceneCaption scene={scene} index={index} total={scenes.length} />
          </div>
        );
      })}
    </SceneCycle>
  );
}
