import Link from "next/link";
import type { NavItem } from "@/content";
import { routes } from "@/shared/lib/routes";
import { Container } from "@/shared/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

interface SiteHeaderProps {
  name: string;
  items: readonly NavItem[];
}

export function SiteHeader({ name, items }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={routes.home}
          className="font-serif text-lg tracking-tight text-ink"
        >
          {name}
        </Link>
        <nav aria-label="Primary" className="hidden sm:block">
          <NavLinks
            items={items}
            className="flex items-center gap-7 text-sm"
            linkClassName="text-ink-muted transition-colors hover:text-ink"
          />
        </nav>
        <MobileMenu items={items} />
      </Container>
    </header>
  );
}
