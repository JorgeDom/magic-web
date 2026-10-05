# magic-web

The website for MAgic! Creative Studio (Asunción, Paraguay). A single static page, exported by
Next.js and served as plain assets from Cloudflare.

`DESIGN.md` is the design system and the source of truth for every visual decision.

## Requirements

- Node.js 20.9 or newer
- pnpm (`npm install -g pnpm`)
- ffmpeg, only if you need to encode video (`pnpm video`)

## Commands

| Command | What it does |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Local development at http://localhost:3000 |
| `pnpm assets` | Rebuild logo layers, the star and optimised photos from `brand/` |
| `pnpm video` | Encode clips in `brand/video` (needs ffmpeg) |
| `pnpm build` | Rebuild assets, export the site to `out/`, check Cloudflare's limits |
| `pnpm preview` | Serve `out/` locally exactly as Cloudflare will |
| `pnpm deploy` | Build and deploy to Cloudflare |
| `pnpm lint` / `pnpm typecheck` / `pnpm format` | Code quality |
| `pnpm shots` | Screenshots at 390px and 1440px into `.shots/` (dev server must be running) |
| `pnpm a11y` | axe-core scan, tab order and 320px reflow check (dev server must be running; loads axe-core from a CDN) |

## Where things live

```
brand/                 Source artwork, photos and video (inputs only; see brand/README.md)
scripts/               Asset pipeline, limit check, screenshots
src/app/               Layout, page, design tokens (globals.css), sitemap, robots
src/components/
  sections/            One component per page section
  worlds/              The four worlds: chapter, navigator, star-warp, per-world scenes
  star/                The star (SVG) and its WebGL version
  ui/                  Buttons, media frame, film, icons
  providers/           Smooth scrolling, Motion
src/content/           All copy and the worlds' content
src/lib/site.ts        Business facts, WhatsApp number, feature flags
src/generated/         Written by the asset scripts. Do not edit.
legacy/                The previous coming-soon page, kept until launch
```

## Editing content

- **Copy:** `src/content/copy.ts` and `src/content/worlds.ts`.
- **WhatsApp, Instagram, address, hours:** `src/lib/site.ts`.
- **Photos and video:** drop files into `brand/photos` or `brand/video` with the names listed
  in `brand/README.md`, then run `pnpm assets` (or `pnpm video`).

Anything not yet confirmed shows on the page as `[TODO]`. Search the built page for `[TODO]`
before launch.

## Configuration

Copy `.env.example` to `.env.local`. Every value is optional.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and the sitemap |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | Public R2 bucket for media over 25 MiB |
| `NEXT_PUBLIC_ENABLE_CONTACT_FORM` | `true` shows the optional contact form |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Where that form posts (a third-party form service) |

## Deploying to Cloudflare

The site has no server code. `wrangler.jsonc` tells Cloudflare to serve `out/` as static assets.

1. `pnpm exec wrangler login` (once per machine).
2. `pnpm deploy`.
3. In the Cloudflare dashboard, open the `magic-web` Worker, then Settings, then Domains and
   Routes, and add `magic.com.py` as a custom domain.

Free-tier limits are enforced at build time by `scripts/check-limits.mjs`: at most 20,000 files
and 25 MiB per file.
