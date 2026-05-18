/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Illustration } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const TYPES = ["box", "cloud", "documents", "credit-card"] as const;

const SECTIONS: DocExample[] = [
  {
    id: "all",
    title: "All types",
    description: "Four illustration types at md size.",
    preview: (
      <div className="flex flex-wrap items-end justify-center gap-8">
        {TYPES.map((t) => (
          <div key={t} className="flex flex-col items-center gap-2">
            <Illustration type={t} size="md" />
            <span className="text-fg-tertiary text-xs">{t}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Illustration type="box"         size="md" />
<Illustration type="cloud"       size="md" />
<Illustration type="documents"   size="md" />
<Illustration type="credit-card" size="md" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm, md, and lg for the box illustration.",
    preview: (
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Illustration type="box" size="sm" />
          <span className="text-fg-tertiary text-xs">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Illustration type="box" size="md" />
          <span className="text-fg-tertiary text-xs">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Illustration type="box" size="lg" />
          <span className="text-fg-tertiary text-xs">lg</span>
        </div>
      </div>
    ),
    code: `<Illustration type="box" size="sm" />
<Illustration type="box" size="md" />
<Illustration type="box" size="lg" />`,
  },
  {
    id: "empty-state",
    title: "In empty states",
    description: "Typical use with a heading and subtext.",
    preview: (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <Illustration type="documents" size="md" />
        <div>
          <p className="text-fg font-semibold">No documents yet</p>
          <p className="text-fg-tertiary text-sm">Upload your first document to get started.</p>
        </div>
      </div>
    ),
    code: `<div className="flex flex-col items-center gap-4 text-center">
  <Illustration type="documents" size="md" />
  <div>
    <p className="text-fg font-semibold">No documents yet</p>
    <p className="text-fg-tertiary text-sm">Upload your first document to get started.</p>
  </div>
</div>`,
  },
];

export default function IllustrationPage() {
  return (
    <ComponentDocLayout
      name="Illustration"
      tagline="Decorative spot illustrations for empty states and onboarding. Four types: box, cloud, documents, credit-card."
      install={{
        usage: `import { Illustration } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Types", value: "box · cloud · documents · credit-card" },
        { label: "Sizes", value: "sm · md · lg" },
        { label: "Custom SVG class", value: "svgClassName prop" },
        { label: "Custom children class", value: "childrenClassName prop" },
      ]}
    />
  );
}
