"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import { PinBasic, PinInvalid, PinSeparator } from "./PinInputExamples";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "4-digit",
    description:
      "Compound API on input-otp (documented A8 exception). Compose Group + Slots.",
    preview: <PinBasic />,
    code: `<PinInput size="xs">
  <PinInput.Label>Verification code</PinInput.Label>
  <PinInput.Group maxLength={4}>
    {[0,1,2,3].map((i) => <PinInput.Slot key={i} index={i} />)}
  </PinInput.Group>
  <PinInput.Description>Enter the 4-digit code.</PinInput.Description>
</PinInput>`,
  },
  {
    id: "separator",
    title: "6-digit with separator",
    description: "Two groups split by a Separator.",
    preview: <PinSeparator />,
    code: `<PinInput.Group maxLength={6}>
  {[0,1,2].map((i) => <PinInput.Slot key={i} index={i} />)}
  <PinInput.Separator />
  {[3,4,5].map((i) => <PinInput.Slot key={i} index={i} />)}
</PinInput.Group>`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "invalid prop tints slots with the error color.",
    preview: <PinInvalid />,
    code: `<PinInput size="xs" invalid>…</PinInput>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="PinInput"
      tagline={
        <>
          OTP / PIN entry on <code>input-otp</code>. Compound API (
          <code>PinInput.Group</code>, <code>.Slot</code>, <code>.Label</code>,{" "}
          <code>.Separator</code>, <code>.Description</code>) — a documented
          exception to plan A8 (OTP is inherently compositional).
        </>
      }
      install={{ usage: `import { PinInput } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Slot", value: "--color-border / --color-bg" },
        { label: "Filled", value: "--color-fg-brand" },
        { label: "Invalid", value: "--color-fg-error" },
      ]}
    />
  );
}
