const SENTENCE = /^(.+?[.!?])(?=\s|$)/;

/** First sentence of a paragraph; unpunctuated text is returned whole. */
export function firstSentence(text: string): string {
  return SENTENCE.exec(text)?.[1] ?? text;
}
