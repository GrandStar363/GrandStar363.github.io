import { preload } from "react-dom";

interface ImgProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Above-the-fold images: preloaded and fetched eagerly with high priority. */
  priority?: boolean;
  className?: string;
}

/**
 * Pre-sized static image rendered entirely on the server.
 * The site is a static export with unoptimized images, so next/image would add a
 * client component per image without any optimization benefit.
 */
export function Img({
  src,
  width,
  height,
  alt,
  priority = false,
  className,
}: ImgProps) {
  if (priority) preload(src, { as: "image", fetchPriority: "high" });
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
