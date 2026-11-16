import type { Metadata } from "next";
import { profile, siteConfig } from "@/content";
import { WorkBackdrop } from "@/features/backdrop";
import { INTRO_SEEN_SCRIPT, IntroLoader } from "@/features/loader";
import { SiteFooter, SiteHeader } from "@/features/navigation";
import { cn } from "@/shared/lib/cn";
import { routes } from "@/shared/lib/routes";
import { inter, newsreader } from "./fonts";
import { personJsonLd, siteMetadata } from "./seo";
import "./globals.css";

export const metadata: Metadata = siteMetadata(profile, siteConfig);

const BUILD_YEAR = new Date().getFullYear();

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { person } = profile;
  return (
    <html
      lang="en"
      id="top"
      className={cn(inter.variable, newsreader.variable)}
      // The intro script may mark <html> as "intro seen" before React hydrates.
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Runs before the loader is parsed. Kept out of <head>: hosts such as Netlify inject
            comments there, and a non-metadata element in <head> then fails hydration. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SEEN_SCRIPT }} />
        <IntroLoader
          name={person.name}
          location={person.location}
          tagline={siteConfig.tagline}
        />
        <a
          href="#main"
          className="sr-only z-30 rounded-lg bg-white px-4 py-2 text-sm text-sky-700 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <WorkBackdrop
          projects={profile.projects}
          sectors={profile.sectors}
          captionPath={routes.home}
        />
        <SiteHeader name={person.name} items={siteConfig.nav} />
        <div className="flex-1">{children}</div>
        <SiteFooter
          name={person.name}
          year={BUILD_YEAR}
          profiles={siteConfig.profiles}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: personJsonLd(profile, siteConfig),
          }}
        />
      </body>
    </html>
  );
}
