/** Normalizes scraped text: compatibility forms (e.g. math-bold letters), line endings, edges. */
export function cleanText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/** Removes leading bullets, emoji and other non-word decoration from a line. */
export function stripDecoration(line: string): string {
  return line.replace(/^[^\p{L}\p{N}(]+/u, "").trim();
}

export function wordCount(value: string): number {
  return value.split(/\s+/).filter(Boolean).length;
}

export function uniqueCaseInsensitive(values: readonly string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
