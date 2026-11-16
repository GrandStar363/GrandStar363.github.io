import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Role } from "@/content";
import { Experience } from "./Experience";

const role = (company: string, start: string, end: string | null): Role => ({
  id: `${company}-${start}`,
  company,
  title: `${company} role`,
  start,
  end,
  summary: "Did things.",
});

describe("Experience", () => {
  it("shows recent employers and folds the rest into a disclosure", () => {
    render(
      <Experience
        id="experience"
        visibleCompanies={1}
        roles={[
          role("Acme", "2024-01", null),
          role("Beta", "2020-01", "2021-01"),
          role("Beta", "2019-01", "2019-06"),
        ]}
      />,
    );
    const section = screen.getByRole("region", { name: "Experience" });
    expect(
      within(section).getByRole("heading", { name: "Acme" }),
    ).toBeDefined();
    const disclosure = within(section)
      .getByText("Earlier experience (2 roles)")
      .closest("details");
    expect(disclosure?.open).toBe(false);
    expect(
      within(disclosure!).getByRole("heading", { name: "Beta" }),
    ).toBeDefined();
  });
});
