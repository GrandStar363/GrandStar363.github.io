import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProject, profile, testimonialsForProject } from "@/content";
import { ProjectDetail } from "@/features/projects";
import { ReviewCard } from "@/features/reviews";
import { routes } from "@/shared/lib/routes";
import { Container } from "@/shared/ui/Container";
import { projectMetadata } from "../../seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(profile, slug);
  return project ? projectMetadata(project, routes.project(slug)) : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = findProject(profile, slug);
  if (!project) notFound();
  const reviews = testimonialsForProject(profile, slug);

  return (
    <main id="main" className="py-12 sm:py-16">
      <Container width="reading">
        <ProjectDetail
          project={project}
          backHref={routes.section("projects")}
        />
        {reviews.length > 0 ? (
          <section aria-labelledby="project-review-title" className="mt-12">
            <h2
              id="project-review-title"
              className="font-serif text-xl text-ink"
            >
              Client review
            </h2>
            <ul className="mt-4 space-y-4">
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCard testimonial={review} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </main>
  );
}
