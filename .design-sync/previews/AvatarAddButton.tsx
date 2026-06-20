import { AvatarAddButton } from "@mvp-ui/ui";

const SIZES = ["xs", "sm", "md"] as const;

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    {SIZES.map((sz) => (
      <AvatarAddButton key={sz} size={sz} />
    ))}
  </div>
);

export const WithLabel = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <AvatarAddButton size="md" label="Invite teammate" />
  </div>
);
