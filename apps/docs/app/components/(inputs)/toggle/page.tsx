"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Toggle } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Toggle with label and hint. Size sm by default.",
    preview: (
      <Toggle
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Toggle label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "base",
    title: "Base (no label)",
    description: "Standalone toggle control with no label or hint.",
    preview: <Toggle size="sm" />,
    code: `<Toggle size="sm" />`,
  },
  {
    id: "with-label",
    title: "With label",
    description: "Toggle with a label but no hint.",
    preview: <Toggle label="Remember me" size="sm" />,
    code: `<Toggle label="Remember me" size="sm" />`,
  },
  {
    id: "with-label-and-hint",
    title: "With label and hint",
    description: "Toggle with both label and hint text.",
    preview: (
      <Toggle
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Toggle label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disabled toggle with label and hint.",
    preview: (
      <Toggle
        isDisabled
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes: sm and md.",
    preview: (
      <div className="flex flex-col gap-8">
        <Toggle
          label="Remember me"
          hint="Save my login details for next time."
          size="sm"
        />
        <Toggle
          label="Remember me"
          hint="Save my login details for next time."
          size="md"
        />
      </div>
    ),
    code: `<Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
<Toggle label="Remember me" hint="Save my login details for next time." size="md" />`,
  },
  {
    id: "slim-base",
    title: "Slim base",
    description: "Slim variant toggle without label or hint.",
    preview: <Toggle slim size="sm" />,
    code: `<Toggle slim size="sm" />`,
  },
  {
    id: "slim-with-label-and-hint",
    title: "Slim with label and hint",
    description: "Slim variant toggle with label and hint.",
    preview: (
      <Toggle
        slim
        label="Remember me"
        hint="Save my login details for next time."
        size="sm"
      />
    ),
    code: `<Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "toggles",
    title: "All states",
    description: "Default and disabled, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
          <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
        </div>
        <div className="flex flex-col gap-4">
          <Toggle label="Remember me" hint="Save my login details for next time." size="md" />
          <Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="md" />
        </div>
      </div>
    ),
    code: `<Toggle label="Remember me" hint="Save my login details for next time." size="sm" />
<Toggle isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "toggle-base",
    title: "Base states",
    description: "Toggle controls without labels, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Toggle size="sm" />
          <Toggle isDisabled size="sm" />
        </div>
        <div className="flex flex-col gap-4">
          <Toggle size="md" />
          <Toggle isDisabled size="md" />
        </div>
      </div>
    ),
    code: `<Toggle size="sm" />
<Toggle isDisabled size="sm" />`,
  },
  {
    id: "toggles-slim",
    title: "Slim — all states",
    description: "Slim variant, default and disabled, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />
          <Toggle slim isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />
        </div>
        <div className="flex flex-col gap-4">
          <Toggle slim label="Remember me" hint="Save my login details for next time." size="md" />
          <Toggle slim isDisabled label="Remember me" hint="Save my login details for next time." size="md" />
        </div>
      </div>
    ),
    code: `<Toggle slim label="Remember me" hint="Save my login details for next time." size="sm" />
<Toggle slim isDisabled label="Remember me" hint="Save my login details for next time." size="sm" />`,
  },
  {
    id: "toggle-slim-base",
    title: "Slim base states",
    description: "Slim variant controls without labels, across both sizes.",
    preview: (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Toggle slim size="sm" />
          <Toggle slim isDisabled size="sm" />
        </div>
        <div className="flex flex-col gap-4">
          <Toggle slim size="md" />
          <Toggle slim isDisabled size="md" />
        </div>
      </div>
    ),
    code: `<Toggle slim size="sm" />
<Toggle slim isDisabled size="sm" />`,
  },
];

export default function TogglePage() {
  return (
    <ComponentDocLayout
      name="Toggle"
      tagline="Accessible switch built on react-aria with label, hint, slim variant, and sm/md sizes."
      install={{ usage: `import { Toggle, ToggleBase } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
