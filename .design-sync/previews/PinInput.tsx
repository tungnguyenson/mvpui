import { PinInput } from "@mvp-ui/ui";

export const FourDigit = () => (
  <PinInput size="xs">
    <PinInput.Label>Verification code</PinInput.Label>
    <PinInput.Group maxLength={4}>
      {[0, 1, 2, 3].map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
    </PinInput.Group>
    <PinInput.Description>Enter the 4-digit code we emailed you.</PinInput.Description>
  </PinInput>
);

export const WithSeparator = () => (
  <PinInput size="xs">
    <PinInput.Group maxLength={6}>
      {[0, 1, 2].map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
      <PinInput.Separator />
      {[3, 4, 5].map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
    </PinInput.Group>
  </PinInput>
);

export const Invalid = () => (
  <PinInput size="xs" invalid>
    <PinInput.Group maxLength={4}>
      {[0, 1, 2, 3].map((i) => (
        <PinInput.Slot key={i} index={i} />
      ))}
    </PinInput.Group>
    <PinInput.Description>That code is incorrect.</PinInput.Description>
  </PinInput>
);
