import { BadgeWithButton } from "@mvp-ui/ui";

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
    <BadgeWithButton type="pill-color" color="brand" buttonLabel="Clear" onButtonClick={() => {}}>Design</BadgeWithButton>
    <BadgeWithButton type="color" color="gray" buttonLabel="Clear" onButtonClick={() => {}}>Engineering</BadgeWithButton>
    <BadgeWithButton type="modern" color="gray" buttonLabel="Clear" onButtonClick={() => {}}>Product</BadgeWithButton>
  </Row>
);

export const PillColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithButton key={size} color={color} size={size} type="pill-color" buttonLabel="Clear" onButtonClick={() => {}}>
            Label
          </BadgeWithButton>
        ))}
      </Row>
    ))}
  </Grid>
);

export const Modern = () => (
  <Row>
    {SIZES.map((size) => (
      <BadgeWithButton key={size} color="gray" size={size} type="modern" buttonLabel="Clear" onButtonClick={() => {}}>
        Label
      </BadgeWithButton>
    ))}
  </Row>
);
