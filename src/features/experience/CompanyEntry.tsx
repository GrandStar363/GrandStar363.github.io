import { formatRange } from "@/shared/lib/dates";
import type { CompanyGroup } from "./group-roles";
import { RoleEntry } from "./RoleEntry";

export function CompanyEntry({ group }: { group: CompanyGroup }) {
  return (
    <li className="grid gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[15rem_1fr] md:gap-10">
      <header>
        <h3 className="font-serif text-xl text-ink">{group.company}</h3>
        <p className="mt-1 text-sm text-ink-muted">
          {formatRange(group.start, group.end)}
        </p>
      </header>
      <ol className="space-y-7">
        {group.roles.map((role) => (
          <RoleEntry key={role.id} role={role} />
        ))}
      </ol>
    </li>
  );
}
