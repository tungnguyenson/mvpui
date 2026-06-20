import { VisaIcon } from "@mvp-ui/ui";

// Payment brand glyph — ships pre-styled SVG; size via the wrapper.
export const Default = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <VisaIcon style={{ height: 32, width: "auto" }} />
  </div>
);
