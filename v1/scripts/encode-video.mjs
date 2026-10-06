// Encodes every clip in brand/video into a web loop: AV1 WebM + H.264 MP4 + a poster frame.
// Requires ffmpeg on PATH (https://ffmpeg.org). Run with `pnpm video`.
//
//   brand/video/brands.mov  →  public/media/brands.webm, brands.mp4, brands-poster.webp
//                              + an entry under "films" in src/generated/media.json
//
// Targets a 3–8 MB loop. Anything that still exceeds MAX_DEPLOY_BYTES cannot be deployed with
// the site (Cloudflare's 25 MiB per-file limit): upload it to R2 and set
// NEXT_PUBLIC_MEDIA_BASE_URL, and the site will load it from there.
import { spawnSync } from "node:child_process";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "brand/video");
const OUTPUT = path.join(ROOT, "public/media");
const MANIFEST = path.join(ROOT, "src/generated/media.json");
const MAX_DEPLOY_BYTES = 25 * 1024 * 1024;
const HEIGHT = 1080;
const MAX_SECONDS = 12;

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}

function probe(file) {
  const result = spawnSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=p=0",
      file,
    ],
    { encoding: "utf8" },
  );
  const [width, height] = result.stdout.trim().split(",").map(Number);
  return { width, height };
}

async function main() {
  if (spawnSync("ffmpeg", ["-version"]).status !== 0) {
    console.error("ffmpeg was not found on PATH. Install it, then run `pnpm video` again.");
    process.exit(1);
  }
  await mkdir(OUTPUT, { recursive: true });
  const manifest = existsSync(MANIFEST)
    ? JSON.parse(await readFile(MANIFEST, "utf8"))
    : { images: {} };
  const films = {};
  const files = existsSync(SOURCE)
    ? (await readdir(SOURCE)).filter((file) => /\.(mp4|mov|m4v|webm|mkv)$/i.test(file)).sort()
    : [];

  for (const file of files) {
    const key = path.parse(file).name.toLowerCase();
    const source = path.join(SOURCE, file);
    const scale = `scale=-2:'min(${HEIGHT},ih)'`;
    const common = ["-i", source, "-t", String(MAX_SECONDS), "-an", "-vf", scale];
    const webm = path.join(OUTPUT, `${key}.webm`);
    const mp4 = path.join(OUTPUT, `${key}.mp4`);
    const poster = path.join(OUTPUT, `${key}-poster.webp`);

    ffmpeg([
      ...common,
      "-c:v",
      "libsvtav1",
      "-crf",
      "36",
      "-preset",
      "6",
      "-pix_fmt",
      "yuv420p",
      webm,
    ]);
    ffmpeg([
      ...common,
      "-c:v",
      "libx264",
      "-crf",
      "24",
      "-preset",
      "slow",
      "-profile:v",
      "high",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      mp4,
    ]);
    ffmpeg(["-i", source, "-frames:v", "1", "-vf", scale, "-quality", "78", poster]);

    const { width, height } = probe(mp4);
    const entry = { width, height, poster: `/media/${key}-poster.webp`, sources: [] };
    for (const [type, target] of [
      ["video/webm", webm],
      ["video/mp4", mp4],
    ]) {
      const { size } = await stat(target);
      const megabytes = (size / 1024 / 1024).toFixed(1);
      const remote = size > MAX_DEPLOY_BYTES;
      console.log(
        `${path.basename(target)}: ${megabytes} MB${remote ? "  → too large to deploy, upload to R2" : ""}`,
      );
      entry.sources.push({ type, src: `/media/${path.basename(target)}`, remote });
    }
    films[key] = entry;
  }

  await writeFile(MANIFEST, `${JSON.stringify({ ...manifest, films }, null, 2)}\n`);
  console.log(`films: ${files.length} clip(s) encoded`);
}

await main();
