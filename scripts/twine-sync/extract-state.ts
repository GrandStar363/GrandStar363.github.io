const STATE = /window\.__data\s*=\s*(\{[\s\S]*?\})\s*;?\s*<\/script>/;

/** Twine server-renders its Redux store into an inline script; this returns it as plain JSON. */
export function extractState(html: string): unknown {
  const json = STATE.exec(html)?.[1];
  if (!json) throw new Error("No window.__data state found in the Twine page");
  return JSON.parse(json);
}
