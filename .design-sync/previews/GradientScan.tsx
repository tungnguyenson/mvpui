import { GradientScan, QRCode } from "@mvp-ui/ui";

export const OverQRCode = () => (
  <div className="relative inline-flex">
    <QRCode value="https://mvp-ui.dev" size="lg" />
    <GradientScan />
  </div>
);

export const Framed = () => (
  <div
    className="relative overflow-hidden rounded-xl border border-border bg-bg-secondary"
    style={{ width: 160, height: 160 }}
  >
    <GradientScan />
  </div>
);
