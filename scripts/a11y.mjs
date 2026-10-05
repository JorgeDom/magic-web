// Accessibility smoke test against a running server: an axe-core scan (WCAG 2.1 A and AA), the
// keyboard tab order with accessible names, reflow at 320px, and the reduced-motion state.
// axe-core is loaded from a CDN into the test browser at run time; it is not a dependency.
//
//   node scripts/a11y.mjs [--url=http://localhost:3000]
import { chromium } from "playwright";

const url =
  process.argv.find((arg) => arg.startsWith("--url="))?.slice(6) ?? "http://localhost:3000";
const AXE = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js";

const browser = await chromium.launch();
let failed = false;

async function open(options) {
  const context = await browser.newContext({ locale: "es-PY", ...options });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  return { context, page };
}

// Scroll through the whole page so lazily mounted parts exist before scanning.
async function visitAll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

for (const [label, viewport, reducedMotion] of [
  ["390 phone", { width: 390, height: 844 }, "no-preference"],
  ["1440 desktop", { width: 1440, height: 900 }, "no-preference"],
  ["390 phone, reduced motion", { width: 390, height: 844 }, "reduce"],
]) {
  const { context, page } = await open({ viewport, reducedMotion });
  await visitAll(page);
  await page.addScriptTag({ url: AXE });
  const results = await page.evaluate(() =>
    window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
      },
    }),
  );
  console.log(
    `\naxe · ${label}: ${results.violations.length} violation(s), ${results.passes.length} passes`,
  );
  for (const violation of results.violations) {
    failed = true;
    console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
    for (const node of violation.nodes.slice(0, 4)) {
      console.log(
        `      ${node.target.join(" ")}  ${node.failureSummary?.split("\n")[1]?.trim() ?? ""}`,
      );
    }
  }
  await context.close();
}

{
  const { context, page } = await open({ viewport: { width: 1440, height: 900 } });
  await visitAll(page);
  const stops = [];
  for (let index = 0; index < 40; index++) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        name: (element.getAttribute("aria-label") ?? element.textContent ?? "")
          .replace(/\s+/g, " ")
          .trim(),
        outline: `${style.outlineStyle} ${style.outlineWidth}`,
        visible: box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < window.innerHeight,
      };
    });
    if (!stop) break;
    if (stops.length && stops[0].name === stop.name && stops.length > 3) break;
    stops.push(stop);
  }
  console.log(`\nkeyboard · ${stops.length} tab stops`);
  stops.forEach((stop, index) => {
    const flags = [
      stop.outline.startsWith("none") ? "NO FOCUS RING" : "",
      stop.visible ? "" : "OFF SCREEN",
    ]
      .filter(Boolean)
      .join(" ");
    if (flags) failed = true;
    console.log(
      `  ${String(index + 1).padStart(2)}. <${stop.tag}> ${stop.name.slice(0, 60)} ${flags}`,
    );
  });
  await context.close();
}

{
  const { context, page } = await open({ viewport: { width: 320, height: 640 } });
  await visitAll(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  console.log(
    `\nreflow · 320px wide: ${overflow > 0 ? `OVERFLOWS by ${overflow}px` : "no horizontal scroll"}`,
  );
  if (overflow > 0) failed = true;
  await context.close();
}

await browser.close();
process.exitCode = failed ? 1 : 0;
