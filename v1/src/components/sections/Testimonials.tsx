import { COPY } from "@/content/copy";

/**
 * Two or three voices, set large. No cards, no avatars, no star ratings: the words carry it.
 * Quotes are placeholders until the studio supplies real ones (see src/content/copy.ts).
 */
export function Testimonials() {
  return (
    <section
      data-ground="mint"
      aria-labelledby="testimonios-titulo"
      className="bg-ground text-ink deferred"
    >
      <div className="shell py-(--section)">
        <h2 id="testimonios-titulo" className="text-headline">
          {COPY.testimonials.heading}
        </h2>
        <ul role="list" className="mt-12 lg:mt-20">
          {COPY.testimonials.quotes.map((item) => (
            <li key={item.quote} className="border-t border-hairline py-10 lg:py-14">
              <figure className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
                <blockquote className="font-display text-statement lg:col-span-8">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="text-label text-ink-muted lg:col-span-3 lg:col-start-10 lg:pt-3">
                  {item.by}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
