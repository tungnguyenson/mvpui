import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@mvp-ui/ui", "@mvp-ui/tokens", "@mvp-ui/charts"],
};

export default config;
