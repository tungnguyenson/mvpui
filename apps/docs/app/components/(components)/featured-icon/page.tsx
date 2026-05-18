"use client";

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

const COLORS = ["brand", "gray", "error", "warning", "success"] as const;

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "All six themes at lg size.",
    preview: (
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
        <FeaturedIcon color="brand" icon={<Star />} theme="light"       size="lg" />
        <FeaturedIcon color="brand" icon={<Star />} theme="gradient"    size="lg" />
        <FeaturedIcon color="brand" icon={<Star />} theme="dark"        size="lg" />
        <FeaturedIcon color="gray"  icon={<Star />} theme="modern"      size="lg" />
        <FeaturedIcon color="gray"  icon={<Star />} theme="modern-neue" size="lg" />
        <FeaturedIcon color="brand" icon={<Star />} theme="outline"     size="lg" />
      </div>
    ),
    code: `<FeaturedIcon color="brand" icon={<Star />} theme="light"       size="lg" />
<FeaturedIcon color="brand" icon={<Star />} theme="gradient"    size="lg" />
<FeaturedIcon color="brand" icon={<Star />} theme="dark"        size="lg" />
<FeaturedIcon color="gray"  icon={<Star />} theme="modern"      size="lg" />
<FeaturedIcon color="gray"  icon={<Star />} theme="modern-neue" size="lg" />
<FeaturedIcon color="brand" icon={<Star />} theme="outline"     size="lg" />`,
  },
  {
    id: "light",
    title: "Light",
    description: "Tinted circle. All colors, all sizes.",
    preview: (
      <div className="flex flex-col items-start gap-6">
        {COLORS.map((color) => (
          <div key={color} className="flex items-start gap-4">
            <FeaturedIcon theme="light" color={color} icon={<Star />} size="sm" />
            <FeaturedIcon theme="light" color={color} icon={<Star />} size="md" />
            <FeaturedIcon theme="light" color={color} icon={<Star />} size="lg" />
            <FeaturedIcon theme="light" color={color} icon={<Star />} size="xl" />
          </div>
        ))}
      </div>
    ),
    code: `<FeaturedIcon theme="light" color="brand"   icon={<Star />} size="sm" />
<FeaturedIcon theme="light" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="light" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="light" color="success" icon={<Star />} size="lg" />`,
  },
  {
    id: "gradient",
    title: "Gradient",
    description: "Outer tinted circle with inner solid fill. All colors, all sizes.",
    preview: (
      <div className="flex flex-col items-start gap-6">
        {COLORS.map((color) => (
          <div key={color} className="flex items-start gap-4">
            <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="sm" />
            <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="md" />
            <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="lg" />
            <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="xl" />
          </div>
        ))}
      </div>
    ),
    code: `<FeaturedIcon theme="gradient" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="gradient" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="gradient" color="success" icon={<Star />} size="md" />`,
  },
  {
    id: "dark",
    title: "Dark",
    description: "Solid fill. Brand uses the primary token; others use mode-independent fills.",
    preview: (
      <div className="flex flex-col items-start gap-6">
        {COLORS.map((color) => (
          <div key={color} className="flex items-start gap-4">
            <FeaturedIcon theme="dark" color={color} icon={<Star />} size="sm" />
            <FeaturedIcon theme="dark" color={color} icon={<Star />} size="md" />
            <FeaturedIcon theme="dark" color={color} icon={<Star />} size="lg" />
            <FeaturedIcon theme="dark" color={color} icon={<Star />} size="xl" />
          </div>
        ))}
      </div>
    ),
    code: `<FeaturedIcon theme="dark" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="dark" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="dark" color="success" icon={<Star />} size="md" />`,
  },
  {
    id: "outline",
    title: "Outline",
    description: "No background. Two concentric rings at 30% and 10% opacity.",
    preview: (
      <div className="flex flex-col items-start gap-8">
        {COLORS.map((color) => (
          <div key={color} className="flex items-start gap-8">
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="sm" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="md" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="lg" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="xl" />
          </div>
        ))}
      </div>
    ),
    code: `<FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="success" icon={<Star />} size="md" />`,
  },
  {
    id: "modern",
    title: "Modern",
    description: "Surface bg + 1px ring + shadow.",
    preview: (
      <div className="flex items-start gap-4">
        <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="sm" />
        <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="md" />
        <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="lg" />
        <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="xl" />
      </div>
    ),
    code: `<FeaturedIcon theme="modern" color="gray" icon={<Star />} size="sm" />
<FeaturedIcon theme="modern" color="gray" icon={<Star />} size="md" />
<FeaturedIcon theme="modern" color="gray" icon={<Star />} size="lg" />
<FeaturedIcon theme="modern" color="gray" icon={<Star />} size="xl" />`,
  },
  {
    id: "modern-neue",
    title: "Modern neue",
    description: "Inset raised element with ring and shadow.",
    preview: (
      <div className="flex items-start gap-4">
        <FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="sm" />
        <FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="md" />
        <FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="lg" />
        <FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="xl" />
      </div>
    ),
    code: `<FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="sm" />
<FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="md" />
<FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="lg" />
<FeaturedIcon theme="modern-neue" color="gray" icon={<Star />} size="xl" />`,
  },
  {
    id: "featured-icons",
    title: "Featured icons",
    description: "Light, gradient, dark, and modern side by side.",
    preview: (
      <div className="grid w-max grid-cols-2 gap-12">
        <div className="flex flex-col items-start gap-6">
          {COLORS.map((color) => (
            <div key={color} className="flex items-start gap-4">
              <FeaturedIcon theme="light" color={color} icon={<Star />} size="sm" />
              <FeaturedIcon theme="light" color={color} icon={<Star />} size="md" />
              <FeaturedIcon theme="light" color={color} icon={<Star />} size="lg" />
              <FeaturedIcon theme="light" color={color} icon={<Star />} size="xl" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-6">
          {COLORS.map((color) => (
            <div key={color} className="flex items-start gap-4">
              <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="sm" />
              <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="md" />
              <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="lg" />
              <FeaturedIcon theme="gradient" color={color} icon={<Star />} size="xl" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-6">
          {COLORS.map((color) => (
            <div key={color} className="flex items-start gap-4">
              <FeaturedIcon theme="dark" color={color} icon={<Star />} size="sm" />
              <FeaturedIcon theme="dark" color={color} icon={<Star />} size="md" />
              <FeaturedIcon theme="dark" color={color} icon={<Star />} size="lg" />
              <FeaturedIcon theme="dark" color={color} icon={<Star />} size="xl" />
            </div>
          ))}
        </div>
        <div className="flex items-start gap-4">
          <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="sm" />
          <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="md" />
          <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="lg" />
          <FeaturedIcon theme="modern" color="gray" icon={<Star />} size="xl" />
        </div>
      </div>
    ),
    code: `// See individual theme sections above`,
  },
  {
    id: "featured-icons-outline",
    title: "Featured icons outline",
    description: "Outline theme — all colors.",
    preview: (
      <div className="flex flex-col gap-8">
        {COLORS.map((color) => (
          <div key={color} className="flex gap-8">
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="sm" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="md" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="lg" />
            <FeaturedIcon theme="outline" color={color} icon={<Star />} size="xl" />
          </div>
        ))}
      </div>
    ),
    code: `<FeaturedIcon theme="outline" color="brand"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="gray"    icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="error"   icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="warning" icon={<Star />} size="md" />
<FeaturedIcon theme="outline" color="success" icon={<Star />} size="md" />`,
  },
];

export default function FeaturedIconPage() {
  return (
    <ComponentDocLayout
      name="Featured Icon"
      tagline="Decorative icon container for empty states, feature highlights, and section headers. Six themes, five colors, four sizes."
      install={{
        usage: `import { FeaturedIcon } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size sm", value: "32px (size-8)" },
        { label: "Size md", value: "40px (size-10)" },
        { label: "Size lg", value: "48px (size-12)" },
        { label: "Size xl", value: "56px (size-14)" },
        { label: "Light bg (brand)", value: "bg-info-bg" },
        { label: "Radius (light)", value: "rounded-full" },
        { label: "Radius (dark/modern)", value: "rounded-md … rounded-xl" },
      ]}
    />
  );
}
