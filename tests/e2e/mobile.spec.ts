import { expect, test } from "./fixtures";
import profile from "../../src/content/profile.json";

test.use({ viewport: { width: 375, height: 812 } });

test("has no horizontal overflow", async ({ page }) => {
  for (const path of ["/", `/projects/${profile.projects.at(-1)?.slug}/`]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("shows the background artwork faintly, without captions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("[data-scene][data-active]")).toHaveCount(1);
  await expect(page.getByText("01 / 04")).toBeHidden();
});

test("menu opens, navigates, and closes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "Skills" })
    .click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
