import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
};

export default nextConfig;
