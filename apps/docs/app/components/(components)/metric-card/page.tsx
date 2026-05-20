"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  Activity,
  ArrowUpRight,
  Copy,
  Eye,
  MoreVertical,
  Share2,
  Trash2,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { LineChart } from "@mvp-ui/charts";
import { ButtonUtility, Dropdown, MetricCard } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const UP_SPARK: [number, number][] = [
  [0, 8], [1, 12], [2, 10], [3, 15], [4, 13], [5, 18],
  [6, 16], [7, 20], [8, 18], [9, 24], [10, 22], [11, 28],
];

const DOWN_SPARK: [number, number][] = [
  [0, 14], [1, 13], [2, 15], [3, 12], [4, 11], [5, 13],
  [6, 10], [7, 9], [8, 8], [9, 8], [10, 7], [11, 6],
];

const REVENUE_DATA = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2026, i, 1).toLocaleDateString(undefined, { month: "short" }),
  revenue: Math.round(30 + Math.random() * 25),
}));

const SECTIONS: DocExample[] = [
  {
    id: "simple",
    title: "Simple",
    description:
      "Label, value, and outlined change badge. Default `changeStyle=\"badge\"` matches the Untitled UI Figma reference.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard label="Views 24 hours" value="2,000" change="100%" trend="up" />
      </div>
    ),
    code: `<MetricCard label="Views 24 hours" value="2,000" change="100%" trend="up" />`,
  },
  {
    id: "simple-down",
    title: "Negative trend",
    description: "Arrow flips to `ArrowDownRight`. Arrow color shifts to error fg.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard label="Churn rate" value="2.4%" change="0.3%" trend="down" />
      </div>
    ),
    code: `<MetricCard label="Churn rate" value="2.4%" change="0.3%" trend="down" />`,
  },
  {
    id: "with-label",
    title: "Badge with comparison label",
    description: "`changeLabel` renders under the value row when paired with the badge style.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Active users"
          value="12,840"
          change="8.2%"
          trend="up"
          changeLabel="vs last month"
        />
      </div>
    ),
    code: `<MetricCard
  label="Active users"
  value="12,840"
  change="8.2%"
  trend="up"
  changeLabel="vs last month"
/>`,
  },
  {
    id: "text-style",
    title: "Plain text change",
    description:
      "`changeStyle=\"text\"` renders the change as inline colored text with `TrendingUp`/`Down`. Closest to the original Dashboard look.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Open shifts"
          value="128"
          change="12%"
          trend="up"
          changeStyle="text"
          changeLabel="vs last week"
        />
      </div>
    ),
    code: `<MetricCard
  label="Open shifts"
  value="128"
  change="12%"
  trend="up"
  changeStyle="text"
  changeLabel="vs last week"
/>`,
  },
  {
    id: "value-only",
    title: "Value only",
    description: "Label and value. No change indicator, no chart.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard label="Total workers" value="342" />
      </div>
    ),
    code: `<MetricCard label="Total workers" value="342" />`,
  },
  {
    id: "prefix-suffix",
    title: "Prefix and suffix",
    description: "Inline currency or unit tokens around the value.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Conversion rate"
          value="4.8"
          suffix="%"
          change="0.6pp"
          trend="up"
        />
      </div>
    ),
    code: `<MetricCard
  label="Conversion rate"
  value="4.8"
  suffix="%"
  change="0.6pp"
  trend="up"
/>`,
  },
  {
    id: "chip-icon-outline",
    title: "Chip icon — outline (above label)",
    description:
      "Small 32px bordered square chip above the label. Mirrors Untitled UI's Icon 03 variant. Use `featuredIconColor` to set the icon stroke color.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Views 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          iconChip={<ArrowUpRight className="size-4" />}
        />
        <MetricCard
          label="Active sessions"
          value="438"
          change="3%"
          trend="down"
          iconChip={<Activity className="size-4" />}
        />
        <MetricCard
          label="Power users"
          value="84"
          iconChip={<Zap className="size-4" />}
          featuredIconColor="brand"
        />
      </div>
    ),
    code: `<MetricCard
  label="Views 24 hours"
  value="2,000"
  change="100%"
  trend="up"
  iconChip={<ArrowUpRight className="size-4" />}
/>`,
  },
  {
    id: "chip-icon-tint",
    title: "Chip icon — tinted",
    description:
      "Same 32px chip but with a color-tinted fill. Pair with `iconChipStyle=\"tint\"`.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total customers"
          value="1,284"
          change="12%"
          trend="up"
          iconChip={<Users className="size-4" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
        />
        <MetricCard
          label="Views 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          iconChip={<Eye className="size-4" />}
          iconChipStyle="tint"
        />
        <MetricCard
          label="Issues"
          value="12"
          change="2"
          trend="down"
          iconChip={<Activity className="size-4" />}
          iconChipStyle="tint"
        />
      </div>
    ),
    code: `<MetricCard
  label="Total customers"
  value="1,284"
  change="12%"
  trend="up"
  iconChip={<Users className="size-4" />}
  iconChipStyle="tint"
  featuredIconColor="brand"
/>`,
  },
  {
    id: "chip-icon-inline",
    title: "Chip icon — inline with label",
    description:
      "Set `iconPlacement=\"inline\"` to render the chip next to the label. Mirrors Icon 02/04 variants.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          label="Views 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          changeStyle="text"
          iconChip={<ArrowUpRight className="size-4" />}
          iconPlacement="inline"
        />
        <MetricCard
          label="Total customers"
          value="1,284"
          change="12%"
          trend="up"
          changeStyle="text"
          iconChip={<Users className="size-4" />}
          iconChipStyle="tint"
          iconPlacement="inline"
          featuredIconColor="brand"
        />
      </div>
    ),
    code: `<MetricCard
  label="Views 24 hours"
  value="2,000"
  change="100%"
  trend="up"
  changeStyle="text"
  iconChip={<ArrowUpRight className="size-4" />}
  iconPlacement="inline"
/>`,
  },
  {
    id: "featured-icon",
    title: "Featured icon (48px circle)",
    description:
      "Tinted 48px circle icon at the top. Color auto-derives from `trend` — pass `featuredIconColor` to override.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Total revenue"
          value="$48,295"
          change="8.2%"
          trend="up"
          featuredIcon={<TrendingUp className="size-6" />}
        />
        <MetricCard
          label="Active sessions"
          value="1,204"
          change="3%"
          trend="down"
          featuredIcon={<Activity className="size-6" />}
        />
        <MetricCard
          label="Wallet balance"
          value="₫286M"
          featuredIcon={<Wallet className="size-6" />}
          featuredIconColor="brand"
        />
      </div>
    ),
    code: `<MetricCard
  label="Total revenue"
  value="$48,295"
  change="8.2%"
  trend="up"
  featuredIcon={<TrendingUp className="size-6" />}
/>

<MetricCard
  label="Wallet balance"
  value="₫286M"
  featuredIcon={<Wallet className="size-6" />}
  featuredIconColor="brand"
/>`,
  },
  {
    id: "sparkline",
    title: "Built-in sparkline",
    description: "Pass `spark` to render a lightweight inline-SVG line below the value.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          label="Open shifts"
          value="128"
          change="12%"
          trend="up"
          spark={UP_SPARK}
        />
        <MetricCard
          label="Pending batches"
          value="06"
          change="3%"
          trend="down"
          spark={DOWN_SPARK}
        />
      </div>
    ),
    code: `<MetricCard
  label="Open shifts"
  value="128"
  change="12%"
  trend="up"
  spark={UP_SPARK}
/>`,
  },
  {
    id: "actions",
    title: "Top-right actions slot",
    description: "Pass a dropdown trigger or icon button as `actions`.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Views 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          actions={
            <ButtonUtility
              size="xs"
              color="tertiary"
              tooltip="More options"
              icon={<MoreVertical />}
            />
          }
        />
      </div>
    ),
    code: `<MetricCard
  label="Views 24 hours"
  value="2,000"
  change="100%"
  trend="up"
  actions={
    <ButtonUtility
      size="xs"
      color="tertiary"
      tooltip="More options"
      icon={<MoreVertical />}
    />
  }
/>`,
  },
  {
    id: "footer-link",
    title: "Footer link (View report)",
    description:
      "Pass `footerLabel` + `footerHref` for the canonical \"View report\" CTA pattern with a top border.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Views 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          footerLabel="View report"
          footerHref="#"
        />
      </div>
    ),
    code: `<MetricCard
  label="Views 24 hours"
  value="2,000"
  change="100%"
  trend="up"
  footerLabel="View report"
  footerHref="/analytics/views"
/>`,
  },
  {
    id: "loading",
    title: "Loading state",
    description: "Renders a skeleton placeholder for the value.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard label="Pending hires" loading />
      </div>
    ),
    code: `<MetricCard label="Pending hires" loading />`,
  },
  {
    id: "linked",
    title: "Clickable card (href)",
    description:
      "Passing `href` makes the whole card an anchor. Hover shifts the background; focus shows a brand ring.",
    preview: (
      <div className="w-full max-w-sm">
        <MetricCard
          label="Verifications pending"
          value="27"
          change="4 new today"
          trend="up"
          href="#verifications"
        />
      </div>
    ),
    code: `<MetricCard
  label="Verifications pending"
  value="27"
  change="4 new today"
  trend="up"
  href="/worker-verifications?status=pending"
/>`,
  },
  {
    id: "framed-with-dots",
    title: "Framed variant + dots menu (Untitled hero pattern)",
    description:
      "Pass `variant=\"framed\"` for the nested two-tier layout (outer label strip + inner panel). Slot `Dropdown.DotsButton` as `actions` for the kebab menu.",
    preview: (
      <div className="w-full max-w-md">
        <MetricCard
          variant="framed"
          label="View 24 hours"
          value="2,000"
          change="100%"
          trend="up"
          changeStyle="text"
          changeLabel="vs last month"
          spark={UP_SPARK}
          actions={
            <Dropdown.Root>
              <Dropdown.DotsButton />
              <Dropdown.Popover className="w-48">
                <Dropdown.Menu>
                  <Dropdown.Section>
                    <Dropdown.Item label="View more" icon={Eye} />
                    <Dropdown.Item label="Share" icon={Share2} />
                    <Dropdown.Item label="Copy link" icon={Copy} />
                  </Dropdown.Section>
                  <Dropdown.Separator />
                  <Dropdown.Section>
                    <Dropdown.Item label="Remove" icon={Trash2} />
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.Root>
          }
        />
      </div>
    ),
    code: `<MetricCard
  variant="framed"
  label="View 24 hours"
  value="2,000"
  change="100%"
  trend="up"
  changeStyle="text"
  changeLabel="vs last month"
  spark={UP_SPARK}
  actions={
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover className="w-48">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item label="View more" icon={Eye} />
            <Dropdown.Item label="Share" icon={Share2} />
            <Dropdown.Item label="Copy link" icon={Copy} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item label="Remove" icon={Trash2} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  }
/>`,
  },
  {
    id: "chart-slot",
    title: "Custom chart slot",
    description: "Any chart works as `children` — replaces the built-in sparkline.",
    preview: (
      <div className="w-full max-w-md">
        <MetricCard label="Revenue" value="$48K" change="12%" trend="up">
          <LineChart
            data={REVENUE_DATA}
            xAxisKey="month"
            series={[{ dataKey: "revenue", name: "Revenue" }]}
            height={100}
            showLegend={false}
          />
        </MetricCard>
      </div>
    ),
    code: `<MetricCard label="Revenue" value="$48K" change="12%" trend="up">
  <LineChart
    data={revenueSeries}
    xAxisKey="month"
    series={[{ dataKey: "revenue", name: "Revenue" }]}
    height={100}
    showLegend={false}
  />
</MetricCard>`,
  },
  {
    id: "featured-with-everything",
    title: "Combined: featured icon + sparkline + footer",
    description:
      "Composition of all slots: featured icon, value+badge, sparkline, footer CTA. The reference layout from the Untitled UI Figma.",
    preview: (
      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          label="Total customers"
          value="1,284"
          change="12%"
          trend="up"
          featuredIcon={<Users className="size-6" />}
          featuredIconColor="brand"
          spark={UP_SPARK}
          footerLabel="View report"
          footerHref="#"
        />
        <MetricCard
          label="Active sessions"
          value="438"
          change="3%"
          trend="down"
          featuredIcon={<Activity className="size-6" />}
          spark={DOWN_SPARK}
          footerLabel="View report"
          footerHref="#"
        />
      </div>
    ),
    code: `<MetricCard
  label="Total customers"
  value="1,284"
  change="12%"
  trend="up"
  featuredIcon={<Users className="size-6" />}
  featuredIconColor="brand"
  spark={UP_SPARK}
  footerLabel="View report"
  footerHref="/customers"
/>`,
  },
];

export default function MetricCardPage() {
  return (
    <ComponentDocLayout
      name="Metric Card"
      tagline={
        <>
          Compact metric tile adapted from the Untitled UI Figma reference.
          Supports outlined / plain change indicators, featured icons, sparklines,
          custom charts, top-right actions, and a footer CTA.
        </>
      }
      install={{
        usage: `import { MetricCard } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Card surface", value: "--color-bg" },
        { label: "Card border", value: "--color-border-secondary" },
        { label: "Label", value: "--color-fg-tertiary" },
        { label: "Value", value: "--color-fg" },
        { label: "Badge border", value: "--color-border" },
        { label: "Badge text", value: "--color-fg-secondary" },
        { label: "Up arrow / text", value: "--color-fg-success" },
        { label: "Down arrow / text", value: "--color-fg-error" },
        { label: "Featured icon (brand)", value: "--color-info-bg / --color-fg-brand" },
        { label: "Featured icon (success)", value: "--color-success-bg / --color-fg-success" },
        { label: "Footer CTA", value: "--color-fg-brand" },
        { label: "Loading shimmer", value: "--color-bg-tertiary" },
      ]}
    />
  );
}
