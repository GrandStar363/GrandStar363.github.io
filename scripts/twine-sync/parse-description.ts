import type { Highlight } from "@/content/schema";
import {
  hasBullet,
  headingText,
  isHeading,
  isRoleLine,
  isSignOff,
  isTagLine,
  splitTags,
} from "./description-lines";
import { cleanText, stripDecoration } from "./text";

export interface ParsedDescription {
  role: string | null;
  summary: string[];
  highlights: Highlight[];
  skills: string[];
}

interface Accumulator {
  summary: string[];
  highlights: Highlight[];
  tags: string[];
}

const toBlocks = (text: string): string[][] =>
  text
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    )
    .filter((lines) => lines.length > 0);

function readBlock(acc: Accumulator, lines: string[]): Accumulator {
  const bulleted = lines.some(hasBullet);
  let open: Highlight | null = null;
  for (const line of lines.filter((candidate) => !isSignOff(candidate))) {
    if (isHeading(line)) {
      open = { heading: headingText(line), items: [] };
      acc.highlights.push(open);
    } else if (open && (hasBullet(line) || !bulleted)) {
      open.items.push(stripDecoration(line));
    } else {
      open = null;
      if (isTagLine(line)) acc.tags.push(...splitTags(line));
      else acc.summary.push(stripDecoration(line));
    }
  }
  return acc;
}

function takeRole(blocks: string[][]): string | null {
  const first = blocks[0];
  const only = first?.length === 1 ? first[0] : undefined;
  return only !== undefined && blocks.length > 1 && isRoleLine(only)
    ? stripDecoration(only)
    : null;
}

function takeTrailingTags(blocks: string[][]): string[] | null {
  const last = blocks.at(-1);
  return last && blocks.length > 1 && last.every(isTagLine)
    ? last.flatMap(splitTags)
    : null;
}

/** Turns a free-form Twine project description into structured, displayable parts. */
export function parseDescription(raw: string): ParsedDescription {
  const blocks = toBlocks(cleanText(raw));
  const role = takeRole(blocks);
  const body = role === null ? blocks : blocks.slice(1);
  const trailing = takeTrailingTags(body);
  const content = trailing === null ? body : body.slice(0, -1);
  const acc = content.reduce(readBlock, {
    summary: [],
    highlights: [],
    tags: [],
  });
  return {
    role,
    summary: acc.summary,
    highlights: acc.highlights.filter(
      (highlight) => highlight.items.length > 0,
    ),
    skills: [...(trailing ?? []), ...acc.tags],
  };
}
