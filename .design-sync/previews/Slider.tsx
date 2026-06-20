import { Slider } from "@mvp-ui/ui";

export const Range = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <Slider defaultValue={[20, 60]} />
  </div>
);

export const BottomLabel = () => (
  <div style={{ width: 360, maxWidth: "100%" }}>
    <Slider defaultValue={[20, 60]} labelPosition="bottom" />
  </div>
);

export const TopFloating = () => (
  <div style={{ width: 360, maxWidth: "100%", paddingTop: 48 }}>
    <Slider defaultValue={[20, 60]} labelPosition="top-floating" />
  </div>
);

export const SingleThumb = () => (
  <div style={{ width: 360, maxWidth: "100%", paddingTop: 48 }}>
    <Slider defaultValue={50} labelPosition="top-floating" />
  </div>
);
