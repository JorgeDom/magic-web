// Browser-side helpers shared by the components' scripts: capability checks, lazy loading of
// GSAP and Lenis, and the GSAP stand-in for the CSS scroll-driven primitives in global.css.
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

export const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** A mouse or trackpad: the only pointers that get hover and cursor-reactive effects. */
export const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Whether looping film should play at all on this visit. */
export function canAutoplay(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  const slow = Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
  return !slow && !reducedMotion();
}

/**
 * Whether this device gets the WebGL star. Phones, low-power machines, data-saver connections
 * and reduced-motion visitors keep the static star, which is the designed default.
 */
export function canRenderWebGL(): boolean {
  if (!canAutoplay() || !finePointer() || !matchMedia("(min-width: 64rem)").matches) return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return (memory === undefined || memory >= 4) && (navigator.hardwareConcurrency ?? 4) >= 4;
}

export function whenIdle(task: () => void): void {
  if (typeof requestIdleCallback === "function") requestIdleCallback(task, { timeout: 2500 });
  else setTimeout(task, 800);
}

/** Runs `task` once, when `element` comes within a viewport of being seen. */
export function whenNear(element: Element, task: () => void, rootMargin = "100% 0px"): void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      task();
    },
    { rootMargin },
  );
  observer.observe(element);
}

/** Calls `onChange` whenever `element` enters or leaves the viewport. */
export function watchVisibility(element: Element, onChange: (visible: boolean) => void): void {
  new IntersectionObserver(([entry]) => onChange(Boolean(entry?.isIntersecting))).observe(element);
}

export interface GsapTools {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerPlugin;
}

let gsapTools: Promise<GsapTools> | undefined;

/** GSAP and ScrollTrigger, fetched on first use and shared by every scene. */
export function loadGsap(): Promise<GsapTools> {
  gsapTools ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return gsapTools;
}

/**
 * A GSAP scene for `root`: skipped under reduced motion, and GSAP is only fetched once the
 * scene is within a viewport of being seen. The markup's resting state must therefore already
 * be the calm version of the section.
 */
export function scrollScene<T extends Element>(
  root: T | null,
  scene: (tools: GsapTools, root: T) => void,
): void {
  if (!root || reducedMotion()) return;
  whenNear(root, () => void loadGsap().then((tools) => scene(tools, root)));
}

let lenis: Lenis | undefined;

/** Lenis smoothing for mouse and trackpad, driven by GSAP's ticker. Touch stays native. */
export async function startSmoothScroll(): Promise<void> {
  const [{ default: LenisClass }, { gsap, ScrollTrigger }] = await Promise.all([
    import("lenis"),
    loadGsap(),
  ]);
  lenis = new LenisClass({ lerp: 0.11, anchors: true, autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/**
 * Jumps to a section. Where the View Transitions API exists (and motion is welcome) the two
 * states cross-fade; otherwise the jump is immediate. Focus then moves to `focusTarget` so
 * keyboard and screen-reader users land where sighted users do.
 */
export function jumpTo(target: HTMLElement, focusTarget?: HTMLElement | null): void {
  const jump = () => {
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target.scrollIntoView({ behavior: "instant", block: "start" });
  };
  const finish = () => focusTarget?.focus({ preventScroll: true });
  if (reducedMotion() || typeof document.startViewTransition !== "function") {
    jump();
    finish();
    return;
  }
  document.startViewTransition(jump).finished.finally(finish);
}

const supportsScrollTimelines = () =>
  CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

/**
 * GSAP stand-in for browsers without `animation-timeline: view()`. It reads the same data
 * attributes the stylesheet does, so components never branch on browser support.
 */
export async function applyScrollFallback(): Promise<void> {
  if (supportsScrollTimelines() || reducedMotion()) return;
  const { gsap } = await loadGsap();
  const each = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);

  for (const element of each('[data-scroll="parallax"]')) {
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

  for (const element of each('[data-scroll="unveil"]')) {
    const scrollTrigger = { trigger: element, start: "top 92%", end: "top 30%", scrub: true };
    gsap.fromTo(
      element,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger },
    );
    gsap.fromTo(element.children, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger });
  }

  for (const element of each('[data-scroll="draw"]')) {
    gsap.fromTo(
      element,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: element, start: "top bottom", end: "top 55%", scrub: true },
      },
    );
  }

  // Star-warp: the stylesheet clips each opening card to a star sized by `--k`. The class
  // switches on the pinned layout; the tween opens the star over the pinned distance.
  document.documentElement.classList.add("warp-fallback");
  for (const stage of each("[data-warp]")) {
    gsap.fromTo(
      stage.querySelector("[data-warp-pin]"),
      { "--k": "0vmax" },
      {
        "--k": stage.dataset.warp ?? "4.1vmax",
        ease: "power2.in",
        scrollTrigger: { trigger: stage, start: "top top", end: "bottom bottom", scrub: true },
      },
    );
  }
}
