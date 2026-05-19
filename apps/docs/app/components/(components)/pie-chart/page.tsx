"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { PieChart } from "@mvp-ui/charts";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const DATA = [
  { name: "Direct", value: 35 },
  { name: "Organic", value: 28 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 12 },
  { name: "Other", value: 7 },
];

const SECTIONS: DocExample[] = [
  {
    id: "donut",
    title: "Donut chart",
    description: "Default ring chart. `innerRadiusRatio` controls hole size (0–1).",
    preview: <PieChart data={DATA} innerRadiusRatio={0.55} />,
    code: `<PieChart
  data={[
    { name: "Direct", value: 35 },
    { name: "Organic", value: 28 },
    { name: "Referral", value: 18 },
    { name: "Social", value: 12 },
    { name: "Other", value: 7 },
  ]}
  innerRadiusRatio={0.55}
/>`,
  },
  {
    id: "pie",
    title: "Solid pie chart",
    description: "Set `innerRadiusRatio={0}` to remove the center hole.",
    preview: <PieChart data={DATA} innerRadiusRatio={0} height={200} legendAlign="right" />,
    code: `<PieChart
  data={data}
  innerRadiusRatio={0}
  legendAlign="right"
/>`,
  },
  {
    id: "custom-colors",
    title: "Custom colors",
    description: "Provide a `color` per item or override the full `colors` array.",
    preview: (
      <PieChart
        data={DATA.map((d, i) => ({
          ...d,
          color: (["var(--color-success-fg)", "var(--color-warning-fg)", "var(--color-error-fg)", "var(--color-brand-600)", "var(--color-fg-tertiary)"] as const)[i] as string,
        }))}
      />
    ),
    code: `<PieChart
  data={data.map((d, i) => ({ ...d, color: customPalette[i] }))}
/>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Pie Chart"
      tagline="Donut and pie charts powered by Recharts. Supports per-item colors and flexible legend placement."
      install={{
        add: "pnpm add @mvp-ui/charts @mvp-ui/tokens",
        usage: `import { PieChart } from "@mvp-ui/charts";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Default palette", value: "CHART_COLORS (brand scale)" },
        { label: "Tooltip bg", value: "var(--color-fg)" },
      ]}
    />
  );
}
