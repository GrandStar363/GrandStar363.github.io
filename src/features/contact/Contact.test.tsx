import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("lists every email as a mailto link and profiles as new-tab links", () => {
    render(
      <Contact
        id="contact"
        available
        emails={["a@example.com", "b@example.com"]}
        profiles={[
          { label: "LinkedIn", url: "https://www.linkedin.com/in/someone/" },
        ]}
      />,
    );
    const mailto = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("mailto:"));
    expect(mailto.map((link) => link.getAttribute("href"))).toEqual([
      "mailto:a@example.com",
      "mailto:b@example.com",
    ]);

    const profile = screen.getByRole("link", { name: /LinkedIn/ });
    expect(profile.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/someone/",
    );
    expect(profile.getAttribute("target")).toBe("_blank");
    expect(profile.getAttribute("rel")).toBe("noopener noreferrer");
    expect(profile.textContent).toContain("linkedin.com/in/someone");
  });
});
