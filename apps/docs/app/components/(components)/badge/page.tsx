/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import { Check, AlertTriangle, Info, Star, Zap } from "lucide-react";
import { Badge, BadgeIcon, Dot } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

function DismissExample() {
  const [visible, setVisible] = useState(true);
  if (!visible)
    return (
      <button className="text-sm text-fg-secondary underline" onClick={() => setVisible(true)}>
        Reset
      </button>
    );
  return <Badge color="brand" onDismiss={() => setVisible(false)}>Dismissible</Badge>;
}

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Badge",
    description: "Default badge.",
    preview: <Badge color="brand">Label</Badge>,
    code: `<Badge color="brand">Label</Badge>`,
  },
  {
    id: "pill-color",
    title: "Pill-color",
    description: "Rounded-full. 5 semantic (dark-safe) + 7 decorative colors.",
    preview: (
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="gray"    size="sm">gray</Badge>
          <Badge type="pill-color" color="gray"    size="md">gray</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="brand"   size="sm">brand</Badge>
          <Badge type="pill-color" color="brand"   size="md">brand</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="error"   size="sm">error</Badge>
          <Badge type="pill-color" color="error"   size="md">error</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="warning" size="sm">warning</Badge>
          <Badge type="pill-color" color="warning" size="md">warning</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="success" size="sm">success</Badge>
          <Badge type="pill-color" color="success" size="md">success</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="blue"    size="sm">blue</Badge>
          <Badge type="pill-color" color="blue"    size="md">blue</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="indigo"  size="sm">indigo</Badge>
          <Badge type="pill-color" color="indigo"  size="md">indigo</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="purple"  size="sm">purple</Badge>
          <Badge type="pill-color" color="purple"  size="md">purple</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="pink"    size="sm">pink</Badge>
          <Badge type="pill-color" color="pink"    size="md">pink</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="pill-color" color="orange"  size="sm">orange</Badge>
          <Badge type="pill-color" color="orange"  size="md">orange</Badge>
        </div>
      </div>
    ),
    code: `<Badge type="pill-color" color="brand"   size="sm">brand</Badge>
<Badge type="pill-color" color="brand"   size="md">brand</Badge>
<Badge type="pill-color" color="success" size="md">success</Badge>`,
  },
  {
    id: "color",
    title: "Color",
    description: "Rounded-md shape. Same color system.",
    preview: (
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-3">
          <Badge type="color" color="gray"    size="sm">gray</Badge>
          <Badge type="color" color="gray"    size="md">gray</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="brand"   size="sm">brand</Badge>
          <Badge type="color" color="brand"   size="md">brand</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="error"   size="sm">error</Badge>
          <Badge type="color" color="error"   size="md">error</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="warning" size="sm">warning</Badge>
          <Badge type="color" color="warning" size="md">warning</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="success" size="sm">success</Badge>
          <Badge type="color" color="success" size="md">success</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="blue"    size="sm">blue</Badge>
          <Badge type="color" color="blue"    size="md">blue</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="purple"  size="sm">purple</Badge>
          <Badge type="color" color="purple"  size="md">purple</Badge>
        </div>
        <div className="flex items-center gap-3">
          <Badge type="color" color="orange"  size="sm">orange</Badge>
          <Badge type="color" color="orange"  size="md">orange</Badge>
        </div>
      </div>
    ),
    code: `<Badge type="color" color="brand"   size="md">brand</Badge>
<Badge type="color" color="success" size="md">success</Badge>`,
  },
  {
    id: "modern",
    title: "Modern",
    description: "Surface bg + ring + shadow. Container is always neutral.",
    preview: (
      <div className="flex items-center gap-3">
        <Badge type="modern" color="gray" size="sm">gray</Badge>
        <Badge type="modern" color="gray" size="md">gray</Badge>
      </div>
    ),
    code: `<Badge type="modern" color="gray" size="sm">gray</Badge>
<Badge type="modern" color="gray" size="md">gray</Badge>`,
  },
  {
    id: "with-dot",
    title: "With dot",
    description: "Compose Dot as a child.",
    preview: (
      <div className="flex items-center gap-3">
        <Badge color="success">
          <Dot size="sm" className="text-success-fg" />
          Online
        </Badge>
        <Badge color="warning">
          <Dot size="sm" className="text-warning-fg" />
          Away
        </Badge>
        <Badge color="gray">
          <Dot size="sm" className="text-fg-tertiary" />
          Offline
        </Badge>
      </div>
    ),
    code: `<Badge color="success">
  <Dot size="sm" className="text-success-fg" />
  Online
</Badge>`,
  },
  {
    id: "with-icon",
    title: "With icon",
    description: "Pass any icon as a leading child.",
    preview: (
      <div className="flex items-center gap-3">
        <Badge color="brand"><Info size={12} />In review</Badge>
        <Badge color="success"><Check size={12} />Deployed</Badge>
        <Badge color="error"><AlertTriangle size={12} />Failed</Badge>
      </div>
    ),
    code: `<Badge color="success">
  <Check size={12} />
  Deployed
</Badge>`,
  },
  {
    id: "badge-icon",
    title: "BadgeIcon",
    description: "Icon-only variant.",
    preview: (
      <div className="flex items-center gap-3">
        <BadgeIcon color="gray"    icon={<Star />} />
        <BadgeIcon color="brand"   icon={<Star />} />
        <BadgeIcon color="error"   icon={<Star />} />
        <BadgeIcon color="warning" icon={<Star />} />
        <BadgeIcon color="success" icon={<Star />} />
        <BadgeIcon color="purple"  icon={<Zap />} />
        <BadgeIcon color="orange"  icon={<Zap />} />
      </div>
    ),
    code: `<BadgeIcon color="success" icon={<Star />} />
<BadgeIcon color="brand"   icon={<Zap />} />`,
  },
  {
    id: "dismissible",
    title: "Dismissible",
    description: "Pass onDismiss to render a close button.",
    preview: <DismissExample />,
    code: `<Badge color="brand" onDismiss={() => setVisible(false)}>
  Dismissible
</Badge>`,
  },
];

export default function BadgePage() {
  return (
    <ComponentDocLayout
      name="Badge"
      tagline="Compact label for status, category, or count. 12 colors, 3 types, 2 sizes. Composable with dots, icons, and close buttons."
      install={{
        usage: `import { Badge, BadgeIcon } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size sm", value: "px-2 py-0.5 text-xs" },
        { label: "Size md", value: "px-2.5 py-0.5 text-sm" },
        { label: "Pill radius", value: "rounded-full" },
        { label: "Color radius", value: "rounded-md" },
        { label: "Ring", value: "ring-1 ring-inset" },
        { label: "Modern bg", value: "bg-bg ring-border shadow-xs" },
      ]}
    />
  );
}
