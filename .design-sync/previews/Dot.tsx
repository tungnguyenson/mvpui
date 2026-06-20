import { Dot } from "@mvp-ui/ui";

const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 24 };
const cell: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};
const label: React.CSSProperties = { fontSize: 12 };

export const Sizes = () => (
  <div style={row}>
    <div style={cell}>
      <Dot size="sm" className="text-fg-brand" />
      <span style={label} className="text-fg-tertiary">
        sm
      </span>
    </div>
    <div style={cell}>
      <Dot size="md" className="text-fg-brand" />
      <span style={label} className="text-fg-tertiary">
        md
      </span>
    </div>
  </div>
);

export const Colors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {[
      { cls: "text-success-fg", label: "Online" },
      { cls: "text-warning-fg", label: "Away" },
      { cls: "text-error-fg", label: "Offline" },
      { cls: "text-fg-brand", label: "Busy" },
      { cls: "text-fg-tertiary", label: "Idle" },
    ].map((s) => (
      <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Dot size="md" className={s.cls} />
        <span className="text-fg-secondary" style={{ fontSize: 14 }}>
          {s.label}
        </span>
      </div>
    ))}
  </div>
);
