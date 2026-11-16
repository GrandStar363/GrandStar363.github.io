import { siteConfigSchema } from "./schema";

const DEFAULT_SITE_URL = "https://grandstar363.github.io";

/**
 * Canonical origin used for metadata, sitemap and structured data.
 * SITE_URL overrides it explicitly; Netlify sets URL to the site's primary address
 * during its builds; GitHub Pages builds fall back to the default.
 */
const siteUrl = process.env.SITE_URL || process.env.URL || DEFAULT_SITE_URL;

export const siteConfig = siteConfigSchema.parse({
  url: siteUrl,
  email: "GrandStar363@proton.me",
  featuredStack: [
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "GraphQL",
    "React Native",
    "Flutter",
  ],
  nav: [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "reviews", label: "Reviews" },
    { id: "contact", label: "Contact" },
  ],
});
