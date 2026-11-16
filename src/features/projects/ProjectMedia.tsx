import { preload } from "react-dom";
import type { Project } from "@/content";
import { Img } from "@/shared/ui/Img";

const frame =
  "aspect-video w-full rounded-xl border border-line bg-white object-cover";

export function ProjectMedia({ project }: { project: Project }) {
  const { cover, video, title } = project;
  if (video) {
    // The poster is the page's largest paint; let the browser fetch it before layout.
    preload(cover.src, { as: "image", fetchPriority: "high" });
    return (
      <video
        controls
        playsInline
        preload="none"
        poster={cover.src}
        width={video.width}
        height={video.height}
        aria-label={`${title}: demo video`}
        className={frame}
      >
        <source src={video.src} type="video/mp4" />
      </video>
    );
  }
  return (
    <Img
      src={cover.src}
      width={cover.width}
      height={cover.height}
      alt={title}
      priority
      className={frame}
    />
  );
}
