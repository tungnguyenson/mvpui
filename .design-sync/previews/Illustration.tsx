import { Illustration } from "@mvp-ui/ui";

// Aggregate illustration — `type` selects the spot illustration.
export const Types = () => (
  <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-end" }}>
    {(["box", "cloud", "documents", "credit-card"] as const).map((t) => (
      <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Illustration type={t} size="md" />
        <span style={{ fontSize: 12, color: "var(--color-fg-tertiary)" }}>{t}</span>
      </div>
    ))}
  </div>
);
