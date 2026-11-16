/** Custom cursors only make sense for a precise, hovering pointer and users who accept motion. */
export function supportsCustomCursor(win: Pick<Window, "matchMedia">): boolean {
  const finePointer = win.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const reducedMotion = win.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return finePointer && !reducedMotion;
}
