/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { SectionDivider } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Full-width separator constrained to max-w-7xl with horizontal padding.",
    preview: (
      <div className="w-full">
        <p className="mb-4 text-fg-secondary text-sm">Section above</p>
        <SectionDivider />
        <p className="mt-4 text-fg-secondary text-sm">Section below</p>
      </div>
    ),
    code: `<SectionDivider />`,
  },
  {
    id: "custom-class",
    title: "Custom class",
    description: "Pass className to override or extend styles.",
    preview: (
      <div className="w-full">
        <SectionDivider className="px-0" />
      </div>
    ),
    code: `<SectionDivider className="px-0" />`,
  },
];

export default function SectionDividerPage() {
  return (
    <ComponentDocLayout
      name="Section Divider"
      tagline="Full-width horizontal rule constrained to max-w-7xl. Use between page sections."
      install={{
        usage: `import { SectionDivider } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Max width", value: "max-w-7xl (80rem)" },
        { label: "Padding", value: "px-4 md:px-8" },
        { label: "Height", value: "1px" },
        { label: "Color", value: "bg-border-secondary" },
      ]}
    />
  );
}
