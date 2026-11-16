export function EmailList({ emails }: { emails: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {emails.map((email) => (
        <li key={email}>
          <a
            href={`mailto:${email}`}
            className="font-serif text-xl break-all text-sky-700 underline decoration-sky-200 underline-offset-[6px] transition-colors hover:decoration-sky-700 sm:text-2xl"
          >
            {email}
          </a>
        </li>
      ))}
    </ul>
  );
}
