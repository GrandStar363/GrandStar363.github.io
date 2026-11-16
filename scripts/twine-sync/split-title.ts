import { wordCount } from "./text";

export interface SplitTitle {
  title: string;
  tags: string[];
}

/**
 * "AerialGIS Real Estate GIS Portal | React, Django" → title + tags.
 * Titles whose first segment is a single word ("AR | try-on | …") are kept whole.
 */
export function splitTitle(raw: string): SplitTitle {
  const [head = raw, ...rest] = raw.split(" | ").map((part) => part.trim());
  if (rest.length === 0 || wordCount(head) < 2)
    return { title: raw.trim(), tags: [] };
  const tags = rest.flatMap((part) => part.split(",")).map((tag) => tag.trim());
  return { title: head, tags: tags.filter(Boolean) };
}
