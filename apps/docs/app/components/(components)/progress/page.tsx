/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client"

import {
  ProgressBar,
  ProgressBarBase,
  ProgressBarCircle,
  ProgressBarHalfCircle,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic bar",
    description: "ProgressBarBase with no label. Pass value 0–100.",
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <ProgressBarBase value={25} />
        <ProgressBarBase value={60} />
        <ProgressBarBase value={90} />
      </div>
    ),
    code: `<ProgressBarBase value={25} />
<ProgressBarBase value={60} />
<ProgressBarBase value={90} />`,
  },
  {
    id: "label-right",
    title: "Label right",
    description: "Percentage label displayed to the right.",
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <ProgressBar value={40} labelPosition="right" />
        <ProgressBar value={75} labelPosition="right" />
      </div>
    ),
    code: `<ProgressBar value={40} labelPosition="right" />
<ProgressBar value={75} labelPosition="right" />`,
  },
  {
    id: "label-bottom",
    title: "Label bottom",
    description: "Percentage label below the bar, right-aligned.",
    preview: (
      <div className="flex flex-col gap-6 w-full max-w-md">
        <ProgressBar value={55} labelPosition="bottom" />
      </div>
    ),
    code: `<ProgressBar value={55} labelPosition="bottom" />`,
  },
  {
    id: "floating",
    title: "Floating tooltip",
    description: "Tooltip that tracks the progress position.",
    preview: (
      <div className="flex flex-col gap-12 w-full max-w-md pt-8 pb-4">
        <ProgressBar value={35} labelPosition="top-floating" />
        <ProgressBar value={70} labelPosition="bottom-floating" />
      </div>
    ),
    code: `<ProgressBar value={35} labelPosition="top-floating" />
<ProgressBar value={70} labelPosition="bottom-floating" />`,
  },
  {
    id: "custom-formatter",
    title: "Custom formatter",
    description: "Override the label with a custom valueFormatter.",
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <ProgressBar
          value={4}
          max={10}
          labelPosition="right"
          valueFormatter={(v, _pct) => `${v} / 10 tasks`}
        />
        <ProgressBar
          value={128}
          max={512}
          labelPosition="right"
          valueFormatter={(v) => `${v} MB`}
        />
      </div>
    ),
    code: `<ProgressBar
  value={4}
  max={10}
  labelPosition="right"
  valueFormatter={(v) => \`\${v} / 10 tasks\`}
/>`,
  },
  {
    id: "circle",
    title: "Circle",
    description:
      "Full-circle SVG indicator. Five sizes: xxs → lg, shown across a range of values.",
    preview: (
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-wrap items-end gap-8">
          {(["xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
            <ProgressBarCircle key={size} size={size} value={65} label="65%" />
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-8">
          {([20, 40, 60, 80, 100] as const).map((v) => (
            <ProgressBarCircle key={v} size="sm" value={v} label={`${v}%`} />
          ))}
        </div>
      </div>
    ),
    code: `{["xxs","xs","sm","md","lg"].map((size) => (
  <ProgressBarCircle key={size} size={size} value={65} label="65%" />
))}

{[20, 40, 60, 80, 100].map((v) => (
  <ProgressBarCircle key={v} size="sm" value={v} label={\`\${v}%\`} />
))}`,
  },
  {
    id: "half-circle",
    title: "Half circle",
    description:
      "Gauge-style half-circle. Five sizes, then a row of values.",
    preview: (
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-wrap items-end gap-8">
          {(["xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
            <ProgressBarHalfCircle key={size} size={size} value={72} label="72%" />
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-8">
          {([20, 40, 60, 80, 100] as const).map((v) => (
            <ProgressBarHalfCircle key={v} size="sm" value={v} label={`${v}%`} />
          ))}
        </div>
      </div>
    ),
    code: `{["xxs","xs","sm","md","lg"].map((size) => (
  <ProgressBarHalfCircle key={size} size={size} value={72} label="72%" />
))}`,
  },
];

export default function ProgressPage() {
  return (
    <ComponentDocLayout
      name="Progress"
      tagline="Linear progress bars and circular progress indicators. Supports custom value formatters and four label positions."
      install={{
        usage: `import { ProgressBar, ProgressBarBase, ProgressBarCircle, ProgressBarHalfCircle } from "@mvp-ui/ui";`,
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
