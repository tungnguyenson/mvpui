import { Select } from "@mvp-ui/ui";

const items = [
  { label: "Phoenix Baker", id: "phoenix", supportingText: "@phoenix" },
  { label: "Olivia Rhye", id: "olivia", supportingText: "@olivia" },
  { label: "Lana Steiner", id: "lana", supportingText: "@lana", isDisabled: true },
  { label: "Demi Wilkinson", id: "demi", supportingText: "@demi" },
  { label: "Candice Wu", id: "candice", supportingText: "@candice" },
];

const box: React.CSSProperties = { width: 320, maxWidth: "100%" };

export const Default = () => (
  <div style={box}>
    <Select
      isRequired
      label="Team member"
      hint="This is a hint text to help the user."
      placeholder="Select team member"
      items={items}
    >
      {(item: (typeof items)[number]) => (
        <Select.Item id={item.id} supportingText={item.supportingText}>
          {item.label}
        </Select.Item>
      )}
    </Select>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, ...box }}>
    {(["sm", "md", "lg"] as const).map((size) => (
      <Select key={size} size={size} label={`Size ${size}`} placeholder="Select team member" items={items}>
        {(item: (typeof items)[number]) => <Select.Item id={item.id}>{item.label}</Select.Item>}
      </Select>
    ))}
  </div>
);

export const Disabled = () => (
  <div style={box}>
    <Select isDisabled label="Team member" placeholder="Select team member" items={items}>
      {(item: (typeof items)[number]) => <Select.Item id={item.id}>{item.label}</Select.Item>}
    </Select>
  </div>
);
