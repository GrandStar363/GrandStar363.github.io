import { test as fresh } from "@playwright/test";
import { expect, test } from "./fixtures";

fresh.describe("intro loader", () => {
  fresh(
    "counts to 100% and then lifts away, once per session",
    async ({ page }) => {
      // Start checking as soon as navigation commits: the intro is short and must be caught early.
      await page.goto("/", { waitUntil: "commit" });
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

test("survives comments injected into <head> by the host", async ({ page }) => {
  // Netlify inserts an HTML comment after <meta charset>; hydration must still succeed.
  await page.route(
    (url) => url.pathname === "/",
    async (route) => {
      const response = await route.fetch();
      const html = (await response.text()).replace(
        '<meta charSet="utf-8"/>',
        '<meta charSet="utf-8"/>\n<!-- injected by host -->',
      );
      await route.fulfill({ response, body: html });
    },
  );
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  await page.goto("/", { waitUntil: "networkidle" });
  // If hydration failed, React rebuilds <head> and the host's comment disappears.
  expect(
    await page.evaluate(() => document.head.innerHTML),
    "<head> was not re-rendered",
  ).toContain("injected by host");
  await expect(page.locator("html")).toHaveAttribute("data-intro-seen", "");
  await expect(page.locator("[data-intro-loader]")).toBeHidden();
  expect(errors).toEqual([]);
});

test.describe("work backdrop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("rotates through the topics, with the hero strip in step", async ({
    page,
  }) => {
    await page.clock.install();
    await page.goto("/");
    const scenes = page.locator("[data-scene]");
    const hero = page.locator("section").first();
    await expect(scenes).toHaveCount(9);
    await expect(scenes.nth(0)).toHaveAttribute("data-active", "");
    await expect(
      hero.getByText("3D configurators", { exact: true }),
    ).toBeVisible();

    await page.clock.fastForward(4_600);
    await expect(scenes.nth(1)).toHaveAttribute("data-active", "");
    await expect(scenes.nth(0)).not.toHaveAttribute("data-active", "");
    await expect(
      hero.getByText("GIS & mapping", { exact: true }),
    ).toBeVisible();
  });

  test("keeps running across page navigation", async ({ page }) => {
    await page.goto("/");
    const layer = page.locator("[data-scene]").first().locator("..");
    await layer.evaluate((element) => Object.assign(element, { keep: true }));

    await page.locator("#projects").getByRole("link").first().click();
    await expect(page).toHaveURL(/\/projects\//);
    await expect(page.locator("[data-scene]")).toHaveCount(9);
    expect(
      await page
        .locator("[data-scene]")
        .first()
        .evaluate((scene) => "keep" in (scene.parentElement ?? {})),
      "background layer was not remounted",
    ).toBe(true);
    await expect(page.getByText("01 / 09")).toHaveCount(0);
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
