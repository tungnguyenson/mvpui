import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    alert: "src/components/alert.tsx",
    badge: "src/components/badge.tsx",
    button: "src/components/button.tsx",
    "button-utility": "src/components/button-utility.tsx",
    "close-button": "src/components/close-button.tsx",
    "social-button": "src/components/social-button.tsx",
    "social-logos": "src/components/social-logos.tsx",
    card: "src/components/card.tsx",
    input: "src/components/input.tsx",
    label: "src/components/label.tsx",
    section: "src/components/section.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  sourcemap: true,
  jsx: "react-jsx",
});
