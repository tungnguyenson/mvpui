import { QRCode } from "@mvp-ui/ui";

const DEMO_URL = "https://mvp-ui.dev";

const cap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
};

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>
    <div style={cap}>
      <QRCode value={DEMO_URL} size="md" />
      <span className="text-fg-tertiary" style={{ fontSize: 12 }}>
        md
      </span>
    </div>
    <div style={cap}>
      <QRCode value={DEMO_URL} size="lg" />
      <span className="text-fg-tertiary" style={{ fontSize: 12 }}>
        lg
      </span>
    </div>
  </div>
);

export const CustomStyling = () => (
  <div className="relative inline-flex">
    <QRCode
      value={DEMO_URL}
      size="lg"
      options={{
        dotsOptions: { type: "rounded", color: "#7f56d9" },
        backgroundOptions: { color: "#ffffff" },
      }}
    />
  </div>
);
