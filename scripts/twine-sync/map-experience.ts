import type { Role } from "@/content/schema";
import type { RawWork } from "./raw-schema";
import { cleanText } from "./text";

const toYearMonth = (date: string) => date.slice(0, 7);

function toRole(work: RawWork): Role {
  return {
    id: String(work.id),
    company: cleanText(work.company_name),
    title: cleanText(work.job_title),
    start: toYearMonth(work.start_date),
    end: work.end_date ? toYearMonth(work.end_date) : null,
    summary: cleanText(work.description),
  };
}

const OPEN_ENDED = "9999-12";

/** Most recent start first; for equal starts, the role that ran longer comes first. */
const byRecency = (a: Role, b: Role) =>
  b.start.localeCompare(a.start) ||
  (b.end ?? OPEN_ENDED).localeCompare(a.end ?? OPEN_ENDED);

export function mapExperience(entries: readonly RawWork[]): Role[] {
  return entries.map(toRole).sort(byRecency);
}
