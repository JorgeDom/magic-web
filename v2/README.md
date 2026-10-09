# MAgic! Creative Studio: website, v2 (Astro)

A single static page, built by Astro and served as plain files from Cloudflare. Same design as
`../v1` with about half the files: sections are plain HTML with no JavaScript by default, and
only the parts that move ship a script.

`DESIGN.md` is the design system and the source of truth for every visual decision.

## Requirements

- Node.js 22.12 or newer
- pnpm (`npm install -g pnpm`)

## Commands

| Command                                        | What it does                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `pnpm install`                                 | Install dependencies                                                                       |
| `pnpm dev`                                     | Local development at http://localhost:4321 (Astro picks the next free port if it is taken) |
| `pnpm build`                                   | Build the site into `out/` and check Cloudflare's limits                                   |
| `pnpm preview`                                 | Serve `out/` locally the way Cloudflare will (stop it before building again)               |
| `pnpm deploy`                                  | Build and deploy to Cloudflare                                                             |
| `pnpm typecheck` / `pnpm lint` / `pnpm format` | Code quality                                                                               |

Always check the built site (`pnpm build`, then `pnpm preview`) before deploying: the build
minifies CSS, and the scroll animations depend on how it does that (see `astro.config.mjs`).

## Where things live

```
src/pages/index.astro     The page: one component per section, in reading order
src/pages/_legal.astro    Legal notice and privacy: a draft, not built (the _ keeps it off the site)
src/pages/404.astro       Not found
src/components/           One file per section; each holds its own markup, styles and script
src/global.css            Design tokens (colours, type, radii, world modes) and scroll primitives
src/lib/content.ts        Every word on the page, and the four worlds
src/lib/site.ts           Business facts (WhatsApp, Instagram, city, legal identity) and env switches
src/lib/client.ts         Browser helpers shared by the components' scripts
src/lib/star.ts           The star's outline, traced from the logo
src/lib/star3d.ts         The WebGL star (loaded on capable desktops only)
src/assets/logo/          Logo artwork
src/assets/photos/        Photographs (create this folder when the first one arrives)
public/                   Files served as they are: icons, Open Graph image, robots.txt, video
```

## Editing content

- **Copy and worlds:** `src/lib/content.ts`.
- **WhatsApp, Instagram, registered name and RUC:** `src/lib/site.ts`.

Anything not yet confirmed shows on the page as `[TODO]`. Search the built page for `[TODO]`
before launch.

## Photos

Drop the original files (JPG, PNG or WebP, portrait 4:5, true colours) into
`src/assets/photos/`. Astro makes the AVIF and WebP sizes at build time.

Each world shows every photo in its series, at least four frames; missing ones show a labelled
placeholder. To add a photo, use the next number:

| World     | File names                                     |
| --------- | ---------------------------------------------- |
| Kids      | `kids`, `kids-2`, `kids-3`, `kids-4`, ...      |
| Teens     | `teens`, `teens-2`, `teens-3`, ...             |
| Grown Ups | `grown-ups`, `grown-ups-2`, `grown-ups-3`, ... |
| Brands    | `brands`, `brands-2`, `brands-3`, ...          |

"Así se hace" uses `making`, `details`, `experience` and `result`.

For each new photo, add a line to `PHOTO_ALT` in `src/lib/content.ts` saying what it shows.

## Before launch: legal

The draft legal notice (`src/pages/_legal.astro`; rename it to `legal.astro` and link it from
the footer to publish it at `/legal`) covers what applies to this site in Paraguay (Law 4868/2013 on e-commerce, Law
1334/1998 on consumer protection; Law 7593/2025 on personal data from 2027). It is a starting
point, not legal advice: have a Paraguayan lawyer read it once. Then keep it true:

- Fill in the registered name and RUC in `src/lib/site.ts` (`SITE.legal`).
- Before every booking, send in writing what is included, the final price with taxes, how to
  pay, and the change and cancellation terms. The legal page promises this.
- Keep written permission for every photo with people in it, from a parent or guardian for
  every child. Remove a photo whenever someone asks.
- The page says the site has no cookies, analytics or ad pixels. If you add any (including
  Cloudflare Web Analytics), rewrite its "Privacidad" section first; trackers that set
  cookies also need a consent banner.

## Video

The Brands world plays a silent loop if these files exist in `public/media/`:
`brands.webm`, `brands.mp4` and `brands-poster.webp`. Aim for 6 to 12 seconds and 3 to 8 MB.
With ffmpeg:

```
ffmpeg -i source.mov -t 12 -an -vf "scale=-2:1080" -c:v libsvtav1 -crf 36 -preset 6 public/media/brands.webm
ffmpeg -i source.mov -t 12 -an -vf "scale=-2:1080" -c:v libx264 -crf 24 -preset slow -movflags +faststart public/media/brands.mp4
ffmpeg -i source.mov -frames:v 1 -vf "scale=-2:1080" public/media/brands-poster.webp
```

A file over 25 MiB cannot be deployed with the site. Upload it to a public Cloudflare R2
bucket under `/media/` and set `PUBLIC_MEDIA_BASE_URL` to the bucket's address.

## Logo and star

The hero animates the approved logo by revealing five regions of it (`src/assets/logo/m`, `a`,
`star`, `gic`, `descriptor`). Those regions and the star outline in `src/lib/star.ts` were cut
from the master PNG by `../v1/scripts/build-brand-assets.mjs`. If the logo artwork changes,
run that script in `v1` and copy its output here.

## Configuration

Copy `.env.example` to `.env`. Every value is optional.

| Variable                     | Purpose                                            |
| ---------------------------- | -------------------------------------------------- |
| `PUBLIC_SITE_URL`            | Canonical origin for metadata and the sitemap      |
| `PUBLIC_MEDIA_BASE_URL`      | Public R2 bucket for video over 25 MiB             |
| `PUBLIC_ENABLE_CONTACT_FORM` | `true` shows the optional contact form             |
| `PUBLIC_FORM_ENDPOINT`       | Where that form posts (a third-party form service) |

## Deploying to Cloudflare

The site has no server code. It is the Cloudflare Pages project `magic-web`, connected to this
GitHub repository and serving magic.com.py:

- **Every push to `main` goes live** in about two minutes.
- Every other branch gets its own preview link. Check it before merging:
  `pnpm exec wrangler pages deployment list --project-name magic-web`.
- Build settings (in the Pages project): root directory `v2`, build command `pnpm build`,
  output directory `out`. Node comes from `.node-version`, pnpm from `packageManager`.

`wrangler.jsonc` and `pnpm deploy` describe the same site as a Worker with static assets, an
alternative that is not in use.

Free-tier limits are checked at build time by `check-limits.mjs`: at most 20,000 files and
25 MiB per file.
