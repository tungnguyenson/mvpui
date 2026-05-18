/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { QRCode, GradientScan } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const DEMO_URL = "https://mvp-ui.dev";

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "md (96px) and lg (128px) variants — both with corner frame handles.",
    preview: (
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <QRCode value={DEMO_URL} size="md" />
          <span className="text-fg-tertiary text-xs">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <QRCode value={DEMO_URL} size="lg" />
          <span className="text-fg-tertiary text-xs">lg</span>
        </div>
      </div>
    ),
    code: `<QRCode value="https://example.com" size="md" />
<QRCode value="https://example.com" size="lg" />`,
  },
  {
    id: "gradient-scan",
    title: "With gradient scan",
    description: "GradientScan overlay — typically used inside a relative container over the QR code.",
    preview: (
      <div className="flex justify-center gap-8">
        <div className="relative inline-flex">
          <QRCode value={DEMO_URL} size="lg" />
          <GradientScan />
        </div>
      </div>
    ),
    code: `<div className="relative inline-flex">
  <QRCode value="https://example.com" size="lg" />
  <GradientScan />
</div>`,
  },
  {
    id: "custom-options",
    title: "Custom styling options",
    description: "Pass qr-code-styling options to control colors and dot shape.",
    preview: (
      <div className="flex justify-center gap-8">
        <QRCode
          value={DEMO_URL}
          size="lg"
          options={{
            dotsOptions: { type: "rounded", color: "#7f56d9" },
            backgroundOptions: { color: "#ffffff" },
          }}
        />
      </div>
    ),
    code: `<QRCode
  value="https://example.com"
  size="lg"
  options={{
    dotsOptions: { type: "rounded", color: "#7f56d9" },
    backgroundOptions: { color: "#ffffff" },
  }}
/>`,
  },
];

export default function QRCodePage() {
  return (
    <ComponentDocLayout
      name="QR Code"
      tagline="Styled QR code with branded corner handles and optional scan overlay. Backed by qr-code-styling."
      install={{
        usage: `import { QRCode, GradientScan } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size md", value: "96 × 96 px" },
        { label: "Size lg", value: "128 × 128 px" },
        { label: "Frame color", value: "border-border-brand" },
        { label: "Scan fill", value: "bg-primary/10" },
      ]}
    />
  );
}
