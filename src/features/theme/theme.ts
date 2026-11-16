export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "mh-theme";

/**
 * Runs at the start of <body>, before anything paints: applies the saved theme, or the OS
 * preference when nothing is saved, so the page never flashes the wrong colours.
 */
export const THEME_SCRIPT = `try{var s=localStorage.getItem("${THEME_STORAGE_KEY}"),d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}`;

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme, remember: boolean): void {
  document.documentElement.dataset.theme = theme;
  if (!remember) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the choice then lasts for this page only.
  }
}

export function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}
