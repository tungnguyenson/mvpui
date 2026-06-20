import { TagSelect } from "@mvp-ui/ui";

// TagSelect is a combobox: selected items render as removable chips inside the
// trigger (visible statically). The dropdown popover only opens on focus, so
// the closed trigger + chips is the true static render.
const SKILLS = [
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "nextjs", label: "Next.js" },
  { id: "graphql", label: "GraphQL" },
  { id: "postgres", label: "PostgreSQL" },
];

const TEAM = [
  { id: "olivia", label: "Olivia Rhye", supportingText: "olivia@untitledui.com" },
  { id: "phoenix", label: "Phoenix Baker", supportingText: "phoenix@untitledui.com" },
  { id: "lana", label: "Lana Steiner", supportingText: "lana@untitledui.com" },
];

export const Default = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <TagSelect
      label="Skills"
      placeholder="Search skills…"
      items={SKILLS}
      defaultSelectedIds={["react", "typescript"]}
    >
      {(item) => <TagSelect.Item id={item.id} label={item.label} />}
    </TagSelect>
  </div>
);

export const SupportingText = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <TagSelect
      label="Assign to"
      placeholder="Search members…"
      items={TEAM}
      defaultSelectedIds={["olivia"]}
    >
      {(item) => (
        <TagSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} />
      )}
    </TagSelect>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360, maxWidth: "100%" }}>
    {(["sm", "md", "lg"] as const).map((size) => (
      <TagSelect
        key={size}
        size={size}
        label={`Size: ${size}`}
        placeholder="Search…"
        items={SKILLS}
        defaultSelectedIds={["react"]}
      >
        {(item) => <TagSelect.Item id={item.id} label={item.label} />}
      </TagSelect>
    ))}
  </div>
);

export const Disabled = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <TagSelect
      label="Skills"
      placeholder="Disabled"
      items={SKILLS}
      isDisabled
      defaultSelectedIds={["react", "tailwind"]}
    >
      {(item) => <TagSelect.Item id={item.id} label={item.label} />}
    </TagSelect>
  </div>
);
