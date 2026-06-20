import { BadgeWithFlag } from "@mvp-ui/ui";

// NOTE: BadgeWithFlag hardcodes its flag <img> to
// https://www.untitledui.com/images/flags/{flag}.svg — the host can't be
// overridden from a preview. The badge shell (ring/color/shape/label) always
// renders; only the small flag circle depends on that network image.
const COLORS = [
  "gray", "brand", "error", "warning", "success",
  "slate", "sky", "blue", "indigo", "purple", "pink", "orange",
] as const;
const SIZES = ["sm", "md", "lg"] as const;

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
    {children}
  </div>
);
const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>
);

export const Types = () => (
  <Row>
    <BadgeWithFlag type="pill-color" color="gray" flag="AU">Australia</BadgeWithFlag>
    <BadgeWithFlag type="color" color="gray" flag="US">United States</BadgeWithFlag>
    <BadgeWithFlag type="modern" color="gray" flag="GB">United Kingdom</BadgeWithFlag>
  </Row>
);

export const PillColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithFlag key={size} color={color} size={size} flag="AU" type="pill-color">
            Australia
          </BadgeWithFlag>
        ))}
      </Row>
    ))}
  </Grid>
);

export const Modern = () => (
  <Row>
    {SIZES.map((size) => (
      <BadgeWithFlag key={size} color="gray" size={size} flag="AU" type="modern">
        Australia
      </BadgeWithFlag>
    ))}
  </Row>
);
