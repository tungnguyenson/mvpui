import { RatingBadge } from "@mvp-ui/ui";

// theme="light" is designed to sit on a dark/brand surface — render it inside a
// brand-bg container (as the docs do) so it isn't low-contrast on the card.
export const Dark = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: 24,
      borderRadius: 16,
    }}
  >
    <RatingBadge />
  </div>
);

export const Light = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: 32,
      borderRadius: 16,
      background: "var(--color-primary)",
    }}
  >
    <RatingBadge theme="light" />
  </div>
);

export const Custom = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 32, padding: 24 }}>
    <RatingBadge rating={4.8} title="Top Rated" subtitle="12,000+ reviews" />
    <RatingBadge rating={3.5} title="Good" subtitle="500 reviews" />
  </div>
);
