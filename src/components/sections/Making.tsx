import type { CSSProperties } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { COPY } from "@/content/copy";

// One frame per shot type from the brand book: Making, Details, Experience, Result. The grid is
// deliberately uneven (an editorial spread, not a gallery), and each frame drifts at its own
// rate so the page has depth without anything flying in.
const LAYOUT = [
  {
    span: "lg:col-span-7",
    aspect: "aspect-[4/3]",
    parallax: 20,
    sizes: "(min-width: 64rem) 55vw, 90vw",
  },
  {
    span: "ml-auto w-3/4 lg:col-span-4 lg:col-start-9 lg:mt-28 lg:ml-0 lg:w-auto",
    aspect: "aspect-[4/5]",
    parallax: 52,
    sizes: "(min-width: 64rem) 30vw, 68vw",
  },
  {
    span: "w-3/4 lg:col-span-4 lg:col-start-2 lg:w-auto",
    aspect: "aspect-[4/5]",
    parallax: 36,
    sizes: "(min-width: 64rem) 30vw, 68vw",
  },
  {
    span: "lg:col-span-6 lg:col-start-7 lg:mt-36",
    aspect: "aspect-[4/3]",
    parallax: 24,
    sizes: "(min-width: 64rem) 46vw, 90vw",
  },
] as const;

export function Making() {
  return (
    <section aria-labelledby="asi-se-hace-titulo" className="overflow-x-clip bg-ground text-ink">
      <div className="shell py-(--section)">
        <h2 id="asi-se-hace-titulo" className="text-headline">
          {COPY.making.heading}
        </h2>
        <div className="mt-12 grid gap-y-14 lg:mt-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
          {COPY.making.shots.map((shot, index) => {
            const layout = LAYOUT[index % LAYOUT.length]!;
            return (
              <figure
                key={shot.key}
                data-scroll="parallax"
                style={{ "--parallax": `${layout.parallax}px` } as CSSProperties}
                className={layout.span}
              >
                <MediaFrame
                  mediaKey={shot.key}
                  shot={shot.shot}
                  sizes={layout.sizes}
                  aspect={layout.aspect}
                />
                <figcaption lang="en" className="mt-4 text-label">
                  {shot.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
