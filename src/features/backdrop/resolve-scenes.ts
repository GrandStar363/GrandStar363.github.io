import type { Project } from "@/content";
import type { SceneDefinition, SceneId } from "./scenes";

export interface ResolvedScene {
  id: SceneId;
  label: string;
  project: string;
  stack: string[];
  industry: string | null;
}

const lower = (value: string) => value.toLowerCase();

/**
 * Joins scene definitions with real portfolio data. Scenes whose project is missing are
 * dropped, and only tags/industries present in the data are kept, so captions never invent facts.
 */
export function resolveScenes(
  definitions: readonly SceneDefinition[],
  projects: readonly Project[],
  sectors: readonly string[],
): ResolvedScene[] {
  const knownSectors = new Set(sectors.map(lower));
  return definitions.flatMap((definition) => {
    const project = projects.find(
      (candidate) => candidate.slug === definition.projectSlug,
    );
    if (!project) return [];
    const tags = new Set(project.skills.map(lower));
    return [
      {
        id: definition.id,
        label: definition.label,
        project: project.title,
        stack: definition.stack.filter((tag) => tags.has(lower(tag))),
        industry: knownSectors.has(lower(definition.industry))
          ? definition.industry
          : null,
      },
    ];
  });
}
