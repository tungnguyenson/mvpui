import { ProgressBarHalfCircle } from "@mvp-ui/ui";

// Gauge-style half-circle indicator. Props: min/max/value, size xxs|xs|sm,
// optional inner label.

export const Sizes = () => (
  <div className="flex flex-col items-start gap-10 md:flex-row">
    <ProgressBarHalfCircle size="xxs" min={0} max={100} value={40} />
    <ProgressBarHalfCircle size="xs" min={0} max={100} value={40} />
    <ProgressBarHalfCircle size="sm" min={0} max={100} value={40} />
  </div>
);

export const WithLabel = () => (
  <div className="flex flex-col items-start gap-10 md:flex-row">
    <ProgressBarHalfCircle size="xxs" label="Users" min={0} max={100} value={40} />
    <ProgressBarHalfCircle size="xs" label="Active users" min={0} max={100} value={64} />
    <ProgressBarHalfCircle size="sm" label="Active users" min={0} max={100} value={82} />
  </div>
);
