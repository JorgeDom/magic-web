"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Star } from "@/components/star/Star";
import { useCanRenderWebGL } from "@/hooks/useCapability";

const Star3D = dynamic(() => import("@/components/star/Star3D"), { ssr: false });

/**
 * The giant star, cropped by the viewport. The static star is the designed default and the
 * first thing painted; on capable desktops the WebGL star is fetched once the page is idle and
 * cross-fades in over it.
 */
export function HeroStar() {
  const capable = useCanRenderWebGL();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!capable) return;
    const start = () => setMounted(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, [capable]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[21svh] right-0 -z-10 aspect-[85/100] h-[58svh] translate-x-[52%] lg:top-[2svh] lg:h-[96svh] lg:translate-x-[18%]"
    >
      <Star
        className={`ease-out h-full transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {mounted && (
        <div
          className={`ease-out transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <Star3D onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
