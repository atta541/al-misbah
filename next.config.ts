import type { NextConfig } from "next";
import { getCloudinaryCloudName } from "@/lib/cloudinary-config";

const cloudinaryCloudName = getCloudinaryCloudName();

const nextConfig: NextConfig = {
  // Homepage video uploads go through Server Actions (max 50MB in app validation).
  experimental: {
    serverActions: {
      bodySizeLimit: "55mb",
    },
    // Middleware/proxy buffers request bodies for /admin routes (default 10MB).
    proxyClientMaxBodySize: "55mb",
  },
  images: {
    remotePatterns: cloudinaryCloudName
      ? [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: `/${cloudinaryCloudName}/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
