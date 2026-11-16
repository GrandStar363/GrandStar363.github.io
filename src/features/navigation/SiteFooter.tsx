import type { ExternalProfile } from "@/content";
import { Container } from "@/shared/ui/Container";
import { ExternalLink } from "@/shared/ui/ExternalLink";

interface SiteFooterProps {
  name: string;
  year: number;
  profiles: readonly ExternalProfile[];
}

export function SiteFooter({ name, year, profiles }: SiteFooterProps) {
  return (
    <footer className="border-t border-line py-8 text-sm text-ink-muted">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p>
          © {year} {name}
        </p>
        <ul className="flex items-center gap-6">
          {profiles.map((profile) => (
            <li key={profile.url}>
              <ExternalLink href={profile.url} className="hover:text-ink">
                {profile.label}
              </ExternalLink>
            </li>
          ))}
          <li>
            <a href="#top" className="hover:text-ink">
              Back to top
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
