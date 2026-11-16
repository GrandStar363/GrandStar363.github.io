import type { Role } from "@/content";
import { Disclosure } from "@/shared/ui/Disclosure";
import { Section } from "@/shared/ui/Section";
import { CompanyEntry } from "./CompanyEntry";
import { groupRolesByCompany, type CompanyGroup } from "./group-roles";

interface ExperienceProps {
  id: string;
  roles: readonly Role[];
  /** Number of most recent employers shown before "Earlier experience". */
  visibleCompanies?: number;
}

const CompanyList = ({ groups }: { groups: CompanyGroup[] }) => (
  <ol>
    {groups.map((group) => (
      <CompanyEntry key={group.company} group={group} />
    ))}
  </ol>
);

export function Experience({
  id,
  roles,
  visibleCompanies = 4,
}: ExperienceProps) {
  const groups = groupRolesByCompany(roles);
  const recent = groups.slice(0, visibleCompanies);
  const earlier = groups.slice(visibleCompanies);
  const earlierRoleCount = earlier.reduce(
    (total, group) => total + group.roles.length,
    0,
  );

  return (
    <Section id={id} title="Experience">
      <CompanyList groups={recent} />
      {earlier.length > 0 ? (
        <div className="mt-8 border-t border-line pt-8">
          <Disclosure
            summary={`Earlier experience (${earlierRoleCount} roles)`}
          >
            <CompanyList groups={earlier} />
          </Disclosure>
        </div>
      ) : null}
    </Section>
  );
}
