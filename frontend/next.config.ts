import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    runtime: "edge",
  },
};

export default nextConfig;
