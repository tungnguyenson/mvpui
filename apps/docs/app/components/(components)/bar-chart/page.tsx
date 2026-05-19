"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { BarChart } from "@mvp-ui/charts";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const MONTHLY_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2026, i, 1).toLocaleDateString(undefined, { month: "short" }),
  mobile: Math.round(200 + Math.random() * 500),
  desktop: Math.round(150 + Math.random() * 350),
  tablet: Math.round(50 + Math.random() * 200),
}));

const WEEKLY_DATA = Array.from({ length: 8 }, (_, i) => ({
  week: `Wk ${i + 1}`,
  revenue: Math.round(3000 + Math.random() * 7000),
}));

const SECTIONS: DocExample[] = [
  {
    id: "stacked",
    title: "Stacked bar chart",
    description: "Multiple series stacked vertically. Pass a `series` array with `stacked: true` (default).",
    preview: (
      <BarChart
        data={MONTHLY_DATA}
        xAxisKey="month"
        xAxisLabel="Month"
        yAxisLabel="Users"
        series={[
          { dataKey: "mobile", name: "Mobile", stacked: true },
          { dataKey: "desktop", name: "Desktop", stacked: true },
          { dataKey: "tablet", name: "Tablet", stacked: true },
        ]}
        yAxisFormatter={(v) => Number(v).toLocaleString()}
      />
    ),
    code: `<BarChart
  data={data}
  xAxisKey="month"
  xAxisLabel="Month"
  yAxisLabel="Users"
  series={[
    { dataKey: "mobile", name: "Mobile" },
    { dataKey: "desktop", name: "Desktop" },
    { dataKey: "tablet", name: "Tablet" },
  ]}
  yAxisFormatter={(v) => Number(v).toLocaleString()}
/>`,
  },
  {
    id: "single",
    title: "Single series",
    description: "One data key. Set `stacked: false` to render ungrouped bars.",
    preview: (
      <BarChart
        data={WEEKLY_DATA}
        xAxisKey="week"
        xAxisLabel="Week"
        yAxisLabel="Revenue"
        series={[{ dataKey: "revenue", name: "Revenue", stacked: false }]}
        yAxisFormatter={(v) => `$${Number(v).toLocaleString()}`}
        maxBarSize={40}
        showLegend={false}
      />
    ),
    code: `<BarChart
  data={data}
  xAxisKey="week"
  series={[{ dataKey: "revenue", name: "Revenue", stacked: false }]}
  yAxisFormatter={(v) => \`$\${Number(v).toLocaleString()}\`}
  maxBarSize={40}
  showLegend={false}
/>`,
  },
  {
    id: "custom-colors",
    title: "Custom colors",
    description: "Override per-series colors or supply a full custom `colors` palette.",
    preview: (
      <BarChart
        data={MONTHLY_DATA}
        xAxisKey="month"
        series={[
          { dataKey: "mobile", name: "Mobile", color: "var(--color-success-fg)" },
          { dataKey: "desktop", name: "Desktop", color: "var(--color-warning-fg)" },
        ]}
        showLegend
      />
    ),
    code: `<BarChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "mobile", name: "Mobile", color: "var(--color-success-fg)" },
    { dataKey: "desktop", name: "Desktop", color: "var(--color-warning-fg)" },
  ]}
/>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Bar Chart"
      tagline="Stacked or grouped bar charts powered by Recharts. Themed to design tokens."
      install={{
        add: "pnpm add @mvp-ui/charts @mvp-ui/tokens",
        usage: `import { BarChart } from "@mvp-ui/charts";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Grid lines", value: "var(--color-border)" },
        { label: "Axis labels", value: "var(--color-fg-tertiary)" },
        { label: "Cursor hover", value: "var(--color-bg-secondary)" },
        { label: "Tooltip bg", value: "var(--color-fg)" },
        { label: "Default palette", value: "CHART_COLORS (brand scale)" },
      ]}
    />
  );
}
