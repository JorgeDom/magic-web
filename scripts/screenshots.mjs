// Viewport screenshots at the two sizes every section is checked at (390px and 1440px).
//
//   pnpm shots                         top of the page
//   pnpm shots -- --at=0,900,1800      at these scroll offsets (px)
//   pnpm shots -- --sel=#mundo-teens   scrolled to an element
//   pnpm shots -- --reduced            with prefers-reduced-motion: reduce
//   pnpm shots -- --url=http://localhost:3000 --out=.shots --wait=2600
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).flatMap((arg) => {
    const match = /^--([^=]+)(?:=(.*))?$/.exec(arg);
    return match ? [[match[1], match[2] ?? "true"]] : [];
  }),
);

const url = args.url ?? "http://localhost:3000";
const out = path.resolve(args.out ?? ".shots");
const wait = Number(args.wait ?? 2600);
const offsets = (args.at ?? "0").split(",").map(Number);
const selectors = args.sel ? args.sel.split(",") : [];
const name = args.name ?? "page";

const VIEWPORTS = [
  { label: "390", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  {
    label: "1440",
    width: 1440,
    height: 900,
    isMobile: false,
    hasTouch: false,
    deviceScaleFactor: 1,
  },
];

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const viewport of VIEWPORTS) {
  if (args.only && args.only !== viewport.label) continue;
  const { label, ...options } = viewport;
  const context = await browser.newContext({
    ...options,
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: args.reduced ? "reduce" : "no-preference",
    locale: "es-PY",
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`[${label}] console: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`[${label}] page error: ${error.message}`));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 0) problems.push(`[${label}] horizontal overflow of ${overflow}px`);

  const stops = [
    ...offsets.map((y) => ({
      tag: `y${y}`,
      go: () => page.evaluate((top) => window.scrollTo(0, top), y),
    })),
    ...selectors.map((selector) => ({
      tag: selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, ""),
      go: () => page.locator(selector).first().scrollIntoViewIfNeeded(),
    })),
  ];
  for (const stop of stops) {
    await stop.go();
    await page.waitForTimeout(700);
    const file = path.join(out, `${name}-${label}-${stop.tag}.png`);
    await page.screenshot({ path: file, scale: "css" });
    console.log(file);
  }
  await context.close();
}

await browser.close();
if (problems.length) {
  console.log("\nProblems:");
  for (const problem of [...new Set(problems)]) console.log(" -", problem);
} else {
  console.log("\nNo console errors, no horizontal overflow.");
}
