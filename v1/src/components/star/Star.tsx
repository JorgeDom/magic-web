import { STAR_PATH, STAR_VIEWBOX } from "@/generated/star";

export const STAR_SHAPE_ID = "magic-star-shape";

/** The star outline, defined once per page. Every star on the page references it. */
export function StarDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        <path id={STAR_SHAPE_ID} d={STAR_PATH} />
      </defs>
    </svg>
  );
}

/**
 * The MAgic! star, traced from the approved logo. Always decorative and always gold unless a
 * caller has a documented reason (see "The Star" in DESIGN.md). Size it with a height utility;
 * the width follows from the artwork's proportions.
 */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={STAR_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className={`block aspect-[85/100] text-gold ${className}`}
    >
      <use href={`#${STAR_SHAPE_ID}`} fill="currentColor" />
    </svg>
  );
}
