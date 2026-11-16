import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fetchBytes } from "./http";
import { mediaPaths } from "./media-paths";
import type { VideoSource } from "./pick-video";
import { projectSlug } from "./project-slug";
import type { RawProject, RawUser } from "./raw-schema";

export interface MediaJob {
  url: string;
  path: string;
}

export function planMedia(
  user: RawUser,
  projects: readonly RawProject[],
  videos: ReadonlyMap<number, VideoSource>,
): MediaJob[] {
  const projectJobs = projects.flatMap((project) => {
    const slug = projectSlug(project.links.main);
    const video = videos.get(project.id);
    const cover = {
      url: project.thumbnails.images["405"].wide.main,
      path: mediaPaths.cover(slug),
    };
    return video
      ? [cover, { url: video.url, path: mediaPaths.video(slug) }]
      : [cover];
  });
  return [
    { url: user.avatars.images["380"].square.main, path: mediaPaths.avatar },
    ...projectJobs,
  ];
}

/** Replaces public/media wholesale so files for removed projects never linger. */
export async function writeMedia(
  jobs: readonly MediaJob[],
  publicDir: string,
): Promise<void> {
  await rm(join(publicDir, "media"), { recursive: true, force: true });
  for (const job of jobs) {
    const target = join(publicDir, job.path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, await fetchBytes(job.url));
  }
}
