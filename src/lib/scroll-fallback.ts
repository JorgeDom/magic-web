// GSAP stand-in for the CSS scroll-driven primitives in globals.css, for browsers without
// `animation-timeline: view()`. It reads the same data attributes, so components never branch.
import { loadGsap } from "./gsap";

export function supportsScrollTimelines(): boolean {
  return CSS.supports("(animation-timeline: view()) and (animation-range: entry)");
}

export async function applyScrollFallback(): Promise<() => void> {
  const { gsap } = await loadGsap();
  const context = gsap.context(() => {
    for (const element of gsap.utils.toArray<HTMLElement>('[data-scroll="parallax"]')) {
      const distance = parseFloat(getComputedStyle(element).getPropertyValue("--parallax")) || 48;
      gsap.fromTo(
        element,
        { y: distance },
        {
          y: -distance,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }

    for (const element of gsap.utils.toArray<HTMLElement>('[data-scroll="unveil"]')) {
      const trigger = { trigger: element, start: "top 92%", end: "top 30%", scrub: true };
      gsap.fromTo(
        element,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: trigger },
      );
      gsap.fromTo(
        element.children,
        { scale: 1.12 },
        { scale: 1, ease: "none", scrollTrigger: trigger },
      );
    }

    for (const stage of gsap.utils.toArray<HTMLElement>("[data-warp]")) {
      const star = stage.querySelector<SVGElement>("[data-warp-star]");
      if (!star) continue;
      gsap.fromTo(
        star,
        { scale: 0 },
        {
          scale: Number(stage.dataset.warpScale ?? 6),
          svgOrigin: "0 0",
          ease: "power3.in",
          scrollTrigger: { trigger: stage, start: "top top", end: "bottom bottom", scrub: true },
        },
      );
    }
  });
  return () => context.revert();
}
