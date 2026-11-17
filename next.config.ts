import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  // Export all pages, including Features, for static hosting.
  experimental: {
    agentFeedback: true,
  },
};

export default nextConfig;
