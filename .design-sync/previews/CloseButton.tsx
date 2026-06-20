import { CloseButton } from "@mvp-ui/ui";

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <CloseButton size="xs" />
    <CloseButton size="sm" />
    <CloseButton size="md" />
    <CloseButton size="lg" />
  </div>
);

export const OnColor = () => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 12 }}
    className="rounded-xl bg-primary p-4"
  >
    <CloseButton tone="on-color" size="sm" />
    <CloseButton tone="on-color" size="md" />
  </div>
);
