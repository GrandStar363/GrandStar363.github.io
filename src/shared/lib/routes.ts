/** Single source of truth for internal URLs. */
export const routes = {
  home: "/",
  section: (id: string) => `/#${id}`,
  project: (slug: string) => `/projects/${slug}/`,
} as const;
