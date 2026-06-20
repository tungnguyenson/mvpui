import { GooglePlayButton } from "@mvp-ui/ui";

const HREF = "https://play.google.com/store/apps/details?id=com.acme.app";

export const Default = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
    <GooglePlayButton href={HREF} />
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
    <GooglePlayButton href={HREF} size="md" />
    <GooglePlayButton href={HREF} size="lg" />
  </div>
);
