import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { StarDefs } from "@/components/star/Star";
import { COPY } from "@/content/copy";
import { localBusinessJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

// Headlines and claims.
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Body, labels, buttons.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// One closing phrase, far below the fold: never preloaded.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

const TITLE = "MAgic! Creative Studio | Charms y talleres creativos en Asunción";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PY",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: SITE.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F1",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={SITE.locale}
      className={`${dmSans.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <body>
        <a
          href="#contenido"
          className="sr-only z-[100] rounded-pill bg-chocolate px-5 py-3 text-label text-cream focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3"
        >
          {COPY.skipLink}
        </a>
        <StarDefs />
        {children}
        <ScrollProvider />
        <script
          type="application/ld+json"
          // Static, build-time data from src/lib/site.ts; "<" is escaped so it cannot close the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
