"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Signature objects are decorative and interactive only, so they are never server-rendered and
// their code (Motion, GSAP) is fetched only when the world is about to come on screen.
const DECOR = {
  beads: dynamic(() => import("./KidsBeads"), { ssr: false }),
  charms: dynamic(() => import("./TeensCharms"), { ssr: false }),
};

export function Decor({ kind }: { kind: keyof typeof DECOR }) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Objects = DECOR[kind];
  return (
    <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {near && <Objects />}
    </div>
  );
}
