import { DateRangePicker } from "@mvp-ui/ui";

const box: React.CSSProperties = { width: 320, maxWidth: "100%" };

export const WithLabel = () => (
  <div style={box}>
    <DateRangePicker
      label="Booking window"
      hint="Choose your check-in and check-out dates."
    />
  </div>
);

export const Sizes = () => (
  <div style={{ ...box, display: "flex", flexDirection: "column", gap: 16 }}>
    <DateRangePicker size="sm" label="Small" />
    <DateRangePicker size="md" label="Medium" />
    <DateRangePicker size="lg" label="Large" />
  </div>
);

export const Disabled = () => (
  <div style={box}>
    <DateRangePicker label="Report period" isDisabled />
  </div>
);
