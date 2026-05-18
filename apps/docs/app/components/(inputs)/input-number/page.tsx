/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputNumber } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "orientation",
    title: "Stepper orientation",
    description:
      "React Aria NumberField — locale-aware parsing + keyboard stepping. Vertical (default) or horizontal spinners.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputNumber label="Quantity" defaultValue={1} minValue={0} />
        <InputNumber
          label="Seats"
          orientation="horizontal"
          defaultValue={2}
          minValue={1}
          maxValue={10}
        />
      </div>
    ),
    code: `<InputNumber label="Quantity" defaultValue={1} minValue={0} />
<InputNumber label="Seats" orientation="horizontal" defaultValue={2} minValue={1} maxValue={10} />`,
  },
  {
    id: "format",
    title: "Format & step",
    description: "formatOptions (currency, percent…) and step.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputNumber
          label="Price"
          defaultValue={9.99}
          step={0.01}
          formatOptions={{ style: "currency", currency: "USD" }}
        />
        <InputNumber
          label="Discount"
          defaultValue={0.1}
          step={0.05}
          formatOptions={{ style: "percent" }}
        />
      </div>
    ),
    code: `<InputNumber label="Price" defaultValue={9.99} step={0.01}
  formatOptions={{ style: "currency", currency: "USD" }} />
<InputNumber label="Discount" defaultValue={0.1} step={0.05}
  formatOptions={{ style: "percent" }} />`,
  },
  {
    id: "states",
    title: "Hint, invalid, disabled",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputNumber label="Age" hint="Must be 18 or older." minValue={0} />
        <InputNumber label="Age" isInvalid defaultValue={12} hint="Must be 18 or older." />
        <InputNumber label="Locked" isDisabled defaultValue={5} />
      </div>
    ),
    code: `<InputNumber label="Age" isInvalid defaultValue={12} hint="Must be 18 or older." />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputNumber"
      tagline={
        <>
          Numeric field on React Aria <code>NumberField</code> (locale parsing,
          keyboard + spin stepping). RA is unavoidable here (plan A1);
          Label/HintText reuse the native family.
        </>
      }
      install={{ usage: `import { InputNumber } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Field", value: "--color-border / --color-bg" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
        { label: "Steppers", value: "--color-muted-fg" },
      ]}
    />
  );
}
