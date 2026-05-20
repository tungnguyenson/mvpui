"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Sparkline } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const TUPLE_DATA: [number, number][] = [
  [0, 8], [1, 12], [2, 10], [3, 15], [4, 13], [5, 18],
  [6, 16], [7, 20], [8, 18], [9, 24], [10, 22], [11, 28],
];

const BARE_DATA = [14, 13, 15, 12, 11, 13, 10, 9, 8, 8, 7, 6];

const FLAT_DATA = [10, 11, 10, 11, 10, 10, 11];

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default — brand tone, smoothed",
    description: "Pass `[x, y]` tuples. Defaults to brand tone with filled area.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={TUPLE_DATA} />
      </div>
    ),
    code: `<Sparkline data={[[0, 8], [1, 12], [2, 10], ...]} />`,
  },
  {
    id: "bare-numbers",
    title: "Bare number array",
    description: "Pass plain numbers — index is used as the x value.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={BARE_DATA} tone="error" />
      </div>
    ),
    code: `<Sparkline data={[14, 13, 15, 12, 11, 13, 10, 9, 8, 8, 7, 6]} tone="error" />`,
  },
  {
    id: "tones",
    title: "Tones",
    description: "`brand`, `success`, `error`, `warning`, `neutral`.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <Sparkline data={TUPLE_DATA} tone="brand" />
        <Sparkline data={TUPLE_DATA} tone="success" />
        <Sparkline data={TUPLE_DATA} tone="error" />
        <Sparkline data={TUPLE_DATA} tone="warning" />
        <Sparkline data={TUPLE_DATA} tone="neutral" />
      </div>
    ),
    code: `<Sparkline data={data} tone="brand" />
<Sparkline data={data} tone="success" />
<Sparkline data={data} tone="error" />
<Sparkline data={data} tone="warning" />
<Sparkline data={data} tone="neutral" />`,
  },
  {
    id: "no-fill",
    title: "Line only (no fill)",
    description: "Pass `filled={false}` to hide the area fill.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={TUPLE_DATA} tone="brand" filled={false} strokeWidth={2} />
      </div>
    ),
    code: `<Sparkline data={data} filled={false} strokeWidth={2} />`,
  },
  {
    id: "straight-segments",
    title: "Straight segments",
    description: "Pass `smooth={false}` for sharp polyline segments instead of curves.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={TUPLE_DATA} smooth={false} />
      </div>
    ),
    code: `<Sparkline data={data} smooth={false} />`,
  },
  {
    id: "flat",
    title: "Flat / low-variance data",
    description: "Handles low-amplitude series — automatic min/max scaling.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={FLAT_DATA} tone="neutral" />
      </div>
    ),
    code: `<Sparkline data={[10, 11, 10, 11, 10, 10, 11]} tone="neutral" />`,
  },
  {
    id: "custom-color",
    title: "Custom color override",
    description: "Pass any CSS color string to bypass the tone palette.",
    preview: (
      <div className="w-full max-w-md">
        <Sparkline data={TUPLE_DATA} color="oklch(68% 0.21 250)" />
      </div>
    ),
    code: `<Sparkline data={data} color="oklch(68% 0.21 250)" />`,
  },
];

export default function SparklinePage() {
  return (
    <ComponentDocLayout
      name="Sparkline"
      tagline="Lightweight inline SVG line chart. No Recharts dependency — built for tiny inline metric visuals."
      install={{
        usage: `import { Sparkline } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Brand tone", value: "--color-fg-brand" },
        { label: "Success tone", value: "--color-fg-success" },
        { label: "Error tone", value: "--color-fg-error" },
        { label: "Warning tone", value: "--color-warning-fg" },
        { label: "Neutral tone", value: "--color-fg-tertiary" },
      ]}
    />
  );
}
