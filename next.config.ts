import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // ⚠️ This allows production builds to successfully complete
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
