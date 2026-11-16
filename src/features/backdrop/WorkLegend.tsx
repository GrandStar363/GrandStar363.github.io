import type { Project } from "@/content";
import { resolveScenes } from "./resolve-scenes";
import { SceneLegend } from "./SceneLegend";
import { SCENES } from "./scenes";
import { SCENE_MS } from "./timing";

interface WorkLegendProps {
  projects: readonly Project[];
  sectors: readonly string[];
}

/** Server entry for the legend: resolves the scenes once and hands plain data to the client card. */
export function WorkLegend({ projects, sectors }: WorkLegendProps) {
  return (
    <SceneLegend
      scenes={resolveScenes(SCENES, projects, sectors)}
      intervalMs={SCENE_MS}
    />
  );
}
