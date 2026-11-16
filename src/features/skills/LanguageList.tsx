import type { Language } from "@/content";

export function LanguageList({
  languages,
}: {
  languages: readonly Language[];
}) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
      {languages.map((language) => (
        <div key={language.name} className="contents">
          <dt className="text-ink">{language.name}</dt>
          <dd className="text-ink-muted">{language.level}</dd>
        </div>
      ))}
    </dl>
  );
}
