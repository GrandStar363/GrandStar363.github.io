import Link from "next/link";
import { routes } from "@/shared/lib/routes";
import { Container } from "@/shared/ui/Container";

export default function NotFound() {
  return (
    <main id="main" className="py-24">
      <Container width="reading">
        <h1 className="font-serif text-4xl tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-ink-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href={routes.home}
          className="mt-8 inline-block text-sky-700 hover:text-sky-800"
        >
          Back to the homepage
        </Link>
      </Container>
    </main>
  );
}
