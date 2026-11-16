import { describe, expect, it } from "vitest";
import fixture from "./__fixtures__/profile-state.json";
import { buildProfile } from "./build-profile";
import { extractState } from "./extract-state";
import { orderedProjects } from "./map-projects";
import { planMedia } from "./media";
import { rawProfileStateSchema } from "./raw-schema";

const html = `<html><body><script>window.__data=${JSON.stringify(fixture)}</script></body></html>`;
const state = rawProfileStateSchema.parse(extractState(html));
const user = Object.values(state.entities.users)[0]!;
const projects = orderedProjects(state, "Maksim999");
const video = {
  url: "https://cdn.test/v_640x360_600.mp4",
  width: 640,
  height: 360,
};
const videos = new Map([[projects[1]!.id, video]]);
const testimonial = {
  id: 1,
  name: "Anthony",
  project_name: "3D Modular House Configurator",
  comment: "Great.",
};

describe("extractState", () => {
  it("throws when the page has no embedded state", () => {
    expect(() => extractState("<html></html>")).toThrow(/window.__data/);
  });
});

describe("buildProfile", () => {
  const profile = buildProfile({
    user,
    projects,
    videos,
    testimonials: [testimonial],
    now: new Date("2026-11-16"),
  });

  it("keeps the owner's project order and local media paths", () => {
    expect(profile.projects.map((project) => project.slug)).toEqual([
      "aerialgis-real-estate-gis-portal-react-django-postgis-mapbox",
      "3d-modular-house-configurator",
    ]);
    expect(profile.projects[1]?.video?.src).toBe(
      "/media/projects/3d-modular-house-configurator.mp4",
    );
    expect(profile.projects[0]?.title).toBe("AerialGIS Real Estate GIS Portal");
  });

  it("sorts roles newest first and marks open-ended roles as current", () => {
    expect(profile.experience.map((role) => [role.start, role.end])).toEqual([
      ["2026-03", "2026-06"],
      ["2025-08", null],
      ["2018-06", "2021-09"],
    ]);
  });

  it("applies hand-authored role end dates on top of Twine data", () => {
    const corrected = buildProfile({
      user,
      projects,
      videos,
      testimonials: [],
      roleEndOverrides: { "3786523": "2026-10" },
      now: new Date("2026-11-16"),
    });
    expect(corrected.experience.map((role) => role.end)).toEqual([
      "2026-06",
      "2026-10",
      "2021-09",
    ]);
  });

  it("splits degrees from certifications and links testimonials to projects", () => {
    expect(profile.degrees).toHaveLength(2);
    expect(profile.certifications).toEqual([
      { name: "AI Fluency: Framework & Foundations" },
    ]);
    expect(profile.testimonials[0]?.projectSlug).toBe(
      "3d-modular-house-configurator",
    );
  });

  it("plans one download per avatar, cover and video", () => {
    expect(planMedia(user, projects, videos).map((job) => job.path)).toEqual([
      "/media/avatar.jpg",
      "/media/projects/aerialgis-real-estate-gis-portal-react-django-postgis-mapbox.jpg",
      "/media/projects/3d-modular-house-configurator.jpg",
      "/media/projects/3d-modular-house-configurator.mp4",
    ]);
  });
});
