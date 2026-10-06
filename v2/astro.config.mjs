import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// Static output only: plain files in ./out, served by Cloudflare. No server code.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://magic.com.py",
  outDir: "./out",
  // Astro 7 strips whitespace between inline elements by default ("jsx"); keep HTML rules.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // The default minifier (Lightning CSS) folds `animation-timeline` into the `animation`
    // shorthand, which browsers reject: every scroll-driven animation silently stops working
    // in the built site. esbuild leaves the declarations as written.
    build: { cssMinify: "esbuild" },
  },
  // Fonts are downloaded at build time and self-hosted. DESIGN.md: DM Sans for headlines,
  // Inter for everything functional, Fraunces italic for one closing phrase.
  fonts: [
    {
      // Variable, with the optical-size axis: display sizes get DM Sans's tighter display cut.
      provider: fontProviders.google(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      weights: ["100 1000"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
      options: { experimental: { variableAxis: { opsz: [["9", "40"]] } } },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: [400],
      styles: ["italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],
});
