import { DatePicker } from "@mvp-ui/ui";

const box: React.CSSProperties = { width: 288 };

export const Default = () => (
  <div style={box}>
    <DatePicker label="Start date" hint="Choose the project kick-off date." aria-label="Start date" />
  </div>
);

export const Invalid = () => (
  <div style={box}>
    <DatePicker
      label="Due date"
      hint="Date is required and must be in the future."
      isInvalid
      isRequired
      aria-label="Due date"
    />
  </div>
);

export const Disabled = () => (
  <div style={box}>
    <DatePicker
      label="Locked date"
      hint="This field is read-only in the current context."
      isDisabled
      aria-label="Locked date"
    />
  </div>
);

export const Sizes = () => (
  <div style={{ ...box, display: "flex", flexDirection: "column", gap: 20 }}>
    <DatePicker size="sm" label="Small" aria-label="Small" />
    <DatePicker size="md" label="Medium" aria-label="Medium" />
    <DatePicker size="lg" label="Large" aria-label="Large" />
  </div>
);
