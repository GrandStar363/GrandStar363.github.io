import type { Media } from "@/content";
import { Img } from "@/shared/ui/Img";

export function Portrait({ name, avatar }: { name: string; avatar: Media }) {
  return (
    <Img
      src={avatar.src}
      width={avatar.width}
      height={avatar.height}
      alt={`Portrait of ${name}`}
      priority
      className="size-32 rounded-full border border-line bg-white object-cover sm:size-40 md:size-52"
    />
  );
}
