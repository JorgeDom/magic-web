# magic-web
Repo for the website MAgic! creative studio.

## Coming soon page

Static site: `index.html` + `assets/`. The email signup form posts to
`functions/api/subscribe.js`, a Cloudflare Pages Function that sends a
notification email via [Resend](https://resend.com) to
`Makethingsmagic@gmail.com`.

### Required environment variables (Cloudflare Pages → Settings → Environment variables)

- `RESEND_API_KEY` — Resend API key (set as a secret, not plaintext)
- `RESEND_FROM` — verified sender address/domain in Resend (e.g. `MAgic! <noreply@magic.com.py>`)

Without these set, `/api/subscribe` returns a 500 and the form shows an error state.
