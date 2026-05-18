/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Star } from "lucide-react";
import { FeaturedIcon } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Featured icon",
    description: "Default featured icon.",
    preview: (
      <FeaturedIcon theme="light" color="brand" icon={<Star />} size="md" />
    ),
    code: `<FeaturedIcon theme="light" color="brand" icon={<Star />} size="md" />`,
  },
  {
    id: "light",
    title: "Light",
    description: "Tinted circle. All colors, all sizes.",
    preview: (
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="light" color="brand"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="light" color="brand"   icon={<Star />} size="md" />
          <FeaturedIcon theme="light" color="brand"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="light" color="brand"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="light" color="gray"    icon={<Star />} size="sm" />
          <FeaturedIcon theme="light" color="gray"    icon={<Star />} size="md" />
          <FeaturedIcon theme="light" color="gray"    icon={<Star />} size="lg" />
          <FeaturedIcon theme="light" color="gray"    icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="light" color="error"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="light" color="error"   icon={<Star />} size="md" />
          <FeaturedIcon theme="light" color="error"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="light" color="error"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="light" color="warning" icon={<Star />} size="sm" />
          <FeaturedIcon theme="light" color="warning" icon={<Star />} size="md" />
          <FeaturedIcon theme="light" color="warning" icon={<Star />} size="lg" />
          <FeaturedIcon theme="light" color="warning" icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="light" color="success" icon={<Star />} size="sm" />
          <FeaturedIcon theme="light" color="success" icon={<Star />} size="md" />
          <FeaturedIcon theme="light" color="success" icon={<Star />} size="lg" />
          <FeaturedIcon theme="light" color="success" icon={<Star />} size="xl" />
        </div>
      </div>
    ),
    code: `<FeaturedIcon theme="light" color="brand"   icon={<Star />} size="sm" />
<FeaturedIcon theme="light" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="light" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="light" color="success" icon={<Star />} size="lg" />`,
  },
  {
    id: "dark",
    title: "Dark",
    description: "Solid fill. Brand uses the primary token; others use mode-independent fills.",
    preview: (
      <div className="flex flex-col items-start gap-6">
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="md" />
          <FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="dark" color="gray"    icon={<Star />} size="sm" />
          <FeaturedIcon theme="dark" color="gray"    icon={<Star />} size="md" />
          <FeaturedIcon theme="dark" color="gray"    icon={<Star />} size="lg" />
          <FeaturedIcon theme="dark" color="gray"    icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="dark" color="error"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="dark" color="error"   icon={<Star />} size="md" />
          <FeaturedIcon theme="dark" color="error"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="dark" color="error"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="dark" color="warning" icon={<Star />} size="sm" />
          <FeaturedIcon theme="dark" color="warning" icon={<Star />} size="md" />
          <FeaturedIcon theme="dark" color="warning" icon={<Star />} size="lg" />
          <FeaturedIcon theme="dark" color="warning" icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="dark" color="success" icon={<Star />} size="sm" />
          <FeaturedIcon theme="dark" color="success" icon={<Star />} size="md" />
          <FeaturedIcon theme="dark" color="success" icon={<Star />} size="lg" />
          <FeaturedIcon theme="dark" color="success" icon={<Star />} size="xl" />
        </div>
      </div>
    ),
    code: `<FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="dark" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="dark" color="success" icon={<Star />} size="md" />`,
  },
  {
    id: "modern",
    title: "Modern",
    description: "Surface bg + 1px ring + shadow.",
    preview: (
      <div className="flex items-start gap-4">
        <FeaturedIcon theme="modern" color="brand"   icon={<Star />} size="sm" />
        <FeaturedIcon theme="modern" color="brand"   icon={<Star />} size="md" />
        <FeaturedIcon theme="modern" color="brand"   icon={<Star />} size="lg" />
        <FeaturedIcon theme="modern" color="brand"   icon={<Star />} size="xl" />
      </div>
    ),
    code: `<FeaturedIcon theme="modern" color="brand" icon={<Star />} size="sm" />
<FeaturedIcon theme="modern" color="brand" icon={<Star />} size="md" />
<FeaturedIcon theme="modern" color="brand" icon={<Star />} size="lg" />
<FeaturedIcon theme="modern" color="brand" icon={<Star />} size="xl" />`,
  },
  {
    id: "outline",
    title: "Outline",
    description: "No background. Two concentric rings at 30% and 10% opacity.",
    preview: (
      <div className="flex flex-col items-start gap-8">
        <div className="flex items-start gap-8">
          <FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="md" />
          <FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-8">
          <FeaturedIcon theme="outline" color="gray"    icon={<Star />} size="sm" />
          <FeaturedIcon theme="outline" color="gray"    icon={<Star />} size="md" />
          <FeaturedIcon theme="outline" color="gray"    icon={<Star />} size="lg" />
          <FeaturedIcon theme="outline" color="gray"    icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-8">
          <FeaturedIcon theme="outline" color="error"   icon={<Star />} size="sm" />
          <FeaturedIcon theme="outline" color="error"   icon={<Star />} size="md" />
          <FeaturedIcon theme="outline" color="error"   icon={<Star />} size="lg" />
          <FeaturedIcon theme="outline" color="error"   icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-8">
          <FeaturedIcon theme="outline" color="warning" icon={<Star />} size="sm" />
          <FeaturedIcon theme="outline" color="warning" icon={<Star />} size="md" />
          <FeaturedIcon theme="outline" color="warning" icon={<Star />} size="lg" />
          <FeaturedIcon theme="outline" color="warning" icon={<Star />} size="xl" />
        </div>
        <div className="flex items-start gap-8">
          <FeaturedIcon theme="outline" color="success" icon={<Star />} size="sm" />
          <FeaturedIcon theme="outline" color="success" icon={<Star />} size="md" />
          <FeaturedIcon theme="outline" color="success" icon={<Star />} size="lg" />
          <FeaturedIcon theme="outline" color="success" icon={<Star />} size="xl" />
        </div>
      </div>
    ),
    code: `<FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="success" icon={<Star />} size="md" />`,
  },
];

export default function FeaturedIconPage() {
  return (
    <ComponentDocLayout
      name="Featured Icon"
      tagline="Decorative icon container for empty states, feature highlights, and section headers. Four themes, five colors, four sizes."
      install={{
        usage: `import { FeaturedIcon } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size sm", value: "32px (size-8)" },
        { label: "Size md", value: "40px (size-10)" },
        { label: "Size lg", value: "48px (size-12)" },
        { label: "Size xl", value: "56px (size-14)" },
        { label: "Light bg (brand)", value: "bg-info-bg → brand-50" },
        { label: "Radius (light)", value: "rounded-full" },
        { label: "Radius (dark/modern)", value: "rounded-md … rounded-xl" },
      ]}
    />
  );
}
