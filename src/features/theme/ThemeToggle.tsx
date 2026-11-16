"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/shared/ui/icons";
import { applyTheme, currentTheme, savedTheme } from "./theme";

/** Re-renders when <html data-theme> changes, whatever changed it. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Follows OS theme changes until the visitor picks a theme themselves. */
function useSystemTheme(): void {
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const follow = (event: MediaQueryListEvent) => {
      if (!savedTheme()) applyTheme(event.matches ? "dark" : "light", false);
    };
    query.addEventListener("change", follow);
    return () => query.removeEventListener("change", follow);
  }, []);
}

export function ThemeToggle() {
  // Unknown on the server; the icons switch with CSS, so only aria-pressed waits for the client.
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);
  useSystemTheme();

  return (
    <button
      type="button"
      onClick={() =>
        applyTheme(currentTheme() === "dark" ? "light" : "dark", true)
      }
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="inline-flex size-10 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-sky-50 hover:text-ink"
    >
      <MoonIcon className="size-5 dark:hidden" />
      <SunIcon className="hidden size-5 dark:block" />
    </button>
  );
}
