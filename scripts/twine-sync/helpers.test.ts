import { describe, expect, it } from "vitest";
import { findLinkedProject } from "./find-linked-project";
import { languageLevel } from "./language-level";
import { pickVideo } from "./pick-video";
import { projectSlug } from "./project-slug";
import { splitTitle } from "./split-title";
import { cleanText, uniqueCaseInsensitive } from "./text";

describe("cleanText", () => {
  it("normalizes math-bold letters and Windows line endings", () => {
    expect(cleanText(" 𝑭𝒐𝒄𝒖𝒔 𝑺𝒕𝒓𝒆𝒂𝒌\r\nnext ")).toBe("Focus Streak\nnext");
  });
});

describe("uniqueCaseInsensitive", () => {
  it("keeps the first spelling of each value", () => {
    expect(uniqueCaseInsensitive(["React", "react", "Node.js"])).toEqual([
      "React",
      "Node.js",
    ]);
  });
});

describe("splitTitle", () => {
  it("moves a trailing tag segment out of the title", () => {
    expect(splitTitle("AerialGIS Portal | React, Django")).toEqual({
      title: "AerialGIS Portal",
      tags: ["React", "Django"],
    });
  });

  it("keeps titles whose first segment is a single word", () => {
    expect(splitTitle("AR | try-on | Three.js")).toEqual({
      title: "AR | try-on | Three.js",
      tags: [],
    });
  });
});

describe("languageLevel", () => {
  it.each([
    [100, "Fluent"],
    [90, "Fluent"],
    [85, "Advanced"],
    [40, "Intermediate"],
    [20, "Beginner"],
  ] as const)("maps %i to %s", (proficiency, label) => {
    expect(languageLevel(proficiency)).toBe(label);
  });
});

describe("projectSlug", () => {
  it("uses the last URL segment", () => {
    expect(
      projectSlug(
        "https://www.twine.net/Maksim999/c21ow60/3d-modular-house-configurator",
      ),
    ).toBe("3d-modular-house-configurator");
  });
});

describe("findLinkedProject", () => {
  const projects = [
    { title: "Testpriser - AI Hospital Finder" },
    { title: "3D Modular House Configurator" },
  ];

  it("matches a partial project name", () => {
    expect(findLinkedProject("AI Hospital Finder", projects)).toBe(projects[0]);
  });

  it("returns undefined for unknown projects", () => {
    expect(findLinkedProject("𝑭𝒐𝒄𝒖𝒔 𝑺𝒕𝒓𝒆𝒂𝒌", projects)).toBeUndefined();
  });
});

describe("pickVideo", () => {
  it("picks the highest rendition and reads its size from the file name", () => {
    const stream = {
      video: {
        "270": { "300": { mp4: "https://cdn.test/a_480x270_300.mp4" } },
        "360": { "600": { mp4: "https://cdn.test/a_640x360_600.mp4" } },
      },
    };
    expect(pickVideo(stream)).toEqual({
      url: "https://cdn.test/a_640x360_600.mp4",
      width: 640,
      height: 360,
    });
  });

  it("returns null for image projects", () => {
    expect(pickVideo([])).toBeNull();
  });
});
