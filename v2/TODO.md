# TODO

Open work on the v2 site. `main` is live on magic.com.py: every push to `main` deploys, every
other branch gets a preview link (see README, "Deploying").

## Seasonal dates ("Fechas especiales")

Built: the home section before the closing phrase, the floating cue, and a page per date:
`/octubrerosa`, `/halloween`, `/navidad`. Everything is in `src/lib/events.ts`; the copy for the
section itself is `COPY.seasons` in `src/lib/content.ts`. See "Seasonal dates" in DESIGN.md.

- [x] Octubre Rosa photographs (in `src/assets/photos/events`).
- [ ] **Halloween and Navidad are not published** (`live: false` in `src/lib/events.ts`): their
      doors say "Muy pronto" and their pages are not built. Set `live: true` to publish one, and
      to preview it locally.
- [ ] **Halloween and Navidad are first drafts.** Their four experiences are the Octubre Rosa
      formats in each date's theme, and their colours are a proposal. Replace both with the
      studio's own campaign for each date, in `src/lib/events.ts`. Each page has its own scene
      (a night sky; a snowy night), built in `src/pages/[event].astro` and `src/components/events`.
- [ ] **Halloween and Navidad photographs**, in `src/assets/photos/events`, clean (no text):
      `halloween` (cover), `halloween-charms`, `halloween-totes`, `halloween-remeras`,
      `halloween-copas`; `navidad` (cover), `navidad-charms`, `navidad-copas`, `navidad-velas`,
      `navidad-totes`. The Halloween cover is cropped to a tall arch, the Navidad cover to a circle (it sits in a snow globe), the rest to a square. Add a line each
      to `PHOTO_ALT` in `src/lib/content.ts`.
- [ ] **Review the draft copy** for Octubre Rosa: the section heading and line, the lead, the
      experiences heading and the WhatsApp message. The four experiences use the Instagram
      slides' own wording.
- [ ] **A preview image per date** for links shared on WhatsApp and Instagram (the pages use the
      site's general one for now).
- [ ] More dates, if wanted: San Valentín, Día de la Mujer, Día de la Madre, Día del Padre, Día
      del Niño.

## Before publishing the legal notice

The draft is `src/pages/_legal.astro` (not built). See README, "Before launch: legal".

- [ ] Registered name and RUC in `src/lib/site.ts` (`SITE.legal`).
- [ ] Confirm the booking promise (written price with taxes, payment, cancellation terms).
- [ ] Written permission for every photo with people in it (parent or guardian for children).
- [ ] A Paraguayan lawyer reads it once.
- [ ] Rename to `legal.astro` and add the footer link back (`Footer.astro`).

## Housekeeping

- [ ] Remove the unused `RESEND_API_KEY` and `RESEND_FROM` from the Cloudflare Pages project
      (they served the old coming-soon signup form).
- [ ] More photos per world: add `kids-5`, `teens-5`... and a `PHOTO_ALT` line for each.
