import type { NextConfig } from "next";

// Static export only: the site is served as plain assets from Cloudflare.
// No server rendering, no API routes, no runtime image optimisation.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei"],
  },
};

export default nextConfig;
