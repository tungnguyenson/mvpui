import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    alert: "src/components/alert.tsx",
    badge: "src/components/badge.tsx",
    button: "src/components/buttons/button.tsx",
    "button-utility": "src/components/buttons/button-utility.tsx",
    "close-button": "src/components/buttons/close-button.tsx",
    "social-button": "src/components/buttons/social-button.tsx",
    "social-logos": "src/components/buttons/social-logos.tsx",
    "app-store-buttons": "src/components/buttons/app-store-buttons.tsx",
    "app-store-buttons-outline":
      "src/components/buttons/app-store-buttons-outline.tsx",
    "mac-app-store-buttons": "src/components/buttons/mac-app-store-buttons.tsx",
    card: "src/components/card.tsx",
    input: "src/components/inputs/input.tsx",
    label: "src/components/inputs/label.tsx",
    "hint-text": "src/components/inputs/hint-text.tsx",
    "input-group": "src/components/inputs/input-group.tsx",
    "input-file": "src/components/inputs/input-file.tsx",
    "input-payment": "src/components/inputs/input-payment.tsx",
    "input-date": "src/components/inputs/input-date.tsx",
    "input-number": "src/components/inputs/input-number.tsx",
    "input-tags": "src/components/inputs/input-tags.tsx",
    "pin-input": "src/components/inputs/pin-input.tsx",
    "payment-icons": "src/components/inputs/payment-icons.tsx",
    tooltip: "src/components/tooltip.tsx",
    tags: "src/components/tags.tsx",
    section: "src/components/section.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  // Every component is a Client Component. Keep entries self-contained so the
  // `"use client"` directive can't be lost into a shared, directiveless chunk,
  // and stamp the directive onto every output file (barrel included).
  splitting: false,
  banner: { js: '"use client";' },
  external: ["react", "react-dom", "tailwindcss"],
  sourcemap: true,
  jsx: "react-jsx",
});
