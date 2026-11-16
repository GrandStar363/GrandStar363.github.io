import { extractState } from "./extract-state";
import { fetchJson, fetchText } from "./http";
import { pickVideo, type VideoSource } from "./pick-video";
import {
  rawProfileStateSchema,
  rawProjectPageSchema,
  rawTestimonialPageSchema,
  type RawProfileState,
  type RawProject,
  type RawTestimonial,
} from "./raw-schema";

const MAX_PAGES = 20;

export async function fetchProfileState(
  origin: string,
  username: string,
): Promise<RawProfileState> {
  return rawProfileStateSchema.parse(
    extractState(await fetchText(`${origin}/${username}`)),
  );
}

/** Video URLs only appear on a project's own page, so fetch those pages one at a time. */
export async function fetchVideos(
  projects: readonly RawProject[],
): Promise<Map<number, VideoSource>> {
  const videos = new Map<number, VideoSource>();
  for (const project of projects.filter(
    (candidate) => candidate.mediaType === "video",
  )) {
    const page = rawProjectPageSchema.parse(
      extractState(await fetchText(project.links.main)),
    );
    const video = pickVideo(page.entities.projects[String(project.id)]?.stream);
    if (video) videos.set(project.id, video);
  }
  return videos;
}

export async function fetchTestimonials(
  origin: string,
  username: string,
): Promise<RawTestimonial[]> {
  const collected: RawTestimonial[] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const url = `${origin}/api/users/${username}/testimonials?page=${page}`;
    const body = rawTestimonialPageSchema.parse(await fetchJson(url));
    collected.push(...body.testimonials, ...body.meta.testimonials);
    if (body.meta.pagination.current_page >= body.meta.pagination.total_pages)
      break;
  }
  return [...new Map(collected.map((entry) => [entry.id, entry])).values()];
}
