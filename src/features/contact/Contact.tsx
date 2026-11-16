import { Section } from "@/shared/ui/Section";

interface ContactProps {
  id: string;
  email: string;
  available: boolean;
}

export function Contact({ id, email, available }: ContactProps) {
  const intro = available
    ? "I'm currently taking on new projects. Email is the quickest way to reach me."
    : "Email is the quickest way to reach me.";
  return (
    <Section id={id} title="Contact" intro={intro}>
      <a
        href={`mailto:${email}`}
        className="font-serif text-2xl break-all text-sky-700 underline decoration-sky-200 underline-offset-[6px] transition-colors hover:decoration-sky-700 sm:text-4xl"
      >
        {email}
      </a>
    </Section>
  );
}
