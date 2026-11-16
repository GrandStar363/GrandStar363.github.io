"use client";

import { useCallback, useState } from "react";
import type { NavItem } from "@/content";
import { Container } from "@/shared/ui/Container";
import { CloseIcon, MenuIcon } from "@/shared/ui/icons";
import { NavLinks } from "./NavLinks";
import { useEscapeKey } from "./use-escape-key";

const PANEL_ID = "mobile-navigation";

export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEscapeKey(open, close);
  const Icon = open ? CloseIcon : MenuIcon;

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-sky-50"
      >
        <Icon className="size-5" />
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {open ? (
        <nav
          id={PANEL_ID}
          aria-label="Primary"
          className="absolute inset-x-0 top-full border-b border-line bg-paper"
        >
          <Container>
            <NavLinks
              items={items}
              onNavigate={close}
              className="flex flex-col py-2"
              linkClassName="block py-3 text-base text-ink hover:text-sky-700"
            />
          </Container>
        </nav>
      ) : null}
    </div>
  );
}
