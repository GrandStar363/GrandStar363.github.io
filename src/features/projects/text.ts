const LEAD_LABEL = /^([^:]{2,40}):\s+(.+)$/s;
const MAX_LABEL_WORDS = 3;

/** "Client need: a single platform…" → { label: "Client need", body: "a single platform…" } */
export function splitLeadLabel(text: string): {
  label: string | null;
  body: string;
} {
  const match = LEAD_LABEL.exec(text);
  const label = match?.[1]?.trim();
  if (!match?.[2] || !label || label.split(/\s+/).length > MAX_LABEL_WORDS)
    return { label: null, body: text };
  return { label, body: match[2] };
}
