/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputTags, InputTagsOuter } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "inside",
    title: "Tags inside the field",
    description:
      "Type + Enter to add; Backspace at caret-start focuses the last tag. Built on the Tags family.",
    preview: (
      <div className="w-full max-w-md">
        <InputTags
          label="Skills"
          placeholder="Add a skill…"
          defaultValue={["TypeScript", "React"]}
          hint="Press Enter to add."
        />
      </div>
    ),
    code: `<InputTags
  label="Skills"
  placeholder="Add a skill…"
  defaultValue={["TypeScript", "React"]}
  hint="Press Enter to add."
/>`,
  },
  {
    id: "outer",
    title: "Tags below the field",
    description: "InputTagsOuter renders tags under the input instead of in it.",
    preview: (
      <div className="w-full max-w-md">
        <InputTagsOuter
          label="Recipients"
          placeholder="name@team.com"
          defaultValue={["ana@acme.co"]}
        />
      </div>
    ),
    code: `<InputTagsOuter label="Recipients" placeholder="name@team.com" defaultValue={["ana@acme.co"]} />`,
  },
  {
    id: "states",
    title: "Tooltip, maxTags, invalid",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputTags
          label="Tags"
          tooltip="Up to 3 tags."
          maxTags={3}
          placeholder="Add…"
        />
        <InputTags
          label="Tags"
          isInvalid
          defaultValue={["bad"]}
          hint="At least one valid tag required."
        />
      </div>
    ),
    code: `<InputTags label="Tags" tooltip="Up to 3 tags." maxTags={3} />
<InputTags label="Tags" isInvalid hint="At least one valid tag required." />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputTags"
      tagline={
        <>
          Tag-entry field on React Aria + the Tags family.{" "}
          <code>InputTags</code> keeps tags inside the box;{" "}
          <code>InputTagsOuter</code> renders them below. Controlled or
          uncontrolled with stable keys.
        </>
      }
      install={{
        usage: `import { InputTags, InputTagsOuter } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Field", value: "--color-border / --color-bg" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
      ]}
    />
  );
}
