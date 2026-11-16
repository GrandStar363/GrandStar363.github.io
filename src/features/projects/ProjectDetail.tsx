import Link from "next/link";
import type { Project } from "@/content";
import { ArrowLeftIcon } from "@/shared/ui/icons";
import { TagList } from "@/shared/ui/TagList";
import { ProjectBody } from "./ProjectBody";
import { ProjectMedia } from "./ProjectMedia";

interface ProjectDetailProps {
  project: Project;
  backHref: string;
}

export function ProjectDetail({ project, backHref }: ProjectDetailProps) {
  return (
    <article>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-800"
      >
        <ArrowLeftIcon className="size-4" />
        All projects
      </Link>
      <header className="mt-8">
        {project.role ? (
          <p className="text-sm font-medium text-sky-700">{project.role}</p>
        ) : null}
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
      </header>
      <div className="mt-8">
        <ProjectMedia project={project} />
      </div>
      <div className="mt-10">
        <ProjectBody
          summary={project.summary}
          highlights={project.highlights}
        />
      </div>
      {project.skills.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-xl text-ink">Skills &amp; tools</h2>
          <TagList items={project.skills} className="mt-3" />
        </section>
      ) : null}
    </article>
  );
}
