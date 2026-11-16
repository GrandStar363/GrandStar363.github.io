import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Role } from "@/content";
import { Experience } from "./Experience";

const role = (
  company: string,
  title: string,
  start: string,
  end: string,
): Role => ({
  id: `${company}-${start}`,
  company,
  title,
  start,
  end,
  summary: "Did things.",
});

describe("Experience", () => {
  const roles = [
    role("Acme", "Lead", "2026-03", "2026-10"),
    role("Beta", "Engineer", "2025-01", "2026-07"),
    role("Acme", "Developer", "2021-09", "2025-04"),
  ];

  it("renders roles as one timeline in the given order with their dates", () => {
    render(<Experience id="experience" roles={roles} />);
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual(["Lead", "Engineer", "Developer"]);
    expect(screen.getByText("Mar 2026 – Oct 2026")).toBeDefined();
  });

  it("folds roles beyond the visible count into a closed disclosure", () => {
    render(<Experience id="experience" roles={roles} visibleRoles={2} />);
    const disclosure = screen
      .getByText("Earlier experience (1 role)")
      .closest("details");
    expect(disclosure?.open).toBe(false);
    expect(
      within(disclosure!).getByRole("heading", { name: "Developer" }),
    ).toBeDefined();
  });
});
