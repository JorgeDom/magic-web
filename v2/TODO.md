# TODO

Open work on the v2 site. `main` is live on magic.com.py: every push to `main` deploys, every
other branch gets a preview link (see README, "Deploying").

## Next: "Activaciones de temporada" (seasonal activations)

Not an events calendar: a showcase of what MAgic! can set up for brands on each date, ending
in "contact us". Mostly brand activations.

- [ ] **Placement.** Inside the Brands world, after its gallery, so the star-warp into
      "Cómo funciona" stays intact.
- [ ] **One card per date.** Month, the date's name, one line on what MAgic! sets up, a photo
      or a bead motif (pink ribbon, pumpkin, star), and a "Cotizá esta activación" button.
- [ ] **WhatsApp message per card.** "Hola MAgic! Quiero cotizar una activación de
      _Octubre Rosa_ para mi marca."
- [ ] **Colours from the palette only.** Octubre Rosa → rosa. Halloween → peach and chocolate
      (orange and black are not in the palette). Navidad → sage and gold.
- [ ] **Calendar order, starting from the next date** (in October, Octubre Rosa comes first).
- [ ] **Layout.** A swipe row on phones, a grid on desktop.
- [ ] **Content in `src/lib/content.ts`.** One list; add or remove dates there.

To decide before building:

- [ ] Which dates: San Valentín, Día de la Mujer, Día de la Madre, Día del Padre, Día del
      Niño, Octubre Rosa, Halloween, Navidad? Add or remove.
- [ ] What MAgic! offers for each (one line each): from the studio, or drafted and approved.
- [ ] Photos per date, if any (otherwise bead motifs).
- [ ] Section title and intro line ("Activaciones de temporada" + one line).

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
