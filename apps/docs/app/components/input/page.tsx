/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Mail, Search, Eye, AlertCircle } from "lucide-react";
import { Input, Label } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const SECTIONS: DocExample[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Default and error states.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input placeholder="Enter your email" />
        <div className="flex flex-col gap-1.5">
          <Input
            variant="error"
            placeholder="Enter your email"
            defaultValue="invalid-email"
          />
          <p className="flex items-center gap-1 text-xs text-fg-error">
            <AlertCircle size={12} />
            Please enter a valid email address.
          </p>
        </div>
      </div>
    ),
    code: `<Input placeholder="Enter your email" />

<Input
  variant="error"
  placeholder="Enter your email"
  defaultValue="invalid-email"
/>`,
  },
  {
    id: "states",
    title: "States",
    description: "Disabled and read-only.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input placeholder="Disabled input" disabled />
        <Input
          defaultValue="Read-only value"
          readOnly
          className="cursor-default"
        />
      </div>
    ),
    code: `<Input placeholder="Disabled input" disabled />
<Input defaultValue="Read-only value" readOnly className="cursor-default" />`,
  },
  {
    id: "with-icons",
    title: "With icons",
    description: "Start and end icon slots accept any ReactNode at 16px.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input placeholder="Search..." startIcon={<Search size={16} />} />
        <Input
          type="email"
          placeholder="you@example.com"
          endIcon={<Mail size={16} />}
        />
        <Input
          type="password"
          placeholder="Enter password"
          startIcon={<Mail size={16} />}
          endIcon={<Eye size={16} />}
        />
      </div>
    ),
    code: `<Input placeholder="Search..." startIcon={<Search size={16} />} />
<Input type="email" placeholder="you@example.com" endIcon={<Mail size={16} />} />
<Input
  type="password"
  placeholder="Enter password"
  startIcon={<Mail size={16} />}
  endIcon={<Eye size={16} />}
/>`,
  },
  {
    id: "with-label",
    title: "With Label",
    description:
      "Compose Label + Input + hint text for a complete form field.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email-full">Email address</Label>
          <Input
            id="email-full"
            type="email"
            placeholder="you@example.com"
            startIcon={<Mail size={16} />}
          />
          <p className="text-xs text-fg-tertiary">
            We&apos;ll never share your email.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email-err">
            Email address <span className="text-error-500">*</span>
          </Label>
          <Input
            id="email-err"
            variant="error"
            type="email"
            defaultValue="not-an-email"
            endIcon={<AlertCircle size={16} className="text-error-500" />}
          />
          <p className="text-xs text-fg-error">
            Please enter a valid email address.
          </p>
        </div>
      </div>
    ),
    code: `<div className="flex flex-col gap-1.5">
  <Label htmlFor="email-full">Email address</Label>
  <Input
    id="email-full"
    type="email"
    placeholder="you@example.com"
    startIcon={<Mail size={16} />}
  />
  <p className="text-xs text-fg-tertiary">We'll never share your email.</p>
</div>`,
  },
];

export default function InputPage() {
  return (
    <ComponentDocLayout
      name="Input"
      tagline="Text input with focus ring, error state, and optional icon slots. Toggle any example to dark with the moon."
      install={{
        usage: `import { Input } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Height", value: "h-11 (44px)" },
        { label: "Border", value: "--color-border" },
        { label: "Focus ring", value: "--brand-500 / 22%" },
        { label: "Error border", value: "--color-error-500" },
        { label: "Radius", value: "--radius-md (8px)" },
        { label: "Padding x", value: "px-3.5 (14px)" },
      ]}
    />
  );
}
