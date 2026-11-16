import type { Role } from "@/content";

export interface CompanyGroup {
  company: string;
  start: string;
  end: string | null;
  roles: Role[];
}

const ONGOING = "9999-12";
const endKey = (end: string | null) => end ?? ONGOING;
const byStartDesc = (a: Role, b: Role) => b.start.localeCompare(a.start);

function toGroup(company: string, roles: Role[]): CompanyGroup {
  const ends = roles.map((role) => endKey(role.end)).sort();
  const latestEnd = ends.at(-1) ?? ONGOING;
  return {
    company,
    start: roles.map((role) => role.start).sort()[0] ?? "",
    end: latestEnd === ONGOING ? null : latestEnd,
    roles: [...roles].sort(byStartDesc),
  };
}

const byLatestActivity = (a: CompanyGroup, b: CompanyGroup) =>
  endKey(b.end).localeCompare(endKey(a.end)) || b.start.localeCompare(a.start);

/** Groups roles by employer so several positions at one company read as one career step. */
export function groupRolesByCompany(roles: readonly Role[]): CompanyGroup[] {
  const byCompany = new Map<string, Role[]>();
  for (const role of roles)
    byCompany.set(role.company, [...(byCompany.get(role.company) ?? []), role]);
  return [...byCompany]
    .map(([company, list]) => toGroup(company, list))
    .sort(byLatestActivity);
}
