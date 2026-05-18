/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { CloseButton } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "sizes",
    title: "Sizes",
    description: "Four hit-target sizes. Default is sm.",
    preview: (
      <>
        <CloseButton size="xs" />
        <CloseButton size="sm" />
        <CloseButton size="md" />
        <CloseButton size="lg" />
      </>
    ),
    code: `<CloseButton size="xs" />
<CloseButton size="sm" />
<CloseButton size="md" />
<CloseButton size="lg" />`,
  },
  {
    id: "tone-default",
    title: "Default tone",
    description:
      "Neutral foreground on a neutral surface. App dark mode is handled by tokens — no prop needed.",
    preview: <CloseButton />,
    code: `<CloseButton />`,
  },
  {
    id: "tone-on-color",
    title: "On-color tone",
    description:
      "For a close button sitting on a saturated/brand surface (e.g. a colored modal header) where neutral foreground would vanish.",
    preview: (
      <div className="flex items-center gap-4 rounded-xl bg-primary p-4">
        <CloseButton tone="on-color" />
        <CloseButton tone="on-color" size="md" />
      </div>
    ),
    code: `<div className="bg-primary p-4">
  <CloseButton tone="on-color" />
  <CloseButton tone="on-color" size="md" />
</div>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Non-interactive, 50% opacity.",
    preview: <CloseButton disabled />,
    code: `<CloseButton disabled />`,
  },
];

export default function CloseButtonPage() {
  return (
    <ComponentDocLayout
      name="CloseButton"
      tagline={
        <>
          Dismiss affordance for Alert, Modal, and Tags. Built-in X icon,
          four sizes, and a <code>tone</code> for colored surfaces. Diverges
          from Untitled UI: native button, no react-aria.
        </>
      }
      install={{
        usage: `import { CloseButton } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Default fg / hover", value: "--color-muted-fg / fg-tertiary" },
        { label: "Default hover bg", value: "--color-bg-tertiary" },
        { label: "On-color fg", value: "--color-fg-on-brand /70" },
        { label: "Radius", value: "--radius-lg" },
        { label: "Focus ring", value: "brand-500/22" },
        { label: "Transition", value: "100ms linear" },
      ]}
    />
  );
}
