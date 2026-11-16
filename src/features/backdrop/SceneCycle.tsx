"use client";

import { useRef, type ReactNode } from "react";
import { useSceneCycle } from "./use-scene-cycle";

interface SceneCycleProps {
  intervalMs: number;
  className?: string;
  children: ReactNode;
}

/** Client-side timer around server-rendered scenes; it only toggles data attributes. */
export function SceneCycle({
  intervalMs,
  className,
  children,
}: SceneCycleProps) {
  const root = useRef<HTMLDivElement>(null);
  useSceneCycle(root, intervalMs);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
