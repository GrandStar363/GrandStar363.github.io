const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2021-09" → "Sep 2021". Locale- and timezone-independent so builds are reproducible. */
export function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  const name = MONTHS[Number(month) - 1];
  if (!year || !name) throw new Error(`Invalid year-month: ${yearMonth}`);
  return `${name} ${year}`;
}

/** An open end (null) means the period is ongoing. */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end === null ? "Present" : formatMonth(end)}`;
}

export function formatYearRange(start: number, end: number): string {
  return start === end ? String(start) : `${start} – ${end}`;
}
