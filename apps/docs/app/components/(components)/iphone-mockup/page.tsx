/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { IPhoneMockup } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const PLACEHOLDER =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="750" height="1624" viewBox="0 0 750 1624">
      <rect width="750" height="1624" fill="#7f56d9"/>
      <text x="375" y="812" text-anchor="middle" dominant-baseline="middle" font-size="80" fill="white" font-family="sans-serif">App Screen</text>
    </svg>`
  );

const SECTIONS: DocExample[] = [
  {
    id: "light",
    title: "Light theme",
    description: "Phone frame with a static image — light theme.",
    preview: (
      <div className="flex justify-center">
        <IPhoneMockup image={PLACEHOLDER} theme="light" className="w-40" />
      </div>
    ),
    code: `<IPhoneMockup image="/screenshot.png" theme="light" className="w-40" />`,
  },
  {
    id: "dark",
    title: "Dark theme",
    description: "Inverted phone shell — dark theme.",
    preview: (
      <div className="flex justify-center">
        <IPhoneMockup image={PLACEHOLDER} theme="dark" className="w-40" />
      </div>
    ),
    code: `<IPhoneMockup image="/screenshot.png" theme="dark" className="w-40" />`,
  },
  {
    id: "auto",
    title: "Auto (follows page theme)",
    description: "No theme prop — adapts to data-theme on the document.",
    preview: (
      <div className="flex justify-center">
        <IPhoneMockup image={PLACEHOLDER} className="w-40" />
      </div>
    ),
    code: `<IPhoneMockup image="/screenshot.png" className="w-40" />`,
  },
  {
    id: "sizes",
    title: "Sizing",
    description: "Control size via className width — SVG preserves aspect ratio.",
    preview: (
      <div className="flex items-end justify-center gap-8">
        <IPhoneMockup image={PLACEHOLDER} theme="light" className="w-24" />
        <IPhoneMockup image={PLACEHOLDER} theme="light" className="w-40" />
        <IPhoneMockup image={PLACEHOLDER} theme="light" className="w-56" />
      </div>
    ),
    code: `<IPhoneMockup image="/screenshot.png" className="w-24" />
<IPhoneMockup image="/screenshot.png" className="w-40" />
<IPhoneMockup image="/screenshot.png" className="w-56" />`,
  },
];

export default function IPhoneMockupPage() {
  return (
    <ComponentDocLayout
      name="iPhone Mockup"
      tagline="SVG phone shell for app screenshots and feature showcases. Two themes, auto mode, scalable via CSS width."
      install={{
        usage: `import { IPhoneMockup } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Viewbox", value: "0 0 314 640" },
        { label: "Image dimensions", value: "750 × 1624 px" },
        { label: "Light shell fill", value: "fill-bg" },
        { label: "Dark shell fill", value: "fill-fg (text-primary-fg)" },
      ]}
    />
  );
}
