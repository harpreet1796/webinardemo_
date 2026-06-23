import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move it here to the root layout!
  serverExternalPackages: ["@prisma/client", "prisma"],
  turbopack: {},

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), "@prisma/client", "prisma"];
    }
    return config;
  },
};

export default nextConfig;
