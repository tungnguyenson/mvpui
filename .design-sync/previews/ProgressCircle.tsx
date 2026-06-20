import { ProgressCircle } from "@mvp-ui/ui";

// ProgressCircle = the Recharts radial ring (charts). Props: value (0–100),
// size xs|sm|md|lg, title/subtitle inner labels, color/trackColor overrides.
// (Distinct from ProgressBarCircle which uses min/max/value + label.)

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
    <div style={{ width: 96 }}>
      <ProgressCircle value={40} size="xs" title="40%" subtitle="Users" />
    </div>
    <div style={{ width: 128 }}>
      <ProgressCircle value={60} size="sm" title="60%" subtitle="Users" />
    </div>
    <div style={{ width: 160 }}>
      <ProgressCircle value={75} size="md" title="75%" subtitle="Users" />
    </div>
    <div style={{ width: 192 }}>
      <ProgressCircle value={88} size="lg" title="88%" subtitle="Users" />
    </div>
  </div>
);

export const TitleOnly = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
    <div style={{ width: 96 }}>
      <ProgressCircle value={40} size="xs" title="40%" />
    </div>
    <div style={{ width: 128 }}>
      <ProgressCircle value={65} size="sm" title="65%" />
    </div>
    <div style={{ width: 160 }}>
      <ProgressCircle value={82} size="md" title="82%" />
    </div>
  </div>
);

export const CustomColors = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
    <div style={{ width: 128 }}>
      <ProgressCircle
        value={72}
        size="sm"
        title="72%"
        subtitle="Success"
        color="var(--color-success-fg)"
        trackColor="var(--color-success-bg)"
      />
    </div>
    <div style={{ width: 128 }}>
      <ProgressCircle
        value={45}
        size="sm"
        title="45%"
        subtitle="Warning"
        color="var(--color-warning-fg)"
        trackColor="var(--color-warning-bg)"
      />
    </div>
    <div style={{ width: 128 }}>
      <ProgressCircle
        value={20}
        size="sm"
        title="20%"
        subtitle="Error"
        color="var(--color-error-fg)"
        trackColor="var(--color-error-bg)"
      />
    </div>
  </div>
);
