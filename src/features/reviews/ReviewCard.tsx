import Link from "next/link";
import type { Testimonial } from "@/content";

interface ReviewCardProps {
  testimonial: Testimonial;
  /** Link target for the reviewed project, when it is part of the portfolio. */
  projectHref?: string;
}

export function ReviewCard({ testimonial, projectHref }: ReviewCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-white p-6">
      <blockquote className="leading-relaxed text-ink">
        <p>“{testimonial.quote}”</p>
      </blockquote>
      <figcaption className="mt-auto pt-5 text-sm">
        <span className="font-medium text-ink">{testimonial.author}</span>
        <span className="text-ink-muted"> · </span>
        {projectHref ? (
          <Link href={projectHref} className="text-sky-700 hover:text-sky-800">
            {testimonial.project}
          </Link>
        ) : (
          <span className="text-ink-muted">{testimonial.project}</span>
        )}
      </figcaption>
    </figure>
  );
}
