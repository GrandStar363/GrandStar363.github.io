import type { ExternalProfile, Person, Rating } from "@/content";
import { Container } from "@/shared/ui/Container";
import { TagList } from "@/shared/ui/TagList";
import { HeroActions } from "./HeroActions";
import { Portrait } from "./Portrait";
import { StatusFacts } from "./StatusFacts";

interface HeroProps {
  person: Person;
  rating: Rating;
  featuredStack: readonly string[];
  primaryEmail: string;
  projectsHref: string;
  profiles: readonly ExternalProfile[];
}

export function Hero({
  person,
  rating,
  featuredStack,
  primaryEmail,
  projectsHref,
  profiles,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-linear-to-b from-sky-50 to-paper"
    >
      <Container className="flex flex-col gap-10 py-14 sm:py-20 md:flex-row-reverse md:items-center md:justify-between">
        <Portrait name={person.name} avatar={person.avatar} className="intro" />
        <div className="intro-stagger max-w-2xl">
          <p className="text-sm font-medium text-sky-700">
            {person.roles.slice(0, 2).join(" · ")}
          </p>
          <h1
            id="hero-title"
            className="mt-3 font-serif text-5xl tracking-tight text-ink sm:text-6xl"
          >
            {person.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            {person.bio}
          </p>
          <StatusFacts person={person} rating={rating} />
          <TagList items={featuredStack} label="Core stack" className="mt-6" />
          <HeroActions
            email={primaryEmail}
            projectsHref={projectsHref}
            profiles={profiles}
          />
        </div>
      </Container>
    </section>
  );
}
