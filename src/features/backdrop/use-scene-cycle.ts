import { useEffect, type RefObject } from "react";

/**
 * Moves the `data-active` flag through the `[data-scene]` children every interval.
 * Pauses while the backdrop is off-screen or the tab is hidden; does nothing for reduced motion.
 */
export function useSceneCycle(
  rootRef: RefObject<HTMLElement | null>,
  intervalMs: number,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    if (scenes.length < 2) return;

    let index = 0;
    let onScreen = true;
    const advance = () => {
      if (!onScreen || document.hidden) return;
      index = (index + 1) % scenes.length;
      scenes.forEach((scene, i) =>
        scene.toggleAttribute("data-active", i === index),
      );
    };
    const timer = window.setInterval(advance, intervalMs);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      root.toggleAttribute("data-paused", !onScreen);
    });
    observer.observe(root);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [rootRef, intervalMs]);
}
