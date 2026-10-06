// GSAP and ScrollTrigger are loaded on demand, once, and shared by every scene.
import type { gsap as GsapInstance } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export interface GsapTools {
  gsap: typeof GsapInstance;
  ScrollTrigger: typeof ScrollTriggerPlugin;
}

let tools: Promise<GsapTools> | null = null;

export function loadGsap(): Promise<GsapTools> {
  tools ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return tools;
}
