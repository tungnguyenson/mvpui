/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputPayment } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "autodetect",
    title: "Brand auto-detect",
    description:
      "Leading icon switches by number prefix; digits group in 4s. Try 4… (Visa), 51… (Mastercard), 34… (Amex).",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputPayment label="Card number" defaultValue="4111111111111111" />
        <InputPayment label="Card number" defaultValue="5105105105105100" />
        <InputPayment label="Card number" defaultValue="340000000000009" />
      </div>
    ),
    code: `<InputPayment label="Card number" defaultValue="4111111111111111" />`,
  },
  {
    id: "states",
    title: "Empty, hint, invalid",
    description: "Uncontrolled by default; onChange gives raw digits.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputPayment label="Card number" hint="Visa, Mastercard, Amex, Discover, UnionPay." />
        <InputPayment
          label="Card number"
          isInvalid
          defaultValue="4000"
          hint="Card number is incomplete."
        />
      </div>
    ),
    code: `<InputPayment label="Card number" hint="Visa, Mastercard, Amex…" />
<InputPayment label="Card number" isInvalid hint="Card number is incomplete." />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputPayment"
      tagline={
        <>
          Card-number field: auto-detects brand and formats in groups of 4.
          Logic ported from Untitled UI; native composition + a tiny
          controlled/uncontrolled hook (hybrid — plan A1). Brand marks are
          mode-independent SVGs.
        </>
      }
      install={{
        usage: `import { InputPayment, formatCardNumber } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Field", value: "--color-border / --color-bg" },
        { label: "Brand marks", value: "fixed brand hex (mode-independent)" },
      ]}
    />
  );
}
