import { expect, test } from "@playwright/test";

test("custom cursor follows the mouse and reacts to links", async ({
  page,
}) => {
  await page.goto("/");
  const layer = page.locator("[data-cursor-dot]").locator("..");
  await expect(page.locator("html")).toHaveClass(/custom-cursor/);

  await page.mouse.move(200, 300);
  await expect(layer).toHaveAttribute("data-visible", "");
  // Rendered, not just flagged: fixed, opaque and 6px centred on the pointer.
  await expect(layer).toHaveCSS("position", "fixed");
  await expect(layer).toHaveCSS("opacity", "1");
  const dot = page.locator("[data-cursor-dot]");
  await expect(dot).toHaveCSS("translate", "200px 300px");
  expect(await dot.boundingBox()).toMatchObject({
    x: 197,
    y: 297,
    width: 6,
    height: 6,
  });

  const link = page.getByRole("link", { name: "View projects" });
  await link.hover();
  await expect(layer).toHaveAttribute("data-hover", "");
  expect(
    await link.evaluate((element) => getComputedStyle(element).cursor),
  ).toBe("none");
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

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("keeps the system cursor and shows everything without animation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.mouse.move(200, 300);
    await expect(page.locator("html")).not.toHaveClass(/custom-cursor/);
    const opacities = await page
      .locator(".reveal, .intro, .intro-stagger > *")
      .evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).opacity),
      );
    expect(new Set(opacities)).toEqual(new Set(["1"]));
  });
});
