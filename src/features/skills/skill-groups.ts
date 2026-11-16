export interface SkillGroupDefinition {
  title: string;
  /** Skill names as Twine spells them; matched case-insensitively. */
  skills: readonly string[];
}

/** Presentation grouping for the flat Twine skill list. Unlisted skills fall into "Other". */
export const SKILL_GROUPS: readonly SkillGroupDefinition[] = [
  {
    title: "Frontend",
    skills: [
      "React JS",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS",
      "Tailwind",
    ],
  },
  {
    title: "Backend & data",
    skills: [
      "Node.js",
      "Express",
      "GraphQL",
      "API",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Stripe",
    ],
  },
  { title: "Mobile", skills: ["React Native", "Flutter"] },
  { title: "Cloud & DevOps", skills: ["AWS", "Docker", "Kubernetes"] },
  {
    title: "AI tooling",
    skills: ["Claude", "GitHub CoPilot", "Cursor Composer", "AI Chatbot"],
  },
  { title: "Delivery", skills: ["MVP", "Jira"] },
];

export const FALLBACK_GROUP_TITLE = "Other";
