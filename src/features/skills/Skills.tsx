import type { Language, Skill } from "@/content";
import { Section } from "@/shared/ui/Section";
import { TagList } from "@/shared/ui/TagList";
import { groupSkills } from "./group-skills";
import { LanguageList } from "./LanguageList";

interface SkillsProps {
  id: string;
  skills: readonly Skill[];
  languages: readonly Language[];
  sectors: readonly string[];
}

const subheading = "text-sm font-semibold text-ink";

export function Skills({ id, skills, languages, sectors }: SkillsProps) {
  return (
    <Section id={id} title="Skills">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {groupSkills(skills).map((group) => (
          <div key={group.title}>
            <h3 className={subheading}>{group.title}</h3>
            <TagList items={group.skills} className="mt-3" />
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-[15rem_1fr]">
        <div>
          <h3 className={subheading}>Languages</h3>
          <div className="mt-3">
            <LanguageList languages={languages} />
          </div>
        </div>
        <div>
          <h3 className={subheading}>Industries</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {sectors.join(" · ")}
          </p>
        </div>
      </div>
    </Section>
  );
}
