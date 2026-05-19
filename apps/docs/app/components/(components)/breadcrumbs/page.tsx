"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Breadcrumbs, type BreadcrumbItem } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const ITEMS: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Settings", href: "/settings" },
  { label: "..." },
  { label: "Team" },
];

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description:
      "Text breadcrumbs with chevron dividers. The first item renders as a home icon; the last item is the current page in brand color.",
    preview: <Breadcrumbs items={ITEMS} />,
    code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/home" },
    { label: "Settings", href: "/settings" },
    { label: "..." },
    { label: "Team" },
  ]}
/>`,
  },
  {
    id: "slash",
    title: "Slash divider",
    description: "Slash separator instead of chevron.",
    preview: <Breadcrumbs items={ITEMS} divider="slash" />,
    code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/home" },
    { label: "Settings", href: "/settings" },
    { label: "..." },
    { label: "Team" },
  ]}
  divider="slash"
/>`,
  },
  {
    id: "text-with-line",
    title: "Text with line",
    description:
      "Breadcrumbs bordered top and bottom — used in page headers with a divider stripe.",
    preview: (
      <div className="flex flex-col gap-4 w-full">
        <Breadcrumbs items={ITEMS} variant="text-with-line" />
        <Breadcrumbs items={ITEMS} variant="text-with-line" divider="slash" />
      </div>
    ),
    code: `<Breadcrumbs items={items} variant="text-with-line" />
<Breadcrumbs items={items} variant="text-with-line" divider="slash" />`,
  },
  {
    id: "button",
    title: "Button",
    description:
      "Items styled as clickable buttons with hover backgrounds. The current page item has a persistent background fill.",
    preview: (
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={ITEMS} variant="button" />
        <Breadcrumbs items={ITEMS} variant="button" divider="slash" />
      </div>
    ),
    code: `<Breadcrumbs items={items} variant="button" />
<Breadcrumbs items={items} variant="button" divider="slash" />`,
  },
  {
    id: "no-home-icon",
    title: "Without home icon",
    description:
      "Set showHomeIcon={false} to render the first item as plain text instead of a home icon.",
    preview: (
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Projects", href: "/projects" },
            { label: "Website redesign" },
          ]}
          showHomeIcon={false}
        />
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Projects", href: "/projects" },
            { label: "Website redesign" },
          ]}
          showHomeIcon={false}
          divider="slash"
        />
      </div>
    ),
    code: `<Breadcrumbs
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Website redesign" },
  ]}
  showHomeIcon={false}
/>`,
  },
];

export default function BreadcrumbsPage() {
  return (
    <ComponentDocLayout
      name="Breadcrumbs"
      tagline="Breadcrumbs show users where they are in the application hierarchy. Supports chevron and slash dividers, three visual variants, and an optional home icon for the first item."
      install={{
        usage: `import { Breadcrumbs } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Inactive text", value: "text-fg-quaternary" },
        { label: "Current page", value: "text-fg-brand" },
        { label: "Button current bg", value: "bg-bg-secondary" },
        { label: "Line border", value: "border-border-secondary" },
      ]}
    />
  );
}
