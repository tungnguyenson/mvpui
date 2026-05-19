"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ProgressCircle } from "@mvp-ui/charts";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Four size variants: `xs`, `sm` (default), `md`, `lg`.",
    preview: (
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-24"><ProgressCircle value={40} size="xs" title="40%" subtitle="Users" /></div>
        <div className="w-32"><ProgressCircle value={60} size="sm" title="60%" subtitle="Users" /></div>
        <div className="w-40"><ProgressCircle value={75} size="md" title="75%" subtitle="Users" /></div>
        <div className="w-48"><ProgressCircle value={88} size="lg" title="88%" subtitle="Users" /></div>
      </div>
    ),
    code: `<ProgressCircle value={40} size="xs" title="40%" subtitle="Users" />
<ProgressCircle value={60} size="sm" title="60%" subtitle="Users" />
<ProgressCircle value={75} size="md" title="75%" subtitle="Users" />
<ProgressCircle value={88} size="lg" title="88%" subtitle="Users" />`,
  },
  {
    id: "title-only",
    title: "Title only",
    description: "Omit `subtitle` to render just the main label inside the ring.",
    preview: (
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-24"><ProgressCircle value={40} size="xs" title="40%" /></div>
        <div className="w-32"><ProgressCircle value={65} size="sm" title="65%" /></div>
        <div className="w-40"><ProgressCircle value={82} size="md" title="82%" /></div>
      </div>
    ),
    code: `<ProgressCircle value={40} size="xs" title="40%" />
<ProgressCircle value={65} size="sm" title="65%" />
<ProgressCircle value={82} size="md" title="82%" />`,
  },
  {
    id: "custom-colors",
    title: "Custom colors",
    description: "Override arc `color` and `trackColor` with any CSS color string.",
    preview: (
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-32">
          <ProgressCircle value={72} size="sm" title="72%" subtitle="Success" color="var(--color-success-fg)" trackColor="var(--color-success-bg)" />
        </div>
        <div className="w-32">
          <ProgressCircle value={45} size="sm" title="45%" subtitle="Warning" color="var(--color-warning-fg)" trackColor="var(--color-warning-bg)" />
        </div>
        <div className="w-32">
          <ProgressCircle value={20} size="sm" title="20%" subtitle="Error" color="var(--color-error-fg)" trackColor="var(--color-error-bg)" />
        </div>
      </div>
    ),
    code: `<ProgressCircle
  value={72}
  size="sm"
  title="72%"
  subtitle="Success"
  color="var(--color-success-fg)"
  trackColor="var(--color-success-bg)"
/>`,
  },
  {
    id: "no-label",
    title: "No label",
    description: "Omit `title` and `subtitle` for a standalone progress ring.",
    preview: (
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-24"><ProgressCircle value={30} size="xs" /></div>
        <div className="w-32"><ProgressCircle value={68} size="sm" /></div>
        <div className="w-40"><ProgressCircle value={90} size="md" /></div>
      </div>
    ),
    code: `<ProgressCircle value={68} size="sm" />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Progress Circle"
      tagline="Radial progress ring powered by Recharts. Four sizes, optional inner labels, fully token-themed."
      install={{
        add: "pnpm add @mvp-ui/charts @mvp-ui/tokens",
        usage: `import { ProgressCircle } from "@mvp-ui/charts";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Default arc", value: "var(--color-brand-600)" },
        { label: "Default track", value: "var(--color-bg-secondary)" },
        { label: "Title", value: "var(--color-fg)" },
        { label: "Subtitle", value: "var(--color-fg-tertiary)" },
      ]}
    />
  );
}
