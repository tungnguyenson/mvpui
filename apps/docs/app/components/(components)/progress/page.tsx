"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  ProgressBar,
  ProgressBarCircle,
  ProgressBarHalfCircle,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Progress bar with no label.",
    preview: (
      <div className="w-96">
        <ProgressBar min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBar min={0} max={100} value={40} />`,
  },
  {
    id: "label-right",
    title: "Label right",
    description: "Percentage label displayed to the right.",
    preview: (
      <div className="w-96">
        <ProgressBar labelPosition="right" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBar labelPosition="right" min={0} max={100} value={40} />`,
  },
  {
    id: "label-bottom",
    title: "Label bottom",
    description: "Percentage label below the bar, right-aligned.",
    preview: (
      <div className="w-96">
        <ProgressBar labelPosition="bottom" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBar labelPosition="bottom" min={0} max={100} value={40} />`,
  },
  {
    id: "top-floating",
    title: "Floating top",
    description: "Tooltip above the bar that tracks the progress position.",
    preview: (
      <div className="w-96 pt-8 pb-4">
        <ProgressBar labelPosition="top-floating" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBar labelPosition="top-floating" min={0} max={100} value={40} />`,
  },
  {
    id: "bottom-floating",
    title: "Floating bottom",
    description: "Tooltip below the bar that tracks the progress position.",
    preview: (
      <div className="w-96 pt-4 pb-8">
        <ProgressBar labelPosition="bottom-floating" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBar labelPosition="bottom-floating" min={0} max={100} value={40} />`,
  },
  {
    id: "circle",
    title: "Circle",
    description: "Full-circle SVG indicator. Three sizes: xxs, xs, sm.",
    preview: (
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarCircle size="xxs" min={0} max={100} value={40} />
        <ProgressBarCircle size="xs"  min={0} max={100} value={40} />
        <ProgressBarCircle size="sm"  min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBarCircle size="xxs" min={0} max={100} value={40} />
<ProgressBarCircle size="xs"  min={0} max={100} value={40} />
<ProgressBarCircle size="sm"  min={0} max={100} value={40} />`,
  },
  {
    id: "circle-label",
    title: "Circle with label",
    description: "Circle indicator with an inner label.",
    preview: (
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarCircle size="xxs" label="Users"        min={0} max={100} value={40} />
        <ProgressBarCircle size="xs"  label="Active users" min={0} max={100} value={40} />
        <ProgressBarCircle size="sm"  label="Active users" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBarCircle size="xxs" label="Users"        min={0} max={100} value={40} />
<ProgressBarCircle size="xs"  label="Active users" min={0} max={100} value={40} />
<ProgressBarCircle size="sm"  label="Active users" min={0} max={100} value={40} />`,
  },
  {
    id: "half-circle",
    title: "Half circle",
    description: "Gauge-style half-circle. Three sizes: xxs, xs, sm.",
    preview: (
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarHalfCircle size="xxs" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="xs"  min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="sm"  min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBarHalfCircle size="xxs" min={0} max={100} value={40} />
<ProgressBarHalfCircle size="xs"  min={0} max={100} value={40} />
<ProgressBarHalfCircle size="sm"  min={0} max={100} value={40} />`,
  },
  {
    id: "half-circle-label",
    title: "Half circle with label",
    description: "Half-circle indicator with an inner label.",
    preview: (
      <div className="flex flex-col items-start gap-10 md:flex-row">
        <ProgressBarHalfCircle size="xxs" label="Users"        min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="xs"  label="Active users" min={0} max={100} value={40} />
        <ProgressBarHalfCircle size="sm"  label="Active users" min={0} max={100} value={40} />
      </div>
    ),
    code: `<ProgressBarHalfCircle size="xxs" label="Users"        min={0} max={100} value={40} />
<ProgressBarHalfCircle size="xs"  label="Active users" min={0} max={100} value={40} />
<ProgressBarHalfCircle size="sm"  label="Active users" min={0} max={100} value={40} />`,
  },
];

export default function ProgressPage() {
  return (
    <ComponentDocLayout
      name="Progress"
      tagline="Linear progress bars and circular progress indicators. Supports custom value formatters and four label positions."
      install={{
        usage: `import { ProgressBar, ProgressBarCircle, ProgressBarHalfCircle } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Track bg", value: "bg-bg-tertiary" },
        { label: "Fill color", value: "bg-fg-brand / stroke-fg-brand" },
        { label: "Bar height", value: "h-2 (8px)" },
        { label: "Bar radius", value: "rounded-md" },
        { label: "Transition", value: "duration-75 ease-linear (bar) / duration-300 ease-out (circle)" },
      ]}
    />
  );
}
