import type { ReactNode } from "react";
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
import { SceneCycle } from "./SceneCycle";
import { SCENES, type SceneId } from "./scenes";
import { SCENE_MS } from "./timing";

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

interface WorkBackdropProps {
  projects: readonly Project[];
  sectors: readonly string[];
}

/**
 * Line-art scenes of real portfolio work that take turns in a fixed layer behind the whole site.
 * Mounted in the root layout, so it keeps running across scrolling and page navigation.
 */
export function WorkBackdrop({ projects, sectors }: WorkBackdropProps) {
  const scenes = resolveScenes(SCENES, projects, sectors);
  return (
    <div aria-hidden="true">
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
                viewBox="-60 0 660 470"
                preserveAspectRatio="xMidYMid meet"
                className={styles.art}
              >
                <Artwork tags={scene.stack} />
              </svg>
            </div>
          );
        })}
      </SceneCycle>
    </div>
  );
}
