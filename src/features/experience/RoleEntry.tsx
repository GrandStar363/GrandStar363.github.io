import type { Role } from "@/content";
import { formatRange } from "@/shared/lib/dates";

export function RoleEntry({ role }: { role: Role }) {
  return (
    <li>
      <h4 className="font-medium text-ink">{role.title}</h4>
      <p className="mt-0.5 text-sm text-ink-muted">
        {formatRange(role.start, role.end)}
      </p>
      {role.summary ? (
        <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
          {role.summary}
        </p>
      ) : null}
    </li>
  );
}
