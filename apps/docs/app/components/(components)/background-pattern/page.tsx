/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { BackgroundPattern } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const PATTERNS = ["circle", "square", "grid", "grid-check"] as const;

const SECTIONS: DocExample[] = [
  {
    id: "all-patterns",
    title: "All patterns",
    description: "Four patterns centered at md size — same as in empty states and hero sections.",
    preview: (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {PATTERNS.map((p) => (
          <div key={p} className="flex flex-col items-center gap-2">
            <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-border">
              <BackgroundPattern pattern={p} size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
              <div className="relative z-10 size-10 rounded-xl border border-border bg-bg shadow-sm" />
            </div>
            <span className="text-fg-tertiary text-xs">{p}</span>
          </div>
        ))}
      </div>
    ),
    code: `{/* Centered behind content — the real usage */}
<div className="relative overflow-hidden">
  <BackgroundPattern pattern="circle" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
  <div className="relative z-10">...</div>
</div>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm, md, and lg — larger sizes spread further from center.",
    preview: (
      <div className="flex justify-center gap-12">
        {(["sm", "md", "lg"] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-xl border border-border">
              <BackgroundPattern pattern="circle" size={s} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
              <div className="relative z-10 size-8 rounded-lg border border-border bg-bg shadow-sm" />
            </div>
            <span className="text-fg-tertiary text-xs">{s}</span>
          </div>
        ))}
      </div>
    ),
    code: `<BackgroundPattern pattern="circle" size="sm" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
<BackgroundPattern pattern="circle" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
<BackgroundPattern pattern="circle" size="lg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />`,
  },
  {
    id: "usage",
    title: "Behind empty state",
    description: "Typical usage: centered behind a featured icon or illustration in an empty state.",
    preview: (
      <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-border">
        <BackgroundPattern pattern="grid" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-bg shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fg-secondary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div>
            <p className="text-fg text-sm font-semibold">No files uploaded</p>
            <p className="text-fg-tertiary text-xs">Upload a file to get started</p>
          </div>
        </div>
      </div>
    ),
    code: `<div className="relative overflow-hidden rounded-2xl">
  <BackgroundPattern pattern="grid" size="md" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-fg-quaternary" />
  <div className="relative z-10">
    <FeaturedIcon ... />
    <p>No files uploaded</p>
  </div>
</div>`,
  },
];

export default function BackgroundPatternPage() {
  return (
    <ComponentDocLayout
      name="Background Pattern"
      tagline="SVG tiling patterns for section backgrounds. Four variants: circle, square, grid, grid-check."
      install={{
        usage: `import { BackgroundPattern } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Patterns", value: "circle · square · grid · grid-check" },
        { label: "Sizes", value: "sm · md · lg" },
        { label: "Color", value: "currentColor (use text-* to control)" },
        { label: "Recommended", value: "text-border-secondary" },
      ]}
    />
  );
}
