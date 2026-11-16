import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TagList } from "./TagList";

describe("TagList", () => {
  it("shows every tag without a limit", () => {
    render(<TagList items={["React", "Node.js"]} label="Stack" />);
    expect(screen.getByRole("list", { name: "Stack" }).children).toHaveLength(
      2,
    );
  });

  it("collapses tags beyond the limit into a counter", () => {
    render(<TagList items={["A", "B", "C", "D"]} limit={2} label="Stack" />);
    const items = screen
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(items).toEqual(["A", "B", "+2 more"]);
  });
});
