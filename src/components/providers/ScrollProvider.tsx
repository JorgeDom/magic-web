"use client";

import { useEffect } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import { loadGsap } from "@/lib/gsap";
import { registerLenis } from "@/lib/scroll";
import { applyScrollFallback, supportsScrollTimelines } from "@/lib/scroll-fallback";

function whenIdle(task: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(task, 800);
  return () => window.clearTimeout(id);
}

/**
 * Page-level scroll behaviour, all of it optional and loaded after the page is interactive:
 * Lenis smoothing for mouse and trackpad (touch stays native), and the GSAP fallback for
 * browsers without CSS scroll-driven animations. Renders nothing.
 */
export function ScrollProvider() {
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();

  useEffect(() => {
    if (reduced || !finePointer) return;
    let stop: (() => void) | undefined;
    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      void Promise.all([import("lenis"), loadGsap()]).then(
        ([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
          if (cancelled) return;
          const lenis = new Lenis({ lerp: 0.11, anchors: true, autoRaf: false });
          registerLenis(lenis);
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          stop = () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            registerLenis(null);
          };
        },
      );
    });
    return () => {
      cancelled = true;
      cancelIdle();
      stop?.();
    };
  }, [reduced, finePointer]);

  useEffect(() => {
    if (reduced || supportsScrollTimelines()) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      void applyScrollFallback().then((undo) => {
        if (cancelled) undo();
        else revert = undo;
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      revert?.();
    };
  }, [reduced]);

  return null;
}
