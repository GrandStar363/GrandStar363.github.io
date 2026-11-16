"use client";

import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { useSceneCycle } from "./use-scene-cycle";

interface SceneCycleProps {
  intervalMs: number;
  /** Route on which scene captions are shown. */
  captionPath: string;
  className?: string;
  children: ReactNode;
}

/** Client-side timer around server-rendered scenes; it only toggles data attributes. */
export function SceneCycle({
  intervalMs,
  captionPath,
  className,
  children,
}: SceneCycleProps) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useSceneCycle(root, intervalMs);
  return (
    <div
      ref={root}
      data-captions={pathname === captionPath ? "" : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
