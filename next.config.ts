import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Large media uploads (esp. home video) use direct Cloudinary upload from the browser.
  // Keep a higher ceiling for any remaining server-action file paths.
  experimental: {
    serverActions: {
      bodySizeLimit: "105mb",
    },
    proxyClientMaxBodySize: "105mb",
  },
  images: {
    // Allow any Cloudinary cloud (uploaded assets may use a previous account name).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
