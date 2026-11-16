import type { Role } from "@/content";
import { Disclosure } from "@/shared/ui/Disclosure";
import { Section } from "@/shared/ui/Section";
import { RoleEntry } from "./RoleEntry";

interface ExperienceProps {
  id: string;
  /** Roles in display order, newest first (the content contract's ordering). */
  roles: readonly Role[];
  /** Number of most recent roles shown before "Earlier experience". */
  visibleRoles?: number;
}

const countLabel = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? "" : "s"}`;

const RoleList = ({ roles }: { roles: readonly Role[] }) => (
  <ol>
    {roles.map((role) => (
      <RoleEntry key={role.id} role={role} />
    ))}
  </ol>
);

export function Experience({ id, roles, visibleRoles = 8 }: ExperienceProps) {
  const recent = roles.slice(0, visibleRoles);
  const earlier = roles.slice(visibleRoles);

  return (
    <Section id={id} title="Experience">
      <RoleList roles={recent} />
      {earlier.length > 0 ? (
        <div className="mt-8 border-t border-line pt-8">
          <Disclosure
            summary={`Earlier experience (${countLabel(earlier.length, "role")})`}
          >
            <RoleList roles={earlier} />
          </Disclosure>
        </div>
      ) : null}
    </Section>
  );
}
