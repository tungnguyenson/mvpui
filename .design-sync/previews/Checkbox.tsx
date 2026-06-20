import { Checkbox } from "@mvp-ui/ui";

export const Default = () => (
  <Checkbox
    label="Remember me"
    hint="Save my login details for next time."
    size="sm"
  />
);

export const AllStates = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Checkbox label="Unselected" hint="Default state." />
    <Checkbox isSelected label="Selected" hint="Checked state." />
    <Checkbox isIndeterminate label="Indeterminate" hint="Partial selection." />
    <Checkbox isSelected isDisabled label="Selected + disabled" hint="Not interactive." />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <Checkbox isSelected label="Small" hint="size sm (default)." size="sm" />
    <Checkbox isSelected label="Medium" hint="size md." size="md" />
  </div>
);
