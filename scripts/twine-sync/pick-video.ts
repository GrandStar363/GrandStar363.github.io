import { z } from "zod";

export interface VideoSource {
  url: string;
  width: number;
  height: number;
}

const videoStream = z.object({
  video: z.record(z.string(), z.record(z.string(), z.object({ mp4: z.url() }))),
});

const highestKey = <T>(record: Record<string, T>): T | undefined =>
  Object.entries(record).sort(([a], [b]) => Number(b) - Number(a))[0]?.[1];

/** Picks the highest-resolution, highest-bitrate mp4 from a Twine media stream. */
export function pickVideo(stream: unknown): VideoSource | null {
  const parsed = videoStream.safeParse(stream);
  if (!parsed.success) return null;
  const renditions = highestKey(parsed.data.video);
  const best = renditions && highestKey(renditions);
  const size = best && /_(\d+)x(\d+)_/.exec(best.mp4);
  if (!best || !size) return null;
  return { url: best.mp4, width: Number(size[1]), height: Number(size[2]) };
}
