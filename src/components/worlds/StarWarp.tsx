import type { CSSProperties, ReactNode } from "react";
import type { WorldId } from "@/content/worlds";
import { STAR_INRADIUS } from "@/generated/star";
import styles from "./StarWarp.module.css";

// `--k` is the length of one of the star's 100 vertical units. The farthest corner of the
// viewport is at most 70.72vmax from its centre; this is the --k at which the star's narrowest
// radius reaches it, with a small margin.
const K_OPEN = `${Math.ceil((70.72 / STAR_INRADIUS) * 105) / 100}vmax`;

interface OpeningCardProps {
  /**
   * The world being left. When set, the card is revealed through the star-warp, over that
   * world's ground. Without it the card is a plain opening card.
   */
  from?: WorldId;
  /** Id for in-page links. It marks the position where the card is fully open. */
  anchorId?: string;
  children: ReactNode;
}

/**
 * A full-height opening card, optionally revealed by the signature star-warp. The card takes
 * its ground and ink from the section it sits in. With reduced motion, or without scroll
 * timelines and JavaScript, it is simply the card.
 */
export function OpeningCard({ from, anchorId, children }: OpeningCardProps) {
  return (
    <div
      data-warp={from ? K_OPEN : undefined}
      className={`${styles.stage} ${from ? styles.warp : ""}`}
      style={{ "--k-open": K_OPEN } as CSSProperties}
    >
      {anchorId && <div id={anchorId} className={styles.anchor} />}
      <div data-warp-pin className={`${styles.pin} ${from ? "star-clip" : ""}`}>
        {children}
      </div>
      {from && <div aria-hidden="true" data-world={from} className={styles.tail} />}
    </div>
  );
}
