import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@mvp-ui/tokens", "@mvp-ui/ui"],
  allowedDevOrigins: ["192.168.5.*", "192.168.5.*:3102"],
};

export default config;
