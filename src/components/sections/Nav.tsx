"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "@/components/ui/ButtonLink";
import { COPY } from "@/content/copy";
import { LOGO } from "@/generated/logo";

/**
 * Fixed top bar. Over the hero it is transparent and shows only the booking button, because
 * the hero already carries the logo. Once the hero has scrolled away it gains a cream ground,
 * a hairline and the compact logo.
 */
export function Nav() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[70svh] w-px"
      />
      <header
        data-past-hero={pastHero}
        className="group/nav fixed inset-x-0 top-0 z-50 border-b border-transparent text-chocolate transition-[background-color,border-color] duration-(--duration-ui) data-[past-hero=true]:border-[rgb(76_64_57/0.14)] data-[past-hero=true]:bg-cream"
      >
        <div className="shell flex h-(--nav-height) items-center justify-between">
          <a
            href="#inicio"
            aria-label={COPY.nav.home}
            tabIndex={pastHero ? 0 : -1}
            aria-hidden={!pastHero}
            className="invisible -ml-2 flex min-h-11 items-center px-2 opacity-0 transition-[opacity,visibility] duration-(--duration-ui) group-data-[past-hero=true]/nav:visible group-data-[past-hero=true]/nav:opacity-100"
          >
            {LOGO.compact && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={LOGO.compact.src}
                alt=""
                width={LOGO.compact.width}
                height={LOGO.compact.height}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto lg:h-8"
              />
            )}
          </a>
          <WhatsAppLink
            message={COPY.hero.message}
            size="compact"
            className="[--ground:var(--color-cream)] [--ink:var(--color-chocolate)]"
          >
            {COPY.nav.book}
          </WhatsAppLink>
        </div>
      </header>
    </>
  );
}
