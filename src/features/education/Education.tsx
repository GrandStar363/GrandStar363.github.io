import type { Certification, Degree } from "@/content";
import { formatYearRange } from "@/shared/lib/dates";
import { Section } from "@/shared/ui/Section";

interface EducationProps {
  id: string;
  degrees: readonly Degree[];
  certifications: readonly Certification[];
}

export function Education({ id, degrees, certifications }: EducationProps) {
  return (
    <Section id={id} title="Education">
      <div className="grid gap-12 md:grid-cols-2">
        <ul className="reveal space-y-6">
          {degrees.map((degree) => (
            <li key={degree.qualification}>
              <h3 className="font-medium text-ink">{degree.qualification}</h3>
              <p className="mt-0.5 text-ink-muted">{degree.institution}</p>
              <p className="mt-0.5 text-sm text-ink-muted">
                {formatYearRange(degree.startYear, degree.endYear)}
              </p>
            </li>
          ))}
        </ul>
        <div className="reveal">
          <h3 className="text-sm font-semibold text-ink">Certifications</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line text-sm text-ink-muted">
            {certifications.map((certification) => (
              <li key={certification.name} className="py-2.5">
                {certification.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
