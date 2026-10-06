import type { ComponentType, CSSProperties } from "react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { World, WorldId } from "@/content/worlds";
import { BrandsFilm } from "./BrandsFilm";
import { Decor } from "./Decor";

// How wide a world's media column is, for responsive image selection.
const SIZES = "(min-width: 64rem) 46vw, 90vw";

/** Kids: the roundest frame, with beads floating around it. */
function KidsScene({ world }: { world: World }) {
  return (
    <div className="relative">
      <MediaFrame mediaKey={world.media.key} shot={world.media.shot} sizes={SIZES} />
      <Decor kind="beads" />
    </div>
  );
}

/** Teens: charms hang over the frame and swing with the scroll. */
function TeensScene({ world }: { world: World }) {
  return (
    <div className="relative">
      <MediaFrame mediaKey={world.media.key} shot={world.media.shot} sizes={SIZES} />
      <Decor kind="charms" />
    </div>
  );
}

/**
 * Grown Ups: an editorial pairing. The photographs unveil behind a slow mask as they arrive,
 * over a rosa sheet that drifts a little slower than the page. All of it is CSS scroll-driven.
 */
function GrownUpsScene({ world }: { world: World }) {
  return (
    <div className="relative pb-[12%] pl-[12%]">
      <div
        aria-hidden="true"
        data-scroll="parallax"
        style={{ "--parallax": "32px" } as CSSProperties}
        className="absolute bottom-0 left-0 h-[46%] w-[44%] rounded-(--media-radius) bg-accent"
      />
      <MediaFrame
        mediaKey={world.media.key}
        shot={world.media.shot}
        sizes={SIZES}
        scroll="unveil"
      />
      <div className="absolute bottom-[6%] left-[5%] w-[34%]">
        <MediaFrame
          mediaKey={`${world.media.key}-detail`}
          shot="The Details: primer plano de la mesa"
          sizes="(min-width: 64rem) 18vw, 36vw"
          aspect="aspect-square"
          scroll="unveil"
          className="shadow-contact"
        />
      </div>
    </div>
  );
}

/** Each world's media and signature interaction. The chapter layout around them is shared. */
export const WORLD_SCENES: Record<WorldId, ComponentType<{ world: World }>> = {
  kids: KidsScene,
  teens: TeensScene,
  "grown-ups": GrownUpsScene,
  brands: BrandsFilm,
};
