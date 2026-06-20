import { AppStoreButton } from "@mvp-ui/ui";

const HREF = "https://apps.apple.com/app/id1234567890";

export const Default = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
    <AppStoreButton href={HREF} />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
    <AppStoreButton href={HREF} size="md" />
    <AppStoreButton href={HREF} size="lg" />
  </div>
);
