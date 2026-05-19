"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { type Selection } from "react-aria-components";
import { MultiSelect } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const ROLES = [
  { id: "admin", label: "Admin" },
  { id: "editor", label: "Editor" },
  { id: "viewer", label: "Viewer" },
  { id: "billing", label: "Billing" },
  { id: "developer", label: "Developer" },
  { id: "support", label: "Support" },
];

const TEAM = [
  { id: "olivia", label: "Olivia Rhye", supportingText: "olivia@untitledui.com" },
  { id: "phoenix", label: "Phoenix Baker", supportingText: "phoenix@untitledui.com" },
  { id: "lana", label: "Lana Steiner", supportingText: "lana@untitledui.com" },
  { id: "demi", label: "Demi Wilkinson", supportingText: "demi@untitledui.com" },
  { id: "candice", label: "Candice Wu", supportingText: "candice@untitledui.com" },
  { id: "natali", label: "Natali Craig", supportingText: "natali@untitledui.com" },
];

function ControlledExample() {
  const [selected, setSelected] = useState<Selection>(new Set(["admin"]));
  return (
    <MultiSelect
      label="Roles"
      placeholder="Select roles…"
      items={ROLES}
      selectedKeys={selected}
      onSelectionChange={setSelected}
      onReset={() => setSelected(new Set())}
      onSelectAll={() => setSelected(new Set(ROLES.map((r) => r.id)))}
    >
      {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
    </MultiSelect>
  );
}

const SECTIONS: DocExample[] = [
  {
    id: "controlled",
    title: "Controlled",
    description:
      "Track selected keys with `selectedKeys` + `onSelectionChange`. Pass `onReset` / `onSelectAll` to wire the footer actions.",
    preview: (
      <div className="w-full max-w-sm">
        <ControlledExample />
      </div>
    ),
    code: `const [selected, setSelected] = useState<Selection>(new Set(["admin"]));

<MultiSelect
  label="Roles"
  placeholder="Select roles…"
  items={ROLES}
  selectedKeys={selected}
  onSelectionChange={setSelected}
  onReset={() => setSelected(new Set())}
  onSelectAll={() => setSelected(new Set(ROLES.map((r) => r.id)))}
>
  {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
</MultiSelect>`,
  },
  {
    id: "supporting-text",
    title: "With supporting text",
    description: "Items support a `supportingText` secondary line.",
    preview: (
      <div className="w-full max-w-sm">
        <MultiSelect label="Team members" placeholder="Select members…" items={TEAM}>
          {(item) => (
            <MultiSelect.Item
              id={item.id}
              label={item.label}
              supportingText={item.supportingText}
            />
          )}
        </MultiSelect>
      </div>
    ),
    code: `<MultiSelect label="Team members" placeholder="Select members…" items={TEAM}>
  {(item) => (
    <MultiSelect.Item
      id={item.id}
      label={item.label}
      supportingText={item.supportingText}
    />
  )}
</MultiSelect>`,
  },
  {
    id: "no-footer",
    title: "No footer",
    description: "Pass `showFooter={false}` to hide Reset/Select All.",
    preview: (
      <div className="w-full max-w-sm">
        <MultiSelect
          label="Roles"
          placeholder="Select roles…"
          items={ROLES}
          showFooter={false}
        >
          {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
        </MultiSelect>
      </div>
    ),
    code: `<MultiSelect
  label="Roles"
  placeholder="Select roles…"
  items={ROLES}
  showFooter={false}
>
  {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
</MultiSelect>`,
  },
  {
    id: "no-search",
    title: "No search",
    description: "Pass `showSearch={false}` to remove the search input.",
    preview: (
      <div className="w-full max-w-sm">
        <MultiSelect
          label="Roles"
          placeholder="Select roles…"
          items={ROLES}
          showSearch={false}
          showFooter={false}
        >
          {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
        </MultiSelect>
      </div>
    ),
    code: `<MultiSelect
  label="Roles"
  items={ROLES}
  showSearch={false}
  showFooter={false}
>
  {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
</MultiSelect>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Three sizes: `sm`, `md` (default), `lg`.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <MultiSelect
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder="Select…"
            items={ROLES}
            showFooter={false}
            showSearch={false}
          >
            {(item) => <MultiSelect.Item id={item.id} label={item.label} />}
          </MultiSelect>
        ))}
      </div>
    ),
    code: `<MultiSelect size="sm" label="Small" items={items} />
<MultiSelect size="md" label="Medium" items={items} />
<MultiSelect size="lg" label="Large" items={items} />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="MultiSelect"
      tagline="Multi-selection dropdown with search, reset, and select-all footer actions."
      install={{
        usage: `import { MultiSelect } from "@mvp-ui/ui";`,
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
