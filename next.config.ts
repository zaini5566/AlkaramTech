import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hostinger's Node runtime doesn't reliably support next/image's
    // built-in optimizer (missing sharp binary / no writable image cache),
    // which is what silently breaks every <Image> after deploy despite
    // working fine in `next dev`. Serving the originals as static files
    // sidesteps that entirely.
    unoptimized: true,
  },
};

export default nextConfig;
