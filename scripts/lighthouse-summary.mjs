// Prints the headline numbers from a Lighthouse JSON report.
//   npx lighthouse <url> --output=json --output-path=.lighthouse/mobile.json
//   node scripts/lighthouse-summary.mjs .lighthouse/mobile.json
import { readFile } from "node:fs/promises";

const report = JSON.parse(await readFile(process.argv[2], "utf8"));
const score = (id) => Math.round((report.categories[id]?.score ?? 0) * 100);
const metric = (id) => report.audits[id]?.displayValue ?? "n/a";

console.log(`${report.finalDisplayedUrl} (${report.configSettings.formFactor})`);
for (const id of Object.keys(report.categories)) console.log(`  ${id.padEnd(16)} ${score(id)}`);
console.log(
  `  LCP ${metric("largest-contentful-paint")}   CLS ${metric("cumulative-layout-shift")}   ` +
    `TBT ${metric("total-blocking-time")}   FCP ${metric("first-contentful-paint")}   SI ${metric("speed-index")}`,
);
console.log(
  `  LCP element: ${report.audits["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? "n/a"}`,
);
console.log(
  `  JS transferred: ${Math.round(
    (report.audits["network-requests"]?.details?.items ?? [])
      .filter((item) => item.resourceType === "Script")
      .reduce((sum, item) => sum + (item.transferSize ?? 0), 0) / 1024,
  )} KB`,
);

const failing = Object.values(report.audits)
  .filter(
    (audit) =>
      audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "informative",
  )
  .map((audit) => `${audit.id}${audit.displayValue ? ` (${audit.displayValue})` : ""}`);
if (failing.length) console.log(`  Below 0.9: ${failing.join(", ")}`);
