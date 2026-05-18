/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputAddon, InputBase, InputGroup } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "addons",
    title: "Leading & trailing addons",
    description:
      "InputAddon is a separated, bordered slot. Composes the native InputBase.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputGroup
          label="Website"
          leadingAddon={<InputAddon>https://</InputAddon>}
        >
          <InputBase placeholder="yoursite" />
        </InputGroup>
        <InputGroup
          label="Amount"
          trailingAddon={
            <InputAddon position="trailing">USD</InputAddon>
          }
        >
          <InputBase placeholder="0.00" inputMode="decimal" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup label="Website" leadingAddon={<InputAddon>https://</InputAddon>}>
  <InputBase placeholder="yoursite" />
</InputGroup>

<InputGroup label="Amount" trailingAddon={<InputAddon position="trailing">USD</InputAddon>}>
  <InputBase placeholder="0.00" inputMode="decimal" />
</InputGroup>`,
  },
  {
    id: "both",
    title: "Both sides + hint",
    description: "Leading and trailing together, with helper text.",
    preview: (
      <div className="w-full max-w-md">
        <InputGroup
          label="Subdomain"
          hint="Lowercase letters and hyphens only."
          leadingAddon={<InputAddon>https://</InputAddon>}
          trailingAddon={
            <InputAddon position="trailing">.mvp.app</InputAddon>
          }
        >
          <InputBase placeholder="team" />
        </InputGroup>
      </div>
    ),
    code: `<InputGroup
  label="Subdomain"
  hint="Lowercase letters and hyphens only."
  leadingAddon={<InputAddon>https://</InputAddon>}
  trailingAddon={<InputAddon position="trailing">.mvp.app</InputAddon>}
>
  <InputBase placeholder="team" />
</InputGroup>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputGroup"
      tagline={
        <>
          Label + an input box flanked by separated addons + hint. Structure
          adapted from Untitled UI; composes the native <code>InputBase</code>{" "}
          (hybrid — plan A1). For inline <code>$</code>/<code>.com</code> use
          InputBase&apos;s own <code>prefix</code>/<code>suffix</code>.
        </>
      }
      install={{
        usage: `import { InputGroup, InputAddon, InputBase } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Addon ring", value: "--color-border" },
        { label: "Addon text", value: "--color-fg-tertiary" },
        { label: "Radius", value: "--radius-lg (10px)" },
      ]}
    />
  );
}
