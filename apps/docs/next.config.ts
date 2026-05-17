import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@mvp-ui/ui", "@mvp-ui/tokens"],
};

export default config;
