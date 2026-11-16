const comparable = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

interface Titled {
  title: string;
}

/** Finds the project a testimonial refers to, matching titles loosely in either direction. */
export function findLinkedProject<T extends Titled>(
  projectName: string,
  projects: readonly T[],
): T | undefined {
  const needle = comparable(projectName);
  if (!needle) return undefined;
  return projects.find((project) => {
    const title = comparable(project.title);
    return title.includes(needle) || needle.includes(title);
  });
}
