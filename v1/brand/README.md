# Brand source material

Everything in this folder is an input. Nothing here is served directly: `pnpm assets` turns it
into optimised files under `public/` and manifests under `src/generated/`.

| Folder | What goes in | What comes out |
|---|---|---|
| `logo/` | Approved logo artwork | Logo layers for the hero sequence, the traced star, favicons |
| `photos/` | Original photographs (JPG, PNG, TIFF) | AVIF and WebP at 480, 800, 1200 and 1800px |
| `video/` | Original clips (MP4, MOV) | AV1 WebM, H.264 MP4 and a poster (`pnpm video`, needs ffmpeg) |

`MAgic_Brandbook_Visual_v2.pdf` is the brand book that `DESIGN.md` is derived from.

## Photos the site asks for

Name each file exactly as below (any supported extension). Until a file exists, the site shows
a labelled placeholder in its place.

| File name | Where it appears | Shot type |
|---|---|---|
| `kids` | Kids world | The Experience: children making charms at the table |
| `teens` | Teens world | The Details: bag charms hanging, close-up |
| `grown-ups` | Grown Ups world, main frame | The Experience: a set table, warm light |
| `grown-ups-detail` | Grown Ups world, small frame | The Details: close-up of the table |
| `brands` | Brands world (still, or poster for the film) | The Making: hands at work, clean table |
| `making` | The Making grid | The Making: hands working |
| `details` | The Making grid | The Details: charms and materials, close-up |
| `experience` | The Making grid | The Experience: people creating together |
| `result` | The Making grid | The Result: the finished piece, worn |

Portrait frames are 4:5, landscape frames 4:3. Supply at least 1800px on the long side. Keep
true colours: no filters, no tints.

## Video

`brands` is the only film slot today (the Brands world). Aim for a 6 to 12 second loop with no
essential sound: the site plays it muted. `pnpm video` targets 3 to 8 MB. If a file ends up
over 25 MiB it cannot be deployed with the site; upload it to Cloudflare R2 and set
`NEXT_PUBLIC_MEDIA_BASE_URL`.

## Still needed from the studio

- A vector logo and star (SVG, AI or PDF). The site currently derives both from the 1182px PNG.
- The service menu (names, descriptions, any prices).
- Real testimonials, the street address and the opening hours.
