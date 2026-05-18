"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Label, Input } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Default, required, and disabled label styling.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <Label>Email address</Label>
        <Label>
          Email address <span className="text-error-500">*</span>
        </Label>
        <Label className="cursor-not-allowed opacity-50">Email address</Label>
      </div>
    ),
    code: `<Label>Email address</Label>
<Label>Email address <span className="text-error-500">*</span></Label>
<Label className="opacity-50 cursor-not-allowed">Email address</Label>`,
  },
  {
    id: "with-input",
    title: "With input",
    description:
      "Label paired with Input via htmlFor — clicking the label focuses the input.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email-demo">Email address</Label>
          <Input id="email-demo" type="email" placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password-demo">
            Password <span className="text-error-500">*</span>
          </Label>
          <Input id="password-demo" type="password" placeholder="••••••••" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="disabled-demo"
            className="cursor-not-allowed opacity-50"
          >
            Disabled field
          </Label>
          <Input id="disabled-demo" placeholder="Not editable" disabled />
        </div>
      </div>
    ),
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email-demo">Email address</Label>
  <Input id="email-demo" type="email" placeholder="you@example.com" />
</div>`,
  },
];

export default function LabelPage() {
  return (
    <ComponentDocLayout
      name="Label"
      tagline={
        <>
          Renders a <code>&lt;label&gt;</code> element with consistent
          typography. Always associate with a form control via{" "}
          <code>htmlFor</code>. Toggle any example to dark with the moon.
        </>
      }
      install={{
        usage: `import { Label } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Font size", value: "--text-sm (14px)" },
        { label: "Font weight", value: "500 (medium)" },
        { label: "Color", value: "--color-fg" },
      ]}
    />
  );
}
