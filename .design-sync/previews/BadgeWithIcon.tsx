import { BadgeWithIcon } from "@mvp-ui/ui";
import { ArrowRight, ArrowUp, TrendingUp, Check } from "lucide-react";

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

export const Showcase = () => (
  <Row>
    <BadgeWithIcon color="success" type="pill-color" iconLeading={TrendingUp}>+12%</BadgeWithIcon>
    <BadgeWithIcon color="brand" type="pill-color" iconTrailing={ArrowRight}>Upgrade</BadgeWithIcon>
    <BadgeWithIcon color="gray" type="modern" iconLeading={Check}>Verified</BadgeWithIcon>
  </Row>
);

export const IconLeading = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithIcon key={size} color={color} size={size} type="pill-color" iconLeading={ArrowUp}>
            Label
          </BadgeWithIcon>
        ))}
      </Row>
    ))}
  </Grid>
);

export const IconTrailing = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithIcon key={size} color={color} size={size} type="color" iconTrailing={ArrowRight}>
            Label
          </BadgeWithIcon>
        ))}
      </Row>
    ))}
  </Grid>
);
