"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { TagSelect } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SKILLS = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "nextjs", label: "Next.js" },
  { id: "graphql", label: "GraphQL" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "docker", label: "Docker" },
  { id: "terraform", label: "Terraform" },
];

const TEAM = [
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
      "Pick items from the dropdown; they appear as chips inside the trigger. Type to filter.",
    preview: (
      <div className="w-full max-w-sm">
        <TagSelect
          label="Skills"
          placeholder="Search skills…"
          items={SKILLS}
          defaultSelectedIds={["react", "typescript"]}
        >
          {(item) => <TagSelect.Item id={item.id} label={item.label} />}
        </TagSelect>
      </div>
    ),
    code: `<TagSelect
  label="Skills"
  placeholder="Search skills…"
  items={SKILLS}
  defaultSelectedIds={["react", "typescript"]}
>
  {(item) => <TagSelect.Item id={item.id} label={item.label} />}
</TagSelect>`,
  },
  {
    id: "supporting-text",
    title: "With supporting text",
    description: "Items support a secondary line via `supportingText`.",
    preview: (
      <div className="w-full max-w-sm">
        <TagSelect
          label="Assign to"
          placeholder="Search members…"
          items={TEAM}
        >
          {(item) => (
            <TagSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} />
          )}
        </TagSelect>
      </div>
    ),
    code: `<TagSelect label="Assign to" placeholder="Search members…" items={TEAM}>
  {(item) => (
    <TagSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} />
  )}
</TagSelect>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Three sizes: `sm` (default), `md`, `lg`.",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <TagSelect
            key={size}
            size={size}
            label={`Size: ${size}`}
            placeholder="Search…"
            items={SKILLS}
          >
            {(item) => <TagSelect.Item id={item.id} label={item.label} />}
          </TagSelect>
        ))}
      </div>
    ),
    code: `<TagSelect size="sm" label="Small" items={items} />
<TagSelect size="md" label="Medium" items={items} />
<TagSelect size="lg" label="Large" items={items} />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Pass `isDisabled` to disable the field.",
    preview: (
      <div className="w-full max-w-sm">
        <TagSelect
          label="Skills"
          placeholder="Disabled"
          items={SKILLS}
          isDisabled
          defaultSelectedIds={["react"]}
        >
          {(item) => <TagSelect.Item id={item.id} label={item.label} />}
        </TagSelect>
      </div>
    ),
    code: `<TagSelect label="Skills" isDisabled defaultSelectedIds={["react"]} items={items}>
  {(item) => <TagSelect.Item id={item.id} label={item.label} />}
</TagSelect>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="TagSelect"
      tagline="Combobox where selected items render as removable chips inside the trigger."
      install={{
        usage: `import { TagSelect } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Trigger", value: "bg-bg · ring-border" },
        { label: "Chip", value: "bg-bg-secondary · ring-border" },
        { label: "Popover", value: "bg-bg · ring-border-secondary" },
      ]}
    />
  );
}
