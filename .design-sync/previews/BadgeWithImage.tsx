import { BadgeWithImage } from "@mvp-ui/ui";

// Deterministic inline avatar (percent-encoded SVG data URI) — no network image,
// so the cell never collapses on a failed pravatar/untitledui fetch.
const AVATAR =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="#7f56d9"/>
      <circle cx="50" cy="38" r="20" fill="#ffffff" opacity="0.95"/>
      <path d="M16 96c0-20 15-32 34-32s34 12 34 32z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  );

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
    <BadgeWithImage type="pill-color" color="gray" imgSrc={AVATAR}>Olivia Rhye</BadgeWithImage>
    <BadgeWithImage type="color" color="brand" imgSrc={AVATAR}>Phoenix Baker</BadgeWithImage>
    <BadgeWithImage type="modern" color="gray" imgSrc={AVATAR}>Lana Steiner</BadgeWithImage>
  </Row>
);

export const PillColor = () => (
  <Grid>
    {COLORS.map((color) => (
      <Row key={color}>
        {SIZES.map((size) => (
          <BadgeWithImage key={size} color={color} size={size} imgSrc={AVATAR}>
            Olivia
          </BadgeWithImage>
        ))}
      </Row>
    ))}
  </Grid>
);

export const Modern = () => (
  <Row>
    {SIZES.map((size) => (
      <BadgeWithImage key={size} color="gray" size={size} imgSrc={AVATAR} type="modern">
        Olivia
      </BadgeWithImage>
    ))}
  </Row>
);
