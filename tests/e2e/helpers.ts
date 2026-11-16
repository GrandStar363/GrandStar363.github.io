import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

/** Audits the settled page: motion is reduced so no element is caught mid-fade. */
export async function seriousViolations(page: Page): Promise<string[]> {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const { violations } = await new AxeBuilder({ page }).analyze();
  return violations
    .filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    )
    .map(
      (violation) =>
        `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
    );
}
