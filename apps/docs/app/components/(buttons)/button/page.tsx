/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import Link from "next/link";
import { ArrowRight, Download, Mail, Plus, Settings, Trash2 } from "lucide-react";
import { Button } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* Snippets are authored by hand next to each preview. Keep them in sync —
   there is no auto-derivation (asChild/Slot makes element-to-string lossy). */

const SECTIONS: DocExample[] = [
  {
    id: "primary-buttons",
    title: "Primary buttons",
    description:
      "Brand-filled. The single highest-priority action on a surface. Shown across all four sizes.",
    preview: (
      <>
        <Button size="sm">Button sm</Button>
        <Button size="md">Button md</Button>
        <Button size="lg">Button lg</Button>
        <Button size="xl">Button xl</Button>
      </>
    ),
    code: `<Button size="sm">Button sm</Button>
<Button size="md">Button md</Button>
<Button size="lg">Button lg</Button>
<Button size="xl">Button xl</Button>`,
  },
  {
    id: "secondary-buttons",
    title: "Secondary buttons",
    description: "Bordered, white background. Sits next to a primary action.",
    preview: (
      <>
        <Button color="secondary" size="sm">Button sm</Button>
        <Button color="secondary" size="md">Button md</Button>
        <Button color="secondary" size="lg">Button lg</Button>
        <Button color="secondary" size="xl">Button xl</Button>
      </>
    ),
    code: `<Button color="secondary" size="sm">Button sm</Button>
<Button color="secondary" size="md">Button md</Button>
<Button color="secondary" size="lg">Button lg</Button>
<Button color="secondary" size="xl">Button xl</Button>`,
  },
  {
    id: "tertiary-buttons",
    title: "Tertiary buttons",
    description: "No border or fill until hover. Low-emphasis inline actions.",
    preview: (
      <>
        <Button color="tertiary" size="sm">Button sm</Button>
        <Button color="tertiary" size="md">Button md</Button>
        <Button color="tertiary" size="lg">Button lg</Button>
        <Button color="tertiary" size="xl">Button xl</Button>
      </>
    ),
    code: `<Button color="tertiary" size="sm">Button sm</Button>
<Button color="tertiary" size="md">Button md</Button>
<Button color="tertiary" size="lg">Button lg</Button>
<Button color="tertiary" size="xl">Button xl</Button>`,
  },
  {
    id: "link-color-buttons",
    title: "Link color buttons",
    description: "Inline brand link. No padding, underlines on hover.",
    preview: (
      <>
        <Button color="link-color" size="sm">Link sm</Button>
        <Button color="link-color" size="md">Link md</Button>
        <Button color="link-color" size="lg">Link lg</Button>
        <Button color="link-color" size="xl">Link xl</Button>
      </>
    ),
    code: `<Button color="link-color" size="sm">Link sm</Button>
<Button color="link-color" size="md">Link md</Button>
<Button color="link-color" size="lg">Link lg</Button>
<Button color="link-color" size="xl">Link xl</Button>`,
  },
  {
    id: "link-gray-buttons",
    title: "Link gray buttons",
    description: "Inline neutral link. Quiet navigation inside body text.",
    preview: (
      <>
        <Button color="link-gray" size="sm">Link sm</Button>
        <Button color="link-gray" size="md">Link md</Button>
        <Button color="link-gray" size="lg">Link lg</Button>
        <Button color="link-gray" size="xl">Link xl</Button>
      </>
    ),
    code: `<Button color="link-gray" size="sm">Link sm</Button>
<Button color="link-gray" size="md">Link md</Button>
<Button color="link-gray" size="lg">Link lg</Button>
<Button color="link-gray" size="xl">Link xl</Button>`,
  },
  {
    id: "icon-leading-buttons",
    title: "Icon leading buttons",
    description:
      "Pass an element (or component) to iconLeading. Sized to 16px before the label.",
    preview: (
      <>
        <Button iconLeading={<Mail />}>Send email</Button>
        <Button color="secondary" iconLeading={<Download />}>Download</Button>
        <Button color="primary-destructive" iconLeading={<Trash2 />}>
          Delete project
        </Button>
      </>
    ),
    code: `<Button iconLeading={<Mail />}>Send email</Button>
<Button color="secondary" iconLeading={<Download />}>Download</Button>
<Button color="primary-destructive" iconLeading={<Trash2 />}>
  Delete project
</Button>`,
  },
  {
    id: "icon-trailing-buttons",
    title: "Icon trailing buttons",
    description: "Pass an element (or component) to iconTrailing. Rendered after the label.",
    preview: (
      <>
        <Button iconTrailing={<ArrowRight />}>Continue</Button>
        <Button color="secondary" iconTrailing={<ArrowRight />}>Next step</Button>
        <Button color="link-color" iconTrailing={<ArrowRight />}>Learn more</Button>
      </>
    ),
    code: `<Button iconTrailing={<ArrowRight />}>Continue</Button>
<Button color="secondary" iconTrailing={<ArrowRight />}>Next step</Button>
<Button color="link-color" iconTrailing={<ArrowRight />}>Learn more</Button>`,
  },
  {
    id: "icon-only-buttons",
    title: "Icon only buttons",
    description:
      "Omit children and pass an icon — padding becomes square. Always pass aria-label.",
    preview: (
      <>
        <Button size="sm" iconLeading={<Settings />} aria-label="Settings" />
        <Button size="md" color="secondary" iconLeading={<Plus />} aria-label="Add item" />
        <Button size="lg" color="tertiary" iconLeading={<Settings />} aria-label="Settings" />
        <Button
          size="xl"
          color="primary-destructive"
          iconLeading={<Trash2 />}
          aria-label="Delete"
        />
      </>
    ),
    code: `<Button size="sm" iconLeading={<Settings />} aria-label="Settings" />
<Button size="md" color="secondary" iconLeading={<Plus />} aria-label="Add item" />
<Button size="lg" color="tertiary" iconLeading={<Settings />} aria-label="Settings" />
<Button
  size="xl"
  color="primary-destructive"
  iconLeading={<Trash2 />}
  aria-label="Delete"
/>`,
  },
  {
    id: "loading-buttons",
    title: "Loading buttons",
    description:
      "isLoading shows a spinner and blocks interaction. showTextWhileLoading keeps the label visible.",
    preview: (
      <>
        <Button isLoading>Save changes</Button>
        <Button color="secondary" isLoading showTextWhileLoading>
          Saving…
        </Button>
        <Button isLoading iconLeading={<Settings />} aria-label="Saving" />
      </>
    ),
    code: `<Button isLoading>Save changes</Button>
<Button color="secondary" isLoading showTextWhileLoading>
  Saving…
</Button>
<Button isLoading iconLeading={<Settings />} aria-label="Saving" />`,
  },
  {
    id: "disabled-buttons",
    title: "Disabled buttons",
    description: "Disabled drops opacity to 50% and blocks pointer events.",
    preview: (
      <>
        <Button disabled>Primary</Button>
        <Button color="secondary" disabled>Secondary</Button>
        <Button color="tertiary" disabled>Tertiary</Button>
        <Button color="primary-destructive" disabled iconLeading={<Trash2 />}>
          Delete
        </Button>
      </>
    ),
    code: `<Button disabled>Primary</Button>
<Button color="secondary" disabled>Secondary</Button>
<Button color="tertiary" disabled>Tertiary</Button>
<Button color="primary-destructive" disabled iconLeading={<Trash2 />}>
  Delete
</Button>`,
  },
  {
    id: "primary-buttons-destructive",
    title: "Primary buttons destructive",
    description:
      "Filled error. Confirms an irreversible, destructive action.",
    preview: (
      <>
        <Button color="primary-destructive" size="sm">Button sm</Button>
        <Button color="primary-destructive" size="md">Button md</Button>
        <Button color="primary-destructive" size="lg">Button lg</Button>
        <Button color="primary-destructive" size="xl">Button xl</Button>
      </>
    ),
    code: `<Button color="primary-destructive" size="sm">Button sm</Button>
<Button color="primary-destructive" size="md">Button md</Button>
<Button color="primary-destructive" size="lg">Button lg</Button>
<Button color="primary-destructive" size="xl">Button xl</Button>`,
  },
  {
    id: "secondary-buttons-destructive",
    title: "Secondary buttons destructive",
    description: "Bordered error. Destructive action that isn't the primary CTA.",
    preview: (
      <>
        <Button color="secondary-destructive" size="sm">Button sm</Button>
        <Button color="secondary-destructive" size="md">Button md</Button>
        <Button color="secondary-destructive" size="lg">Button lg</Button>
        <Button color="secondary-destructive" size="xl">Button xl</Button>
      </>
    ),
    code: `<Button color="secondary-destructive" size="sm">Button sm</Button>
<Button color="secondary-destructive" size="md">Button md</Button>
<Button color="secondary-destructive" size="lg">Button lg</Button>
<Button color="secondary-destructive" size="xl">Button xl</Button>`,
  },
  {
    id: "tertiary-buttons-destructive",
    title: "Tertiary buttons destructive",
    description: "Borderless error. Inline destructive action in dense UI.",
    preview: (
      <>
        <Button color="tertiary-destructive" size="sm">Button sm</Button>
        <Button color="tertiary-destructive" size="md">Button md</Button>
        <Button color="tertiary-destructive" size="lg">Button lg</Button>
        <Button color="tertiary-destructive" size="xl">Button xl</Button>
      </>
    ),
    code: `<Button color="tertiary-destructive" size="sm">Button sm</Button>
<Button color="tertiary-destructive" size="md">Button md</Button>
<Button color="tertiary-destructive" size="lg">Button lg</Button>
<Button color="tertiary-destructive" size="xl">Button xl</Button>`,
  },
  {
    id: "as-child-polymorphic",
    title: "asChild (polymorphic)",
    description:
      "asChild renders button styles onto the child via Radix Slot — these are <a> tags. Leading/trailing icons still compose through Slottable.",
    preview: (
      <>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button color="secondary" asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild iconTrailing={<ArrowRight />}>
          <Link href="/">Continue</Link>
        </Button>
      </>
    ),
    code: `<Button asChild>
  <Link href="/">Go home</Link>
</Button>
<Button color="secondary" asChild>
  <Link href="/">Go home</Link>
</Button>
<Button asChild iconTrailing={<ArrowRight />}>
  <Link href="/">Continue</Link>
</Button>`,
  },
];

export default function ButtonPage() {
  return (
    <ComponentDocLayout
      name="Button"
      tagline={
        <>
          Triggers an action. Nine color variants &times; four sizes, with
          leading/trailing icons, icon-only, and loading states. API mirrors
          Untitled UI; polymorphism is Radix <code>asChild</code>. Toggle any
          example to dark with the moon.
        </>
      }
      install={{
        usage: `import { Button } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Primary bg / hover", value: "--brand-600 / 700·500" },
        { label: "Destructive bg / hover", value: "--error-600 / 700" },
        { label: "Secondary border", value: "--color-border" },
        { label: "Radius", value: "--radius-md / lg" },
        { label: "Focus ring", value: "brand-500/22 · error-500/24" },
        { label: "Transition", value: "100ms linear" },
      ]}
    />
  );
}
