import type { MetadataRoute } from "next";
import { profile, siteConfig } from "@/content";
import { routes } from "@/shared/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    routes.home,
    ...profile.projects.map((project) => routes.project(project.slug)),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
