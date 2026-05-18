"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Copy, Pencil, Settings, Trash2 } from "lucide-react";
import { ButtonUtility, CloseButton } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "secondary",
    title: "Secondary",
    description:
      "Bordered surface. Default color. Use in toolbars and dense surfaces where the button needs a visible container.",
    preview: (
      <>
        <ButtonUtility color="secondary" icon={<Pencil />} tooltip="Edit" />
        <ButtonUtility color="secondary" icon={<Copy />} tooltip="Duplicate" />
        <ButtonUtility color="secondary" icon={<Trash2 />} tooltip="Delete" />
        <ButtonUtility color="secondary" icon={<Settings />} tooltip="Settings" />
      </>
    ),
    code: `<ButtonUtility color="secondary" icon={<Pencil />} tooltip="Edit" />
<ButtonUtility color="secondary" icon={<Copy />} tooltip="Duplicate" />
<ButtonUtility color="secondary" icon={<Trash2 />} tooltip="Delete" />`,
  },
  {
    id: "tertiary",
    title: "Tertiary",
    description:
      "Borderless until hover. Lower visual weight — use in table rows where icons appear only on interaction.",
    preview: (
      <>
        <ButtonUtility color="tertiary" icon={<Pencil />} tooltip="Edit" />
        <ButtonUtility color="tertiary" icon={<Copy />} tooltip="Duplicate" />
        <ButtonUtility color="tertiary" icon={<Trash2 />} tooltip="Delete" />
        <ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" />
      </>
    ),
    code: `<ButtonUtility color="tertiary" icon={<Pencil />} tooltip="Edit" />
<ButtonUtility color="tertiary" icon={<Copy />} tooltip="Duplicate" />
<ButtonUtility color="tertiary" icon={<Trash2 />} tooltip="Delete" />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "Two sizes — xs (16px icon) and sm (20px icon). Default is sm.",
    preview: (
      <>
        <ButtonUtility size="xs" icon={<Copy />} tooltip="Copy" />
        <ButtonUtility size="sm" icon={<Copy />} tooltip="Copy" />
      </>
    ),
    code: `<ButtonUtility size="xs" icon={<Copy />} tooltip="Copy" />
<ButtonUtility size="sm" icon={<Copy />} tooltip="Copy" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Non-interactive, 50% opacity.",
    preview: (
      <>
        <ButtonUtility icon={<Settings />} tooltip="Settings" disabled />
        <ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" disabled />
      </>
    ),
    code: `<ButtonUtility icon={<Settings />} tooltip="Settings" disabled />
<ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" disabled />`,
  },
  {
    id: "close-x",
    title: "Close X",
    description:
      "Dismiss affordance for Alert, Modal, and Tags. Built-in X icon, four sizes, and a tone prop for colored surfaces.",
    preview: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <CloseButton size="xs" />
          <CloseButton size="sm" />
          <CloseButton size="md" />
          <CloseButton size="lg" />
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-primary p-4">
          <CloseButton tone="on-color" size="sm" />
          <CloseButton tone="on-color" size="md" />
        </div>
      </div>
    ),
    code: `{/* Sizes */}
<CloseButton size="xs" />
<CloseButton size="sm" />
<CloseButton size="md" />
<CloseButton size="lg" />

{/* On-color surface */}
<div className="bg-primary p-4">
  <CloseButton tone="on-color" />
  <CloseButton tone="on-color" size="md" />
</div>`,
  },
];

export default function ButtonUtilityPage() {
  return (
    <ComponentDocLayout
      name="Button Utility"
      tagline={
        <>
          Compact icon-only controls for table rows and toolbars. Two colors
          &times; two sizes. <code>CloseButton</code> — dismiss affordance for
          alerts and modals — included below.
        </>
      }
      install={{
        usage: `import { ButtonUtility, CloseButton } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Secondary bg / border", value: "--color-bg / border" },
        { label: "Hover bg / fg", value: "--color-bg-tertiary / fg-tertiary" },
        { label: "Icon fg", value: "--color-muted-fg" },
        { label: "CloseButton on-color", value: "--color-fg-on-brand /70" },
        { label: "Radius", value: "--radius-md / lg" },
        { label: "Focus ring", value: "brand-500/22" },
      ]}
    />
  );
}
