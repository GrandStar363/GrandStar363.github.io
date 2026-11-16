import { describe, expect, it } from "vitest";
import type { Project } from "@/content";
import { resolveScenes } from "./resolve-scenes";

const project = (slug: string, title: string, skills: string[]): Project => ({
  id: slug,
  slug,
  title,
  role: null,
  summary: ["Summary."],
  highlights: [],
  skills,
  cover: { src: "/media/x.jpg", width: 1, height: 1 },
  video: null,
});

describe("resolveScenes", () => {
  const projects = [project("maps", "Map Portal", ["React", "Mapbox"])];

  it("keeps only tags and industries that exist in the data", () => {
    const [scene] = resolveScenes(
      [
        {
          id: "gis",
          label: "GIS",
          projectSlug: "maps",
          stack: ["Mapbox", "Leaflet", "react"],
          industry: "Government",
        },
      ],
      projects,
      ["Healthcare"],
    );
    expect(scene).toEqual({
      id: "gis",
      label: "GIS",
      project: "Map Portal",
      stack: ["Mapbox", "react"],
      industry: null,
    });
  });

  it("drops scenes whose project is not in the portfolio", () => {
    const scenes = resolveScenes(
      [
        {
          id: "city",
          label: "3D",
          projectSlug: "missing",
          stack: [],
          industry: "Healthcare",
        },
      ],
      projects,
      ["Healthcare"],
    );
    expect(scenes).toEqual([]);
  });
});
