import type { ReactNode } from "react";
import { WhatsAppLink } from "@/components/ui/ButtonLink";
import { worldAnchor, type World, type WorldId } from "@/content/worlds";
import { OpeningCard } from "./StarWarp";

interface WorldChapterProps {
  world: World;
  /** The world before this one, which the star-warp opens over. */
  previous?: WorldId;
  media: ReactNode;
}

/**
 * One world, in two beats: a full-screen opening card with its name, then its services beside
 * its media. Every world uses this exact layout. Ground, ink, corner radius and tempo come
 * from the world's tokens through `data-world`; nothing here branches on which world it is.
 */
export function WorldChapter({ world, previous, media }: WorldChapterProps) {
  const headingId = `${worldAnchor(world.id)}-titulo`;
  return (
    <section data-world={world.id} aria-labelledby={headingId} className="relative">
      <OpeningCard from={previous} anchorId={worldAnchor(world.id)}>
        <div className="shell flex flex-col justify-end pt-(--section) pb-[clamp(112px,18svh,176px)]">
          <h2 id={headingId} lang="en" tabIndex={-1} data-jump-focus className="text-display">
            {world.name}
          </h2>
          <p className="mt-6 max-w-measure text-lead text-ink-muted">{world.line}</p>
        </div>
      </OpeningCard>

      {/* The deep bottom padding lets the call to action clear the middle of the screen before
          the next card's star opens there. */}
      <div className="overflow-x-clip bg-ground text-ink">
        <div className="@container shell pb-[max(var(--section),36svh)]">
          <div className="grid items-center gap-y-12 @4xl:grid-cols-12 @4xl:gap-x-8">
            <div className="order-2 @4xl:order-1 @4xl:col-span-5">
              <ul className="max-w-measure border-t border-hairline">
                {world.services.map((service) => (
                  <li
                    key={service}
                    className="border-b border-hairline py-4 font-display text-title"
                  >
                    {service}
                  </li>
                ))}
              </ul>
              <WhatsAppLink message={world.cta.message} className="mt-9">
                {world.cta.label}
              </WhatsAppLink>
            </div>
            <div className="order-1 @4xl:order-2 @4xl:col-span-6 @4xl:col-start-7">{media}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
