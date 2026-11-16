import type { Project } from "@/content/schema";
import { mediaPaths } from "./media-paths";
import { parseDescription } from "./parse-description";
import type { VideoSource } from "./pick-video";
import { projectSlug } from "./project-slug";
import type { RawProfileState, RawProject } from "./raw-schema";
import { splitTitle } from "./split-title";
import { cleanText, uniqueCaseInsensitive } from "./text";

/** Projects in the order the owner arranged them on Twine (via portfolio credits). */
export function orderedProjects(
  state: RawProfileState,
  username: string,
): RawProject[] {
  const credits = state.portfolio[username]?.credits ?? [];
  return credits.map((creditId) => {
    const projectId = state.entities.credits[String(creditId)]?.project_id;
    const project = state.entities.projects[String(projectId)];
    if (!project) throw new Error(`Credit ${creditId} has no matching project`);
    return project;
  });
}

export function mapProject(
  raw: RawProject,
  video: VideoSource | null,
): Project {
  const slug = projectSlug(raw.links.main);
  const { title, tags } = splitTitle(cleanText(raw.title));
  const parsed = parseDescription(raw.description);
  const cover = raw.thumbnails.images["405"];
  return {
    id: String(raw.id),
    slug,
    title,
    role: parsed.role,
    summary: parsed.summary,
    highlights: parsed.highlights,
    skills: uniqueCaseInsensitive([...parsed.skills, ...tags]),
    cover: {
      src: mediaPaths.cover(slug),
      width: cover.width,
      height: cover.height,
    },
    video: video && {
      src: mediaPaths.video(slug),
      width: video.width,
      height: video.height,
    },
  };
}
