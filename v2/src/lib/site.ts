// Business facts and switches, in one place. Anything not yet confirmed by the studio is `null`
// and renders as a visible [TODO] so it cannot ship unnoticed.

export const SITE = {
  name: "MAgic! Creative Studio",
  locale: "es-PY",
  title: "MAgic! Creative Studio | Charms y talleres creativos en Asunción",
  description:
    "Estudio creativo en Asunción para hacer charms, bag charms, llaveros, piezas pintadas y accesorios personalizados. Cumpleaños, talleres, eventos y activaciones de marca.",
  whatsapp: { number: "595993600505", display: "+595 993 600 505" },
  instagram: {
    handle: "magic.creativestudiopy",
    url: "https://instagram.com/magic.creativestudiopy",
  },
  location: { city: "Asunción", country: "Paraguay", countryCode: "PY" },
  /**
   * Who stands behind the site, for the legal page (Law 4868/2013, art. 7, asks covered
   * providers to identify themselves). TODO: the registered name and RUC, from the studio.
   */
  legal: {
    entity: null as string | null,
    ruc: null as string | null,
  },
} as const;

const env = import.meta.env;

/** Optional third-party contact form under the final call to action. Off unless configured. */
export const FORM_ENDPOINT: string =
  env.PUBLIC_ENABLE_CONTACT_FORM === "true" ? (env.PUBLIC_FORM_ENDPOINT ?? "") : "";

/** Video too large for the deployment (25 MiB per file) is served from R2 through this URL. */
export const MEDIA_BASE_URL: string = (env.PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/$/, "");

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function todo(what: string): string {
  return `[TODO] ${what}`;
}

/** schema.org LocalBusiness. The site publishes the city only, never a street address. */
export function localBusinessJsonLd(origin: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: origin,
    image: `${origin}/og-image.png`,
    telephone: `+${SITE.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressCountry: SITE.location.countryCode,
    },
    areaServed: { "@type": "City", name: SITE.location.city },
    sameAs: [SITE.instagram.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: `+${SITE.whatsapp.number}`,
      availableLanguage: ["es"],
    },
  };
}
