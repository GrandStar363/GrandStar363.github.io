import type { Media } from "@/content";
import { cn } from "@/shared/lib/cn";
import { Img } from "@/shared/ui/Img";

export type PortraitSize = "large" | "compact";

const sizes: Record<PortraitSize, string> = {
  large: "size-32 sm:size-40 md:size-52",
  compact: "size-12",
};

interface PortraitProps {
  name: string;
  avatar: Media;
  size?: PortraitSize;
  className?: string;
}

export function Portrait({
  name,
  avatar,
  size = "large",
  className,
}: PortraitProps) {
  return (
    <Img
      src={avatar.src}
      width={avatar.width}
      height={avatar.height}
      alt={`Portrait of ${name}`}
      priority
      className={cn(
        "rounded-full border border-line bg-white object-cover",
        sizes[size],
        className,
      )}
    />
  );
}
