# Coming-soon page (legacy)

The page that was live at magic.com.py before the full site. Kept here until launch.

Static site: `index.html` + `assets/`. The email signup form posts to
`functions/api/subscribe.js`, a Cloudflare Pages Function that sends a
notification email via [Resend](https://resend.com) to
`Makethingsmagic@gmail.com`.

## Required environment variables (Cloudflare Pages → Settings → Environment variables)

- `RESEND_API_KEY` — Resend API key (set as a secret, not plaintext)
- `RESEND_FROM` — verified sender address/domain in Resend (e.g. `MAgic! <noreply@magic.com.py>`)

Without these set, `/api/subscribe` returns a 500 and the form shows an error state.

The new site is a static export with no server code, so this signup function is not carried
over. `landing*.html` are earlier design drafts.
