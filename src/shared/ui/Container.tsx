import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export type ContainerWidth = "page" | "reading";

const widths: Record<ContainerWidth, string> = {
  page: "max-w-6xl",
  reading: "max-w-3xl",
};

interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  /** Layout classes only; width and gutters are controlled by the component. */
  className?: string;
}

export function Container({
  children,
  width = "page",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)}
    >
      {children}
    </div>
  );
}
