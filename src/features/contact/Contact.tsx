import type { ExternalProfile } from "@/content";
import { Section } from "@/shared/ui/Section";
import { EmailList } from "./EmailList";
import { ProfileList } from "./ProfileList";

interface ContactProps {
  id: string;
  emails: readonly string[];
  profiles: readonly ExternalProfile[];
  available: boolean;
}

const subheading = "mb-4 text-sm font-semibold text-ink";

export function Contact({ id, emails, profiles, available }: ContactProps) {
  const intro = available
    ? "I'm currently taking on new projects. Email is the quickest way to reach me."
    : "Email is the quickest way to reach me.";
  return (
    <Section id={id} title="Contact" intro={intro}>
      <div className="grid gap-10 md:grid-cols-[1fr_15rem]">
        <div>
          <h3 className={subheading}>Email</h3>
          <EmailList emails={emails} />
        </div>
        {profiles.length > 0 ? (
          <div>
            <h3 className={subheading}>Profiles</h3>
            <ProfileList profiles={profiles} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
