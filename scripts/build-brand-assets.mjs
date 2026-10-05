// Derives every logo and star asset the site needs from the approved raster artwork in
// brand/logo. Nothing is redrawn: the logo is split into the regions the hero sequence reveals
// (M, A, star, "gic!", descriptor), and the star outline is traced from the same pixels.
//
// Outputs:
//   public/brand/logo-*.webp      full-canvas layers, pixel-identical to the master lockup
//   src/generated/logo.ts         canvas size and layer geometry
//   src/generated/star.ts         the traced star as an SVG path and a polygon
//   src/app/icon.png, apple-icon.png, public/og-image.png
import sharp from "sharp";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOGO_DIR = path.join(ROOT, "brand/logo");
const OUT_PUBLIC = path.join(ROOT, "public/brand");
const OUT_GENERATED = path.join(ROOT, "src/generated");

const SOLID_ALPHA = 128; // pixels above this seed a connected component
const MIN_COMPONENT_PIXELS = 12;

const GROUPS = ["m", "a", "star", "gic", "descriptor"];

function labelComponents(data, width, height) {
  const labels = new Int32Array(width * height).fill(-1);
  const components = [];
  const stack = [];
  for (let start = 0; start < width * height; start++) {
    if (labels[start] !== -1 || data[start * 4 + 3] <= SOLID_ALPHA) continue;
    const id = components.length;
    const component = { id, pixels: 0, x0: width, x1: 0, y0: height, y1: 0, sum: [0, 0, 0] };
    labels[start] = id;
    stack.push(start);
    while (stack.length) {
      const index = stack.pop();
      const x = index % width;
      const y = (index - x) / width;
      component.pixels++;
      component.x0 = Math.min(component.x0, x);
      component.x1 = Math.max(component.x1, x);
      component.y0 = Math.min(component.y0, y);
      component.y1 = Math.max(component.y1, y);
      component.sum[0] += data[index * 4];
      component.sum[1] += data[index * 4 + 1];
      component.sum[2] += data[index * 4 + 2];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const neighbour = ny * width + nx;
          if (labels[neighbour] !== -1 || data[neighbour * 4 + 3] <= SOLID_ALPHA) continue;
          labels[neighbour] = id;
          stack.push(neighbour);
        }
      }
    }
    component.mean = component.sum.map((channel) => channel / component.pixels);
    components.push(component);
  }
  return { labels, components };
}

function groupOfComponent(component, width, height) {
  const cx = (component.x0 + component.x1) / 2 / width;
  const cy = (component.y0 + component.y1) / 2 / height;
  // The lockup's geometry is fixed, and the artwork's textured fills drift from the nominal
  // palette, so regions are told apart by where they sit rather than by colour.
  if (cy > 0.8) return "descriptor";
  if (cx < 0.3) return "m";
  if (cx < 0.45 && component.y1 / height < 0.45) return "star";
  if (cx < 0.62) return "a";
  return "gic";
}

// Soft edge pixels (anti-aliasing) belong to whichever solid region they touch first.
function growGroupsIntoSoftEdges(groupMap, data, width, height) {
  let frontier = [];
  for (let index = 0; index < groupMap.length; index++)
    if (groupMap[index] !== 255) frontier.push(index);
  while (frontier.length) {
    const next = [];
    for (const index of frontier) {
      const x = index % width;
      const y = (index - x) / width;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const neighbour = ny * width + nx;
        if (groupMap[neighbour] !== 255 || data[neighbour * 4 + 3] === 0) continue;
        groupMap[neighbour] = groupMap[index];
        next.push(neighbour);
      }
    }
    frontier = next;
  }
}

function bilinearAlpha(alpha, width, height, x, y) {
  // Pixel centres sit at integer + 0.5.
  const fx = Math.min(Math.max(x - 0.5, 0), width - 1.001);
  const fy = Math.min(Math.max(y - 0.5, 0), height - 1.001);
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const tx = fx - x0;
  const ty = fy - y0;
  const at = (px, py) => alpha[py * width + px];
  return (
    at(x0, y0) * (1 - tx) * (1 - ty) +
    at(x0 + 1, y0) * tx * (1 - ty) +
    at(x0, y0 + 1) * (1 - tx) * ty +
    at(x0 + 1, y0 + 1) * tx * ty
  );
}

// The star is star-convex, so one ray per angle from its centroid finds the whole outline.
function traceStar(alpha, width, height) {
  let mass = 0;
  let cx = 0;
  let cy = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = alpha[y * width + x];
      mass += a;
      cx += a * (x + 0.5);
      cy += a * (y + 0.5);
    }
  }
  cx /= mass;
  cy /= mass;

  const RAYS = 1440;
  const STEP = 0.25;
  const THRESHOLD = 127.5;
  const radii = [];
  for (let ray = 0; ray < RAYS; ray++) {
    const angle = (ray / RAYS) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    let radius = 0;
    let previous = bilinearAlpha(alpha, width, height, cx, cy);
    for (;;) {
      const nextRadius = radius + STEP;
      const value = bilinearAlpha(alpha, width, height, cx + dx * nextRadius, cy + dy * nextRadius);
      if (value < THRESHOLD) {
        const t = previous === value ? 0 : (previous - THRESHOLD) / (previous - value);
        radius += STEP * t;
        break;
      }
      radius = nextRadius;
      previous = value;
      if (radius > Math.max(width, height)) throw new Error("Star trace escaped the artwork");
    }
    radii.push(radius);
  }
  // A light circular average removes what is left of the source's pixel grid.
  const WINDOW = 3;
  return radii.map((_, ray) => {
    let sum = 0;
    for (let offset = -WINDOW; offset <= WINDOW; offset++)
      sum += radii[(ray + offset + RAYS) % RAYS];
    const radius = sum / (WINDOW * 2 + 1);
    const angle = (ray / RAYS) * Math.PI * 2;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  });
}

function simplifyClosed(points, epsilon) {
  // Open the loop at its most distant point (a tip) so the tips are always kept.
  const centre = points
    .reduce(([sx, sy], [x, y]) => [sx + x, sy + y], [0, 0])
    .map((v) => v / points.length);
  let startIndex = 0;
  let far = 0;
  points.forEach(([x, y], index) => {
    const distance = Math.hypot(x - centre[0], y - centre[1]);
    if (distance > far) {
      far = distance;
      startIndex = index;
    }
  });
  const open = [...points.slice(startIndex), ...points.slice(0, startIndex), points[startIndex]];
  const keep = new Uint8Array(open.length);
  keep[0] = keep[open.length - 1] = 1;
  const ranges = [[0, open.length - 1]];
  while (ranges.length) {
    const [first, last] = ranges.pop();
    const [ax, ay] = open[first];
    const [bx, by] = open[last];
    const length = Math.hypot(bx - ax, by - ay) || 1;
    let worst = 0;
    let worstIndex = -1;
    for (let index = first + 1; index < last; index++) {
      const [px, py] = open[index];
      const distance =
        length === 1 && ax === bx && ay === by
          ? Math.hypot(px - ax, py - ay)
          : Math.abs((by - ay) * px - (bx - ax) * py + bx * ay - by * ax) / length;
      if (distance > worst) {
        worst = distance;
        worstIndex = index;
      }
    }
    if (worst > epsilon) {
      keep[worstIndex] = 1;
      ranges.push([first, worstIndex], [worstIndex, last]);
    }
  }
  return open.filter((_, index) => keep[index]).slice(0, -1);
}

function closedSplinePath(points) {
  const n = points.length;
  const fmt = (value) => Number(value.toFixed(2));
  let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    // Centripetal Catmull-Rom: unevenly spaced anchors would overshoot with the uniform form.
    const d1 = Math.sqrt(Math.hypot(p1[0] - p0[0], p1[1] - p0[1])) || 1e-6;
    const d2 = Math.sqrt(Math.hypot(p2[0] - p1[0], p2[1] - p1[1])) || 1e-6;
    const d3 = Math.sqrt(Math.hypot(p3[0] - p2[0], p3[1] - p2[1])) || 1e-6;
    const control = (a, b, c, da, db) =>
      [0, 1].map(
        (k) =>
          (da * da * c[k] - db * db * a[k] + (2 * da * da + 3 * da * db + db * db) * b[k]) /
          (3 * da * (da + db)),
      );
    const c1 = control(p0, p1, p2, d1, d2);
    const c2 = control(p3, p2, p1, d3, d2);
    d += `C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return `${d}Z`;
}

async function writeLayer(name, data, width, height, groupMap, groupIndex) {
  const layer = Buffer.alloc(width * height * 4);
  for (let index = 0; index < width * height; index++) {
    if (groupMap[index] !== groupIndex) continue;
    data.copy(layer, index * 4, index * 4, index * 4 + 4);
  }
  await sharp(layer, { raw: { width, height, channels: 4 } })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(OUT_PUBLIC, `logo-${name}.webp`));
}

async function main() {
  await mkdir(OUT_PUBLIC, { recursive: true });
  await mkdir(OUT_GENERATED, { recursive: true });
  await mkdir(path.join(ROOT, "src/app"), { recursive: true });

  const master = path.join(LOGO_DIR, "magic-logo-primary.png");
  const { data, info } = await sharp(master)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const { labels, components } = labelComponents(data, width, height);
  const groupMap = new Uint8Array(width * height).fill(255);
  const bounds = Object.fromEntries(
    GROUPS.map((g) => [g, { x0: width, x1: 0, y0: height, y1: 0 }]),
  );
  const componentGroup = components.map((component) =>
    component.pixels < MIN_COMPONENT_PIXELS ? null : groupOfComponent(component, width, height),
  );
  for (let index = 0; index < labels.length; index++) {
    const group = labels[index] === -1 ? null : componentGroup[labels[index]];
    if (group) groupMap[index] = GROUPS.indexOf(group);
  }
  components.forEach((component, i) => {
    const group = componentGroup[i];
    if (!group) return;
    const box = bounds[group];
    box.x0 = Math.min(box.x0, component.x0);
    box.x1 = Math.max(box.x1, component.x1);
    box.y0 = Math.min(box.y0, component.y0);
    box.y1 = Math.max(box.y1, component.y1);
  });
  growGroupsIntoSoftEdges(groupMap, data, width, height);

  const starBox = bounds.star;
  const starWidthRatio = (starBox.x1 - starBox.x0) / width;
  if (!(starWidthRatio > 0.06 && starWidthRatio < 0.2)) {
    throw new Error(
      `Star region looks wrong (${JSON.stringify(starBox)}). Check the master logo artwork.`,
    );
  }

  for (const [groupIndex, name] of GROUPS.entries()) {
    await writeLayer(name, data, width, height, groupMap, groupIndex);
  }
  await sharp(master)
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(OUT_PUBLIC, "logo.webp"));

  // Star outline, normalised so its height is 100 units and its bounding box is centred on 0,0.
  const starAlpha = new Uint8Array(width * height);
  for (let index = 0; index < starAlpha.length; index++) {
    if (groupMap[index] === GROUPS.indexOf("star")) starAlpha[index] = data[index * 4 + 3];
  }
  // The artwork's edges are hard (alpha is nearly binary), so soften them before tracing or the
  // outline inherits the pixel staircase.
  const blurred = await sharp(Buffer.from(starAlpha.buffer), {
    raw: { width, height, channels: 1 },
  })
    .blur(1.6)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const softened = new Uint8Array(width * height);
  for (let index = 0; index < softened.length; index++) {
    softened[index] = blurred.data[index * blurred.info.channels];
  }
  const outline = traceStar(softened, width, height);
  const xs = outline.map(([x]) => x);
  const ys = outline.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = 100 / (maxY - minY);
  const normalise = ([x, y]) => [(x - (minX + maxX) / 2) * scale, (y - (minY + maxY) / 2) * scale];
  const normalised = outline.map(normalise);
  const starWidth = (maxX - minX) * scale;
  const simplified = simplifyClosed(normalised, 0.12);
  const starPath = closedSplinePath(simplified);
  const polygon = normalised
    .filter((_, index) => index % 6 === 0)
    .map(([x, y]) => [Number(x.toFixed(2)), Number(y.toFixed(2))]);
  const inradius = Math.min(...normalised.map(([x, y]) => Math.hypot(x, y)));
  const half = (value) => Number((value / 2).toFixed(2));

  await writeFile(
    path.join(OUT_GENERATED, "star.ts"),
    `// Generated by scripts/build-brand-assets.mjs from brand/logo/magic-logo-primary.png. Do not edit.
// The star is traced from the approved artwork: height 100 units, bounding box centred on 0,0.
export const STAR_PATH =
  "${starPath}";
export const STAR_WIDTH = ${Number(starWidth.toFixed(2))};
export const STAR_HEIGHT = 100;
export const STAR_VIEWBOX = "${-half(starWidth)} -50 ${Number(starWidth.toFixed(2))} 100";
/** Shortest distance from the centre to the outline. A scale of R / STAR_INRADIUS covers radius R. */
export const STAR_INRADIUS = ${Number(inradius.toFixed(2))};
/** Outline as a polygon (y down), for building 3D geometry. */
export const STAR_POLYGON: ReadonlyArray<readonly [number, number]> = ${JSON.stringify(polygon)};
`,
  );

  const pct = (value, total) => Number(((value / total) * 100).toFixed(2));
  const starCentre = { x: pct((minX + maxX) / 2, width), y: pct((minY + maxY) / 2, height) };
  const gic = { left: pct(bounds.gic.x0 - 2, width), right: pct(bounds.gic.x1 + 2, width) };

  const extras = {};
  for (const [key, file] of [
    ["compact", "magic-isotype.png"],
    ["mono", "brandbook-mono-b.png"],
  ]) {
    const source = path.join(LOGO_DIR, file);
    if (!existsSync(source)) continue;
    const output = await sharp(source)
      .trim()
      .webp({ lossless: true, effort: 6 })
      .toFile(path.join(OUT_PUBLIC, `logo-${key}.webp`));
    extras[key] = { src: `/brand/logo-${key}.webp`, width: output.width, height: output.height };
  }

  await writeFile(
    path.join(OUT_GENERATED, "logo.ts"),
    `// Generated by scripts/build-brand-assets.mjs from brand/logo. Do not edit.
export const LOGO = ${JSON.stringify(
      {
        width,
        height,
        full: "/brand/logo.webp",
        layers: Object.fromEntries(GROUPS.map((name) => [name, `/brand/logo-${name}.webp`])),
        starCentre,
        gic,
        ...extras,
      },
      null,
      2,
    )} as const;
`,
  );

  const copies = [
    ["favicon-512.png", "src/app/icon.png"],
    ["apple-touch-icon.png", "src/app/apple-icon.png"],
    ["og-image.png", "public/og-image.png"],
  ];
  for (const [from, to] of copies) {
    const source = path.join(LOGO_DIR, from);
    if (existsSync(source)) await copyFile(source, path.join(ROOT, to));
  }

  const summary = components.filter((_, i) => componentGroup[i]).length;
  console.log(
    `brand assets: ${summary} logo regions → ${GROUPS.length} layers, star ${starWidth.toFixed(1)}×100 ` +
      `(${simplified.length} anchors, inradius ${inradius.toFixed(2)})`,
  );
}

await main();
