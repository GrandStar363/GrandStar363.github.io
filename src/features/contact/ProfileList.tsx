import type { ExternalProfile } from "@/content";
import { displayUrl } from "@/shared/lib/urls";
import { ExternalLink } from "@/shared/ui/ExternalLink";
import { ArrowUpRightIcon } from "@/shared/ui/icons";

export function ProfileList({
  profiles,
}: {
  profiles: readonly ExternalProfile[];
}) {
  return (
    <ul className="space-y-4">
      {profiles.map((profile) => (
        <li key={profile.url}>
          <ExternalLink
            href={profile.url}
            className="group inline-flex flex-col"
          >
            <span className="inline-flex items-center gap-1.5 font-medium text-ink group-hover:text-sky-700">
              {profile.label}
              <ArrowUpRightIcon className="size-4 text-ink-muted transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-700" />
            </span>
            <span className="text-sm text-ink-muted">
              {displayUrl(profile.url)}
            </span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
