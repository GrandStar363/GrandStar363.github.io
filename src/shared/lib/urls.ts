/** "https://www.linkedin.com/in/name/" → "linkedin.com/in/name" for display. */
export function displayUrl(url: string): string {
  const { hostname, pathname } = new URL(url);
  return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/+$/, "")}`;
}
