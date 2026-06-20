import { BraintreeIcon } from "@mvp-ui/ui";

// Brand/payment glyph — ships pre-styled SVG; sized via the wrapper.
export const Default = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
    <BraintreeIcon style={{ height: 32, width: "auto" }} />
  </div>
);
