import type { Certification, Degree } from "@/content/schema";
import type { RawEducation } from "./raw-schema";
import { cleanText } from "./text";

const year = (date: string) => Number(date.slice(0, 4));

/** Twine stores degrees and certificates in one list; only degrees name an institution. */
const isDegree = (entry: RawEducation) => cleanText(entry.organization) !== "";

const toDegree = (entry: RawEducation): Degree => ({
  qualification: cleanText(entry.qualification),
  institution: cleanText(entry.organization),
  startYear: year(entry.started_at),
  endYear: year(entry.ended_at),
});

export function mapEducation(entries: readonly RawEducation[]): {
  degrees: Degree[];
  certifications: Certification[];
} {
  return {
    degrees: entries.filter(isDegree).map(toDegree),
    certifications: entries
      .filter((entry) => !isDegree(entry))
      .map((entry) => ({ name: cleanText(entry.qualification) })),
  };
}
