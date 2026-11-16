import type { Person } from "@/content";
import { Portrait } from "./Portrait";

/** Role line (with a compact avatar on wide screens, where the large portrait is hidden) and name. */
export function HeroHeading({ person }: { person: Person }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <Portrait
          name={person.name}
          avatar={person.avatar}
          size="compact"
          className="hidden lg:block"
        />
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
