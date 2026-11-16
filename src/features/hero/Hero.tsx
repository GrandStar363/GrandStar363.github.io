import type { ReactNode } from "react";
import type { ExternalProfile, Person, Rating } from "@/content";
import { Container } from "@/shared/ui/Container";
import { cn } from "@/shared/lib/cn";
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
  /** Decorative layer behind the hero's right side (large screens only). */
  backdrop?: ReactNode;
}

export function Hero({
  person,
  rating,
  featuredStack,
  primaryEmail,
  projectsHref,
  profiles,
  backdrop,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-sky-50 to-paper"
    >
      {backdrop ? (
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] lg:block"
        >
          {backdrop}
        </div>
      ) : null}
      <Container
        className={cn(
          "flex flex-col gap-10 py-14 sm:py-20 md:flex-row-reverse md:items-center md:justify-between",
          backdrop ? "lg:flex-row" : null,
        )}
      >
        <Portrait
          name={person.name}
          avatar={person.avatar}
          className={cn("intro", backdrop ? "lg:hidden" : null)}
        />
        <div className="intro-stagger max-w-2xl">
          <HeroHeading person={person} inlineAvatar={Boolean(backdrop)} />
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
