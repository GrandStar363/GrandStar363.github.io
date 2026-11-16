import { writeFile } from "node:fs/promises";
import type { Profile } from "@/content/schema";
import { buildProfile } from "./build-profile";
import {
  PUBLIC_DIR,
  SNAPSHOT_FILE,
  TWINE_ORIGIN,
  TWINE_USERNAME,
} from "./config";
import { orderedProjects } from "./map-projects";
import { planMedia, writeMedia } from "./media";
import { ROLE_END_OVERRIDES } from "./overrides";
import {
  fetchProfileState,
  fetchTestimonials,
  fetchVideos,
} from "./twine-client";

function soleValue<T>(record: Record<string, T>, label: string): T {
  const [value, ...others] = Object.values(record);
  if (value === undefined || others.length > 0)
    throw new Error(`Expected exactly one ${label}`);
  return value;
}

function summarize(profile: Profile, mediaCount: number): string {
  const counts = {
    roles: profile.experience.length,
    projects: profile.projects.length,
    skills: profile.skills.length,
    languages: profile.languages.length,
    sectors: profile.sectors.length,
    testimonials: profile.testimonials.length,
    degrees: profile.degrees.length,
    certifications: profile.certifications.length,
    media: mediaCount,
  };
  return Object.entries(counts)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");
}

async function main(): Promise<void> {
  const state = await fetchProfileState(TWINE_ORIGIN, TWINE_USERNAME);
  const user = soleValue(state.entities.users, "user in the Twine state");
  const projects = orderedProjects(state, TWINE_USERNAME);
  const videos = await fetchVideos(projects);
  const testimonials = await fetchTestimonials(TWINE_ORIGIN, TWINE_USERNAME);
  const profile = buildProfile({
    user,
    projects,
    videos,
    testimonials,
    roleEndOverrides: ROLE_END_OVERRIDES,
    now: new Date(),
  });
  const jobs = planMedia(user, projects, videos);
  await writeMedia(jobs, PUBLIC_DIR);
  await writeFile(SNAPSHOT_FILE, `${JSON.stringify(profile, null, 2)}\n`);
  console.log(
    `Synced ${TWINE_ORIGIN}/${TWINE_USERNAME} → ${summarize(profile, jobs.length)}`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
