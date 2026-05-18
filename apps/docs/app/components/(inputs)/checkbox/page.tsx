"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Checkbox } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Checkbox with label and hint text. Size sm by default.",
    preview: (
      <Checkbox
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "base",
    title: "Base (no label)",
    description: "Standalone checkbox control with no label or hint.",
    preview: <Checkbox size="sm" />,
    code: `<Checkbox size="sm" />`,
  },
  {
    id: "with-label",
    title: "With label",
    description: "Checkbox with a label but no hint.",
    preview: <Checkbox label="Remember me" size="sm" />,
    code: `<Checkbox label="Remember me" size="sm" />`,
  },
  {
    id: "with-label-and-hint",
    title: "With label and hint",
    description: "Checkbox with both label and hint text.",
    preview: (
      <Checkbox
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disabled state with label and hint.",
    preview: (
      <Checkbox
        isDisabled
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Checkbox isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes: sm and md.",
    preview: (
      <div className="flex flex-col gap-8">
        <Checkbox
          label="Remember me"
          hint="Save my login details for next time."
          size="sm"
        />
        <Checkbox
          label="Remember me"
          hint="Save my login details for next time."
          size="md"
        />
      </div>
    ),
    code: `<Checkbox label="Remember me" hint="Save my login details for next time." size="sm" />
<Checkbox label="Remember me" hint="Save my login details for next time." size="md" />`,
  },
  {
    id: "checkboxes",
    title: "All states",
    description: "All states across both sizes: default, selected, selected+disabled, indeterminate, indeterminate+disabled.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Checkbox label="Remember me" hint="Save my login details for next time." />
          <Checkbox isSelected label="Remember me" hint="Save my login details for next time." />
          <Checkbox isSelected isDisabled label="Remember me" hint="Save my login details for next time." />
          <Checkbox isIndeterminate label="Remember me" hint="Save my login details for next time." />
          <Checkbox isIndeterminate isDisabled label="Remember me" hint="Save my login details for next time." />
        </div>
        <div className="flex flex-col gap-4">
          <Checkbox size="md" label="Remember me" hint="Save my login details for next time." />
          <Checkbox isSelected size="md" label="Remember me" hint="Save my login details for next time." />
          <Checkbox isSelected isDisabled size="md" label="Remember me" hint="Save my login details for next time." />
          <Checkbox isIndeterminate size="md" label="Remember me" hint="Save my login details for next time." />
          <Checkbox isIndeterminate isDisabled size="md" label="Remember me" hint="Save my login details for next time." />
        </div>
      </div>
    ),
    code: `<Checkbox label="Remember me" hint="Save my login details for next time." />
<Checkbox isSelected label="Remember me" hint="Save my login details for next time." />
<Checkbox isSelected isDisabled label="Remember me" hint="Save my login details for next time." />
<Checkbox isIndeterminate label="Remember me" hint="Save my login details for next time." />
<Checkbox isIndeterminate isDisabled label="Remember me" hint="Save my login details for next time." />`,
  },
  {
    id: "checkbox-base",
    title: "Base states",
    description: "All states without labels, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <Checkbox />
          <Checkbox isSelected />
          <Checkbox isSelected isDisabled />
          <Checkbox isIndeterminate />
          <Checkbox isIndeterminate isDisabled />
        </div>
        <div className="flex flex-col gap-2">
          <Checkbox size="md" />
          <Checkbox isSelected size="md" />
          <Checkbox isSelected isDisabled size="md" />
          <Checkbox isIndeterminate size="md" />
          <Checkbox isIndeterminate isDisabled size="md" />
        </div>
      </div>
    ),
    code: `<Checkbox />
<Checkbox isSelected />
<Checkbox isSelected isDisabled />
<Checkbox isIndeterminate />
<Checkbox isIndeterminate isDisabled />`,
  },
];

export default function CheckboxPage() {
  return (
    <ComponentDocLayout
      name="Checkbox"
      tagline="Accessible checkbox built on react-aria with label, hint, indeterminate state, and sm/md sizes."
      install={{ usage: `import { Checkbox, CheckboxBase } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
