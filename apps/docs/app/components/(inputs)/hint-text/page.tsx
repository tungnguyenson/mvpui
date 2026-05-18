/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { HintText } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default & error",
    description:
      "Description text vs. error message (isInvalid → role=alert, error color).",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <HintText>We&apos;ll never share your email.</HintText>
        <HintText isInvalid>Please enter a valid email address.</HintText>
      </div>
    ),
    code: `<HintText>We'll never share your email.</HintText>
<HintText isInvalid>Please enter a valid email address.</HintText>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm (xs text) and md (sm text, default).",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <HintText size="sm">Small hint</HintText>
        <HintText size="md">Medium hint</HintText>
      </div>
    ),
    code: `<HintText size="sm">Small hint</HintText>
<HintText size="md">Medium hint</HintText>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="HintText"
      tagline={
        <>
          Helper / error text under a field. Native <code>&lt;p&gt;</code> +
          cva; <code>isInvalid</code> switches role + color. Composed by Input,
          InputGroup, InputDate, InputNumber, InputTags.
        </>
      }
      install={{ usage: `import { HintText } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Default", value: "--color-fg-tertiary" },
        { label: "Error", value: "--color-fg-error" },
      ]}
    />
  );
}
