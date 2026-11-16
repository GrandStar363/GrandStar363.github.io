import { cn } from "@/shared/lib/cn";

interface TagListProps {
  items: readonly string[];
  /** Show at most this many tags, followed by a "+N" counter. */
  limit?: number;
  label?: string;
  className?: string;
}

const tagClass =
  "rounded-md bg-sky-100 px-2 py-0.5 text-[0.8125rem] leading-6 text-sky-800";

export function TagList({
  items,
  limit = items.length,
  label,
  className,
}: TagListProps) {
  const visible = items.slice(0, limit);
  const hidden = items.length - visible.length;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {visible.map((item) => (
        <li key={item} className={tagClass}>
          {item}
        </li>
      ))}
      {hidden > 0 ? (
        <li className="px-1 text-[0.8125rem] leading-6 text-ink-muted">
          +{hidden}
          <span className="sr-only"> more</span>
        </li>
      ) : null}
    </ul>
  );
}
