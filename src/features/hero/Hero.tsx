import type { ReactNode } from "react";
import type { ExternalProfile, Person, Rating } from "@/content";
import { Container } from "@/shared/ui/Container";
import { TagList } from "@/shared/ui/TagList";
import { HeroActions } from "./HeroActions";
import { HeroHeading } from "./HeroHeading";
import { Portrait } from "./Portrait";
import { StatusFacts } from "./StatusFacts";

interface HeroProps {
  person: Person;
  rating: Rating;
  featuredStack: readonly string[];
  primaryEmail: string;
  projectsHref: string;
  profiles: readonly ExternalProfile[];
  /** Full-width strip under the hero content on wide screens. */
  aside?: ReactNode;
}

/** On wide screens the right side stays open for the site's background artwork. */
export function Hero({
  person,
  rating,
  featuredStack,
  primaryEmail,
  projectsHref,
  profiles,
  aside,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-linear-to-b from-sky-50/70 to-transparent"
    >
      <Container className="flex flex-col gap-10 py-14 sm:py-20 md:flex-row-reverse md:items-center md:justify-between lg:flex-row lg:pb-10">
        <Portrait
          name={person.name}
          avatar={person.avatar}
          className="intro lg:hidden"
        />
        <div className="intro-stagger max-w-2xl">
          <HeroHeading person={person} />
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
      {aside ? (
        <Container className="intro hidden pb-12 lg:block">{aside}</Container>
      ) : null}
    </section>
  );
}
