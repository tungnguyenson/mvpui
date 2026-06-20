import { Segmented, SegmentedItem } from "@mvp-ui/ui";

const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 20 };

export const Surface = () => (
  <Segmented defaultSelectedKeys={["light"]} aria-label="Theme">
    <SegmentedItem id="light">Light</SegmentedItem>
    <SegmentedItem id="dark">Dark</SegmentedItem>
  </Segmented>
);

export const Brand = () => (
  <Segmented variant="brand" defaultSelectedKeys={["dark"]} aria-label="Theme">
    <SegmentedItem id="light">Light</SegmentedItem>
    <SegmentedItem id="dark">Dark</SegmentedItem>
  </Segmented>
);

export const ThreeOptions = () => (
  <Segmented defaultSelectedKeys={["week"]} aria-label="Range">
    <SegmentedItem id="day">Day</SegmentedItem>
    <SegmentedItem id="week">Week</SegmentedItem>
    <SegmentedItem id="month">Month</SegmentedItem>
  </Segmented>
);

export const SmallAndDisabled = () => (
  <div style={col}>
    <Segmented size="sm" defaultSelectedKeys={["grid"]} aria-label="View">
      <SegmentedItem id="list">List</SegmentedItem>
      <SegmentedItem id="grid">Grid</SegmentedItem>
    </Segmented>
    <Segmented defaultSelectedKeys={["on"]} aria-label="State">
      <SegmentedItem id="on">On</SegmentedItem>
      <SegmentedItem id="off">Off</SegmentedItem>
      <SegmentedItem id="auto" isDisabled>
        Auto
      </SegmentedItem>
    </Segmented>
  </div>
);
