import { profileSchema, type Profile } from "@/content/schema";
import { mapEducation } from "./map-education";
import { mapExperience } from "./map-experience";
import {
  mapLanguages,
  mapPerson,
  mapRating,
  mapSectors,
  mapSkills,
} from "./map-person";
import { mapProject } from "./map-projects";
import { mapTestimonials } from "./map-testimonials";
import type { VideoSource } from "./pick-video";
import type { RawProject, RawTestimonial, RawUser } from "./raw-schema";

export interface ProfileSources {
  user: RawUser;
  projects: readonly RawProject[];
  videos: ReadonlyMap<number, VideoSource>;
  testimonials: readonly RawTestimonial[];
  now: Date;
}

/** Pure assembly of the domain snapshot; validated against the content contract. */
export function buildProfile(sources: ProfileSources): Profile {
  const { user, now } = sources;
  const projects = sources.projects.map((raw) =>
    mapProject(raw, sources.videos.get(raw.id) ?? null),
  );
  return profileSchema.parse({
    person: mapPerson(user, now),
    rating: mapRating(user),
    languages: mapLanguages(user),
    skills: mapSkills(user),
    sectors: mapSectors(user),
    experience: mapExperience(user.workexperience),
    projects,
    testimonials: mapTestimonials(sources.testimonials, projects),
    ...mapEducation(user.education),
  });
}
