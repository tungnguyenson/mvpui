import { BadgeWithDot } from "@mvp-ui/ui";

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
    <BadgeWithDot type="pill-color" color="brand">Label</BadgeWithDot>
    <BadgeWithDot type="color" color="brand">Label</BadgeWithDot>
    <BadgeWithDot type="modern" color="brand">Label</BadgeWithDot>
  </Row>
);

export const PillColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithDot key={size} color={color} size={size} type="pill-color">
            Label
          </BadgeWithDot>
        ))}
      </Row>
    ))}
  </Grid>
);

export const Modern = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithDot key={size} color={color} size={size} type="modern">
            Label
          </BadgeWithDot>
        ))}
      </Row>
    ))}
  </Grid>
);
