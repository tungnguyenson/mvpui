import { PieChart } from "@mvp-ui/ui";

// Deterministic data — random inputs churn render hashes on every build.
const DATA = [
  { name: "Direct", value: 35 },
  { name: "Organic", value: 28 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 12 },
  { name: "Other", value: 7 },
];

const CUSTOM_PALETTE = [
  "var(--color-success-fg)",
  "var(--color-warning-fg)",
  "var(--color-error-fg)",
  "var(--color-brand-600)",
  "var(--color-fg-tertiary)",
];

export const Donut = () => (
  <div style={{ width: 420, maxWidth: "100%" }}>
    <PieChart data={DATA} innerRadiusRatio={0.55} />
  </div>
);

export const SolidPie = () => (
  <div style={{ width: 480, maxWidth: "100%" }}>
    <PieChart data={DATA} innerRadiusRatio={0} height={200} legendAlign="right" />
  </div>
);

export const CustomColors = () => (
  <div style={{ width: 420, maxWidth: "100%" }}>
    <PieChart
      data={DATA.map((d, i) => ({ ...d, color: CUSTOM_PALETTE[i] }))}
      innerRadiusRatio={0.55}
    />
  </div>
);
