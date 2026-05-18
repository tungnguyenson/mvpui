/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputDate } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description:
      "React Aria DateField — per-segment editing, locale-aware, arrow-key stepping. Type into the segments.",
    preview: (
      <div className="w-full max-w-md">
        <InputDate label="Date of birth" hint="MM / DD / YYYY" />
      </div>
    ),
    code: `<InputDate label="Date of birth" hint="MM / DD / YYYY" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm · md · lg.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputDate size="sm" label="Small" />
        <InputDate size="md" label="Medium" />
        <InputDate size="lg" label="Large" />
      </div>
    ),
    code: `<InputDate size="sm" label="Small" />
<InputDate size="md" label="Medium" />
<InputDate size="lg" label="Large" />`,
  },
  {
    id: "states",
    title: "Invalid & disabled",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputDate label="Expiry" isInvalid hint="Date is in the past." />
        <InputDate label="Locked" isDisabled />
      </div>
    ),
    code: `<InputDate label="Expiry" isInvalid hint="Date is in the past." />
<InputDate label="Locked" isDisabled />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputDate"
      tagline={
        <>
          Segmented date field on React Aria <code>DateField</code>. RA is
          unavoidable here (plan A1). Controlled values use{" "}
          <code>@internationalized/date</code> (<code>DateValue</code>).
        </>
      }
      install={{ usage: `import { InputDate } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Field", value: "--color-border / --color-bg" },
        { label: "Active segment", value: "--color-primary" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
      ]}
    />
  );
}
