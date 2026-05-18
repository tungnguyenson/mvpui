"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const TriggerIcon = () => (
  <HelpCircle className="size-4 stroke-[2.25px] text-fg-tertiary" />
);

const PLACEMENTS = [
  { label: "Top left",     value: "top left" },
  { label: "Top",          value: "top" },
  { label: "Top right",    value: "top right" },
  { label: "Bottom left",  value: "bottom left" },
  { label: "Bottom",       value: "bottom" },
  { label: "Bottom right", value: "bottom right" },
  { label: "Left",         value: "left" },
  { label: "Right",        value: "right" },
] as const;

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Title-only tooltip. Radix under the hood (plan A1).",
    preview: (
      <Tooltip title="This is a tooltip">
        <TooltipTrigger className="cursor-pointer text-fg-tertiary">
          <TriggerIcon />
        </TooltipTrigger>
      </Tooltip>
    ),
    code: `<Tooltip title="This is a tooltip">
  <TooltipTrigger>
    <HelpCircle className="size-4" />
  </TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "arrow",
    title: "With arrow",
    description: "Optional pointer arrow on the content panel.",
    preview: (
      <Tooltip arrow title="This is a tooltip">
        <TooltipTrigger className="cursor-pointer text-fg-tertiary">
          <TriggerIcon />
        </TooltipTrigger>
      </Tooltip>
    ),
    code: `<Tooltip arrow title="This is a tooltip">
  <TooltipTrigger>
    <HelpCircle className="size-4" />
  </TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "description",
    title: "With description",
    description: "Optional supporting line under the title.",
    preview: (
      <Tooltip
        title="This is a tooltip"
        description="Tooltips are used to describe or identify an element. In most scenarios, tooltip help the user understand meaning, function or alt-text."
      >
        <TooltipTrigger className="cursor-pointer text-fg-tertiary">
          <TriggerIcon />
        </TooltipTrigger>
      </Tooltip>
    ),
    code: `<Tooltip
  title="This is a tooltip"
  description="Tooltips are used to describe or identify an element."
>
  <TooltipTrigger>
    <HelpCircle className="size-4" />
  </TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "placement",
    title: "Placement",
    description: "All 8 placements. placement maps to Radix side/align.",
    preview: (
      <div className="grid grid-cols-3 gap-12 p-8">
        {PLACEMENTS.map((p) => (
          <div key={p.value} className="flex flex-col items-center justify-center gap-1 text-center">
            <Tooltip placement={p.value} title="This is a tooltip">
              <TooltipTrigger className="cursor-pointer text-fg-tertiary">
                <TriggerIcon />
              </TooltipTrigger>
            </Tooltip>
            <span className="text-xs whitespace-nowrap text-fg-tertiary">{p.label}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Tooltip placement="top left" title="This is a tooltip">
  <TooltipTrigger><button>?</button></TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "placement-arrow",
    title: "Placement + arrow",
    description: "All 8 placements with pointer arrow.",
    preview: (
      <div className="grid grid-cols-3 gap-12 p-8">
        {PLACEMENTS.map((p) => (
          <div key={p.value} className="flex flex-col items-center justify-center gap-1 text-center">
            <Tooltip arrow placement={p.value} title="This is a tooltip">
              <TooltipTrigger className="cursor-pointer text-fg-tertiary">
                <TriggerIcon />
              </TooltipTrigger>
            </Tooltip>
            <span className="text-xs whitespace-nowrap text-fg-tertiary">{p.label}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Tooltip arrow placement="top" title="This is a tooltip">
  <TooltipTrigger><button>?</button></TooltipTrigger>
</Tooltip>`,
  },
  {
    id: "placement-arrow-description",
    title: "Placement + arrow + description",
    description: "All 8 placements with arrow and supporting text.",
    preview: (
      <div className="grid grid-cols-3 gap-12 p-8">
        {PLACEMENTS.map((p) => (
          <div key={p.value} className="flex flex-col items-center justify-center gap-1 text-center">
            <Tooltip
              arrow
              placement={p.value}
              title="This is a tooltip"
              description="Tooltips are used to describe or identify an element. In most scenarios, tooltip help the user understand meaning, function or alt-text."
            >
              <TooltipTrigger className="cursor-pointer text-fg-tertiary">
                <TriggerIcon />
              </TooltipTrigger>
            </Tooltip>
            <span className="text-xs whitespace-nowrap text-fg-tertiary">{p.label}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Tooltip
  arrow
  placement="top"
  title="This is a tooltip"
  description="Tooltips are used to describe or identify an element."
>
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
