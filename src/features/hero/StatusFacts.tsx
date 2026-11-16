import type { Person, Rating } from "@/content";

interface StatusFactsProps {
  person: Pick<Person, "available" | "location">;
  rating: Rating;
}

export function StatusFacts({ person, rating }: StatusFactsProps) {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
      {person.available ? (
        <li className="flex items-center gap-2 text-ink">
          <span aria-hidden="true" className="size-2 rounded-full bg-sun" />
          Available for work
        </li>
      ) : null}
      <li>{person.location}</li>
      {rating.count > 0 ? (
        <li>
          Rated {rating.average.toFixed(1)} by {rating.count} clients
        </li>
      ) : null}
    </ul>
  );
}
