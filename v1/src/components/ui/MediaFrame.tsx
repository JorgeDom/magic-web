import type { ReactNode } from "react";
import { getImage, srcSet } from "@/lib/media";
import { todo } from "@/lib/site";

interface MediaFrameProps {
  /** File name in brand/photos, without extension. */
  mediaKey: string;
  /** What the photograph shows. Used as alt text, and as the brief on the placeholder. */
  shot: string;
  /** The `sizes` attribute: how wide the frame is at each breakpoint. */
  sizes: string;
  /** Tailwind aspect-ratio utility. The box is reserved before the image loads (no layout shift). */
  aspect?: string;
  className?: string;
  /** Scroll primitive applied to the frame (see globals.css). */
  scroll?: "unveil";
  children?: ReactNode;
}

/**
 * A fixed-ratio frame for a photograph, with the corner radius of whichever world it sits in.
 * Until the photo exists in brand/photos it shows a labelled Arena placeholder, so missing
 * media is obvious on the page instead of silently filled with stock or invented imagery.
 */
export function MediaFrame({
  mediaKey,
  shot,
  sizes,
  aspect = "aspect-[4/5]",
  className = "",
  scroll,
  children,
}: MediaFrameProps) {
  const image = getImage(mediaKey);
  return (
    <div
      data-scroll={scroll}
      className={`relative overflow-clip rounded-(--media-radius) bg-arena ${aspect} ${className}`}
      style={image ? { backgroundColor: image.color } : undefined}
    >
      {image ? (
        <picture>
          <source type="image/avif" srcSet={srcSet(image.sources.avif)} sizes={sizes} />
          <source type="image/webp" srcSet={srcSet(image.sources.webp)} sizes={sizes} />
          <img
            src={image.fallback}
            alt={shot}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </picture>
      ) : (
        <p
          data-todo="photo"
          className="absolute inset-x-5 bottom-5 max-w-[22ch] text-label text-chocolate"
        >
          {todo("Foto")}
          <span className="mt-1 block font-normal">{shot}</span>
        </p>
      )}
      {children}
    </div>
  );
}
