import { InputDate } from "@mvp-ui/ui";

export const Default = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputDate label="Date of birth" hint="MM / DD / YYYY" />
  </div>
);

export const Invalid = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputDate label="Expiry date" isInvalid hint="This date is in the past." />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputDate label="Locked date" isDisabled hint="Editing is disabled." />
  </div>
);
