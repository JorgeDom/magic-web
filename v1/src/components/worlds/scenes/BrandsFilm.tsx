"use client";

import { useRef } from "react";
import { Film } from "@/components/ui/Film";
import { WORLD_TEMPO, type World } from "@/content/worlds";
import { useScrollScene } from "@/hooks/useScrollScene";

const tempo = WORLD_TEMPO.brands;

/**
 * Brands signature: a full-bleed film that pushes in very slowly while two sage bars open like
 * a letterbox. The calmest tempo on the page. At rest (and with reduced motion) the bars are
 * already open and the frame is still.
 */
export function BrandsFilm({ world }: { world: World }) {
  const host = useRef<HTMLDivElement>(null);

  useScrollScene(host, ({ gsap }, root) => {
    const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root);
    gsap.fromTo(
      bars,
      { scaleY: 1 },
      {
        scaleY: 0,
        ease: tempo.ease,
        scrollTrigger: { trigger: root, start: "top 85%", end: "top 20%", scrub: tempo.scrub },
      },
    );
    gsap.fromTo(
      "[data-push]",
      { scale: 1 },
      {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: tempo.scrub,
        },
      },
    );
  });

  return (
    <div
      ref={host}
      className="relative mr-[calc(var(--bleed)*-1)] overflow-clip @max-4xl:ml-[calc(var(--bleed)*-1)]"
    >
      <div data-push>
        <Film
          mediaKey={world.media.key}
          shot={world.media.shot}
          sizes="(min-width: 64rem) 55vw, 100vw"
          className="max-h-[76svh] w-full"
        />
      </div>
      <span
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[18%] origin-top scale-y-0 bg-accent"
      />
      <span
        data-bar
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[18%] origin-bottom scale-y-0 bg-accent"
      />
    </div>
  );
}
