"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { RadioButton, RadioGroup } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "with-label",
    title: "With label",
    description: "Radio group with labels only.",
    preview: (
      <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButton label="Basic plan" value="basic" />
        <RadioButton label="Business plan" value="business" />
        <RadioButton label="Enterprise plan" value="enterprise" />
      </RadioGroup>
    ),
    code: `<RadioGroup aria-label="Pricing plans" defaultValue="basic">
  <RadioButton label="Basic plan" value="basic" />
  <RadioButton label="Business plan" value="business" />
  <RadioButton label="Enterprise plan" value="enterprise" />
</RadioGroup>`,
  },
  {
    id: "with-label-and-hint",
    title: "With label and hint",
    description: "Radio group with labels and hint descriptions.",
    preview: (
      <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
      </RadioGroup>
    ),
    code: `<RadioGroup aria-label="Pricing plans" defaultValue="basic">
  <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
  <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
  <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
</RadioGroup>`,
  },
  {
    id: "disabled",
    title: "Disabled (group)",
    description: "Entire radio group disabled.",
    preview: (
      <RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
        <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
      </RadioGroup>
    ),
    code: `<RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
  <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
  <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
  <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
</RadioGroup>`,
  },
  {
    id: "disabled-individual",
    title: "Disabled (individual item)",
    description: "Single item disabled within an otherwise active group.",
    preview: (
      <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButton isDisabled label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
      </RadioGroup>
    ),
    code: `<RadioGroup aria-label="Pricing plans" defaultValue="basic">
  <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
  <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
  <RadioButton isDisabled label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
</RadioGroup>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes: sm (default) and md. Size is set on RadioGroup and propagated to children.",
    preview: (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
          <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
          <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
          <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
        <RadioGroup aria-label="Pricing plans" defaultValue="basic" size="md">
          <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
          <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
          <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
      </div>
    ),
    code: `<RadioGroup aria-label="Pricing plans" defaultValue="basic">
  {/* sm (default) */}
</RadioGroup>
<RadioGroup aria-label="Pricing plans" defaultValue="basic" size="md">
  {/* md */}
</RadioGroup>`,
  },
  {
    id: "base-states",
    title: "Base states",
    description: "Radio controls without labels, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <RadioGroup aria-label="Radio Button Example" defaultValue="option3">
          <RadioButton value="option1" />
          <RadioButton value="option2" />
          <RadioButton isDisabled value="option3" />
        </RadioGroup>
        <RadioGroup aria-label="Radio Button Example" defaultValue="option3" size="md">
          <RadioButton value="option1" />
          <RadioButton value="option2" />
          <RadioButton isDisabled value="option3" />
        </RadioGroup>
      </div>
    ),
    code: `<RadioGroup aria-label="Radio Button Example" defaultValue="option3">
  <RadioButton value="option1" />
  <RadioButton value="option2" />
  <RadioButton isDisabled value="option3" />
</RadioGroup>`,
  },
];

export default function RadioPage() {
  return (
    <ComponentDocLayout
      name="Radio"
      tagline="Accessible radio group built on react-aria with label, hint, and sm/md sizes. Size propagates from RadioGroup to children via context."
      install={{ usage: `import { RadioButton, RadioGroup } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
