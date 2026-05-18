/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { BadgeGroup } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* -------------------------------------------------------------------------- */
/*  Section helpers                                                            */
/* -------------------------------------------------------------------------- */

const SECTIONS: DocExample[] = [
  /* ── PillColorLeadingGray ─────────────────────────────────────────────── */
  {
    id: "pill-color-leading-gray",
    title: "Pill color · Leading · Gray",
    description: "Gray pill badge on the left, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── PillColorLeadingBrand ─────────────────────────────────────────────── */
  {
    id: "pill-color-leading-brand",
    title: "Pill color · Leading · Brand",
    description: "Brand (purple) pill badge on the left, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── PillColorLeadingError ─────────────────────────────────────────────── */
  {
    id: "pill-color-leading-error",
    title: "Pill color · Leading · Error",
    description: "Error (red) pill badge on the left, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="md">
          There was a problem with that action
        </BadgeGroup>
        <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="lg">
          There was a problem with that action
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="md">
  There was a problem with that action
</BadgeGroup>
<BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="lg">
  There was a problem with that action
</BadgeGroup>`,
  },

  /* ── PillColorLeadingWarning ─────────────────────────────────────────────── */
  {
    id: "pill-color-leading-warning",
    title: "Pill color · Leading · Warning",
    description: "Warning (yellow) pill badge on the left, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="md">
          Just to let you know this might be a problem
        </BadgeGroup>
        <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="lg">
          Just to let you know this might be a problem
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="md">
  Just to let you know this might be a problem
</BadgeGroup>
<BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="lg">
  Just to let you know this might be a problem
</BadgeGroup>`,
  },

  /* ── PillColorLeadingSuccess ─────────────────────────────────────────────── */
  {
    id: "pill-color-leading-success",
    title: "Pill color · Leading · Success",
    description: "Success (green) pill badge on the left, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="md">
          You&apos;ve updated your profile and details
        </BadgeGroup>
        <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="lg">
          You&apos;ve updated your profile and details
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="md">
  You've updated your profile and details
</BadgeGroup>
<BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="lg">
  You've updated your profile and details
</BadgeGroup>`,
  },

  /* ── PillColorTrailingGray ─────────────────────────────────────────────── */
  {
    id: "pill-color-trailing-gray",
    title: "Pill color · Trailing · Gray",
    description: "Gray pill badge on the right, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── PillColorTrailingBrand ─────────────────────────────────────────────── */
  {
    id: "pill-color-trailing-brand",
    title: "Pill color · Trailing · Brand",
    description: "Brand pill badge on the right, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── PillColorTrailingError ─────────────────────────────────────────────── */
  {
    id: "pill-color-trailing-error",
    title: "Pill color · Trailing · Error",
    description: "Error pill badge on the right, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="md">
          There was a problem with that action
        </BadgeGroup>
        <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="lg">
          There was a problem with that action
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="md">
  There was a problem with that action
</BadgeGroup>
<BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="lg">
  There was a problem with that action
</BadgeGroup>`,
  },

  /* ── PillColorTrailingWarning ─────────────────────────────────────────────── */
  {
    id: "pill-color-trailing-warning",
    title: "Pill color · Trailing · Warning",
    description: "Warning pill badge on the right, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="md">
          Just to let you know this might be a problem
        </BadgeGroup>
        <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="lg">
          Just to let you know this might be a problem
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="md">
  Just to let you know this might be a problem
</BadgeGroup>
<BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="lg">
  Just to let you know this might be a problem
</BadgeGroup>`,
  },

  /* ── PillColorTrailingSuccess ─────────────────────────────────────────────── */
  {
    id: "pill-color-trailing-success",
    title: "Pill color · Trailing · Success",
    description: "Success pill badge on the right, md and lg sizes.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="md">
          You&apos;ve updated your profile and details
        </BadgeGroup>
        <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="lg">
          You&apos;ve updated your profile and details
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="md">
  You've updated your profile and details
</BadgeGroup>
<BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="lg">
  You've updated your profile and details
</BadgeGroup>`,
  },

  /* ── BadgeModernLeadingGray ─────────────────────────────────────────────── */
  {
    id: "badge-modern-leading-gray",
    title: "Badge modern · Leading · Gray",
    description: "Modern neutral surface with gray dot indicator, badge leading.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernLeadingBrand ─────────────────────────────────────────────── */
  {
    id: "badge-modern-leading-brand",
    title: "Badge modern · Leading · Brand",
    description: "Modern surface with brand dot indicator, badge leading.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernLeadingError ─────────────────────────────────────────────── */
  {
    id: "badge-modern-leading-error",
    title: "Badge modern · Leading · Error",
    description: "Modern surface with error dot indicator, badge leading.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="md">
          There was a problem with that action
        </BadgeGroup>
        <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="lg">
          There was a problem with that action
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="md">
  There was a problem with that action
</BadgeGroup>
<BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="lg">
  There was a problem with that action
</BadgeGroup>`,
  },

  /* ── BadgeModernLeadingWarning ─────────────────────────────────────────────── */
  {
    id: "badge-modern-leading-warning",
    title: "Badge modern · Leading · Warning",
    description: "Modern surface with warning dot indicator, badge leading.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="md">
          Just to let you know this might be a problem
        </BadgeGroup>
        <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="lg">
          Just to let you know this might be a problem
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="md">
  Just to let you know this might be a problem
</BadgeGroup>
<BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="lg">
  Just to let you know this might be a problem
</BadgeGroup>`,
  },

  /* ── BadgeModernLeadingSuccess ─────────────────────────────────────────────── */
  {
    id: "badge-modern-leading-success",
    title: "Badge modern · Leading · Success",
    description: "Modern surface with success dot indicator, badge leading.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="md">
          You&apos;ve updated your profile and details
        </BadgeGroup>
        <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="lg">
          You&apos;ve updated your profile and details
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="md">
  You've updated your profile and details
</BadgeGroup>
<BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="lg">
  You've updated your profile and details
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailingGray ─────────────────────────────────────────────── */
  {
    id: "badge-modern-trailing-gray",
    title: "Badge modern · Trailing · Gray",
    description: "Modern surface with gray dot, badge trailing.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailingBrand ─────────────────────────────────────────────── */
  {
    id: "badge-modern-trailing-brand",
    title: "Badge modern · Trailing · Brand",
    description: "Modern surface with brand dot, badge trailing.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="md">
          We&apos;ve just released a new feature
        </BadgeGroup>
        <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="lg">
          We&apos;ve just released a new feature
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="lg">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailingError ─────────────────────────────────────────────── */
  {
    id: "badge-modern-trailing-error",
    title: "Badge modern · Trailing · Error",
    description: "Modern surface with error dot, badge trailing.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="md">
          There was a problem with that action
        </BadgeGroup>
        <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="lg">
          There was a problem with that action
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="md">
  There was a problem with that action
</BadgeGroup>
<BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="lg">
  There was a problem with that action
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailingWarning ─────────────────────────────────────────────── */
  {
    id: "badge-modern-trailing-warning",
    title: "Badge modern · Trailing · Warning",
    description: "Modern surface with warning dot, badge trailing.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="md">
          Just to let you know this might be a problem
        </BadgeGroup>
        <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="lg">
          Just to let you know this might be a problem
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="md">
  Just to let you know this might be a problem
</BadgeGroup>
<BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="lg">
  Just to let you know this might be a problem
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailingSuccess ─────────────────────────────────────────────── */
  {
    id: "badge-modern-trailing-success",
    title: "Badge modern · Trailing · Success",
    description: "Modern surface with success dot, badge trailing.",
    preview: (
      <div className="flex flex-col items-start gap-4">
        <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="md">
          You&apos;ve updated your profile and details
        </BadgeGroup>
        <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="lg">
          You&apos;ve updated your profile and details
        </BadgeGroup>
      </div>
    ),
    code: `<BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="md">
  You've updated your profile and details
</BadgeGroup>
<BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="lg">
  You've updated your profile and details
</BadgeGroup>`,
  },

  /* ── PillColorLeading (all colors grid) ───────────────────────────────── */
  {
    id: "pill-color-leading-all",
    title: "Pill color · Leading · All colors",
    description: "All 5 colors × md and lg in a 2-column grid, leading alignment.",
    preview: (
      <div className="grid grid-cols-2 content-start gap-x-8 gap-y-4">
        {(["gray", "brand", "error", "warning", "success"] as const).map((color) =>
          (["md", "lg"] as const).map((size) => (
            <div key={`${color}-${size}`} className="flex flex-col gap-3.5">
              <BadgeGroup addonText={color === "error" ? "Error" : color === "warning" ? "Warning" : color === "success" ? "Success" : "New feature"} color={color} theme="light" align="leading" size={size}>
                {color === "error" ? "There was a problem with that action" : color === "warning" ? "Just to let you know this might be a problem" : color === "success" ? "You've updated your profile and details" : "We've just released a new feature"}
              </BadgeGroup>
            </div>
          )),
        )}
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>
<BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="lg">
  There was a problem with that action
</BadgeGroup>`,
  },

  /* ── PillColorTrailing (all colors grid) ──────────────────────────────── */
  {
    id: "pill-color-trailing-all",
    title: "Pill color · Trailing · All colors",
    description: "All 5 colors × md and lg in a 2-column grid, trailing alignment.",
    preview: (
      <div className="grid grid-cols-2 content-start gap-x-8 gap-y-4">
        {(["gray", "brand", "error", "warning", "success"] as const).map((color) =>
          (["md", "lg"] as const).map((size) => (
            <div key={`${color}-${size}`} className="flex flex-col gap-3.5">
              <BadgeGroup addonText={color === "error" ? "Error" : color === "warning" ? "Warning" : color === "success" ? "Success" : "New feature"} color={color} theme="light" align="trailing" size={size}>
                {color === "error" ? "There was a problem with that action" : color === "warning" ? "Just to let you know this might be a problem" : color === "success" ? "You've updated your profile and details" : "We've just released a new feature"}
              </BadgeGroup>
            </div>
          )),
        )}
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernLeading (all colors grid) ─────────────────────────────── */
  {
    id: "badge-modern-leading-all",
    title: "Badge modern · Leading · All colors",
    description: "All 5 colors × md and lg in a 2-column grid, modern leading.",
    preview: (
      <div className="grid grid-cols-2 content-start gap-x-8 gap-y-4">
        {(["gray", "brand", "error", "warning", "success"] as const).map((color) =>
          (["md", "lg"] as const).map((size) => (
            <div key={`${color}-${size}`} className="flex flex-col gap-3.5">
              <BadgeGroup addonText={color === "error" ? "Error" : color === "warning" ? "Warning" : color === "success" ? "Success" : "New feature"} color={color} theme="modern" align="leading" size={size}>
                {color === "error" ? "There was a problem with that action" : color === "warning" ? "Just to let you know this might be a problem" : color === "success" ? "You've updated your profile and details" : "We've just released a new feature"}
              </BadgeGroup>
            </div>
          )),
        )}
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
  We've just released a new feature
</BadgeGroup>`,
  },

  /* ── BadgeModernTrailing (all colors grid) ────────────────────────────── */
  {
    id: "badge-modern-trailing-all",
    title: "Badge modern · Trailing · All colors",
    description: "All 5 colors × md and lg in a 2-column grid, modern trailing.",
    preview: (
      <div className="grid grid-cols-2 content-start gap-x-8 gap-y-4">
        {(["gray", "brand", "error", "warning", "success"] as const).map((color) =>
          (["md", "lg"] as const).map((size) => (
            <div key={`${color}-${size}`} className="flex flex-col gap-3.5">
              <BadgeGroup addonText={color === "error" ? "Error" : color === "warning" ? "Warning" : color === "success" ? "Success" : "New feature"} color={color} theme="modern" align="trailing" size={size}>
                {color === "error" ? "There was a problem with that action" : color === "warning" ? "Just to let you know this might be a problem" : color === "success" ? "You've updated your profile and details" : "We've just released a new feature"}
              </BadgeGroup>
            </div>
          )),
        )}
      </div>
    ),
    code: `<BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="md">
  We've just released a new feature
</BadgeGroup>`,
  },
];

export default function BadgeGroupPage() {
  return (
    <ComponentDocLayout
      name="BadgeGroup"
      tagline="Inline announcement strip that combines a colored or modern badge with a short message. 5 colors, 2 themes (light / modern), 2 alignments, 2 sizes."
      install={{
        usage: `import { BadgeGroup } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size md root", value: "py-1 text-xs font-medium" },
        { label: "Size lg root", value: "py-1 text-sm font-medium" },
        { label: "Light shape", value: "rounded-full ring-1 ring-inset" },
        { label: "Modern shape", value: "rounded-[10px] ring-1 ring-inset" },
        { label: "Modern bg", value: "bg-bg ring-border shadow-xs" },
        { label: "Modern hover", value: "hover:bg-bg-secondary" },
      ]}
    />
  );
}
