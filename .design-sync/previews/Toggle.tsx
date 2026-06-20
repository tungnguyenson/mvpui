import { Toggle } from "@mvp-ui/ui";

export const Default = () => (
  <Toggle
    isSelected
    label="Email notifications"
    hint="Get notified when someone mentions you."
    size="sm"
  />
);

export const AllStates = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <Toggle isSelected label="On" hint="Enabled and active." size="sm" />
    <Toggle label="Off" hint="Default off state." size="sm" />
    <Toggle isSelected isDisabled label="On + disabled" hint="Locked on." size="sm" />
    <Toggle isDisabled label="Off + disabled" hint="Locked off." size="sm" />
    <Toggle isSelected label="Medium" hint="size md, on." size="md" />
  </div>
);

export const Slim = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <Toggle slim isSelected label="Slim on" hint="Thinner track, enabled." size="sm" />
    <Toggle slim label="Slim off" hint="Thinner track, off." size="sm" />
    <Toggle slim isSelected label="Slim medium" hint="size md slim, on." size="md" />
  </div>
);
