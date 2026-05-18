/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Copy, Pencil, Settings, Trash2 } from "lucide-react";
import { ButtonUtility } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "colors",
    title: "Colors",
    description:
      "Secondary carries a bordered surface; tertiary is borderless until hover. Default is secondary.",
    preview: (
      <>
        <ButtonUtility color="secondary" icon={<Settings />} tooltip="Settings" />
        <ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" />
      </>
    ),
    code: `<ButtonUtility color="secondary" icon={<Settings />} tooltip="Settings" />
<ButtonUtility color="tertiary" icon={<Settings />} tooltip="Settings" />`,
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
    id: "actions",
    title: "Row actions",
    description:
      "Typical use: compact actions in a table row or toolbar. The tooltip prop currently maps to a native title (real Tooltip lands in Wave 1A).",
    preview: (
      <>
        <ButtonUtility icon={<Pencil />} tooltip="Edit" />
        <ButtonUtility icon={<Copy />} tooltip="Duplicate" />
        <ButtonUtility icon={<Trash2 />} tooltip="Delete" />
      </>
    ),
    code: `<ButtonUtility icon={<Pencil />} tooltip="Edit" />
<ButtonUtility icon={<Copy />} tooltip="Duplicate" />
<ButtonUtility icon={<Trash2 />} tooltip="Delete" />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Non-interactive, 50% opacity.",
    preview: <ButtonUtility icon={<Settings />} tooltip="Settings" disabled />,
    code: `<ButtonUtility icon={<Settings />} tooltip="Settings" disabled />`,
  },
];

export default function ButtonUtilityPage() {
  return (
    <ComponentDocLayout
      name="ButtonUtility"
      tagline={
        <>
          Compact icon-only control for table rows and toolbars. Two colors
          &times; two sizes. <code>asChild</code> for link rendering. Tooltip
          is interim native <code>title</code> until Wave 1A.
        </>
      }
      install={{
        usage: `import { ButtonUtility } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Secondary bg / border", value: "--color-bg / border" },
        { label: "Hover bg / fg", value: "--color-bg-tertiary / fg-tertiary" },
        { label: "Icon fg", value: "--color-muted-fg" },
        { label: "Radius", value: "--radius-md" },
        { label: "Focus ring", value: "brand-500/22" },
        { label: "Transition", value: "100ms linear" },
      ]}
    />
  );
}
