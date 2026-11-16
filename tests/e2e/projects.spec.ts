import { expect, test } from "./fixtures";
import profile from "../../src/content/profile.json";
import { collectErrors, seriousViolations } from "./helpers";

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
