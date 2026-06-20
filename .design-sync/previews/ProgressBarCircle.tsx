import { ProgressBarCircle } from "@mvp-ui/ui";

// ProgressBarCircle = the @mvp-ui/ui SVG circle indicator.
// Props: min/max/value, size xxs|xs|sm, optional inner label.
// (Distinct from ProgressCircle which is the Recharts radial ring.)

export const Sizes = () => (
  <div className="flex flex-col items-start gap-10 md:flex-row">
    <ProgressBarCircle size="xxs" min={0} max={100} value={40} />
    <ProgressBarCircle size="xs" min={0} max={100} value={40} />
    <ProgressBarCircle size="sm" min={0} max={100} value={40} />
  </div>
);

export const WithLabel = () => (
  <div className="flex flex-col items-start gap-10 md:flex-row">
    <ProgressBarCircle size="xxs" label="Users" min={0} max={100} value={40} />
    <ProgressBarCircle size="xs" label="Active users" min={0} max={100} value={64} />
    <ProgressBarCircle size="sm" label="Active users" min={0} max={100} value={82} />
  </div>
);
