import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ButtonVariant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-sky-700 text-white hover:bg-sky-800",
  secondary:
    "border border-line bg-white text-ink hover:border-sky-200 hover:bg-sky-50",
};

/** A link styled as a button, for anchors and mailto: targets. */
export function ButtonLink({
  href,
  variant = "primary",
  children,
  className,
}: ButtonLinkProps) {
  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
}
