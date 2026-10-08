---
version: alpha
name: MAgic-Creative-Studio
description: A boutique creative studio in Paraguay where people make charms, bag charms, keychains and painted pieces. One cream canvas, one chocolate ink, one gold star. Colour arrives as full-viewport "worlds" that share a single layout and differ only in intensity. Playful in idea, premium in execution.

source:
  brand-book: "../v1/brand/MAgic_Brandbook_Visual_v2.pdf (Visual Identity System v2.0, 2026)"
  logo-artwork: "../v1/brand/logo/magic-logo-primary.png (approved master lockup, raster)"

colors:
  # Primary
  lavender: "#9C91CE"
  rosa: "#E78F96"
  sage: "#91A18D"
  cream: "#FAF7F1"
  chocolate: "#4C4039"
  # Accents
  gold: "#ECAF42"
  blue: "#88A5DA"
  peach: "#F3A172"
  # Neutrals
  blush: "#F4E0E4"
  mint: "#E7F0EA"
  arena: "#D9C7A6"
  # Semantic roles (aliases, never new hex values)
  canvas: "{colors.cream}"
  ink: "{colors.chocolate}"
  ink-muted: "rgb(76 64 57 / 0.80)"
  hairline: "rgb(76 64 57 / 0.14)"
  on-dark: "{colors.cream}"
  on-dark-muted: "rgb(250 247 241 / 0.80)"
  hairline-on-dark: "rgb(250 247 241 / 0.18)"
  star: "{colors.gold}"
  action: "{colors.chocolate}"
  on-action: "{colors.cream}"
  focus: "{colors.chocolate}"

typography:
  claim:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, min(13.5vw, 19svh), 10.5rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    textTransform: uppercase
  display:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(4rem, min(17vw, 26svh), 13rem)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  statement:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 4.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  descriptor:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "clamp(0.6875rem, 1vw, 0.8125rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.42em"
    textTransform: uppercase
  closing:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 5.4vw, 4.25rem)"
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.08
    letterSpacing: "-0.015em"

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  section: "clamp(96px, 16svh, 192px)"
  gutter: "clamp(20px, 5vw, 72px)"
  container: 1320px
  measure: 34rem

rounded:
  none: 0px
  sm: 6px
  md: 16px
  lg: 32px
  xl: 56px
  pill: 9999px

motion:
  ease-soft: "cubic-bezier(0.45, 0, 0.25, 1)"
  ease-snap: "cubic-bezier(0.2, 1.4, 0.4, 1)"
  ease-editorial: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-cinema: "cubic-bezier(0.33, 0, 0.15, 1)"
  duration-micro: 160ms
  duration-ui: 280ms
  duration-reveal: 900ms
  logo-sequence: 2000ms
  sparkle: 380ms

worlds:
  kids:
    brand-mode: "Master / expressive (full palette)"
    ground: "{colors.cream}"
    ink: "{colors.chocolate}"
    palette: "all eight brand colours, in objects only"
    media-radius: "{rounded.xl}"
    ease: "{motion.ease-soft}"
    duration: 1200ms
    scrub: 1.2
  teens:
    brand-mode: "Social"
    ground: "{colors.peach}"
    ink: "{colors.chocolate}"
    accent: "{colors.lavender}"
    media-radius: "{rounded.md}"
    ease: "{motion.ease-snap}"
    duration: 360ms
    scrub: 0.3
  grown-ups:
    brand-mode: "Celebration"
    ground: "{colors.blush}"
    ink: "{colors.chocolate}"
    accent: "{colors.rosa}"
    detail: "{colors.gold}"
    media-radius: "{rounded.sm}"
    ease: "{motion.ease-editorial}"
    duration: 900ms
    scrub: 0.8
  brands:
    brand-mode: "Corporate"
    ground: "{colors.chocolate}"
    ink: "{colors.cream}"
    accent: "{colors.sage}"
    detail: "{colors.gold}"
    media-radius: "{rounded.none}"
    ease: "{motion.ease-cinema}"
    duration: 1400ms
    scrub: 1.5

components:
  button-primary:
    background: "{colors.action}"
    text: "{colors.on-action}"
    type: "{typography.button}"
    rounded: "{rounded.pill}"
    height: 52px
    padding: "0 28px"
  button-primary-on-dark:
    background: "{colors.cream}"
    text: "{colors.chocolate}"
  button-quiet:
    background: transparent
    text: "{colors.ink}"
    border: "1.5px solid {colors.ink}"
    rounded: "{rounded.pill}"
    height: 52px
  world-navigator:
    type: "{typography.label}"
    marker: "micro star, {colors.star}"
  media-frame:
    rounded: "per world ({worlds.*.media-radius})"
    aspect: "4 / 5"
---

## Overview

MAgic! is a place where you sit down and make something with your hands, then take it home. The site has to feel like that table: warm paper, real objects, plenty of room, and one moment of delight at a time.

The system is one cream canvas (`{colors.canvas}`), one chocolate ink (`{colors.ink}`), and one gold star (`{colors.star}`). Everything expressive is rationed. Colour does not decorate the page; it arrives as a whole room. The page moves through four full-viewport worlds (Kids, Teens, Grown Ups, Brands) that share a single layout and differ only in ground colour, corner radius and motion tempo. The brand book calls this "same logo, different intensity", and it is the organising idea of the whole site.

The brand's formula is the test for every decision: **expressive colour + disciplined composition + generous whitespace**. And its governance line settles disputes: *if a piece feels cute before it feels considered, simplify.*

**Key characteristics**

- Cream is the page. Colour is a room you enter, never a sprinkle.
- No ground is a flat fill. Each carries a wash: soft pools of brand colour in its empty space (see Washes).
- At most three solid colours in view at once, counting ground and ink. Kids and the bead scenes (the intro, the thread in How it works, the closing string) are the only exceptions. Washes are atmosphere and are not counted.
- Product photos and video keep their true colours. Nothing is tinted, duotoned or overlaid.
- Gold belongs to the star. Nothing else on the page is gold.
- Type is large, tight and left-aligned. Hierarchy comes from size and weight, never from colour or decoration.
- Depth comes from layering and scroll, not from shadows. The washes are the only gradient.
- One orchestrated moment per section. If two things move at once, one of them is cut.

**Page rhythm (ground colours)**

Cream hero → cream intro → cream (Kids) → peach (Teens) → blush (Grown Ups) → chocolate (Brands) → cream (How it works) → cream (The Making) → cream (Final CTA) → chocolate (footer).

**Personality** (brand book p.3): creative, sophisticated, joyful, warm, detail-led, contemporary. **Never:** childish, school-craft, cheap DIY, cold corporate, cluttered.

## Colors

### Primary

- **Lavanda Magic** (`{colors.lavender}`, #9C91CE): the "M". Accent of the Teens world; a bead colour in Kids.
- **Rosa Magic** (`{colors.rosa}`, #E78F96): the "A". Accent of the Grown Ups world.
- **Sage Magic** (`{colors.sage}`, #91A18D): the "g". Accent of the Brands world.
- **Cream** (`{colors.cream}`, #FAF7F1): the page. Main background everywhere a world is not active.
- **Chocolate** (`{colors.chocolate}`, #4C4039): all text and structure on light grounds; the ground of the Brands world and the footer. There is no black on this site.

### Accents

- **Magic Gold** (`{colors.gold}`, #ECAF42): the star, and nothing else. No gold buttons, rules, text or icons.
- **Soft Blue** (`{colors.blue}`, #88A5DA) and **Peach** (`{colors.peach}`, #F3A172): the "i" and "c". Peach is the Teens ground; blue appears only in Kids objects.

### Neutrals

- **Blush** (`{colors.blush}`, #F4E0E4): Grown Ups ground.
- **Mint** (`{colors.mint}`, #E7F0EA): not used on the page at present. It was the ground of the testimonials section, which was removed; it stays available as a calm section ground.
- **Arena** (`{colors.arena}`, #D9C7A6): media placeholders and tactile neutral surfaces.

### Text and structure

- **Ink** (`{colors.ink}`): headlines, body, buttons.
- **Ink muted** (`{colors.ink-muted}`, chocolate at 80%): secondary copy on cream, blush and mint only.
- **Hairline** (`{colors.hairline}`, chocolate at 14%): the only divider.
- On chocolate: `{colors.on-dark}`, `{colors.on-dark-muted}`, `{colors.hairline-on-dark}`.

No hex value outside this list may be introduced. Opacity steps of chocolate and cream are the only derived colours, apart from the washes below.

### Contrast (measured, WCAG 2.1)

| Text on ground | Ratio | Allowed for |
|---|---|---|
| Chocolate on Cream | 9.35 | everything |
| Chocolate on Mint | 8.60 | everything |
| Chocolate on Blush | 7.92 | everything |
| Chocolate on Arena | 6.03 | everything |
| Chocolate on Gold | 5.13 | everything (but gold is star-only) |
| Chocolate on Peach | 4.83 | everything |
| Chocolate on Rosa | 4.18 | large text only (≥ 24px, or ≥ 18.66px bold) |
| Chocolate on Soft Blue | 4.02 | large text only |
| Chocolate on Sage | 3.66 | large text only |
| Chocolate on Lavender | 3.50 | large text only |
| Cream on Chocolate | 9.35 | everything |
| Cream 80% on Chocolate | 6.66 | everything |
| Ink muted on Cream / Mint / Blush | 5.31 / 5.06 / 4.77 | everything |
| Ink muted on Peach | 3.42 | not allowed; use full ink on peach |
| Cream or white on any pastel | < 3 | never |
| Sage on Chocolate | 3.66 | large text and graphics only |

Consequences: body copy only ever sits on cream, blush, mint, arena, peach or chocolate. Lavender, rosa, sage and blue are object and shape colours, not reading surfaces. Buttons are chocolate with cream text (or the inverse on chocolate), never a pastel fill with light text.

### Washes

The one gradient on the site. A wash is a set of soft pools of brand colour lying on a section's ground, the way light through coloured beads lies on a table. It is what keeps a ground from reading as a flat fill, and it comes from the coming-soon page that preceded this site.

- **Atmosphere only.** A pool carries no meaning and frames nothing. Every section reads as designed with its wash removed.
- **Brand colours at partial opacity**, each fading to nothing. No new hex values, no blur filters, no multi-colour gradient ramps, no glows around objects, no glass.
- **Pools live in the empty ground.** They sit in corners and margins, never centred behind a headline or a photograph.
- **Each ground has its own rule**, set by contrast:

| Ground | Pools | Under copy |
|---|---|---|
| Cream | Lavender, rosa, peach, blue, sage. Never gold. | At most about 28% of wash beneath muted text. Stronger pools (up to 56%) are centred in a corner or off the edge, so only their faint outer part reaches copy |
| Peach (Teens) | Cream as light, rosa, lavender | Cream only. Rosa and lavender stay off the copy (chocolate on peach is already 4.83) |
| Blush (Grown Ups) | Cream as light, rosa, lavender | Cream only under muted text; rosa may sit under full ink |
| Chocolate (Brands) | Sage only | At most 34% under copy; up to 50% in a corner |

- **They drift with scroll and never by themselves** (see Motion). With reduced motion they are still.
- **Measured, not assumed.** Text contrast was measured on the painted page at 390px and 1440px after the washes were added; no text run lost its AA rating. Re-measure when a pool is moved, enlarged or strengthened.

The pools for every section are listed in `src/components/Wash.astro`. No other gradient is allowed: no gradient fills on type, buttons or shapes.

## Typography

### Families

- **DM Sans** (variable, optical size axis on): headlines and claims.
- **Inter** (weights 400 and 500): body, labels, buttons, anything functional.
- **Fraunces** (italic only, one weight): a closing phrase, used once on the page (Final CTA). A second use needs a reason; a third is not allowed. It is never a system font.

The logo's organic letterforms are artwork. Communication type supports the logo and does not imitate it: no rounded display faces, no script, no hand-lettering.

### Hierarchy

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.claim}` | 52 → 168px | 600 | 0.90 | -0.025em | "MAKE SOME MAGIC." in the hero. Uppercase. Once. |
| `{typography.display}` | 64 → 208px | 600 | 0.90 | -0.03em | Opening cards: world names, "Cómo funciona" |
| `{typography.headline}` | 32 → 56px | 500 | 1.05 | -0.02em | Section headings |
| `{typography.statement}` | 26 → 48px | 400 | 1.18 | -0.015em | Long quotations and statements (not used on the page at present) |
| `{typography.title}` | 22 → 28px | 500 | 1.20 | -0.01em | Step names, service names |
| `{typography.lead}` | 17 → 20px | 400 | 1.50 | -0.005em | One-line world descriptions |
| `{typography.body}` | 16px | 400 | 1.60 | 0 | Paragraphs |
| `{typography.label}` | 14px | 500 | 1.30 | 0 | Navigator, captions, footer headings |
| `{typography.button}` | 16px | 500 | 1.00 | 0 | Buttons |
| `{typography.descriptor}` | 11 → 13px | 500 | 1.00 | 0.42em | "CREATIVE STUDIO" only |
| `{typography.closing}` | 32 → 68px | 400 italic | 1.08 | -0.015em | Fraunces closing phrase |

### Principles

- **Two sizes do the talking.** A section has one large line and one reading size. If a third size is needed, the section has too much in it. The intro is the one exception, and the size difference is its point: "Little details." at title size, "Big magic." at claim size.
- **Uppercase is reserved** for the hero claim and the "CREATIVE STUDIO" descriptor. Labels, navigation and buttons are sentence case.
- **Left-aligned by default.** Centred type is reserved for the intro statement and the Final CTA, the two places the page stops to breathe.
- **No emphasis inside a headline.** No italic word, no coloured word, no underline flourish.
- **Measure.** Body copy never runs wider than `{spacing.measure}` (about 62 characters).
- **Typographic correctness.** Curly quotes, real apostrophes, en dashes in ranges ("Lun–Sáb"), non-breaking space before "!" where needed, `text-wrap: balance` on headlines and `text-wrap: pretty` on paragraphs.
- **Fonts load without shifting.** Self-hosted at build time (Astro's font pipeline) with `font-display: swap` and size-adjusted fallbacks. DM Sans and Inter are preloaded; Fraunces is not, and only downloads when the closing section is about to appear.

### Language

Brand claims are English: "MAKE SOME MAGIC.", "Little details. Big magic.", "Made by you. Made to remember." Services, local information and calls to action are Spanish (es-PY, voseo: "Reservá", "Escribinos"). One language per sentence. One claim per section. English passages carry `lang="en"`.

Voice (brand book p.34): short, warm, confident, light. Never babyish, never over-explained.

## Layout

### Spacing

- Base unit 4px. Scale: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.xxxl}` 64.
- Section padding: `{spacing.section}` (96 → 192px) top and bottom. Worlds are exactly one viewport tall (`100svh`) while pinned.
- Side gutter: `{spacing.gutter}` (20 → 72px).

### Grid and container

- 4 columns on phones, 12 from 1024px. Max content width `{spacing.container}` (1320px).
- The composition is asymmetric: copy holds the left five columns, media the right six, with one empty column between them. The hero breaks the grid on purpose; nothing else does.
- Components adapt with container queries, not viewport queries, so a world chapter lays itself out the same way wherever it is placed.

### The world chapter (one layout, four intensities)

A world is two beats: a full-screen opening card with its name, then its services beside its media.

```
1. Opening card (100svh)                     2. Services and media
┌───────────────────────────────────────┐    ┌───────────────────────────────────────┐
│                                       │    │ Service ─────────────   ┌───────────┐ │
│                                       │    │ Service ─────────────   │           │ │
│                                       │    │ Service ─────────────   │   media   │ │
│ Kids                                  │    │ [ Reservá ]             │   4 : 5   │ │
│ One line in Spanish.                  │    │                         └───────────┘ │
└───────────────────────────────────────┘    └───────────────────────────────────────┘
        [ Kids · Teens · Grown Ups · Brands ]  ← navigator pill, bottom centre
```

On phones the second beat stacks: media first, then services and the button.

Every world uses this exact structure. The opening card is what the star-warp reveals (see Motion). Services are plain text rows separated by hairlines, not chips or cards. Worlds are not numbered (they are not a sequence). Only "How it works" is numbered, because it is one; it opens with the same kind of card.

### Whitespace

Whitespace is the premium signal. At least a third of every viewport is empty ground. When a section feels thin, the fix is larger type or a better photo, never an added element.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Everything by default |
| Hairline | 1px `{colors.hairline}` | Service rows, footer columns, navigator |
| Contact shadow | `0 24px 48px -24px rgb(76 64 57 / 0.30)` | Physical objects only: charms, beads, the 3D star |

Shadows are chocolate, never grey, and only under things that could be picked up. Photos, buttons, text and sections have none. Depth otherwise comes from three sources: a change of ground colour, layers that move at different scroll rates, and the star being cropped by the viewport edge.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0 | Brands media (full-bleed, letterboxed) |
| `{rounded.sm}` | 6px | Grown Ups media (editorial print feel) |
| `{rounded.md}` | 16px | Teens media, The Making grid |
| `{rounded.lg}` | 32px | Large panels |
| `{rounded.xl}` | 56px | Kids media (roundest) |
| `{rounded.pill}` | 9999px | Every button, the navigator, the sound toggle |

Radius is one of the three dials that distinguish worlds, so it is never applied uniformly.

### Photography (brand book p.33)

Four shot types, and The Making grid shows exactly one of each: **The Making** (hands at work), **The Details** (tactile close-up), **The Experience** (people together), **The Result** (the finished piece). Warm light, real interaction, clean surfaces. Boutique workshop meets premium event. No stock photography, no filters, no colour overlays.

## The Star

The star is proprietary artwork. Its shape is taken from the approved logo and never redrawn, stretched, rotated off-axis as a resting state, or given effects (outline, glow, gradient, bevel on 2D uses).

**Permitted roles**

1. **Giant and cropped**: the hero star, cut by the viewport edge. One per page.
2. **Beside a headline**: cap-height size, one per section at most.
3. **Marker**: the active marker in the world navigator. (Steps in "How it works" use numerals, not stars: three stars in a row would be a pattern.)
4. **Charm**: the finished piece. The last piece on the thread in "How it works", and the pendant on the closing string. Once each.
5. **Gathered**: in the intro, loose beads fuse into the star. It is the same artwork, drawn at the size of a headline.
6. **Aperture**: the star-warp between worlds (see Motion).
7. **Sparkle**: the brief highlight in the logo sequence.

**Star budget**

- One large star per page (the hero). One small star per viewport elsewhere. The navigator's marker does not count.
- Stars never appear in groups, patterns or trails on this site. Never as confetti, never as a background texture, never scattered around a photo.
- The test: cover any star with a thumb. If the layout still works, remove it.

**Colour**: always `{colors.star}`. On chocolate it stays gold. The only non-gold star is the aperture, which is a window and has no fill.

## Motion

### Principles

1. **One moment at a time.** Each section has a single choreographed idea. No default fade-and-rise on every block.
2. **Scroll is the timeline.** The visitor's thumb drives the story; nothing important plays on a timer except the logo sequence.
3. **Tempo is identity.** Worlds share a layout and differ in pace (see World Modes).
4. **Transform and opacity only.** Nothing animates layout properties.
5. **Motion answers the person.** Hover, press and drag respond immediately (`{motion.duration-micro}`). Nothing moves by itself for more than a few seconds: the wash pools drift only as the page scrolls, the beads float only while the visitor scrolls or moves the pointer and rest four seconds later, the 3D star turns only toward the pointer, and film always has a pause control. This is also what WCAG 2.2.2 asks for.
6. **Calm is a complete design.** With `prefers-reduced-motion: reduce`, every section still reads as designed: no pinning, no parallax, no warp, no autoplay video. Content is simply present.

### Logo sequence (hero, 2 seconds, plays once)

| Time | Event |
|---|---|
| 0–450ms | "M" appears |
| 350–800ms | "A" appears |
| 800–1180ms | The star sparkles: scale 0.6 → 1.08 → 1, a single highlight, `{motion.sparkle}` |
| 1100–1800ms | "gic!" completes, left to right |
| 1700–2000ms | "CREATIVE STUDIO" descriptor settles |

- Only the whole approved logo is animated, by revealing regions of the master artwork. Letters never move independently outside this sequence and are never redrawn.
- The sparkle is brief and subtle: one beat, no burst, no particles, no rotation beyond 12°.
- Built with CSS keyframes so it runs before JavaScript loads and never blocks the first paint.
- Optional "ting" on the sparkle: **off by default**, behind an explicit, labelled toggle. Turning it on replays the sequence once so the sound lands on the sparkle. The choice is not remembered between visits, because browsers will not start audio without a fresh click and the site never autoplays sound.
- Reduced motion: the logo is simply there.

### Little details, big magic (intro)

The claim, acted out. The section pins for about one and a half viewports of scrolling. "Little details." sits at title size among loose beads scattered across the screen; as the visitor scrolls, the beads spiral together, turn gold and fuse into the star, and "Big magic." arrives at claim size with the Spanish line after it. Scroll drives every frame, in both directions; nothing plays on a timer. Drawn on one canvas, in brand colours read from the tokens. Reduced motion, or no JavaScript: the small line, the star and the big line, in place.

### The closing string (final CTA)

The finished piece. When the section arrives, a string of graduated beads is lowered in across the top and settles with the gold star hanging over the closing phrase, which rises from behind a clip as the string lands; the line and buttons follow. The string is simulated rope: it sways when the page scrolls, gives way to the pointer, and comes to rest by itself within about three seconds, after which nothing runs. Reduced motion, or no JavaScript: star, phrase and buttons, in place.

### Star-warp (between worlds)

As one world ends, a star-shaped aperture opens from the centre of the viewport, over the outgoing world, and grows until it clears the screen. Through it you see the next world's opening card: its ground and its name. It is scrubbed by scroll, lasts 70% of a viewport of scrolling, and starts slowly so the shape reads as a star before it floods. The outgoing world stays visible and usable outside the star. The same aperture closes the worlds, opening from Brands onto "Cómo funciona" and the cream ground.

It is built as a CSS `clip-path` polygon traced from the logo star and sized by one custom property (`--k`), driven by a view timeline; GSAP drives the same property where scroll timelines are missing. Reduced motion, or no support and no JavaScript: the opening card is simply a card, and grounds change with no transition.

### Native first

- Entry reveals and parallax use CSS scroll-driven animations inside `@supports ((animation-timeline: view()) and (animation-range: entry))` and `@media (prefers-reduced-motion: no-preference)`.
- Pinning uses `position: sticky`.
- Navigator jumps and state changes use the View Transitions API when available.
- GSAP with ScrollTrigger drives the choreographed timelines (star-warp, world signatures) and stands in for scroll-driven effects where the browser lacks them. Lenis smooths wheel scrolling on desktop and is driven by GSAP's ticker; touch scrolling stays native.
- Motion handles the cursor-reactive floating objects (the Kids beads). The 3D star is plain Three.js. Neither needs a UI framework: the page ships no React.
- Build caveat: the CSS must not be minified with Lightning CSS, which folds `animation-timeline` into the `animation` shorthand and silently disables every scroll-driven animation (see `astro.config.mjs`).

## World Modes

Same layout. Three dials: **ground**, **radius**, **tempo**.

| | Kids | Teens | Grown Ups | Brands |
|---|---|---|---|---|
| For | Birthdays, workshops | Bag charms, keychains, caps, phone charms | Girls night, bridal and baby showers, private workshops | Corporate events, pop-ups, PR gifting, activations |
| Brand mode | Master / expressive | Social | Celebration | Corporate |
| Ground | Cream | Peach | Blush | Chocolate |
| Ink | Chocolate | Chocolate | Chocolate | Cream |
| Colour in view | Full palette, in objects only | Peach + lavender | Blush + rosa, gold star | Chocolate + sage, gold star |
| Wash | Lavender, peach, blue, rosa, sage | Cream light, rosa, lavender | Cream light, rosa, lavender | Sage |
| Media radius | 56px | 16px | 6px | 0 (full-bleed) |
| Tempo | Slow, soft | Quick, with overshoot | Unhurried, decelerating | Very slow, linear, cinematic |
| Duration / scrub | 1200ms / 1.2 | 360ms / 0.3 | 900ms / 0.8 | 1400ms / 1.5 |
| Easing | `{motion.ease-soft}` | `{motion.ease-snap}` | `{motion.ease-editorial}` | `{motion.ease-cinema}` |
| Signature interaction | Beads and charms float and drift toward the pointer; touch one and it bobs | Charms hang from a chain and swing with scroll velocity; drag to stack them | Photographs unveil behind a slow mask, like turning a page | A full-bleed film pushes in slowly as letterbox bars open |
| Reduced motion | Beads at rest | Charms hang still | Photographs shown | Poster frame, play on request |

Kids is the only world that unlocks the full palette, and it does so through objects (beads, charms) on a cream ground, so the page stays calm. Brands is the quietest: MAgic! supports the host brand instead of competing with it (brand book p.28).

## Components

**`nav`**: compact logo left, one `{components.button-primary}` right ("Reservá"). Transparent over the hero, cream with a hairline once scrolled. 64px tall, 56px on phones.

**`world-navigator`**: sticky while the four worlds are on screen, absent elsewhere. A cream pill at the bottom centre of the viewport at every size, where it never covers a world's media or copy. Four text labels in `{typography.label}`; the active one sits on a chocolate fill with the micro star beside it. Active state is conveyed by the fill, the star and `aria-current`, never by colour alone. Its colours are fixed so it reads on every ground. Each label is a link that jumps to its world with a cross-fade (View Transitions) and moves focus to the world's heading.

**`opening-card`**: a full-height card in the section's ground with one line of display type at the bottom left. Used to open each world and "Cómo funciona". When it follows a world it is revealed by the star-warp.

**`button-primary`**: chocolate fill, cream text, pill, 52px tall, minimum 44px touch target. Press: `scale(0.97)`. Focus: 2px `{colors.focus}` ring with a 3px offset (cream ring on chocolate). On chocolate grounds it inverts (`button-primary-on-dark`).

**`button-quiet`**: 1.5px ink outline, transparent. Used only as the second action beside a primary button.

**`whatsapp-link`**: a `button-primary` with the WhatsApp glyph, labelled with what happens ("Escribinos por WhatsApp"). Opens a prefilled chat. Not green: the brand palette holds.

**`world-chapter`**: the shared layout above. Reads its ground, ink, radius and tempo from the world's tokens via a `data-world` attribute. No per-world markup differences.

**`media-frame`**: fixed aspect ratio box (no layout shift), Arena ground while loading, radius from the world. Images are AVIF with a WebP fallback, with explicit dimensions and responsive sizes.

**`film`**: video in a media frame. Muted, inline, looped, poster first; loads only when near the viewport and only on capable connections. Always has a visible pause/play control. Any film with speech has captions.

**`step`** (How it works): a number, a one-word Spanish title (Elegí, Hacé, Recordá), one sentence. Three across on desktop, stacked on phones.

**`thread`** (How it works): one chocolate line that runs across the page edge to edge (down the left on phones) and carries the steps' pieces, seen from the side: one bead at Elegí, three at Hacé, and the finished charm with its gold star at Recordá. It is the second place, after Kids, where the palette appears as objects: lavender, rosa, peach and blue, plus the star. Pieces have the contact shadow. The thread draws with scroll and each piece lands as the thread reaches it; with reduced motion, or without scroll timelines, everything is simply in place.

**`sound-toggle`**: a pill button with a pressed state ("Sonido: apagado / encendido"). Lives in the hero corner.

**`footer`**: chocolate ground. The monochrome logo from the brand book, then WhatsApp, Instagram, location, hours in four hairline-separated columns.

## Do's and Don'ts

### Do

- Start every section from cream and add one thing.
- Let a world own the whole viewport before the next begins.
- Use chocolate for every button and every line of text on light grounds.
- Keep product photography in its true colours on a neutral ground.
- Give the star room: at least its own width of clear space when small.
- Write one claim per section, in one language.
- Mark anything unconfirmed as `[TODO]` rather than inventing it.

### Don't

- Don't scatter stars, sparkles, dots or confetti. If it feels crowded, remove stars.
- Don't use gold for anything but the star.
- Don't put light text on a pastel, or body text on lavender, rosa, sage or blue.
- Don't show more than three colours at once outside Kids.
- Don't add gradients other than the washes, or glows, glass, drop shadows on UI, or tinted photo overlays.
- Don't centre a wash pool behind a headline or a photo, and don't strengthen one without re-measuring contrast.
- Don't animate loose letters, or the logo anywhere but the hero sequence.
- Don't stretch, rotate, recolour or add effects to the logo.
- Don't use Fraunces as a heading font, or more than twice.
- Don't mix English and Spanish in a sentence, or stack two claims.
- Don't use bubbly, hand-drawn or "school craft" typefaces, rainbow treatments or emoji.
- Don't invent prices, services, testimonials or claims.

## Responsive Behavior

Designed at 390px first. Most visitors arrive on phones over mobile data.

| Name | Width | Changes |
|---|---|---|
| Phone | < 640px | 4 columns, 20px gutter. Worlds stack media over copy. Navigator is a bottom pill. Static star, no WebGL. |
| Large phone / small tablet | 640–1023px | Wider gutters, larger type. Still stacked. |
| Desktop | 1024–1535px | 12 columns, copy left / media right. 3D star and smooth scrolling enabled. |
| Wide | ≥ 1536px | Content locks at 1320px; ground colours still bleed to the edges. |

- Touch targets are at least 44 × 44px with 8px between them.
- Heights use `svh`, so browser chrome never crops a pinned world.
- Pointer-driven effects only run with `(hover: hover) and (pointer: fine)`.
- The 3D star and video load only when the device, connection (`saveData`, effective type) and motion preference allow. The fallback is the designed default, not a downgrade: a static star, still charms, a poster frame.

## Iteration Guide

1. Change one section at a time and name its single moment before touching it.
2. Reference tokens (`{colors.ink}`, `{worlds.teens.ease}`), never raw values.
3. A new world or mode is a new token set, not new markup.
4. Before adding an element, try removing one.
5. Check each change at 390px and 1440px, and with reduced motion on.
6. When brand rules and a reference conflict, the brand rules win.

## Known Gaps

- **Vector logo and star.** Only raster artwork exists (the master lockup is 1182 × 460px). The logo sequence and the 3D star need a vector source, or a careful trace of the approved artwork that must be signed off.
- **Service menu.** Not in the repository. World service lists stay `[TODO]` until it arrives. The brand book supplies only experience names: Charm Bar by MAgic!, MAgic! Workshop, MAgic! Station, MAgic! Corner.
- **Photography and film.** None available yet. Every media frame is an Arena placeholder labelled with its required shot type.
- **Testimonials.** The "Lo que cuentan" section was removed on 2026-10-08 at the studio's request. If it returns, it needs real quotes: none were ever confirmed.
- **Location and hours.** Only "Asunción, Paraguay" is known; street address and hours are unconfirmed.
- **Rive artwork.** No `.riv` files exist, so world signatures are CSS shapes with physics-driven motion and Rive is not installed. Add it when there is artwork to play.
- **The "ting".** No approved sound exists. The site synthesises a short bell tone as a stand-in.
- **Logo gold versus token gold.** The star in the raster logo measures about #E8B463; the palette's Magic Gold is #ECAF42. Standalone stars use the token. A vector logo would settle which is right.
- **Service names.** The lists come from the project brief, not from a service menu.
- **Star as aperture.** The star-warp uses the star's outline as a window rather than a gold object. This reading of the brand book's "scale it, crop it" needs confirmation.
