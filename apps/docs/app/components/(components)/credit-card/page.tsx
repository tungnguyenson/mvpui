/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { CreditCard } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const NORMAL_TYPES = ["transparent", "transparent-gradient", "brand-dark", "brand-light", "gray-dark", "gray-light"] as const;
const STRIP_TYPES = ["transparent-strip", "gray-strip", "gradient-strip", "salmon-strip"] as const;
const VERTICAL_STRIP_TYPES = ["gray-strip-vertical", "gradient-strip-vertical", "salmon-strip-vertical"] as const;

const CARD_DEFAULTS = {
  company: "Untitled.",
  cardNumber: "1234 1234 1234 1234",
  cardHolder: "OLIVIA RHYE",
  cardExpiration: "06/28",
};

const SECTIONS: DocExample[] = [
  {
    id: "normal",
    title: "Normal types",
    description: "Six base card themes: transparent, gradient, brand, gray — in light and dark variants.",
    preview: (
      <div className="flex flex-wrap gap-4">
        {NORMAL_TYPES.map((t) => (
          <CreditCard key={t} {...CARD_DEFAULTS} type={t} width={220} />
        ))}
      </div>
    ),
    code: `<CreditCard type="brand-dark"          company="Untitled." cardNumber="1234 1234 1234 1234" cardHolder="OLIVIA RHYE" cardExpiration="06/28" />
<CreditCard type="brand-light"         ... />
<CreditCard type="gray-dark"           ... />
<CreditCard type="gray-light"          ... />
<CreditCard type="transparent"         ... />
<CreditCard type="transparent-gradient" ... />`,
  },
  {
    id: "strip",
    title: "Strip types",
    description: "Card themes with a horizontal strip across the bottom half.",
    preview: (
      <div className="flex flex-wrap gap-4">
        {STRIP_TYPES.map((t) => (
          <CreditCard key={t} {...CARD_DEFAULTS} type={t} width={220} />
        ))}
      </div>
    ),
    code: `<CreditCard type="transparent-strip" ... />
<CreditCard type="gray-strip"        ... />
<CreditCard type="gradient-strip"    ... />
<CreditCard type="salmon-strip"      ... />`,
  },
  {
    id: "vertical-strip",
    title: "Vertical strip types",
    description: "Card themes with a vertical strip on the left portion.",
    preview: (
      <div className="flex flex-wrap gap-4">
        {VERTICAL_STRIP_TYPES.map((t) => (
          <CreditCard key={t} {...CARD_DEFAULTS} type={t} width={220} />
        ))}
      </div>
    ),
    code: `<CreditCard type="gray-strip-vertical"     ... />
<CreditCard type="gradient-strip-vertical" ... />
<CreditCard type="salmon-strip-vertical"   ... />`,
  },
  {
    id: "custom-width",
    title: "Custom width",
    description: "Pass width prop to scale the card proportionally.",
    preview: (
      <div className="flex items-end gap-4">
        <CreditCard {...CARD_DEFAULTS} type="brand-dark" width={160} />
        <CreditCard {...CARD_DEFAULTS} type="brand-dark" width={220} />
        <CreditCard {...CARD_DEFAULTS} type="brand-dark" width={316} />
      </div>
    ),
    code: `<CreditCard type="brand-dark" width={160} ... />
<CreditCard type="brand-dark" width={220} ... />
<CreditCard type="brand-dark" width={316} ... />`,
  },
];

export default function CreditCardPage() {
  return (
    <ComponentDocLayout
      name="Credit Card"
      tagline="Visual credit card display for billing UIs and onboarding flows. 13 theme variants, scalable via width prop."
      install={{
        usage: `import { CreditCard } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Normal types", value: "transparent · transparent-gradient · brand-dark/light · gray-dark/light" },
        { label: "Strip types", value: "transparent-strip · gray-strip · gradient-strip · salmon-strip" },
        { label: "Vertical strip", value: "gray-strip-vertical · gradient-strip-vertical · salmon-strip-vertical" },
        { label: "Default width", value: "316px × 190px" },
      ]}
    />
  );
}
