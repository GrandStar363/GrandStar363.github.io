import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/content";
import { AiChatScene } from "./AiChatScene";
import { ArScene } from "./ArScene";
import styles from "./backdrop.module.css";
import { BookingScene } from "./BookingScene";
import { CityScene } from "./CityScene";
import { CommerceScene } from "./CommerceScene";
import { DeliveryScene } from "./DeliveryScene";
import { GisScene } from "./GisScene";
import { MobileScene } from "./MobileScene";
import { PlatformScene } from "./PlatformScene";
import { resolveScenes } from "./resolve-scenes";
import { SceneCaption } from "./SceneCaption";
import { SceneCycle } from "./SceneCycle";
import { SCENES, type SceneId } from "./scenes";

const ARTWORK: Record<
  SceneId,
  (props: { tags: readonly string[] }) => ReactNode
> = {
  city: CityScene,
  gis: GisScene,
  mobile: MobileScene,
  booking: BookingScene,
  ar: ArScene,
  delivery: DeliveryScene,
  ai: AiChatScene,
  commerce: CommerceScene,
  platform: PlatformScene,
};

const SCENE_MS = 3500;

interface WorkBackdropProps {
  projects: readonly Project[];
  sectors: readonly string[];
  /** Route whose first screen shows the scene captions (project, stack, industry). */
  captionPath: string;
}

/**
 * Line-art scenes of real portfolio work that take turns in a fixed layer behind the whole site.
 * Mounted in the root layout, so it keeps running across scrolling and page navigation.
 */
export function WorkBackdrop({
  projects,
  sectors,
  captionPath,
}: WorkBackdropProps) {
  const scenes = resolveScenes(SCENES, projects, sectors);
  const topics = scenes.map((scene) => scene.topic);
  return (
    <div
      aria-hidden="true"
      style={{ "--scene-ms": `${SCENE_MS}ms` } as CSSProperties}
    >
      <SceneCycle
        intervalMs={SCENE_MS}
        captionPath={captionPath}
        className={styles.root}
      >
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
                viewBox="-60 0 660 470"
                preserveAspectRatio="xMidYMid meet"
                className={styles.art}
              >
                <Artwork tags={scene.stack} />
              </svg>
              <SceneCaption scene={scene} index={index} topics={topics} />
            </div>
          );
        })}
      </SceneCycle>
    </div>
  );
}
