# Parity tracker: concesio-web → magic-web

> **Purpose.** `concesio-web` and `magic-web` are sibling marketing sites for
> the same owner. Every rule, fix, or policy applied to `concesio-web`
> should eventually be mirrored here — this file is the record of what's
> been done on `concesio-web` and what's still outstanding on `magic-web`.
> **Nothing in this file has been implemented on `magic-web` yet.** It is a
> plan/checklist only. Written 2026-09-23, updated 2026-09-23 once the
> actual work (not just the plan) was finished on `dealership` and
> `concesio-web` — see each item below for what actually happened, not
> just what was originally proposed.

---

## Already done on concesio-web (for reference)

- **AI-discoverability**: `robots.txt` explicitly allows citation/search
  crawlers (PerplexityBot, OAI-SearchBot, ClaudeBot) and blocks
  AI-training crawlers (GPTBot, Google-Extended, CCBot,
  Applebot-Extended); added `llms.txt`; added `Organization`,
  `Offer`/`priceSpecification`, and `FAQPage` JSON-LD structured data to
  `index.html`.
- **Pricing display**: monthly fee shown as a plain, permanent USD 99 —
  explicitly *not* a fake strikethrough "was $120, now $99" discount
  pattern, which was considered and rejected as deceptive/false-reference
  pricing.
- **Open Graph / social card**: custom `og-image.png` for link previews.
- **Session/handoff hygiene**: `docs/HANDOFF.md` append-only session log.

## Legal/security review — 2026-09-23 (completed, not just evaluated)

Evaluated for both `dealership` and `concesio-web`, then actually
implemented on both (see `dealership/HANDOFF.md` Session 42 and
`concesio-web/docs/HANDOFF.md`'s 2026-09-23 entries for full detail).
Verdicts and actual outcomes below are what `magic-web` should eventually
match, **once `magic-web` reaches the same level of real user
interaction** (right now it's a "coming soon" static page — see caveats
per item).

1. **Legal pages (privacy, terms, cookies)** — `dealership` got a real
   privacy policy page (ES/EN/PT-BR, `templates/legal/privacy_policy.html`,
   linked from the footer) since it actually collects contact-form data.
   `concesio-web` still correctly has none — static page, no form, no data
   collection. Terms of service was evaluated and explicitly skipped for
   `dealership` too (no user self-signup to govern). Same verdict applies
   to `magic-web` as-is — currently even simpler (a coming-soon page, no
   form). Revisit if/when `magic-web` adds a form or real product
   functionality; if it ever collects anything, model the new page on
   `dealership`'s (honest about retention — don't promise a deletion
   schedule that doesn't exist — rather than on generic boilerplate).
2. **Cookie consent** — confirmed not applicable to either `dealership` or
   `concesio-web`; no non-essential cookies set by either. No banner built
   anywhere. Same applies to `magic-web` — no cookies set currently.
3. **Refund policy** — resolved via a new contract clause (Cláusula 5.6 in
   `dealership/docs/business/Contrato_Licencia_Concesio_Borrador.md`): a
   48-hour, no-questions-asked refund window on the signing payment,
   non-refundable after regardless of work progress. Lives in the
   contract/pricing docs, not on either public site. Still not directly
   applicable to `magic-web` unless it starts selling something directly.
4. **Analytics data minimization** — still not applicable to either site;
   neither has analytics installed. The standing rule (collect only what's
   needed, no cross-site tracking, no ad pixels/fingerprinting) is written
   as a comment in `dealership/templates/legal/privacy_policy.html`, right
   where someone adding analytics later would be editing. Apply the same
   rule text to `magic-web` whenever analytics is added there.
5. **Accessibility (alt text, full keyboard usability)** — audited both
   repos. `concesio-web` came back clean (images already had descriptive
   alt text, nav/toggles already real semantic elements). `dealership`
   had two real gaps, now fixed: form labels not programmatically
   associated with their inputs (floating `<span>` with no `for`
   attribute — converted to real `<label for="...">`), and no designed
   keyboard-focus state anywhere (added an explicit `:focus-visible` ring,
   previously relied on unstyled browser defaults). The same
   `:focus-visible` ring was also added to `concesio-web` itself this
   session (it only had one on two buttons before, only under a mobile
   breakpoint) — see `concesio-web/index.html`'s global `a:focus-visible,
   button:focus-visible` rule for the pattern to copy into `magic-web`.
   `magic-web` still not audited — same two checks apply: real `<label
   for>` on any future form, and a visible focus ring on all interactive
   elements.
6. **Ambiguous/unfulfillable copy** — audited both. `concesio-web`'s copy
   was already clean (delivery-time claims stay soft — "listo en días,"
   no specific hour count — support scope consistently caveated to
   error-correction only, matching the contract). `dealership`'s
   Classic/Garage skins have hardcoded sample stats (200+ vehicles,
   15+ years, 98% satisfaction, a blanket warranty banner) — **not**
   rewritten, since the user clarified this is legitimate illustrative
   demo/marketing seed content each dealer is expected to set for real,
   not a false claim about a specific business. Resolved instead with a
   permanent, three-language footer disclaimer stating the figures/
   images are illustrative. If `magic-web` ever ships with placeholder
   stats/claims of its own, the same disclaimer-not-rewrite approach
   applies — don't invent "safe" numbers, just label them as illustrative.
7. **Copyright notice** — added to `concesio-web`'s footer this session (3
   languages, year filled via JS, under "Ing. Jorge Daniel Dominguez
   Bautista" — the owner's confirmed legal name for copyright purposes).
   `dealership` got a `LICENSE` file instead of a footer line (it's a
   white-label product where each client's own footer correctly
   attributes copyright to *them*, not the codebase owner — putting a
   personal name on a client's public site would be wrong). `magic-web`
   is a marketing site like `concesio-web`, not white-labeled to a third
   party, so **the `concesio-web` footer pattern is the one to copy**:
   same three-language copyright line, same name, same JS year-fill
   approach (`new Date().getFullYear()` + `querySelectorAll`).

---

## To do on magic-web (explicitly not started)

- [ ] Add a footer copyright line — copy `concesio-web`'s exact pattern
      (3-language markup + JS year-fill), same legal name.
- [ ] Accessibility pass: alt text on all images, keyboard reachability
      of nav/interactive elements, and a visible `:focus-visible` ring —
      copy `concesio-web`'s CSS rule for the ring specifically.
- [ ] Copy review: check "coming soon" page text for any claim that
      can't currently be backed up. If any placeholder/illustrative
      content is ever added, label it as such rather than trying to make
      the numbers individually defensible.
- [ ] Decide analytics approach in tandem with `concesio-web` (same tool,
      same data-minimization rule — see the rule text in `dealership`'s
      privacy policy template) if/when analytics is added to either.
- [ ] Re-run this whole checklist once `magic-web` grows past a static
      coming-soon page (e.g. gains a contact form, waitlist signup, or
      real product) — several "not applicable" verdicts above depend on
      that not being true yet. If a form is ever added, build a privacy
      policy page modeled on `dealership`'s.

---

**Note:** this file should be updated any time a parity-relevant decision
is made on `concesio-web` or `dealership`, so `magic-web` doesn't silently
drift out of sync the way other docs have in the past (see
`dealership/HANDOFF.md` Session 40 for a real example of that drift
pattern, and Session 42 for a bug worth remembering project-wide: Django's
`{# #}` template comment tag silently fails on multi-line content — it
renders as literal visible text instead of raising an error. Always use
`{% comment %}...{% endcomment %}` for anything longer than one line).
