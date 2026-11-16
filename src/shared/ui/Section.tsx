import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="border-t border-line py-16 sm:py-24"
    >
      <Container>
        <header className="mb-10 max-w-2xl">
          <h2
            id={titleId}
            className="font-serif text-3xl tracking-tight text-ink sm:text-4xl"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {intro}
            </p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
