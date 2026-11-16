import { expect, test } from "./fixtures";
import profile from "../../src/content/profile.json";
import { collectErrors, seriousViolations } from "./helpers";

const SECTION_HEADINGS = [
  "Selected projects",
  "Experience",
  "Skills",
  "Client reviews",
  "Education",
  "Contact",
];

test("renders every section in order without console errors", async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: profile.person.name }),
  ).toBeVisible();
  const headings = await page
    .getByRole("heading", { level: 2 })
    .allTextContents();
  expect(headings).toEqual(SECTION_HEADINGS);
  expect(errors).toEqual([]);
});

test("every navigation link targets an existing section", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const hashes = await nav
    .getByRole("link")
    .evaluateAll((links) =>
      links.map((link) => new URL((link as HTMLAnchorElement).href).hash),
    );
  expect(hashes.slice(0, 2)).toEqual(["#projects", "#experience"]);
  for (const hash of hashes) await expect(page.locator(hash)).toHaveCount(1);
});

test("lists experience newest first and reveals earlier roles on demand", async ({
  page,
}) => {
  await page.goto("/");
  const disclosure = page.locator("#experience details");
  await expect(disclosure).not.toHaveAttribute("open");
  await disclosure.locator("summary").click();
  await expect(disclosure).toHaveAttribute("open");
  const starts = await page
    .locator("#experience [data-start]")
    .evaluateAll((items) =>
      items.map((item) => item.getAttribute("data-start") ?? ""),
    );
  expect(starts).toHaveLength(profile.experience.length);
  expect(starts).toEqual([...starts].sort().reverse());
  await expect(page.locator("#experience")).not.toContainText("Present");
});

test("offers every contact email and the LinkedIn profile", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  for (const email of [
    "GrandStar363@proton.me",
    "Maksim.Hrusheuski@outlook.com",
    "dike950121@gmail.com",
  ]) {
    await expect(contact.locator(`a[href="mailto:${email}"]`)).toBeVisible();
  }
  const linkedin = contact.getByRole("link", { name: /LinkedIn/ });
  await expect(linkedin).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/mhrusheuski/",
  );
  await expect(linkedin).toHaveAttribute("target", "_blank");
});

test("has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  expect(await seriousViolations(page)).toEqual([]);
});
