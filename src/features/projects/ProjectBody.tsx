import type { Highlight } from "@/content";
import { splitLeadLabel } from "./text";

function Paragraph({ text }: { text: string }) {
  const { label, body } = splitLeadLabel(text);
  return (
    <p>
      {label ? (
        <strong className="font-medium text-ink">{label}: </strong>
      ) : null}
      {body}
    </p>
  );
}

function HighlightList({ highlight }: { highlight: Highlight }) {
  return (
    <section>
      <h2 className="font-serif text-xl text-ink">{highlight.heading}</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-sky-600">
        {highlight.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectBody({
  summary,
  highlights,
}: {
  summary: string[];
  highlights: Highlight[];
}) {
  return (
    <div className="space-y-8 leading-relaxed text-ink-muted">
      <div className="space-y-4">
        {summary.map((text) => (
          <Paragraph key={text} text={text} />
        ))}
      </div>
      {highlights.map((highlight) => (
        <HighlightList key={highlight.heading} highlight={highlight} />
      ))}
    </div>
  );
}
