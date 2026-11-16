import { test as base } from "@playwright/test";

/** Pages start as if the intro loader was already seen this session, so tests don't wait for it. */
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.addInitScript(() =>
      sessionStorage.setItem("mh-intro-seen", "1"),
    );
    await provide(page);
  },
});

export { expect } from "@playwright/test";
