import type { NextConfig } from "next";
import { getCloudinaryCloudName } from "@/lib/cloudinary";

const cloudinaryCloudName = getCloudinaryCloudName();

const nextConfig: NextConfig = {
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
