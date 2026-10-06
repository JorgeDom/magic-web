import { WORLDS } from "@/content/worlds";
import { WORLD_SCENES } from "./scenes";
import { WorldChapter } from "./WorldChapter";
import { WorldNavigator } from "./WorldNavigator";

/**
 * The core of the page: four chapters with one layout and four intensities, a navigator that
 * is sticky for as long as they are on screen, and a star-warp opening each world over the
 * one before it.
 */
export function Worlds() {
  return (
    <div id="mundos" className="relative">
      <WorldNavigator />
      {WORLDS.map((world, index) => {
        const Scene = WORLD_SCENES[world.id];
        return (
          <WorldChapter
            key={world.id}
            world={world}
            previous={WORLDS[index - 1]?.id}
            media={<Scene world={world} />}
          />
        );
      })}
    </div>
  );
}
