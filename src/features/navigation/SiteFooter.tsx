import { Container } from "@/shared/ui/Container";

interface SiteFooterProps {
  name: string;
  year: number;
}

export function SiteFooter({ name, year }: SiteFooterProps) {
  return (
    <footer className="border-t border-line py-8 text-sm text-ink-muted">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p>
          © {year} {name}
        </p>
        <a href="#top" className="hover:text-ink">
          Back to top
        </a>
      </Container>
    </footer>
  );
}
