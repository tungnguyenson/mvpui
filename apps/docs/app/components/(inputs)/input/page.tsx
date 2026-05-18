"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { AtSign, Lock, Mail, Search, User } from "lucide-react";
import { Input, Label } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes — sm (default) and md. Mirrors Button's rhythm.",
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
    id: "states",
    title: "States",
    description:
      "Default, error (isInvalid / aria-invalid), success, disabled, read-only.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input placeholder="Default" />
        <div className="flex flex-col gap-1.5">
          <Input isInvalid defaultValue="invalid-email" />
          <p className="text-xs text-fg-error">
            Please enter a valid email address.
          </p>
        </div>
        <Input isSuccess defaultValue="you@example.com" />
        <Input placeholder="Disabled" disabled />
        <Input defaultValue="Read-only value" readOnly />
      </div>
    ),
    code: `<Input placeholder="Default" />

<Input isInvalid defaultValue="invalid-email" />
{/* aria-invalid alone also triggers the error visual */}

<Input isSuccess defaultValue="you@example.com" />

<Input placeholder="Disabled" disabled />

<Input defaultValue="Read-only value" readOnly />`,
  },
  {
    id: "icon-leading",
    title: "Icon leading",
    description:
      "iconLeading takes a component or element (FC | ReactNode), like Button.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input iconLeading={<Search />} placeholder="Search" type="search" />
        <Input
          size="md"
          iconLeading={<Mail />}
          type="email"
          placeholder="you@example.com"
        />
      </div>
    ),
    code: `<Input iconLeading={<Search />} placeholder="Search" type="search" />
<Input size="md" iconLeading={<Mail />} type="email" placeholder="you@example.com" />`,
  },
  {
    id: "icon-trailing",
    title: "Icon trailing",
    description: "iconTrailing renders after the input.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input iconTrailing={<User />} placeholder="Username" />
        <Input
          isInvalid
          iconTrailing={<Mail />}
          type="email"
          defaultValue="not-an-email"
        />
      </div>
    ),
    code: `<Input iconTrailing={<User />} placeholder="Username" />
<Input isInvalid iconTrailing={<Mail />} type="email" defaultValue="not-an-email" />`,
  },
  {
    id: "prefix",
    title: "Prefix text",
    description: "Inline text before the input — currency, protocol, etc.",
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
    id: "suffix",
    title: "Suffix text",
    description: "Inline text after the input — unit, domain, etc.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input suffix="USD" placeholder="0.00" type="number" />
        <Input suffix=".com" placeholder="yoursite" />
      </div>
    ),
    code: `<Input suffix="USD" placeholder="0.00" type="number" />
<Input suffix=".com" placeholder="yoursite" />`,
  },
  {
    id: "shortcut",
    title: "Keyboard shortcut",
    description: "Muted trailing hint for command-palette style inputs.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input iconLeading={<Search />} placeholder="Search" shortcut="⌘K" />
        <Input size="md" placeholder="Quick jump" shortcut="Ctrl J" />
      </div>
    ),
    code: `<Input iconLeading={<Search />} placeholder="Search" shortcut="⌘K" />
<Input size="md" placeholder="Quick jump" shortcut="Ctrl J" />`,
  },
  {
    id: "placeholder",
    title: "Placeholder",
    description: "Placeholder uses fg-tertiary; value uses fg.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input placeholder="Empty — placeholder shown" />
        <Input defaultValue="Filled — value shown" />
      </div>
    ),
    code: `<Input placeholder="Empty — placeholder shown" />
<Input defaultValue="Filled — value shown" />`,
  },
  {
    id: "types",
    title: "Input types",
    description: "Native HTML types pass straight through the type prop.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input type="text" placeholder="text" />
        <Input type="email" iconLeading={<AtSign />} placeholder="email" />
        <Input type="password" iconLeading={<Lock />} placeholder="password" />
        <Input type="search" iconLeading={<Search />} placeholder="search" />
        <Input type="number" prefix="$" placeholder="number" />
        <Input type="url" prefix="https://" placeholder="url" />
        <Input type="tel" placeholder="tel" />
      </div>
    ),
    code: `<Input type="text" placeholder="text" />
<Input type="email" iconLeading={<AtSign />} placeholder="email" />
<Input type="password" iconLeading={<Lock />} placeholder="password" />
<Input type="search" iconLeading={<Search />} placeholder="search" />
<Input type="number" prefix="$" placeholder="number" />
<Input type="url" prefix="https://" placeholder="url" />
<Input type="tel" placeholder="tel" />`,
  },
  {
    id: "with-label",
    title: "With Label",
    description:
      "Input is just the control — compose Label + hint externally (FormField lands in v0.2.0).",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-1.5">
        <Label htmlFor="email-field">Email address</Label>
        <Input
          id="email-field"
          type="email"
          iconLeading={<Mail />}
          placeholder="you@example.com"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="text-xs text-fg-tertiary">
          We&apos;ll never share your email.
        </p>
      </div>
    ),
    code: `<Label htmlFor="email-field">Email address</Label>
<Input
  id="email-field"
  type="email"
  iconLeading={<Mail />}
  placeholder="you@example.com"
  aria-describedby="email-hint"
/>
<p id="email-hint" className="text-xs text-fg-tertiary">
  We'll never share your email.
</p>`,
  },
];

export default function InputPage() {
  return (
    <ComponentDocLayout
      name="Input"
      tagline={
        <>
          Text input with focus-within ring, error/success states, and
          icon/prefix/suffix/shortcut slots. API mirrors Untitled UI; native{" "}
          <code>&lt;input&gt;</code> in an always-on field wrapper. Toggle any
          example to dark with the moon.
        </>
      }
      install={{
        usage: `import { Input } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Border", value: "--color-border" },
        { label: "Focus border", value: "--color-border-brand" },
        { label: "Error border", value: "--color-border-error" },
        { label: "Success border", value: "--color-border-success" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
        { label: "Radius", value: "--radius-md (8px)" },
      ]}
    />
  );
}
