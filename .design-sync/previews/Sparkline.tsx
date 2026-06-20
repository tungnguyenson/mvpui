import { Sparkline } from "@mvp-ui/ui";

// Deterministic data — random inputs churn render hashes on every build.
const TUPLE_DATA: [number, number][] = [
  [0, 8], [1, 12], [2, 10], [3, 15], [4, 13], [5, 18],
  [6, 16], [7, 20], [8, 18], [9, 24], [10, 22], [11, 28],
];

const BARE_DATA = [14, 13, 15, 12, 11, 13, 10, 9, 8, 8, 7, 6];

export const Default = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <Sparkline data={TUPLE_DATA} />
  </div>
);

export const Tones = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360, maxWidth: "100%" }}>
    <Sparkline data={TUPLE_DATA} tone="brand" />
    <Sparkline data={TUPLE_DATA} tone="success" />
    <Sparkline data={BARE_DATA} tone="error" />
    <Sparkline data={TUPLE_DATA} tone="warning" />
    <Sparkline data={TUPLE_DATA} tone="neutral" />
  </div>
);

export const LineOnly = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <Sparkline data={TUPLE_DATA} tone="brand" filled={false} strokeWidth={2} />
  </div>
);

export const StraightSegments = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <Sparkline data={TUPLE_DATA} smooth={false} />
  </div>
);
