import type { Profile, Project, Testimonial } from "./schema";

export function findProject(
  profile: Profile,
  slug: string,
): Project | undefined {
  return profile.projects.find((project) => project.slug === slug);
}

export function testimonialsForProject(
  profile: Profile,
  slug: string,
): Testimonial[] {
  return profile.testimonials.filter(
    (testimonial) => testimonial.projectSlug === slug,
  );
}
