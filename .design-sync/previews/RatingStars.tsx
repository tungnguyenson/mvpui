import { RatingStars } from "@mvp-ui/ui";

const RATINGS = [5, 4.5, 4, 3.5, 3, 2, 1, 0];

export const Ratings = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    {RATINGS.map((rating) => (
      <div key={rating} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <RatingStars rating={rating} />
        <span style={{ fontSize: 14, color: "var(--color-fg-secondary)" }}>{rating}</span>
      </div>
    ))}
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <RatingStars rating={4.5} starClassName="size-3" />
    <RatingStars rating={4.5} starClassName="size-5" />
    <RatingStars rating={4.5} starClassName="size-7" />
  </div>
);

export const CustomCount = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <RatingStars rating={7} stars={10} />
    <span style={{ fontSize: 12, color: "var(--color-fg-tertiary)" }}>7 / 10</span>
  </div>
);
