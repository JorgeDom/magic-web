// Business facts and switches, in one place. Anything not yet confirmed by the studio is `null`
// and renders as a visible [TODO] so it cannot ship unnoticed.

export const SITE = {
  name: "MAgic! Creative Studio",
  shortName: "MAgic!",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://magic.com.py").replace(/\/$/, ""),
  locale: "es-PY",
  description:
    "Estudio creativo en Asunción para hacer charms, bag charms, llaveros, piezas pintadas y accesorios personalizados. Cumpleaños, talleres, eventos y activaciones de marca.",
  whatsapp: {
    number: "595993600505",
    display: "+595 993 600 505",
  },
  instagram: {
    handle: "magic.creativestudiopy",
    url: "https://instagram.com/magic.creativestudiopy",
  },
  location: {
    city: "Asunción",
    country: "Paraguay",
    countryCode: "PY",
    /** Street address. TODO: confirm with the studio. */
    address: null as string | null,
  },
  /** Opening hours as shown to visitors. TODO: confirm with the studio. */
  hours: null as string | null,
} as const;

export const FLAGS = {
  /** Third-party contact form under the final call to action. Needs NEXT_PUBLIC_FORM_ENDPOINT. */
  contactForm:
    process.env.NEXT_PUBLIC_ENABLE_CONTACT_FORM === "true" &&
    Boolean(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
  /** Optional "ting" on the logo sparkle. The control is shown; the sound itself is off by default. */
  logoSound: true,
} as const;

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** Media too large for the deployment (25 MiB per file) is served from R2 through this base URL. */
export const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/$/, "");

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function todo(what: string): string {
  return `[TODO] ${what}`;
}
