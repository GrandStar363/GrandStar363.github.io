import type { Role } from "@/content";
import { formatRange } from "@/shared/lib/dates";

export function RoleEntry({ role }: { role: Role }) {
  return (
    <li
      data-start={role.start}
      className="grid gap-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[15rem_1fr] md:gap-10"
    >
      <div>
        <p className="text-sm text-ink-muted">
          {formatRange(role.start, role.end)}
        </p>
        <p className="mt-1 font-serif text-lg text-ink">{role.company}</p>
      </div>
      <div>
        <h3 className="font-medium text-ink">{role.title}</h3>
        {role.summary ? (
          <p className="mt-2 max-w-prose leading-relaxed text-ink-muted">
            {role.summary}
          </p>
        ) : null}
      </div>
    </li>
  );
}
