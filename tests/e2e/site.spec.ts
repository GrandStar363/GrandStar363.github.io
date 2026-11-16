import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import profile from "../../src/content/profile.json";

const SECTION_HEADINGS = [
  "Experience",
  "Selected projects",
  "Skills",
  "Client reviews",
  "Education",
  "Contact",
];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on(
    "console",
    (message) => message.type() === "error" && errors.push(message.text()),
  );
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function seriousViolations(page: Page) {
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

test.describe("home page", () => {
  test("renders every section without console errors", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: profile.person.name }),
    ).toBeVisible();
    for (const name of SECTION_HEADINGS) {
      await expect(
        page.getByRole("heading", { level: 2, name, exact: true }),
      ).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test("every navigation link targets an existing section", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const hashes = await nav
      .getByRole("link")
      .evaluateAll((links) =>
        links.map((link) => new URL((link as HTMLAnchorElement).href).hash),
      );
    expect(hashes.length).toBeGreaterThan(0);
    for (const hash of hashes) await expect(page.locator(hash)).toHaveCount(1);
  });

  test("reveals earlier experience on demand", async ({ page }) => {
    await page.goto("/");
    const disclosure = page.locator("#experience details");
    await expect(disclosure).not.toHaveAttribute("open");
    await disclosure.locator("summary").click();
    await expect(disclosure).toHaveAttribute("open");
    await expect(
      disclosure.getByRole("heading", { level: 3 }).first(),
    ).toBeVisible();
  });

  test("has no serious accessibility violations", async ({ page }) => {
    await page.goto("/");
    expect(await seriousViolations(page)).toEqual([]);
  });
});

test.describe("project pages", () => {
  for (const project of profile.projects) {
    test(`${project.slug} opens from its card and links back`, async ({
      page,
    }) => {
      const errors = collectErrors(page);
      await page.goto("/");
      await page
        .locator("#projects")
        .getByRole("link", { name: project.title, exact: true })
        .click();
      await expect(page).toHaveURL(`/projects/${project.slug}/`);
      await expect(
        page.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();
      await page.getByRole("link", { name: "All projects" }).click();
      await expect(page).toHaveURL(/\/#projects$/);
      expect(errors).toEqual([]);
    });
  }

  test("project media files are served", async ({ page, request }) => {
    for (const project of profile.projects) {
      const files = [project.cover.src, project.video?.src].filter(
        (src): src is string => Boolean(src),
      );
      for (const src of files)
        expect((await request.get(src)).status(), src).toBe(200);
    }
    await page.goto(
      `/projects/${profile.projects.find((project) => project.video)?.slug}/`,
    );
    await expect(page.locator("video source")).toHaveAttribute(
      "type",
      "video/mp4",
    );
  });

  test("a project page has no serious accessibility violations", async ({
    page,
  }) => {
    await page.goto(`/projects/${profile.projects[0]?.slug}/`);
    expect(await seriousViolations(page)).toEqual([]);
  });
});

test.describe("small screens", () => {
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
    await expect(
      page.getByRole("button", { name: "Open menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
