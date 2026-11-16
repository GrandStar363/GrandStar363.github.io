import Link from "next/link";
import type { Project } from "@/content";
import { firstSentence } from "@/shared/lib/text";
import { Img } from "@/shared/ui/Img";
import { TagList } from "@/shared/ui/TagList";

interface ProjectCardProps {
  project: Project;
  href: string;
}

export function ProjectCard({ project, href }: ProjectCardProps) {
  const excerpt = firstSentence(project.summary[0] ?? "");
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-[0_1px_0_0_var(--color-line),0_8px_24px_-12px_rgb(29_102_153/0.25)]">
      <Img
        src={project.cover.src}
        width={project.cover.width}
        height={project.cover.height}
        alt=""
        className="aspect-video w-full border-b border-line object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        {project.role ? (
          <p className="text-xs text-ink-muted">{project.role}</p>
        ) : null}
        <h3 className="mt-1 line-clamp-2 font-serif text-xl leading-snug text-ink">
          <Link
            href={href}
            className="group-hover:text-sky-700 after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
          {excerpt}
        </p>
        <TagList
          items={project.skills}
          limit={4}
          label="Skills"
          className="mt-auto pt-4"
        />
      </div>
    </li>
  );
}
