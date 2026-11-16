import type { ReactNode } from "react";
import { ChevronDownIcon } from "./icons";

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
}

/** Native <details>: accessible and interactive without client JavaScript. */
export function Disclosure({ summary, children }: DisclosureProps) {
  return (
    <details className="group">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-lg text-sm font-medium text-sky-700 hover:text-sky-800 [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-8">{children}</div>
    </details>
  );
}
