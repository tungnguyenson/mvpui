/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { PinInput } from "@mvp-ui/ui";

/* Client island: PinInput is a compound client component. Its `.Slot` /
   `.Group` statics are only reachable from a client module — a Server
   Component sees a client reference proxy without the namespace props. */

export function PinBasic() {
  return (
    <PinInput size="xs">
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Group maxLength={4}>
        {[0, 1, 2, 3].map((i) => (
          <PinInput.Slot key={i} index={i} />
        ))}
      </PinInput.Group>
      <PinInput.Description>Enter the 4-digit code.</PinInput.Description>
    </PinInput>
  );
}

export function PinSeparator() {
  return (
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
}

export function PinInvalid() {
  return (
    <PinInput size="xs" invalid>
      <PinInput.Group maxLength={4}>
        {[0, 1, 2, 3].map((i) => (
          <PinInput.Slot key={i} index={i} />
        ))}
      </PinInput.Group>
      <PinInput.Description>Incorrect code.</PinInput.Description>
    </PinInput>
  );
}
