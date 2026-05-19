import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "bar-chart": "src/components/bar-chart.tsx",
    "line-chart": "src/components/line-chart.tsx",
    "pie-chart": "src/components/pie-chart.tsx",
    "progress-circle": "src/components/progress-circle.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  banner: { js: '"use client";' },
  external: ["react", "react-dom", "tailwindcss"],
  sourcemap: true,
});
