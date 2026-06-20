import { Badge } from "@mvp-ui/ui";

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

export const PillColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <Badge key={size} color={color} size={size} type="pill-color">
            {color === "success" ? "Active" : color === "error" ? "Overdue" : "Label"}
          </Badge>
        ))}
      </Row>
    ))}
  </Grid>
);

export const BadgeColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <Badge key={size} color={color} size={size} type="color">
            Label
          </Badge>
        ))}
      </Row>
    ))}
  </Grid>
);

export const Modern = () => (
  <Row>
    {SIZES.map((size) => (
      <Badge key={size} color="gray" size={size} type="modern">
        Label
      </Badge>
    ))}
  </Row>
);

export const Dismissable = () => (
  <Row>
    <Badge color="brand" size="md" type="pill-color" onDismiss={() => {}}>
      Design
    </Badge>
    <Badge color="success" size="md" type="color" onDismiss={() => {}}>
      Published
    </Badge>
    <Badge color="error" size="md" type="pill-color" onDismiss={() => {}}>
      Blocked
    </Badge>
  </Row>
);
