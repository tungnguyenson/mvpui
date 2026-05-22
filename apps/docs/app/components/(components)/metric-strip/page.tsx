"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  AlertOctagon,
  Briefcase,
  Clock,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { MetricStrip } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "stack",
    title: "Stack on mobile (default)",
    description:
      "Default behavior. Stacks items vertically below `lg`, row above. Labels never truncate; trades vertical space for readability. Best for 2–4 short labels.",
    preview: (
      <MetricStrip
        mobileLayout="stack"
        items={[
          {
            icon: <Users className="size-4" />,
            color: "brand",
            value: "1,284",
            label: "Total customers",
          },
          {
            icon: <TrendingUp className="size-4" />,
            color: "success",
            value: "438",
            label: "Active workers",
          },
          {
            icon: <Clock className="size-4" />,
            color: "warning",
            value: "12h",
            label: "Avg fill time",
          },
        ]}
      />
    ),
    code: `<MetricStrip
  mobileLayout="stack"
  items={[
    { icon: <Users className="size-4" />, color: "brand", value: "1,284", label: "Total customers" },
    { icon: <TrendingUp className="size-4" />, color: "success", value: "438", label: "Active workers" },
    { icon: <Clock className="size-4" />, color: "warning", value: "12h", label: "Avg fill time" },
  ]}
/>`,
  },
  {
    id: "scroll",
    title: "Scroll on mobile",
    description:
      "`mobileLayout=\"scroll\"` lets the strip scroll horizontally on mobile — labels never truncate and there is no vertical space cost. Above `lg` the strip snaps back to a full-width row. Wrap in a container with `overflow-x-auto` bleed if needed.",
    preview: (
      <MetricStrip
        mobileLayout="scroll"
        items={[
          {
            icon: <Briefcase className="size-4" />,
            color: "brand",
            value: "2",
            label: "Request mở",
          },
          {
            icon: <AlertOctagon className="size-4" />,
            color: "error",
            value: "1",
            label: "Quá hạn",
          },
          {
            icon: <UserPlus className="size-4" />,
            color: "warning",
            value: "18",
            label: "CTV cần fill",
          },
          {
            icon: <Clock className="size-4" />,
            color: "success",
            value: "24",
            label: "Khách đang hoạt động",
          },
        ]}
      />
    ),
    code: `<MetricStrip
  mobileLayout="scroll"
  items={[
    { icon: <Briefcase className="size-4" />, color: "brand", value: "2", label: "Request mở" },
    { icon: <AlertOctagon className="size-4" />, color: "error", value: "1", label: "Quá hạn" },
    { icon: <UserPlus className="size-4" />, color: "warning", value: "18", label: "CTV cần fill" },
    { icon: <Clock className="size-4" />, color: "success", value: "24", label: "Khách đang hoạt động" },
  ]}
/>`,
  },
  {
    id: "linked",
    title: "Linked items",
    description:
      "Add `href` to any item to make the whole tile a link. Hover and focus styles applied automatically.",
    preview: (
      <MetricStrip
        items={[
          {
            icon: <Briefcase className="size-4" />,
            color: "brand",
            value: "12",
            label: "Open jobs",
            href: "#",
          },
          {
            icon: <Zap className="size-4" />,
            color: "warning",
            value: "5",
            label: "Need review",
            href: "#",
          },
        ]}
      />
    ),
    code: `<MetricStrip
  items={[
    { icon: <Briefcase className="size-4" />, color: "brand", value: "12", label: "Open jobs", href: "/jobs" },
    { icon: <Zap className="size-4" />, color: "warning", value: "5", label: "Need review", href: "/jobs?status=review" },
  ]}
/>`,
  },
  {
    id: "no-icons",
    title: "No icons",
    description:
      "Icons are optional. Omit for a denser, text-only summary strip.",
    preview: (
      <MetricStrip
        items={[
          { value: "342", label: "Workers" },
          { value: "28", label: "Active jobs" },
          { value: "$48k", label: "Payroll" },
          { value: "92%", label: "Fill rate" },
        ]}
      />
    ),
    code: `<MetricStrip
  items={[
    { value: "342", label: "Workers" },
    { value: "28", label: "Active jobs" },
    { value: "$48k", label: "Payroll" },
    { value: "92%", label: "Fill rate" },
  ]}
/>`,
  },
];

export default function MetricStripPage() {
  return (
    <ComponentDocLayout
      name="Metric Strip"
      tagline={
        <>
          Horizontal KPI strip — a single bordered row of compact metric items
          separated by dividers. Lighter footprint than a grid of{" "}
          <code>MetricCard</code>s. Best for mobile-first dashboards or page
          headers where a quick at-a-glance summary is enough.
        </>
      }
      install={{
        usage: `import { MetricStrip } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Strip surface", value: "--color-bg" },
        { label: "Strip border / divider", value: "--color-border-secondary" },
        { label: "Value", value: "--color-fg" },
        { label: "Label", value: "--color-fg-tertiary" },
        { label: "Icon (brand)", value: "--color-info-bg / --color-fg-brand" },
        { label: "Icon (success)", value: "--color-success-bg / --color-fg-success" },
        { label: "Icon (error)", value: "--color-error-bg / --color-fg-error" },
        { label: "Icon (warning)", value: "--color-warning-bg / --color-warning-fg" },
        { label: "Icon (gray)", value: "--color-neutral-bg / --color-fg-tertiary" },
        { label: "Hover (linked)", value: "--color-bg-secondary" },
      ]}
    />
  );
}
