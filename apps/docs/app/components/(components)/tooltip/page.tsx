/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Tooltip, TooltipTrigger } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

const Dot = () => (
  <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-bg text-sm text-fg-secondary">
    ?
  </span>
);

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Title-only tooltip. Radix under the hood (plan A1).",
    preview: (
      <Tooltip title="This is a tooltip">
        <TooltipTrigger>
          <Dot />
        </TooltipTrigger>
      </Tooltip>
    ),
    code: `<Tooltip title="This is a tooltip">
  <TooltipTrigger>
    <button>?</button>
  </TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "description",
    title: "With description",
    description: "Optional supporting line under the title.",
    preview: (
      <Tooltip
        title="Keyboard shortcut"
        description="Press ⌘K to open the command menu."
      >
        <TooltipTrigger>
          <Dot />
        </TooltipTrigger>
      </Tooltip>
    ),
    code: `<Tooltip title="Keyboard shortcut" description="Press ⌘K to open the command menu.">
  <TooltipTrigger><button>?</button></TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "placement",
    title: "Placement + arrow",
    description: "placement maps to Radix side/align; arrow optional.",
    preview: (
      <div className="flex gap-10">
        {(["top", "right", "bottom", "left"] as const).map((p) => (
          <Tooltip key={p} title={p} placement={p} arrow>
            <TooltipTrigger>
              <Dot />
            </TooltipTrigger>
          </Tooltip>
        ))}
      </div>
    ),
    code: `<Tooltip title="top" placement="top" arrow>
  <TooltipTrigger><button>?</button></TooltipTrigger>
</Tooltip>`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Tooltip"
      tagline={
        <>
          Hover/focus tooltip. API mirrors Untitled UI (
          <code>title</code>, <code>description</code>, <code>arrow</code>,{" "}
          <code>placement</code>) on a Radix Tooltip. Surface is
          theme-following (dark in light, light in dark) — dark-safe without a
          new token.
        </>
      }
      install={{
        usage: `import { Tooltip, TooltipTrigger } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Surface", value: "--color-fg (text-bg on it)" },
        { label: "Radius", value: "--radius-lg (10px)" },
        { label: "Shadow", value: "--shadow-lg" },
      ]}
    />
  );
}
