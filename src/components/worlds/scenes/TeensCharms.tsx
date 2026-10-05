"use client";

import { m } from "motion/react";
import { useRef } from "react";
import { MotionScope } from "@/components/providers/MotionScope";
import { WORLD_TEMPO } from "@/content/worlds";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { useScrollScene } from "@/hooks/useScrollScene";
import type { GsapTools } from "@/lib/gsap";

// Peach ground + lavender accent + chocolate: three colours, as the Teens mode allows.
const CHARMS = [
  { left: 14, drop: 22, shape: "size-[15cqw] rounded-pill bg-lavender", weight: 1 },
  { left: 36, drop: 38, shape: "size-[11cqw] rounded-md bg-chocolate rotate-45", weight: 0.8 },
  { left: 60, drop: 27, shape: "h-[17cqw] w-[10cqw] rounded-pill bg-cream", weight: 0.9 },
  { left: 83, drop: 44, shape: "size-[12cqw] rounded-pill bg-lavender", weight: 0.7 },
] as const;

const MAX_SWING = 18;
const tempo = WORLD_TEMPO.teens;

/**
 * Teens signature: charms hang over the photograph and swing with the speed of the scroll,
 * settling with a quick, springy overshoot. With a mouse they can be pulled and let go; on
 * touch a tap sets one swinging (dragging would fight the page scroll). Reduced motion: still.
 */
export default function TeensCharms() {
  const host = useRef<HTMLDivElement>(null);
  const tools = useRef<GsapTools | null>(null);
  const finePointer = useFinePointer();

  useScrollScene(host, (gsapTools, root) => {
    tools.current = gsapTools;
    const { gsap, ScrollTrigger } = gsapTools;
    const charms = gsap.utils.toArray<HTMLElement>("[data-charm]", root);
    const settle = gsap
      .delayedCall(0.1, () => {
        gsap.to(charms, {
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.26)",
          stagger: 0.04,
          overwrite: true,
        });
      })
      .pause();

    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate(self) {
        const swing = gsap.utils.clamp(-MAX_SWING, MAX_SWING, self.getVelocity() / -150);
        charms.forEach((charm, index) => {
          gsap.to(charm, {
            rotation: swing * (CHARMS[index]?.weight ?? 1),
            duration: tempo.duration,
            ease: "power2.out",
            overwrite: true,
          });
        });
        settle.restart(true);
      },
    });
  });

  const nudge = (element: HTMLElement) => {
    tools.current?.gsap.fromTo(
      element,
      { rotation: 14 },
      { rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.26)", overwrite: true },
    );
  };

  return (
    <MotionScope>
      <div ref={host} className="@container absolute inset-0">
        {CHARMS.map((charm, index) => (
          <m.div
            key={index}
            drag={finePointer}
            dragSnapToOrigin
            dragElastic={0.4}
            dragTransition={{ bounceStiffness: 520, bounceDamping: 13 }}
            whileDrag={{ scale: 1.06 }}
            onTap={(event) => {
              const target = (event.target as HTMLElement).closest<HTMLElement>("[data-charm]");
              if (target && !finePointer) nudge(target);
            }}
            style={{ left: `${charm.left}%`, height: `${charm.drop}%` }}
            className={`pointer-events-auto absolute -top-[3%] -translate-x-1/2 ${finePointer ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            <div data-charm className="flex h-full origin-top flex-col items-center">
              <span className="w-[1.5px] flex-1 bg-chocolate" />
              <span className="-mt-px size-3 rounded-pill border-[1.5px] border-chocolate" />
              <span className={`-mt-0.5 block shadow-contact ${charm.shape}`} />
            </div>
          </m.div>
        ))}
      </div>
    </MotionScope>
  );
}
