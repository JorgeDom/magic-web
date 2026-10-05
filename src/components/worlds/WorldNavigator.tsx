"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Star } from "@/components/star/Star";
import { COPY } from "@/content/copy";
import { WORLDS, worldAnchor, type WorldId } from "@/content/worlds";
import { jumpToSection } from "@/lib/scroll";

function useActiveWorld(): WorldId | null {
  const [active, setActive] = useState<WorldId | null>(null);

  useEffect(() => {
    // Each world's anchor marks where its opening card is fully open. A world becomes active
    // when that point crosses the middle of the viewport, and hands back to the world before
    // it when the visitor scrolls up past it again.
    const order = new Map(WORLDS.map((world, index) => [worldAnchor(world.id), index]));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = order.get(entry.target.id);
          if (index === undefined) continue;
          if (entry.isIntersecting) setActive(WORLDS[index]?.id ?? null);
          else if (entry.boundingClientRect.top > 0) setActive(WORLDS[index - 1]?.id ?? null);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const anchor of order.keys()) {
      const element = document.getElementById(anchor);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * Sticky navigator, present only while the four worlds are on screen (it is sticky inside
 * their wrapper). A pill at the bottom of the viewport, where it never covers a world's media
 * or copy. The active world is marked by a filled pill, the star and `aria-current`, not by
 * colour alone. Its own colours are fixed (cream and chocolate) so it reads on every ground.
 */
export function WorldNavigator() {
  const active = useActiveWorld();

  const jump = (event: MouseEvent<HTMLAnchorElement>, id: WorldId) => {
    const anchor = document.getElementById(worldAnchor(id));
    if (!anchor) return;
    event.preventDefault();
    history.pushState(null, "", `#${worldAnchor(id)}`);
    jumpToSection(anchor, document.getElementById(`${worldAnchor(id)}-titulo`));
  };

  return (
    <nav
      aria-label={COPY.worlds.label}
      className="pointer-events-none sticky top-[calc(100svh-76px)] z-30 h-0 lg:top-[calc(100svh-84px)]"
    >
      <ol className="pointer-events-auto mx-auto flex w-fit gap-0.5 rounded-pill border border-[rgb(76_64_57/0.14)] bg-cream p-1 text-chocolate shadow-contact">
        {WORLDS.map((world) => {
          const current = world.id === active;
          return (
            <li key={world.id}>
              <a
                href={`#${worldAnchor(world.id)}`}
                lang="en"
                aria-current={current ? "true" : undefined}
                onClick={(event) => jump(event, world.id)}
                className="flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-label whitespace-nowrap transition-colors duration-(--duration-ui) hover:bg-[rgb(76_64_57/0.08)] aria-[current=true]:bg-chocolate aria-[current=true]:text-cream lg:px-4"
              >
                {current && <Star className="h-3.5" />}
                {world.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
