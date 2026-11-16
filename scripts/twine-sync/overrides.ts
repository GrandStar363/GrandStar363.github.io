/**
 * Hand-authored corrections applied on top of the Twine data during sync.
 * Keep this small: anything that can be fixed on Twine itself should be fixed there.
 */

/** Twine work-experience id → last month of the role (YYYY-MM). */
export const ROLE_END_OVERRIDES: Readonly<Record<string, string>> = {
  // Coherent Solutions, Group Manager (parallel responsibility): Twine lists it as current.
  "3786523": "2026-10",
};
