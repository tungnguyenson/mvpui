import { LoadingIndicator } from "@mvp-ui/ui";

const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 24 };
const labelCol: React.CSSProperties = {
  width: 88,
  fontSize: 13,
};

export const Spinner = () => (
  <div style={row}>
    <LoadingIndicator size="sm" />
    <LoadingIndicator size="md" />
    <LoadingIndicator size="lg" />
  </div>
);

export const Dots = () => (
  <div style={row}>
    <LoadingIndicator variant="dots" size="sm" />
    <LoadingIndicator variant="dots" size="md" />
    <LoadingIndicator variant="dots" size="lg" />
  </div>
);

export const Colors = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <div style={row}>
      <span className="text-fg-tertiary" style={labelCol}>
        Primary
      </span>
      <LoadingIndicator size="md" color="primary" />
      <LoadingIndicator variant="dots" size="md" color="primary" />
    </div>
    <div style={row}>
      <span className="text-fg-tertiary" style={labelCol}>
        Secondary
      </span>
      <LoadingIndicator size="md" color="secondary" />
      <LoadingIndicator variant="dots" size="md" color="secondary" />
    </div>
  </div>
);
