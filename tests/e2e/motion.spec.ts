import { test as fresh } from "@playwright/test";
import { expect, test } from "./fixtures";

fresh.describe("intro loader", () => {
  fresh(
    "counts to 100% and then lifts away, once per session",
    async ({ page }) => {
      await page.goto("/");
      const loader = page.locator("[data-intro-loader]");
      await expect(loader).toBeVisible();
      await expect(loader).toContainText("100", { timeout: 5_000 });
      await expect(loader).toBeHidden({ timeout: 5_000 });
      await expect(page.getByRole("link", { name: "Email me" })).toBeVisible();

      await page.reload();
      await expect(loader).toBeHidden();
    },
  );

  fresh("is skipped for reduced motion", async ({ browser }) => {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-intro-loader]")).toBeHidden();
    await page.close();
  });
});

test.describe("work backdrop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("rotates through the project scenes", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");
    const scenes = page.locator("[data-scene]");
    await expect(scenes).toHaveCount(4);
    await expect(scenes.nth(0)).toHaveAttribute("data-active", "");
    await expect(scenes.nth(0)).toContainText("3D Modular House Configurator");
    await page.clock.fastForward(8_000);
    await expect(scenes.nth(1)).toHaveAttribute("data-active", "");
    await expect(scenes.nth(0)).not.toHaveAttribute("data-active", "");
  });

  test("holds the first scene still for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.clock.install();
    await page.goto("/");
    await page.clock.fastForward(16_000);
    await expect(page.locator("[data-scene][data-active]")).toHaveCount(1);
    await expect(page.locator("[data-scene]").nth(0)).toHaveAttribute(
      "data-active",
      "",
    );
  });
});

test("content revealed on scroll ends fully visible", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("#contact header");
  await heading.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      heading.evaluate((element) => getComputedStyle(element).opacity),
    )
    .toBe("1");
});

test("reduced motion shows everything without animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const opacities = await page
    .locator(".reveal, .intro, .intro-stagger > *")
    .evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).opacity),
    );
  expect(new Set(opacities)).toEqual(new Set(["1"]));
});
