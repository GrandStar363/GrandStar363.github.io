import type { Rating, Testimonial } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ReviewCard } from "./ReviewCard";

interface ReviewsProps {
  id: string;
  testimonials: readonly Testimonial[];
  rating: Rating;
  hrefFor: (slug: string) => string;
}

export function Reviews({ id, testimonials, rating, hrefFor }: ReviewsProps) {
  const intro = `Rated ${rating.average.toFixed(1)} out of 5 across ${rating.count} client reviews.`;
  return (
    <Section id={id} title="Client reviews" intro={intro}>
      <ul className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <ReviewCard
              testimonial={testimonial}
              projectHref={
                testimonial.projectSlug
                  ? hrefFor(testimonial.projectSlug)
                  : undefined
              }
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
