/** Uses the last path segment of a Twine project URL as a stable slug. */
export function projectSlug(projectUrl: string): string {
  const slug = new URL(projectUrl).pathname.split("/").filter(Boolean).at(-1);
  if (!slug) throw new Error(`Cannot derive a slug from ${projectUrl}`);
  return slug.toLowerCase();
}
