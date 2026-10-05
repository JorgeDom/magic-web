import { SITE } from "./site";

/** schema.org LocalBusiness. Unconfirmed facts (street address, hours) are simply left out. */
export function localBusinessJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/og-image.png`,
    logo: `${SITE.url}/brand/logo.webp`,
    telephone: `+${SITE.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      ...(SITE.location.address ? { streetAddress: SITE.location.address } : {}),
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
