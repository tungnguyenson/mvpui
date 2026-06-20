import { InputNumber } from "@mvp-ui/ui";

export const Vertical = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <InputNumber label="Quantity" defaultValue={1} minValue={0} />
    <InputNumber
      label="Discount"
      defaultValue={0.1}
      step={0.05}
      formatOptions={{ style: "percent" }}
    />
  </div>
);

export const Horizontal = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <InputNumber
      label="Seats"
      orientation="horizontal"
      defaultValue={2}
      minValue={1}
      maxValue={10}
    />
    <InputNumber
      label="Price"
      orientation="horizontal"
      defaultValue={9.99}
      step={0.01}
      formatOptions={{ style: "currency", currency: "USD" }}
    />
  </div>
);
