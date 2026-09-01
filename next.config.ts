import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // This project lives nested inside the protolabsglobal-main-shell repo,
  // which has its own package-lock.json — Turbopack otherwise infers that
  // as the workspace root instead of this directory. Pinning it here
  // avoids the ambiguity (and the build warning it produces).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
