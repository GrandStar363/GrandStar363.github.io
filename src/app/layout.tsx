import type { Metadata } from "next";
import { profile, siteConfig } from "@/content";
import { SiteFooter, SiteHeader } from "@/features/navigation";
import { cn } from "@/shared/lib/cn";
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
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-30 rounded-lg bg-white px-4 py-2 text-sm text-sky-700 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader name={person.name} items={siteConfig.nav} />
        <div className="flex-1">{children}</div>
        <SiteFooter name={person.name} year={BUILD_YEAR} />
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
