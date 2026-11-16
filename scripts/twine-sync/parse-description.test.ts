import { describe, expect, it } from "vitest";
import { parseDescription } from "./parse-description";

const crlf = (lines: string[]) => lines.join("\r\n");

describe("parseDescription", () => {
  it("separates role, paragraphs, a TASK list and trailing skill tags", () => {
    const parsed = parseDescription(
      crlf([
        "Developed an interactive 3D configurator.",
        "",
        "TASK:",
        "- 3D visualization and real-time customization",
        "- Interactive user interface design",
        "",
        "Three.js",
        "React",
        "AR & VR",
      ]),
    );
    expect(parsed).toEqual({
      role: null,
      summary: ["Developed an interactive 3D configurator."],
      highlights: [
        {
          heading: "Task",
          items: [
            "3D visualization and real-time customization",
            "Interactive user interface design",
          ],
        },
      ],
      skills: ["Three.js", "React", "AR & VR"],
    });
  });

  it("reads a decorated heading with check-mark bullets and drops sign-offs", () => {
    const parsed = parseDescription(
      crlf([
        "Full Stack Mern Developer",
        "",
        "Help us develop a price-comparing site.",
        "🌟 Responsibilities:",
        "✔ Figma to NextJS pages",
        "✔ Backend API creation",
        "Thanks for reading!",
        "",
        "TypeScript",
        "Next.js",
      ]),
    );
    expect(parsed.role).toBe("Full Stack Mern Developer");
    expect(parsed.summary).toEqual(["Help us develop a price-comparing site."]);
    expect(parsed.highlights).toEqual([
      {
        heading: "Responsibilities",
        items: ["Figma to NextJS pages", "Backend API creation"],
      },
    ]);
  });

  it("treats unmarked lines under a heading as list items", () => {
    const parsed = parseDescription(
      [
        "Intro sentence.",
        "",
        "Key Features Developed:",
        "Stream the Qur’an.",
        "Track habits.",
      ].join("\n"),
    );
    expect(parsed.highlights).toEqual([
      {
        heading: "Key Features Developed",
        items: ["Stream the Qur’an.", "Track habits."],
      },
    ]);
  });

  it("collects inline comma-separated tag lines after the trailing tags", () => {
    const parsed = parseDescription(
      [
        "Built a platform.",
        "",
        "FullCalendar, Stripe, PayPal",
        "",
        "Laravel",
        "React",
      ].join("\n"),
    );
    expect(parsed.skills).toEqual([
      "Laravel",
      "React",
      "FullCalendar",
      "Stripe",
      "PayPal",
    ]);
  });

  it("keeps labelled sentences as paragraphs, not headings", () => {
    const parsed = parseDescription(
      "Client need: a single map platform.\n\nTech: React, Mapbox.",
    );
    expect(parsed.summary).toEqual([
      "Client need: a single map platform.",
      "Tech: React, Mapbox.",
    ]);
    expect(parsed.highlights).toEqual([]);
  });
});
