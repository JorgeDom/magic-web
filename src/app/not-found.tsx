import type { Metadata } from "next";
import { Star } from "@/components/star/Star";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { COPY } from "@/content/copy";

export const metadata: Metadata = {
  title: COPY.notFound.title,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="contenido"
      className="shell flex min-h-svh flex-col items-start justify-center py-(--section)"
    >
      <Star className="h-12" />
      <h1 className="mt-8 text-headline">{COPY.notFound.title}</h1>
      <p className="mt-4 max-w-measure text-lead text-ink-muted">{COPY.notFound.text}</p>
      <ButtonLink href="/" className="mt-8">
        {COPY.notFound.cta}
      </ButtonLink>
    </main>
  );
}
