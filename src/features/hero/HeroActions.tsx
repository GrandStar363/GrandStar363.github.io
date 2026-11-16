import type { ExternalProfile } from "@/content";
import { ButtonLink } from "@/shared/ui/ButtonLink";
import { ArrowUpRightIcon, MailIcon } from "@/shared/ui/icons";

interface HeroActionsProps {
  email: string;
  projectsHref: string;
  profiles: readonly ExternalProfile[];
}

export function HeroActions({
  email,
  projectsHref,
  profiles,
}: HeroActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <ButtonLink href={`mailto:${email}`}>
        <MailIcon className="size-4" />
        Email me
      </ButtonLink>
      <ButtonLink href={projectsHref} variant="secondary">
        View projects
      </ButtonLink>
      {profiles.map((profile) => (
        <ButtonLink
          key={profile.url}
          href={profile.url}
          variant="secondary"
          external
        >
          {profile.label}
          <ArrowUpRightIcon className="size-4 text-ink-muted transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      ))}
    </div>
  );
}
