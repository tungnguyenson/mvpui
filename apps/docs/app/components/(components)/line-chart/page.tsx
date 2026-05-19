"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { LineChart } from "@mvp-ui/charts";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const DATA = [
  { month: "Jan", a: 600, b: 400, c: 100 },
  { month: "Feb", a: 620, b: 405, c: 160 },
  { month: "Mar", a: 630, b: 400, c: 170 },
  { month: "Apr", a: 650, b: 410, c: 190 },
  { month: "May", a: 600, b: 320, c: 200 },
  { month: "Jun", a: 650, b: 430, c: 230 },
  { month: "Jul", a: 620, b: 400, c: 200 },
  { month: "Aug", a: 750, b: 540, c: 300 },
  { month: "Sep", a: 780, b: 490, c: 390 },
  { month: "Oct", a: 750, b: 450, c: 300 },
  { month: "Nov", a: 780, b: 480, c: 340 },
  { month: "Dec", a: 820, b: 500, c: 450 },
];

const SECTIONS: DocExample[] = [
  {
    id: "area",
    title: "Area chart",
    description: "Multiple series with filled gradient areas. Default style.",
    preview: (
      <LineChart
        data={DATA}
        xAxisKey="month"
        yAxisLabel="Active users"
        series={[
          { dataKey: "a", name: "Premium" },
          { dataKey: "b", name: "Basic" },
          { dataKey: "c", name: "Free" },
        ]}
        yAxisFormatter={(v) => Number(v).toLocaleString()}
      />
    ),
    code: `<LineChart
  data={data}
  xAxisKey="month"
  yAxisLabel="Active users"
  series={[
    { dataKey: "a", name: "Premium" },
    { dataKey: "b", name: "Basic" },
    { dataKey: "c", name: "Free" },
  ]}
/>`,
  },
  {
    id: "line-only",
    title: "Line only (no fill)",
    description: "Set `filled: false` on a series to render a plain line without area fill.",
    preview: (
      <LineChart
        data={DATA}
        xAxisKey="month"
        series={[
          { dataKey: "a", name: "Series A", filled: false },
          { dataKey: "b", name: "Series B", filled: false, dashArray: "5 5" },
        ]}
      />
    ),
    code: `<LineChart
  data={data}
  xAxisKey="month"
  series={[
    { dataKey: "a", name: "Series A", filled: false },
    { dataKey: "b", name: "Series B", filled: false, dashArray: "5 5" },
  ]}
/>`,
  },
  {
    id: "single-series",
    title: "Single series",
    description: "Minimal area chart — no legend, single series.",
    preview: (
      <LineChart
        data={DATA}
        xAxisKey="month"
        series={[{ dataKey: "a", name: "Revenue" }]}
        showLegend={false}
        height={160}
      />
    ),
    code: `<LineChart
  data={data}
  xAxisKey="month"
  series={[{ dataKey: "a", name: "Revenue" }]}
  showLegend={false}
  height={160}
/>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Line Chart"
      tagline="Area / line charts powered by Recharts. Gradient fills, dashed lines, multiple series."
      install={{
        add: "pnpm add @mvp-ui/charts @mvp-ui/tokens",
        usage: `import { LineChart } from "@mvp-ui/charts";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Grid lines", value: "var(--color-border)" },
        { label: "Axis labels", value: "var(--color-fg-tertiary)" },
        { label: "Active dot ring", value: "var(--color-brand-600)" },
        { label: "Tooltip bg", value: "var(--color-fg)" },
      ]}
    />
  );
}
