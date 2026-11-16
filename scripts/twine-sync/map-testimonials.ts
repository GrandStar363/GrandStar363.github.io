import type { Project, Testimonial } from "@/content/schema";
import { findLinkedProject } from "./find-linked-project";
import type { RawTestimonial } from "./raw-schema";
import { cleanText } from "./text";

export function mapTestimonials(
  entries: readonly RawTestimonial[],
  projects: readonly Project[],
): Testimonial[] {
  return entries.map((entry) => {
    const projectName = cleanText(entry.project_name);
    const linked = findLinkedProject(projectName, projects);
    return {
      id: String(entry.id),
      author: cleanText(entry.name),
      project: linked?.title ?? projectName,
      projectSlug: linked?.slug ?? null,
      quote: cleanText(entry.comment),
    };
  });
}
