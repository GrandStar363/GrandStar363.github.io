import type { Skill } from "@/content";
import {
  FALLBACK_GROUP_TITLE,
  SKILL_GROUPS,
  type SkillGroupDefinition,
} from "./skill-groups";

export interface SkillGroup {
  title: string;
  skills: string[];
}

/** Buckets skills into configured groups, keeping the input order and never dropping a skill. */
export function groupSkills(
  skills: readonly Skill[],
  definitions: readonly SkillGroupDefinition[] = SKILL_GROUPS,
): SkillGroup[] {
  const groupOf = new Map(
    definitions.flatMap((definition) =>
      definition.skills.map((name) => [name.toLowerCase(), definition.title]),
    ),
  );
  const titles = [
    ...definitions.map((definition) => definition.title),
    FALLBACK_GROUP_TITLE,
  ];
  const buckets = new Map<string, string[]>(titles.map((title) => [title, []]));
  for (const skill of skills) {
    buckets
      .get(groupOf.get(skill.name.toLowerCase()) ?? FALLBACK_GROUP_TITLE)
      ?.push(skill.name);
  }
  return [...buckets]
    .filter(([, names]) => names.length > 0)
    .map(([title, names]) => ({ title, skills: names }));
}
