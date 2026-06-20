import {
  Activity,
  Briefcase,
  AlertOctagon,
  UserPlus,
  Building2,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { MetricCard, LineChart } from "@mvp-ui/ui";

// Deterministic data — random inputs churn render hashes on every build.
const UP_SPARK: [number, number][] = [
  [0, 8], [1, 12], [2, 10], [3, 15], [4, 13], [5, 18],
  [6, 16], [7, 20], [8, 18], [9, 24], [10, 22], [11, 28],
];

const DOWN_SPARK: [number, number][] = [
  [0, 14], [1, 13], [2, 15], [3, 12], [4, 11], [5, 13],
  [6, 10], [7, 9], [8, 8], [9, 8], [10, 7], [11, 6],
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 32 }, { month: "Feb", revenue: 38 },
  { month: "Mar", revenue: 35 }, { month: "Apr", revenue: 44 },
  { month: "May", revenue: 41 }, { month: "Jun", revenue: 49 },
  { month: "Jul", revenue: 46 }, { month: "Aug", revenue: 52 },
  { month: "Sep", revenue: 48 }, { month: "Oct", revenue: 55 },
  { month: "Nov", revenue: 51 }, { month: "Dec", revenue: 58 },
];

export const Simple = () => (
  <div className="w-full max-w-sm">
    <MetricCard label="Views 24 hours" value="2,000" change="100%" trend="up" />
  </div>
);

export const FeaturedIcons = () => (
  <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
    <MetricCard
      label="Total revenue"
      value="$48,295"
      change="8.2%"
      trend="up"
      featuredIcon={<TrendingUp className="size-6" />}
    />
    <MetricCard
      label="Active sessions"
      value="1,204"
      change="3%"
      trend="down"
      featuredIcon={<Activity className="size-6" />}
    />
    <MetricCard
      label="Wallet balance"
      value="₫286M"
      featuredIcon={<Wallet className="size-6" />}
      featuredIconColor="brand"
    />
  </div>
);

export const CompactGrid = () => (
  <div className="grid w-full max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
    {[
      { Icon: Briefcase, color: "brand" as const, value: "2", label: "Open requests" },
      { Icon: AlertOctagon, color: "error" as const, value: "1", label: "Overdue" },
      { Icon: UserPlus, color: "warning" as const, value: "18", label: "Seats to fill" },
      { Icon: Building2, color: "success" as const, value: "24", label: "Active clients" },
    ].map((it) => (
      <MetricCard
        key={it.label}
        variant="compact"
        label={it.label}
        value={it.value}
        valueSize="sm"
        featuredIcon={<it.Icon className="size-5" />}
        featuredIconColor={it.color}
      />
    ))}
  </div>
);

export const WithEverything = () => (
  <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
    <MetricCard
      label="Total customers"
      value="1,284"
      change="12%"
      trend="up"
      featuredIcon={<Users className="size-6" />}
      featuredIconColor="brand"
      spark={UP_SPARK}
      footerLabel="View report"
      footerHref="#"
    />
    <MetricCard
      label="Active sessions"
      value="438"
      change="3%"
      trend="down"
      featuredIcon={<Activity className="size-6" />}
      spark={DOWN_SPARK}
      footerLabel="View report"
      footerHref="#"
    />
  </div>
);

export const ChartSlot = () => (
  <div className="w-full max-w-md">
    <MetricCard label="Revenue" value="$48K" change="12%" trend="up">
      <LineChart
        data={REVENUE_DATA}
        xAxisKey="month"
        series={[{ dataKey: "revenue", name: "Revenue" }]}
        height={100}
        showLegend={false}
      />
    </MetricCard>
  </div>
);
