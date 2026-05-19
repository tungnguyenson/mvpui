"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { ComboBox, SelectItem } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const FRAMEWORKS = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "solid", label: "SolidJS" },
  { id: "qwik", label: "Qwik" },
];

const USERS = [
  { id: "olivia", label: "Olivia Rhye", supportingText: "olivia@untitledui.com" },
  { id: "phoenix", label: "Phoenix Baker", supportingText: "phoenix@untitledui.com" },
  { id: "lana", label: "Lana Steiner", supportingText: "lana@untitledui.com" },
  { id: "demi", label: "Demi Wilkinson", supportingText: "demi@untitledui.com" },
  { id: "candice", label: "Candice Wu", supportingText: "candice@untitledui.com" },
];

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description:
      "Searchable combobox with React Aria. Type to filter items. Shows a search icon by default.",
    preview: (
      <div className="w-full max-w-sm">
        <ComboBox label="Framework" placeholder="Search frameworks…" items={FRAMEWORKS}>
          {(item) => <SelectItem id={item.id} label={item.label} />}
        </ComboBox>
      </div>
    ),
    code: `<ComboBox label="Framework" placeholder="Search frameworks…" items={FRAMEWORKS}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>`,
  },
  {
    id: "supporting-text",
    title: "With supporting text",
    description:
      "Items can show secondary text via the `supportingText` prop.",
    preview: (
      <div className="w-full max-w-sm">
        <ComboBox label="Assign to" placeholder="Search teammates…" items={USERS}>
          {(item) => (
            <SelectItem id={item.id} label={item.label} supportingText={item.supportingText} />
          )}
        </ComboBox>
      </div>
    ),
    code: `<ComboBox label="Assign to" placeholder="Search teammates…" items={USERS}>
  {(item) => (
    <SelectItem id={item.id} label={item.label} supportingText={item.supportingText} />
  )}
</ComboBox>`,
  },
  {
    id: "shortcut",
    title: "With ⌘K shortcut",
    description:
      "Pass `shortcut` to show the keyboard shortcut hint in the trigger.",
    preview: (
      <div className="w-full max-w-sm">
        <ComboBox label="Search" placeholder="Search…" shortcut items={FRAMEWORKS}>
          {(item) => <SelectItem id={item.id} label={item.label} />}
        </ComboBox>
      </div>
    ),
    code: `<ComboBox label="Search" placeholder="Search…" shortcut items={FRAMEWORKS}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Three sizes: `sm`, `md` (default), `lg`.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <ComboBox
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder="Search…"
            items={FRAMEWORKS}
          >
            {(item) => <SelectItem id={item.id} label={item.label} />}
          </ComboBox>
        ))}
      </div>
    ),
    code: `<ComboBox size="sm" label="Small" placeholder="Search…" items={items}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>
<ComboBox size="md" label="Medium" placeholder="Search…" items={items}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>
<ComboBox size="lg" label="Large" placeholder="Search…" items={items}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Pass `isDisabled` to disable the control.",
    preview: (
      <div className="w-full max-w-sm">
        <ComboBox label="Framework" placeholder="Disabled" isDisabled items={FRAMEWORKS}>
          {(item) => <SelectItem id={item.id} label={item.label} />}
        </ComboBox>
      </div>
    ),
    code: `<ComboBox label="Framework" placeholder="Disabled" isDisabled items={items}>
  {(item) => <SelectItem id={item.id} label={item.label} />}
</ComboBox>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="ComboBox"
      tagline="Searchable combobox backed by React Aria. Type to filter; select from dropdown."
      install={{
        usage: `import { ComboBox, SelectItem } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Trigger", value: "bg-bg · ring-border" },
        { label: "Focus ring", value: "ring-brand-500/22 · ring-border-brand" },
        { label: "Popover", value: "bg-bg · ring-border-secondary" },
      ]}
    />
  );
}
