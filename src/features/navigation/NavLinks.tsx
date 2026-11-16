import Link from "next/link";
import type { NavItem } from "@/content";
import { routes } from "@/shared/lib/routes";

interface NavLinksProps {
  items: readonly NavItem[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({
  items,
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={routes.section(item.id)}
            className={linkClassName}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
