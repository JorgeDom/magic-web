import { OpeningCard } from "@/components/worlds/StarWarp";
import { COPY } from "@/content/copy";
import { WORLDS } from "@/content/worlds";

/**
 * Choose, make, remember. The section opens with the same star-warp as the worlds, this time
 * from the last world back onto the page's cream ground. The three steps are a real sequence,
 * so they are numbered; a single rule draws across them as they arrive.
 */
export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-titulo" className="relative">
      <OpeningCard from={WORLDS.at(-1)?.id} anchorId="como-funciona">
        <div className="shell flex flex-col justify-end pt-(--section) pb-[clamp(72px,12svh,144px)]">
          <h2 id="como-funciona-titulo" className="text-display">
            {COPY.how.heading}
          </h2>
        </div>
      </OpeningCard>

      <div className="bg-ground text-ink">
        <div className="shell pb-(--section)">
          <div aria-hidden="true" data-scroll="draw" className="h-px bg-ink" />
          <ol role="list" className="grid gap-y-12 pt-10 lg:grid-cols-3 lg:gap-x-12 lg:pt-14">
            {COPY.how.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true" className="font-display text-title text-ink-muted">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-headline lg:mt-5">{step.title}</h3>
                <p className="mt-3 max-w-[24rem] text-lead text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
