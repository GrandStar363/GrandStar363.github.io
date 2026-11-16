import { stripDecoration, wordCount } from "./text";

const BULLET = /^\s*(?:[-*•–✔✓▪●]|\d+[.)])\s*/u;
const SENTENCE_END = /[.!?]$/;
const MAX_HEADING_WORDS = 5;
const MAX_TAG_WORDS = 4;
const MAX_ROLE_WORDS = 10;
const SIGN_OFF =
  /^(thanks?|thank you)( so much)?( for (reading|watching|your time))?[.!]*$/i;

/** Closing pleasantries such as "Thanks for reading!" carry no portfolio content. */
export function isSignOff(line: string): boolean {
  return SIGN_OFF.test(stripDecoration(line));
}

export function hasBullet(line: string): boolean {
  return BULLET.test(line);
}

/** "TASK:" / "🌟 Responsibilities:" / "Key Features Developed:" */
export function isHeading(line: string): boolean {
  const text = stripDecoration(line);
  return text.endsWith(":") && wordCount(text) <= MAX_HEADING_WORDS;
}

export function headingText(line: string): string {
  const text = stripDecoration(line).replace(/:$/, "").trim();
  const shouting = text === text.toUpperCase() && /\p{L}/u.test(text);
  return shouting ? text.charAt(0) + text.slice(1).toLowerCase() : text;
}

export function splitTags(line: string): string[] {
  return stripDecoration(line)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/** A comma-separated list of short labels with no sentence punctuation. */
export function isTagLine(line: string): boolean {
  const text = stripDecoration(line);
  if (!text || text.includes(":") || SENTENCE_END.test(text)) return false;
  return splitTags(text).every((tag) => wordCount(tag) <= MAX_TAG_WORDS);
}

/** A short title-like line such as "Full-Stack Developer & System Architect". */
export function isRoleLine(line: string): boolean {
  const text = stripDecoration(line);
  const words = text.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word));
  return (
    !SENTENCE_END.test(text) &&
    !text.endsWith(":") &&
    words.length <= MAX_ROLE_WORDS
  );
}
