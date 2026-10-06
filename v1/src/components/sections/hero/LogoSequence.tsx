"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { SoundIcon } from "@/components/ui/Icons";
import { COPY } from "@/content/copy";
import { LOGO } from "@/generated/logo";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { FLAGS, SITE } from "@/lib/site";
import { playTing, unlockAudio } from "@/lib/ting";
import styles from "./LogoSequence.module.css";

const LAYERS = ["m", "a", "star", "gic", "descriptor"] as const;

/** Seconds from the start of the sequence to the peak of the sparkle. */
const SPARKLE_PEAK = 1.0;

const geometry = {
  "--logo-ratio": `${LOGO.width} / ${LOGO.height}`,
  "--star-x": `${LOGO.starCentre.x}%`,
  "--star-y": `${LOGO.starCentre.y}%`,
  "--gic-left": `${LOGO.gic.left}%`,
} as CSSProperties;

/**
 * The animated hero logo and its sound control. Sound is off until the visitor turns it on;
 * turning it on replays the sequence once so the "ting" lands on the sparkle. Audio is never
 * started without that click.
 */
export function LogoSequence() {
  const reduced = useReducedMotion();
  const [sound, setSound] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!sound || run === 0) return;
    playTing(reduced ? 0 : SPARKLE_PEAK);
  }, [sound, run, reduced]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    if (!next) return;
    unlockAudio();
    setRun((count) => count + 1);
  };

  return (
    <div className="w-[min(62vw,26rem)]">
      <div key={run} role="img" aria-label={SITE.name} className={styles.logo} style={geometry}>
        {LAYERS.map((layer) => (
          // The layers are one image for assistive tech and for layout; plain <img> keeps
          // them out of next/image, which cannot optimise in a static export anyway.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={layer}
            src={LOGO.layers[layer]}
            srcSet={LOGO.layerSrcSets[layer]}
            sizes="(min-width: 42rem) 26rem, 62vw"
            alt=""
            width={LOGO.width}
            height={LOGO.height}
            decoding="async"
            draggable={false}
            className={`${styles.layer} ${styles[layer]}`}
          />
        ))}
      </div>

      {FLAGS.logoSound && (
        <button
          type="button"
          aria-pressed={sound}
          onClick={toggleSound}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-pill border border-hairline px-4 font-sans text-label text-ink-muted transition-colors duration-(--duration-micro) hover:text-ink lg:mt-6"
        >
          <SoundIcon on={sound} className="size-4" />
          {COPY.hero.sound}
        </button>
      )}
    </div>
  );
}
