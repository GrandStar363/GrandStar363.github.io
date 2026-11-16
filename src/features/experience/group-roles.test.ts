import { describe, expect, it } from "vitest";
import type { Role } from "@/content";
import { groupRolesByCompany } from "./group-roles";

const role = (company: string, start: string, end: string | null): Role => ({
  id: `${company}-${start}`,
  company,
  title: "Engineer",
  start,
  end,
  summary: "",
});

describe("groupRolesByCompany", () => {
  const groups = groupRolesByCompany([
    role("Acme", "2026-03", "2026-06"),
    role("Beta", "2025-01", "2026-07"),
    role("Acme", "2025-08", null),
    role("Acme", "2021-09", "2025-04"),
    role("Gamma", "2018-06", "2021-09"),
  ]);

  it("orders companies by most recent activity, ongoing first", () => {
    expect(groups.map((group) => group.company)).toEqual([
      "Acme",
      "Beta",
      "Gamma",
    ]);
  });

  it("spans the earliest start to an open end when any role is ongoing", () => {
    expect(groups[0]).toMatchObject({ start: "2021-09", end: null });
    expect(groups[1]).toMatchObject({ start: "2025-01", end: "2026-07" });
  });

  it("lists roles within a company newest first", () => {
    expect(groups[0]?.roles.map((entry) => entry.start)).toEqual([
      "2026-03",
      "2025-08",
      "2021-09",
    ]);
  });
});
