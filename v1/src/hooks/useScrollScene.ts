"use client";

import { useEffect, useRef, type RefObject } from "react";
import { loadGsap, type GsapTools } from "@/lib/gsap";
import { useReducedMotion } from "./useMediaQuery";

/**
 * Runs a GSAP scene scoped to `scope`. GSAP loads lazily; everything the scene creates is
 * reverted on unmount. With reduced motion the scene never runs, so the markup's resting
 * state must already be the calm version of the section.
 */
export function useScrollScene<T extends HTMLElement>(
  scope: RefObject<T | null>,
  scene: (tools: GsapTools, root: T) => void,
): void {
  const reduced = useReducedMotion();
  const latest = useRef(scene);

  useEffect(() => {
    latest.current = scene;
  });

  useEffect(() => {
    const root = scope.current;
    if (reduced || !root) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    // GSAP is only fetched once the scene is within a viewport of being seen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void loadGsap().then((tools) => {
          if (cancelled) return;
          const context = tools.gsap.context(() => latest.current(tools, root), root);
          revert = () => context.revert();
        });
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, [reduced, scope]);
}
