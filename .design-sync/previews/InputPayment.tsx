import { InputPayment } from "@mvp-ui/ui";

export const Visa = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputPayment label="Card number" defaultValue="4111111111111111" />
  </div>
);

export const Mastercard = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputPayment label="Card number" defaultValue="5105105105105100" />
  </div>
);

export const Empty = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputPayment label="Card number" hint="Visa, Mastercard, Amex, Discover." />
  </div>
);
