import Link from "next/link";
import type { ReactNode } from "react";
import type { NavItem } from "@/content";
import { routes } from "@/shared/lib/routes";
import { Container } from "@/shared/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

interface SiteHeaderProps {
  name: string;
  items: readonly NavItem[];
  /** Extra controls at the right edge, e.g. the theme toggle. */
  actions?: ReactNode;
}

export function SiteHeader({ name, items, actions }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={routes.home}
          className="font-serif text-lg tracking-tight text-ink"
        >
          {name}
        </Link>
        <div className="flex items-center gap-1 sm:gap-5">
          <nav aria-label="Primary" className="hidden sm:block">
            <NavLinks
              items={items}
              className="flex items-center gap-7 text-sm"
              linkClassName="relative text-ink-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-sky-600 after:transition-transform after:duration-300 after:ease-soft hover:after:scale-x-100"
            />
          </nav>
          {actions}
          <MobileMenu items={items} />
        </div>
      </Container>
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-sky-600/70"
      />
    </header>
  );
}
