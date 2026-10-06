// Fails the build if ./out would be rejected by Cloudflare's free static-asset limits:
// at most 20,000 files, and no file larger than 25 MiB. Runs automatically after `pnpm build`.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const MAX_FILES = 20_000;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(target);
    else yield target;
  }
}

const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

let count = 0;
let total = 0;
const files = [];
for await (const file of walk(OUT)) {
  const { size } = await stat(file);
  count++;
  total += size;
  files.push({ file: path.relative(OUT, file), size });
}
files.sort((a, b) => b.size - a.size);
const tooLarge = files.filter((entry) => entry.size > MAX_FILE_BYTES);

console.log(`out/: ${count} files, ${megabytes(total)} in total`);
console.log("largest files:");
for (const entry of files.slice(0, 5))
  console.log(`  ${megabytes(entry.size).padStart(9)}  ${entry.file}`);

const problems = [];
if (count > MAX_FILES) problems.push(`${count} files exceeds the limit of ${MAX_FILES}.`);
for (const entry of tooLarge) {
  problems.push(
    `${entry.file} is ${megabytes(entry.size)} (limit 25 MiB). Move it to R2 and set PUBLIC_MEDIA_BASE_URL.`,
  );
}

if (problems.length) {
  console.error("\nCloudflare limits exceeded:");
  for (const problem of problems) console.error(` - ${problem}`);
  process.exit(1);
}
console.log("Within Cloudflare limits (20,000 files, 25 MiB per file).");
