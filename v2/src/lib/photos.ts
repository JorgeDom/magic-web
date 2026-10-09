// The photographs in src/assets/photos, looked up by file name (without extension, any case).
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/*.{jpg,jpeg,png,webp,avif,tif,tiff}",
  { eager: true },
);

const PHOTOS = new Map(
  Object.entries(files).map(([path, module]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
      .toLowerCase(),
    module.default,
  ]),
);

export function findPhoto(name: string): ImageMetadata | undefined {
  return PHOTOS.get(name.toLowerCase());
}

/**
 * A series: `kids`, `kids-2`, `kids-3`... in that order. Adding a photo to a world is just a
 * matter of dropping in the next number. If fewer than `min` exist, the missing names are
 * returned too, so their frames show a placeholder until the photo arrives.
 */
export function photoSeries(base: string, min: number): string[] {
  const pattern = new RegExp(`^${base}(?:-(\\d+))?$`);
  const found = [...PHOTOS.keys()]
    .map((name) => ({ name, match: pattern.exec(name) }))
    .filter(({ match }) => match)
    .map(({ name, match }) => ({ name, order: match![1] ? Number(match![1]) : 1 }))
    .sort((a, b) => a.order - b.order)
    .map(({ name }) => name);
  for (let next = 1; found.length < min; next++) {
    const name = next === 1 ? base : `${base}-${next}`;
    if (!found.includes(name)) found.push(name);
  }
  return found;
}
