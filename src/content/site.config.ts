import { siteConfigSchema } from "./schema";

export const siteConfig = siteConfigSchema.parse({
  url: "https://grandstar363.github.io",
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
