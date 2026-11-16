import { describe, expect, it } from "vitest";
import { groupSkills } from "./group-skills";

const definitions = [
  { title: "Frontend", skills: ["React JS", "CSS"] },
  { title: "Mobile", skills: ["Flutter"] },
];

describe("groupSkills", () => {
  it("groups case-insensitively, keeps input order and sends unknown skills to Other", () => {
    const skills = [
      { name: "css", level: 90 },
      { name: "Rust", level: 80 },
      { name: "React JS", level: 70 },
    ];
    expect(groupSkills(skills, definitions)).toEqual([
      { title: "Frontend", skills: ["css", "React JS"] },
      { title: "Other", skills: ["Rust"] },
    ]);
  });
});
