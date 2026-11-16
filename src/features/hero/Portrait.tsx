import type { Media } from "@/content";
import { cn } from "@/shared/lib/cn";
import { Img } from "@/shared/ui/Img";

interface PortraitProps {
  name: string;
  avatar: Media;
  className?: string;
}

export function Portrait({ name, avatar, className }: PortraitProps) {
  return (
    <Img
      src={avatar.src}
      width={avatar.width}
      height={avatar.height}
      alt={`Portrait of ${name}`}
      priority
      className={cn(
        "size-32 rounded-full border border-line bg-white object-cover sm:size-40 md:size-52",
        className,
      )}
    />
  );
}
