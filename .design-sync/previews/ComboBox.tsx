import { ComboBox, SelectItem } from "@mvp-ui/ui";

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
];

const box: React.CSSProperties = { width: 340, maxWidth: "100%" };

export const Default = () => (
  <div style={box}>
    <ComboBox label="Framework" placeholder="Search frameworks…" items={FRAMEWORKS}>
      {(item: (typeof FRAMEWORKS)[number]) => <SelectItem id={item.id} label={item.label} />}
    </ComboBox>
  </div>
);

export const SupportingText = () => (
  <div style={box}>
    <ComboBox label="Assign to" placeholder="Search teammates…" items={USERS}>
      {(item: (typeof USERS)[number]) => (
        <SelectItem id={item.id} label={item.label} supportingText={item.supportingText} />
      )}
    </ComboBox>
  </div>
);

export const Shortcut = () => (
  <div style={box}>
    <ComboBox label="Search" placeholder="Search…" shortcut items={FRAMEWORKS}>
      {(item: (typeof FRAMEWORKS)[number]) => <SelectItem id={item.id} label={item.label} />}
    </ComboBox>
  </div>
);

export const Sizes = () => (
  <div style={{ ...box, display: "flex", flexDirection: "column", gap: 16 }}>
    {(["sm", "md", "lg"] as const).map((size) => (
      <ComboBox key={size} size={size} label={`Size: ${size}`} placeholder="Search…" items={FRAMEWORKS}>
        {(item: (typeof FRAMEWORKS)[number]) => <SelectItem id={item.id} label={item.label} />}
      </ComboBox>
    ))}
  </div>
);

export const Disabled = () => (
  <div style={box}>
    <ComboBox label="Framework" placeholder="Disabled" isDisabled items={FRAMEWORKS}>
      {(item: (typeof FRAMEWORKS)[number]) => <SelectItem id={item.id} label={item.label} />}
    </ComboBox>
  </div>
);
