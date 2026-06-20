import { BarChart } from "@mvp-ui/ui";

// Deterministic data — random inputs would churn render hashes on every build.
const MONTHLY = [
  { month: "Jan", mobile: 420, desktop: 310, tablet: 110 },
  { month: "Feb", mobile: 480, desktop: 280, tablet: 140 },
  { month: "Mar", mobile: 530, desktop: 350, tablet: 95 },
  { month: "Apr", mobile: 610, desktop: 410, tablet: 160 },
  { month: "May", mobile: 560, desktop: 380, tablet: 130 },
  { month: "Jun", mobile: 690, desktop: 440, tablet: 175 },
];

const WEEKLY = [
  { week: "Wk 1", revenue: 4200 },
  { week: "Wk 2", revenue: 6100 },
  { week: "Wk 3", revenue: 5400 },
  { week: "Wk 4", revenue: 7300 },
  { week: "Wk 5", revenue: 6800 },
  { week: "Wk 6", revenue: 8200 },
];

export const Stacked = () => (
  <div style={{ width: 520, maxWidth: "100%" }}>
    <BarChart
      data={MONTHLY}
      xAxisKey="month"
      xAxisLabel="Month"
      yAxisLabel="Users"
      series={[
        { dataKey: "mobile", name: "Mobile", stacked: true },
        { dataKey: "desktop", name: "Desktop", stacked: true },
        { dataKey: "tablet", name: "Tablet", stacked: true },
      ]}
      yAxisFormatter={(v) => Number(v).toLocaleString()}
    />
  </div>
);

export const SingleSeries = () => (
  <div style={{ width: 520, maxWidth: "100%" }}>
    <BarChart
      data={WEEKLY}
      xAxisKey="week"
      xAxisLabel="Week"
      yAxisLabel="Revenue"
      series={[{ dataKey: "revenue", name: "Revenue", stacked: false }]}
      yAxisFormatter={(v) => `$${Number(v).toLocaleString()}`}
      maxBarSize={40}
      showLegend={false}
    />
  </div>
);

export const CustomColors = () => (
  <div style={{ width: 520, maxWidth: "100%" }}>
    <BarChart
      data={MONTHLY}
      xAxisKey="month"
      series={[
        { dataKey: "mobile", name: "Mobile", color: "var(--color-success-fg)" },
        { dataKey: "desktop", name: "Desktop", color: "var(--color-warning-fg)" },
      ]}
      showLegend
    />
  </div>
);
