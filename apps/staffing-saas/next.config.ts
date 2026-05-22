import type { NextConfig } from "next";

const isMobileBuild = process.env.BUILD_TARGET === "mobile";

const config: NextConfig = {
  transpilePackages: ["@mvp-ui/tokens", "@mvp-ui/ui"],
  allowedDevOrigins: ["192.168.5.*", "192.168.5.*:3000"],
  ...(isMobileBuild
    ? {
        output: "export",
        distDir: "out",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default config;
