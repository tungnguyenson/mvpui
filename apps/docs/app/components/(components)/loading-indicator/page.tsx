"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { LoadingIndicator } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Three spinner sizes: sm, md, and lg.",
    preview: (
      <div className="flex items-center gap-6">
        <LoadingIndicator size="sm" />
        <LoadingIndicator size="md" />
        <LoadingIndicator size="lg" />
      </div>
    ),
    code: `<LoadingIndicator size="sm" />
<LoadingIndicator size="md" />
<LoadingIndicator size="lg" />`,
  },
  {
    id: "dots",
    title: "Dots variant",
    description: "Animated dot-pulse indicator in three sizes.",
    preview: (
      <div className="flex items-center gap-6">
        <LoadingIndicator variant="dots" size="sm" />
        <LoadingIndicator variant="dots" size="md" />
        <LoadingIndicator variant="dots" size="lg" />
      </div>
    ),
    code: `<LoadingIndicator variant="dots" size="sm" />
<LoadingIndicator variant="dots" size="md" />
<LoadingIndicator variant="dots" size="lg" />`,
  },
  {
    id: "colors",
    title: "Colors",
    description: "Primary (brand) and secondary (muted) color options.",
    preview: (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <span className="w-24 text-sm text-fg-tertiary">Primary</span>
          <LoadingIndicator size="md" color="primary" />
          <LoadingIndicator variant="dots" size="md" color="primary" />
        </div>
        <div className="flex items-center gap-6">
          <span className="w-24 text-sm text-fg-tertiary">Secondary</span>
          <LoadingIndicator size="md" color="secondary" />
          <LoadingIndicator variant="dots" size="md" color="secondary" />
        </div>
      </div>
    ),
    code: `<LoadingIndicator size="md" color="primary" />
<LoadingIndicator variant="dots" size="md" color="primary" />
<LoadingIndicator size="md" color="secondary" />
<LoadingIndicator variant="dots" size="md" color="secondary" />`,
  },
];

export default function LoadingIndicatorPage() {
  return (
    <ComponentDocLayout
      name="Loading Indicator"
      tagline="SVG spinner and dot-pulse loading states with size and color variants."
      install={{ usage: `import { LoadingIndicator } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
