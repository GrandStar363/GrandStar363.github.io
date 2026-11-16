import type { Person } from "@/content";
import { Portrait } from "./Portrait";

interface HeroHeadingProps {
  person: Person;
  /** Show a compact avatar beside the role line (large screens, when the backdrop takes the right side). */
  inlineAvatar: boolean;
}

export function HeroHeading({ person, inlineAvatar }: HeroHeadingProps) {
  return (
    <>
      <div className="flex items-center gap-3">
        {inlineAvatar ? (
          <Portrait
            name={person.name}
            avatar={person.avatar}
            size="compact"
            className="hidden lg:block"
          />
        ) : null}
        <p className="text-sm font-medium text-sky-700">
          {person.roles.slice(0, 2).join(" · ")}
        </p>
      </div>
      <h1
        id="hero-title"
        className="mt-3 font-serif text-5xl tracking-tight text-ink sm:text-6xl"
      >
        {person.name}
      </h1>
    </>
  );
}
