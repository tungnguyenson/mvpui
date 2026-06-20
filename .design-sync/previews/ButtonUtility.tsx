import { ButtonUtility } from "@mvp-ui/ui";
import { Copy, Pencil, Settings, Trash2 } from "lucide-react";

export const Secondary = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <ButtonUtility color="secondary" icon={<Pencil />} tooltip="Edit" />
    <ButtonUtility color="secondary" icon={<Copy />} tooltip="Duplicate" />
    <ButtonUtility color="secondary" icon={<Trash2 />} tooltip="Delete" />
    <ButtonUtility color="secondary" icon={<Settings />} tooltip="Settings" />
  </div>
);

export const Tertiary = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <ButtonUtility color="tertiary" icon={<Pencil />} tooltip="Edit" />
    <ButtonUtility color="tertiary" icon={<Copy />} tooltip="Duplicate" />
    <ButtonUtility color="tertiary" icon={<Trash2 />} tooltip="Delete" />
    <ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <ButtonUtility size="xs" icon={<Copy />} tooltip="Copy" />
    <ButtonUtility size="sm" icon={<Copy />} tooltip="Copy" />
  </div>
);

export const Disabled = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <ButtonUtility icon={<Settings />} tooltip="Settings" disabled />
    <ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" disabled />
  </div>
);
