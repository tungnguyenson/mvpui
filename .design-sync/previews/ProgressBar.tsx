import { ProgressBar } from "@mvp-ui/ui";

export const Default = () => (
  <div className="w-96 max-w-full">
    <ProgressBar min={0} max={100} value={40} />
  </div>
);

export const LabelRight = () => (
  <div className="w-96 max-w-full">
    <ProgressBar labelPosition="right" min={0} max={100} value={64} />
  </div>
);

export const LabelBottom = () => (
  <div className="w-96 max-w-full">
    <ProgressBar labelPosition="bottom" min={0} max={100} value={78} />
  </div>
);

export const FloatingTop = () => (
  <div className="w-96 max-w-full pt-8 pb-4">
    <ProgressBar labelPosition="top-floating" min={0} max={100} value={40} />
  </div>
);
