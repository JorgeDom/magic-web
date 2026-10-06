// Pre-optimises every photo in brand/photos, because next/image cannot do it in a static export.
//
//   brand/photos/kids.jpg  →  public/media/kids-{480,800,1200,1800}.{avif,webp}
//                             + an entry in src/generated/media.json
//
// The file name (without extension) is the key components ask for. Expected keys are listed in
// brand/README.md. A missing photo is not an error: the site shows a labelled placeholder.
import sharp from "sharp";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "brand/photos");
const OUTPUT = path.join(ROOT, "public/media");
const MANIFEST = path.join(ROOT, "src/generated/media.json");
const WIDTHS = [480, 800, 1200, 1800];
const FORMATS = {
  avif: (image) => image.avif({ quality: 52, effort: 5 }),
  webp: (image) => image.webp({ quality: 76, effort: 5 }),
};

async function isFresh(source, target) {
  if (!existsSync(target)) return false;
  const [a, b] = await Promise.all([stat(source), stat(target)]);
  return b.mtimeMs >= a.mtimeMs;
}

async function main() {
  await mkdir(OUTPUT, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });

  const films = existsSync(MANIFEST)
    ? (JSON.parse(await readFile(MANIFEST, "utf8")).films ?? {})
    : {};
  const files = existsSync(SOURCE)
    ? (await readdir(SOURCE)).filter((file) => /\.(jpe?g|png|tiff?|webp|avif)$/i.test(file)).sort()
    : [];

  const images = {};
  let written = 0;
  for (const file of files) {
    const key = path.parse(file).name.toLowerCase();
    const source = path.join(SOURCE, file);
    const original = sharp(source).rotate();
    const { width, height } = await original.metadata();
    if (!width || !height) continue;
    const widths = WIDTHS.filter((w) => w <= width);
    if (!widths.length) widths.push(width);

    const sources = {};
    for (const [format, encode] of Object.entries(FORMATS)) {
      sources[format] = [];
      for (const w of widths) {
        const name = `${key}-${w}.${format}`;
        const target = path.join(OUTPUT, name);
        if (!(await isFresh(source, target))) {
          await encode(original.clone().resize({ width: w })).toFile(target);
          written++;
        }
        sources[format].push([w, `/media/${name}`]);
      }
    }
    const { dominant } = await original.clone().resize(32).stats();
    const hex = (channel) => channel.toString(16).padStart(2, "0");
    images[key] = {
      width,
      height,
      color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
      sources,
      fallback: sources.webp[Math.min(2, sources.webp.length - 1)][1],
    };
  }

  await writeFile(MANIFEST, `${JSON.stringify({ images, films }, null, 2)}\n`);
  console.log(`images: ${files.length} source photo(s), ${written} file(s) written`);
}

await main();
