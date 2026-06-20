import { BackgroundPattern } from "@mvp-ui/ui";

// Decorative background motif — Untitled UI patterns are intentionally subtle
// (light lines that fade outward). Frame each variant and label it.
export const Patterns = () => (
  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
    {(["circle", "grid", "square", "grid-check"] as const).map((p) => (
      <div key={p} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            position: "relative",
            width: 176,
            height: 132,
            overflow: "hidden",
            borderRadius: 12,
            border: "1px solid var(--color-border)",
          }}
        >
          <BackgroundPattern pattern={p} size="md" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-fg-secondary)" }}>{p}</span>
      </div>
    ))}
  </div>
);
