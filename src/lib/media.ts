// Typed access to the manifest written by scripts/optimize-images.mjs and encode-video.mjs.
import manifest from "@/generated/media.json";
import { MEDIA_BASE_URL } from "./site";

export interface MediaImage {
  width: number;
  height: number;
  /** Dominant colour, shown while the image loads. */
  color: string;
  sources: Record<"avif" | "webp", Array<[width: number, src: string]>>;
  fallback: string;
}

export interface MediaFilm {
  width: number;
  height: number;
  poster: string;
  sources: Array<{ type: string; src: string; remote: boolean }>;
}

const images = manifest.images as unknown as Record<string, MediaImage | undefined>;
const films = manifest.films as unknown as Record<string, MediaFilm | undefined>;

export function getImage(key: string): MediaImage | undefined {
  return images[key];
}

export function getFilm(key: string): MediaFilm | undefined {
  return films[key];
}

export function srcSet(entries: Array<[number, string]>): string {
  return entries.map(([width, src]) => `${src} ${width}w`).join(", ");
}

/** Files over the deployment's per-file limit live in R2 and are addressed through the base URL. */
export function filmSrc(source: MediaFilm["sources"][number]): string {
  return source.remote && MEDIA_BASE_URL ? `${MEDIA_BASE_URL}${source.src}` : source.src;
}
