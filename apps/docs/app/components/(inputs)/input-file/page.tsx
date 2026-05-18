/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { InputFile } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description:
      "Readonly field showing the chosen file name + an Upload button that opens a hidden native file input.",
    preview: (
      <div className="w-full max-w-md">
        <InputFile label="Resume" hint="PDF or DOCX, up to 5 MB." />
      </div>
    ),
    code: `<InputFile label="Resume" hint="PDF or DOCX, up to 5 MB." />`,
  },
  {
    id: "sizes",
    title: "Sizes & multiple",
    description: "sm · md · lg; allowsMultiple joins names.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputFile size="sm" placeholder="Choose a file" />
        <InputFile size="md" allowsMultiple placeholder="Choose files" />
        <InputFile size="lg" buttonText="Browse" />
      </div>
    ),
    code: `<InputFile size="sm" />
<InputFile size="md" allowsMultiple />
<InputFile size="lg" buttonText="Browse" />`,
  },
  {
    id: "states",
    title: "Loading, disabled, invalid",
    description: "Trailing spinner while uploading; disabled and error states.",
    preview: (
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputFile label="Uploading" isLoading />
        <InputFile label="Disabled" isDisabled />
        <InputFile label="Invalid" isInvalid hint="A file is required." />
      </div>
    ),
    code: `<InputFile label="Uploading" isLoading />
<InputFile label="Disabled" isDisabled />
<InputFile label="Invalid" isInvalid hint="A file is required." />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="InputFile"
      tagline={
        <>
          File picker: readonly name field + Upload button (our{" "}
          <code>Button</code>) over a hidden native file input. Structure
          adapted from Untitled UI; native composition (hybrid — plan A1).
        </>
      }
      install={{ usage: `import { InputFile } from "@mvp-ui/ui";` }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Field", value: "--color-border / --color-bg" },
        { label: "Spinner", value: "--color-muted-fg" },
      ]}
    />
  );
}
