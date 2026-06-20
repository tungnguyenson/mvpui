import { LineChart } from "@mvp-ui/ui";

// Deterministic data — random inputs churn render hashes on every build.
const DATA = [
  { month: "Jan", premium: 600, basic: 400, free: 100 },
  { month: "Feb", premium: 620, basic: 405, free: 160 },
  { month: "Mar", premium: 630, basic: 400, free: 170 },
  { month: "Apr", premium: 650, basic: 410, free: 190 },
  { month: "May", premium: 600, basic: 320, free: 200 },
  { month: "Jun", premium: 650, basic: 430, free: 230 },
  { month: "Jul", premium: 620, basic: 400, free: 200 },
  { month: "Aug", premium: 750, basic: 540, free: 300 },
  { month: "Sep", premium: 780, basic: 490, free: 390 },
  { month: "Oct", premium: 750, basic: 450, free: 300 },
  { month: "Nov", premium: 780, basic: 480, free: 340 },
  { month: "Dec", premium: 820, basic: 500, free: 450 },
];

export const Area = () => (
  <div style={{ width: 560, maxWidth: "100%" }}>
    <LineChart
      data={DATA}
      xAxisKey="month"
      yAxisLabel="Active users"
      series={[
        { dataKey: "premium", name: "Premium" },
        { dataKey: "basic", name: "Basic" },
        { dataKey: "free", name: "Free" },
      ]}
      yAxisFormatter={(v: number) => Number(v).toLocaleString()}
    />
  </div>
);

export const LineOnly = () => (
  <div style={{ width: 560, maxWidth: "100%" }}>
    <LineChart
      data={DATA}
      xAxisKey="month"
      series={[
        { dataKey: "premium", name: "Premium", filled: false },
        { dataKey: "basic", name: "Basic", filled: false, dashArray: "5 5" },
      ]}
    />
  </div>
);

export const SingleSeries = () => (
  <div style={{ width: 560, maxWidth: "100%" }}>
    <LineChart
      data={DATA}
      xAxisKey="month"
      series={[{ dataKey: "premium", name: "Revenue" }]}
      showLegend={false}
      height={180}
    />
  </div>
);
