import type { Project } from "@/content";
import { Section } from "@/shared/ui/Section";
import { ProjectCard } from "./ProjectCard";

interface ProjectsGridProps {
  id: string;
  projects: readonly Project[];
  hrefFor: (slug: string) => string;
}

export function ProjectsGrid({ id, projects, hrefFor }: ProjectsGridProps) {
  return (
    <Section id={id} title="Selected projects">
      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            href={hrefFor(project.slug)}
          />
        ))}
      </ul>
    </Section>
  );
}
