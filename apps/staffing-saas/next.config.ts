import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@mvp-ui/ui", "@mvp-ui/tokens"],
  allowedDevOrigins: ['192.168.5.*', '192.168.5.*:3000'],
};

export default config;
