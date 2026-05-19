"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ChevronDown, Mail, Search } from "lucide-react";
import {
  Input,
  InputAddon,
  InputBase,
  InputDate,
  InputFile,
  InputGroup,
  InputNumber,
  InputPayment,
  InputTags,
  InputTagsOuter,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Base text input with placeholder.",
    preview: (
      <div className="w-full max-w-sm">
        <Input placeholder="Enter text…" />
      </div>
    ),
    code: `<Input placeholder="Enter text…" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disabled state — not interactive, visually muted.",
    preview: (
      <div className="w-full max-w-sm">
        <Input placeholder="Disabled" disabled />
      </div>
    ),
    code: `<Input placeholder="Disabled" disabled />`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "Error state via isInvalid or aria-invalid.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <Input isInvalid defaultValue="invalid-email" />
        <p className="text-xs text-fg-error">Please enter a valid email address.</p>
      </div>
    ),
    code: `<Input isInvalid defaultValue="invalid-email" />
<p className="text-xs text-fg-error">Please enter a valid email address.</p>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm (default) and md. Mirrors Button's rhythm.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input size="sm" placeholder="Size sm" />
        <Input size="md" placeholder="Size md" />
      </div>
    ),
    code: `<Input size="sm" placeholder="Size sm" />
<Input size="md" placeholder="Size md" />`,
  },
  {
    id: "leading-icon",
    title: "Leading icon",
    description: "iconLeading takes a component or element (FC | ReactNode).",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input iconLeading={<Search />} placeholder="Search" type="search" />
        <Input size="md" iconLeading={<Mail />} type="email" placeholder="you@example.com" />
      </div>
    ),
    code: `<Input iconLeading={<Search />} placeholder="Search" type="search" />
<Input size="md" iconLeading={<Mail />} type="email" placeholder="you@example.com" />`,
  },
  {
    id: "leading-dropdown",
    title: "Leading Dropdown",
    description: "Separated leading addon with an interactive selector — country code, protocol, etc.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputGroup
          leadingAddon={
            <InputAddon className="gap-1 pr-2">
              <span className="text-sm">US</span>
              <ChevronDown className="size-3.5 text-fg-tertiary" />
            </InputAddon>
          }
        >
          <InputBase type="tel" placeholder="+1 (555) 000-0000" />
        </InputGroup>
        <InputGroup
          leadingAddon={
            <InputAddon className="gap-1 pr-2">
              <span className="text-sm">USD</span>
              <ChevronDown className="size-3.5 text-fg-tertiary" />
            </InputAddon>
          }
        >
          <InputBase type="number" placeholder="0.00" inputMode="decimal" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup
  leadingAddon={
    <InputAddon className="gap-1 pr-2">
      <span className="text-sm">US</span>
      <ChevronDown className="size-3.5 text-fg-tertiary" />
    </InputAddon>
  }
>
  <InputBase type="tel" placeholder="+1 (555) 000-0000" />
</InputGroup>`,
  },
  {
    id: "trailing-dropdown",
    title: "Trailing dropdown",
    description: "Separated trailing addon with a selector.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputGroup
          trailingAddon={
            <InputAddon position="trailing" className="gap-1 pl-2">
              <span className="text-sm">USD</span>
              <ChevronDown className="size-3.5 text-fg-tertiary" />
            </InputAddon>
          }
        >
          <InputBase placeholder="Amount" inputMode="decimal" />
        </InputGroup>
        <InputGroup
          trailingAddon={
            <InputAddon position="trailing" className="gap-1 pl-2">
              <span className="text-sm">.com</span>
              <ChevronDown className="size-3.5 text-fg-tertiary" />
            </InputAddon>
          }
        >
          <InputBase placeholder="yoursite" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup
  trailingAddon={
    <InputAddon position="trailing" className="gap-1 pl-2">
      <span className="text-sm">USD</span>
      <ChevronDown className="size-3.5 text-fg-tertiary" />
    </InputAddon>
  }
>
  <InputBase placeholder="Amount" inputMode="decimal" />
</InputGroup>`,
  },
  {
    id: "leading-text",
    title: "Leading text",
    description: "Inline prefix text — currency, protocol, unit.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input prefix="$" placeholder="0.00" type="number" />
        <Input prefix="https://" placeholder="yoursite.com" />
      </div>
    ),
    code: `<Input prefix="$" placeholder="0.00" type="number" />
<Input prefix="https://" placeholder="yoursite.com" />`,
  },
  {
    id: "payment-input",
    title: "Payment input",
    description: "Auto-detects card brand and formats digits in groups of 4.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputPayment label="Card number" defaultValue="4111111111111111" />
        <InputPayment label="Card number" defaultValue="5105105105105100" />
        <InputPayment label="Card number" hint="Visa, Mastercard, Amex, Discover." />
      </div>
    ),
    code: `<InputPayment label="Card number" defaultValue="4111111111111111" />
<InputPayment label="Card number" hint="Visa, Mastercard, Amex, Discover." />`,
  },
  {
    id: "trailing-button",
    title: "Trailing button",
    description: "Separated trailing addon with an action button.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputGroup
          label="Referral link"
          trailingAddon={
            <InputAddon
              position="trailing"
              className="cursor-pointer px-3 font-medium text-fg-brand hover:text-fg-brand/80"
            >
              Copy
            </InputAddon>
          }
        >
          <InputBase defaultValue="https://app.example.com/ref/abc123" readOnly />
        </InputGroup>
        <InputGroup
          trailingAddon={
            <InputAddon
              position="trailing"
              className="cursor-pointer px-3 font-medium text-fg-brand hover:text-fg-brand/80"
            >
              Subscribe
            </InputAddon>
          }
        >
          <InputBase type="email" placeholder="you@example.com" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup
  label="Referral link"
  trailingAddon={
    <InputAddon position="trailing" className="cursor-pointer px-3 font-medium text-fg-brand">
      Copy
    </InputAddon>
  }
>
  <InputBase defaultValue="https://app.example.com/ref/abc123" readOnly />
</InputGroup>`,
  },
  {
    id: "file-upload",
    title: "File upload",
    description: "Readonly name field + Upload button over a hidden native file input.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputFile label="Resume" hint="PDF or DOCX, up to 5 MB." />
        <InputFile label="Avatar" isInvalid hint="A file is required." />
      </div>
    ),
    code: `<InputFile label="Resume" hint="PDF or DOCX, up to 5 MB." />`,
  },
  {
    id: "password-input",
    title: "Password input",
    description: "type=\"password\" gets a built-in show/hide toggle.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input type="password" placeholder="Enter password" />
        <Input type="password" defaultValue="hunter2" />
      </div>
    ),
    code: `<Input type="password" placeholder="Enter password" />`,
  },
  {
    id: "date-input",
    title: "Date input",
    description: "Per-segment editing, locale-aware, arrow-key stepping via React Aria DateField.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputDate label="Date of birth" hint="MM / DD / YYYY" />
        <InputDate label="Expiry" isInvalid hint="Date is in the past." />
      </div>
    ),
    code: `<InputDate label="Date of birth" hint="MM / DD / YYYY" />`,
  },
  {
    id: "number-input-horizontal",
    title: "Number input horizontal",
    description: "Stepper buttons on either side of the value.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputNumber
          label="Seats"
          orientation="horizontal"
          defaultValue={2}
          minValue={1}
          maxValue={10}
        />
        <InputNumber
          label="Price"
          orientation="horizontal"
          defaultValue={9.99}
          step={0.01}
          formatOptions={{ style: "currency", currency: "USD" }}
        />
      </div>
    ),
    code: `<InputNumber
  label="Seats"
  orientation="horizontal"
  defaultValue={2}
  minValue={1}
  maxValue={10}
/>`,
  },
  {
    id: "number-input-vertical",
    title: "Number input vertical",
    description: "Stacked ▲/▼ steppers on the trailing edge (default orientation).",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <InputNumber label="Quantity" defaultValue={1} minValue={0} />
        <InputNumber
          label="Discount"
          defaultValue={0.1}
          step={0.05}
          formatOptions={{ style: "percent" }}
        />
      </div>
    ),
    code: `<InputNumber label="Quantity" defaultValue={1} minValue={0} />`,
  },
  {
    id: "tag-input",
    title: "Tag input",
    description: "Tags inside the field — type + Enter to add, Backspace to remove.",
    preview: (
      <div className="w-full max-w-sm">
        <InputTags
          label="Skills"
          placeholder="Add a skill…"
          defaultValue={["TypeScript", "React"]}
          hint="Press Enter to add."
        />
      </div>
    ),
    code: `<InputTags
  label="Skills"
  placeholder="Add a skill…"
  defaultValue={["TypeScript", "React"]}
  hint="Press Enter to add."
/>`,
  },
  {
    id: "tag-input-outer",
    title: "Tag input outer",
    description: "Tags render below the input instead of inside.",
    preview: (
      <div className="w-full max-w-sm">
        <InputTagsOuter
          label="Recipients"
          placeholder="name@team.com"
          defaultValue={["ana@acme.co"]}
        />
      </div>
    ),
    code: `<InputTagsOuter
  label="Recipients"
  placeholder="name@team.com"
  defaultValue={["ana@acme.co"]}
/>`,
  },
];

export default function InputPage() {
  return (
    <ComponentDocLayout
      name="Input"
      tagline={
        <>
          Text input family — base field, leading/trailing slots, inline
          prefix/suffix, and specialized variants for payment, file, date,
          number, and tags. native{" "}
          <code>&lt;input&gt;</code> in an always-on field wrapper.
        </>
      }
      install={{
        usage: `import { Input } from "@mvp-ui/ui";
// Specialized variants
import { InputPayment, InputFile, InputDate, InputNumber, InputTags, InputTagsOuter } from "@mvp-ui/ui";
// Group composition
import { InputGroup, InputAddon, InputBase } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Border", value: "--color-border" },
        { label: "Focus border", value: "--color-border-brand" },
        { label: "Error border", value: "--color-border-error" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
        { label: "Radius", value: "--radius-md (8px)" },
      ]}
    />
  );
}
