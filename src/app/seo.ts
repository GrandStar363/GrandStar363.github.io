import type { Metadata } from "next";
import type { Profile, Project, SiteConfig } from "@/content";
import { firstSentence } from "@/shared/lib/text";

export function siteMetadata(profile: Profile, site: SiteConfig): Metadata {
  const { person } = profile;
  const title = `${person.name} — ${person.roles[0]}`;
  const description = firstSentence(person.bio);
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${person.name}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      title,
      description,
      url: "/",
      images: [
        {
          url: person.avatar.src,
          width: person.avatar.width,
          height: person.avatar.height,
        },
      ],
    },
    twitter: { card: "summary", title, description },
  };
}

export function projectMetadata(project: Project, path: string): Metadata {
  const description = firstSentence(project.summary[0] ?? project.title);
  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description,
      url: path,
      images: [{ url: project.cover.src }],
    },
  };
}

/** schema.org Person, serialized safely for an inline <script>. */
export function personJsonLd(profile: Profile, site: SiteConfig): string {
  const { person, languages } = profile;
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.roles[0],
    description: person.bio,
    email: `mailto:${site.email}`,
    url: site.url,
    image: new URL(person.avatar.src, site.url).toString(),
    address: { "@type": "PostalAddress", addressLocality: person.location },
    knowsLanguage: languages.map((language) => language.name),
    knowsAbout: profile.skills.map((skill) => skill.name),
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
