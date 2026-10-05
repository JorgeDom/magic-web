import { Star } from "@/components/star/Star";
import { CLAIMS, COPY } from "@/content/copy";

/** One statement and a great deal of air. */
export function Intro() {
  return (
    <section className="bg-ground text-ink">
      <div className="shell flex min-h-[80svh] flex-col items-center justify-center py-(--section) text-center">
        <Star className="h-9 lg:h-12" />
        <h2 lang="en" className="mt-8 max-w-[16ch] text-headline lg:mt-10">
          {CLAIMS.intro}
        </h2>
        <p className="mt-6 max-w-[28rem] text-lead text-ink-muted">{COPY.intro.line}</p>
      </div>
    </section>
  );
}
