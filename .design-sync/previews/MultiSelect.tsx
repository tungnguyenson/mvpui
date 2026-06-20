import { MultiSelect } from "@mvp-ui/ui";

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
];

const box: React.CSSProperties = { width: 340, maxWidth: "100%" };

export const Default = () => (
  <div style={box}>
    <MultiSelect
      label="Roles"
      placeholder="Select roles…"
      items={ROLES}
      defaultSelectedKeys={new Set(["admin", "editor"])}
    >
      {(item: (typeof ROLES)[number]) => <MultiSelect.Item id={item.id} label={item.label} />}
    </MultiSelect>
  </div>
);

export const SupportingText = () => (
  <div style={box}>
    <MultiSelect label="Team members" placeholder="Select members…" items={TEAM}>
      {(item: (typeof TEAM)[number]) => (
        <MultiSelect.Item id={item.id} label={item.label} supportingText={item.supportingText} />
      )}
    </MultiSelect>
  </div>
);

export const Sizes = () => (
  <div style={{ ...box, display: "flex", flexDirection: "column", gap: 16 }}>
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
        {(item: (typeof ROLES)[number]) => <MultiSelect.Item id={item.id} label={item.label} />}
      </MultiSelect>
    ))}
  </div>
);

export const Disabled = () => (
  <div style={box}>
    <MultiSelect label="Roles" placeholder="Select roles…" items={ROLES} isDisabled>
      {(item: (typeof ROLES)[number]) => <MultiSelect.Item id={item.id} label={item.label} />}
    </MultiSelect>
  </div>
);
