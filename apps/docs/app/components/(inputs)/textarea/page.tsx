"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { TextArea } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description: "Required textarea with label and hint text.",
    preview: (
      <TextArea
        isRequired
        placeholder="This is a placeholder."
        label="Description"
        hint="This is a hint text to help user."
        rows={5}
      />
    ),
    code: `<TextArea isRequired placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disabled textarea with label and hint.",
    preview: (
      <TextArea
        isRequired
        isDisabled
        placeholder="This is a placeholder."
        label="Description"
        hint="This is a hint text to help user."
        rows={5}
      />
    ),
    code: `<TextArea isRequired isDisabled placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />`,
  },
  {
    id: "invalid",
    title: "Invalid",
    description: "Invalid textarea with error message in hint.",
    preview: (
      <TextArea
        isRequired
        isInvalid
        placeholder="This is a placeholder."
        label="Description"
        hint="This is an error message."
        rows={5}
      />
    ),
    code: `<TextArea isRequired isInvalid placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />`,
  },
  {
    id: "all-states",
    title: "All states",
    description: "Default, disabled, and invalid across both sizes (sm and md).",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-4">
          <TextArea isRequired size="sm" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
          <TextArea isRequired isDisabled size="sm" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
          <TextArea isRequired isInvalid size="sm" placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />
        </div>
        <div className="flex flex-col gap-4">
          <TextArea isRequired size="md" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
          <TextArea isRequired isDisabled size="md" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
          <TextArea isRequired isInvalid size="md" placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />
        </div>
      </div>
    ),
    code: `<TextArea isRequired size="sm" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
<TextArea isRequired isDisabled size="sm" placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />
<TextArea isRequired isInvalid size="sm" placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />`,
  },
];

export default function TextareaPage() {
  return (
    <ComponentDocLayout
      name="Textarea"
      tagline="Multi-line text field built on react-aria with label, hint, and invalid/disabled states. Size sm and md."
      install={{ usage: `import { TextArea, TextAreaBase } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
    />
  );
}
