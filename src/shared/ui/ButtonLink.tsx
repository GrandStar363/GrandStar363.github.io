import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { ExternalLink } from "./ExternalLink";

export type ButtonVariant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  /** Open in a new tab (for other sites). */
  external?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 ease-soft active:scale-[0.97]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-sky-700 text-white hover:bg-sky-800",
  secondary:
    "border border-line bg-white text-ink hover:border-sky-200 hover:bg-sky-50",
};

/** A link styled as a button, for anchors, mailto: targets and other sites. */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
  className,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <ExternalLink href={href} className={classes}>
        {children}
      </ExternalLink>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
