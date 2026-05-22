"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { FAB } from "@mvp-ui/ui";
import { Plus, Pencil, Check } from "lucide-react";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description:
      "Circular floating action button for the primary CTA on mobile. Designed to sit fixed at the bottom-right of the viewport so users can always reach the main action when the page header collapses. In stories, `position=\"static\"` keeps the demo inline.",
    preview: (
      <div className="relative flex h-32 w-full items-end justify-end rounded-xl border border-border-secondary bg-bg-secondary p-4">
        <FAB
          label="Tạo mới"
          icon={Plus}
          onClick={() => undefined}
          position="static"
        />
      </div>
    ),
    code: `<FAB label="Tạo mới" icon={Plus} onClick={() => undefined} />`,
  },
  {
    id: "as-anchor",
    title: "As anchor",
    description:
      "Pass `href` to render an `<a>`. Combine with `linkAs={NextLink}` on the wrapping page for client-side navigation with prefetch.",
    preview: (
      <div className="relative flex h-32 w-full items-end justify-end rounded-xl border border-border-secondary bg-bg-secondary p-4">
        <FAB
          label="Tạo Y/c tuyển dụng"
          icon={Plus}
          href="/hiring-requests/new"
          position="static"
        />
      </div>
    ),
    code: `<FAB label="Tạo Y/c tuyển dụng" icon={Plus} href="/hiring-requests/new" />`,
  },
  {
    id: "secondary",
    title: "Secondary color",
    description:
      "Less prominent secondary FAB. Use when the primary FAB already occupies its position and the action is a parallel option (rare).",
    preview: (
      <div className="relative flex h-32 w-full items-end justify-end rounded-xl border border-border-secondary bg-bg-secondary p-4">
        <FAB
          label="Sửa"
          icon={Pencil}
          color="secondary"
          onClick={() => undefined}
          position="static"
        />
      </div>
    ),
    code: `<FAB label="Sửa" icon={Pencil} color="secondary" onClick={() => undefined} />`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Disabled state — pointer events off, visual opacity reduced.",
    preview: (
      <div className="relative flex h-32 w-full items-end justify-end rounded-xl border border-border-secondary bg-bg-secondary p-4">
        <FAB
          label="Hoàn tất"
          icon={Check}
          disabled
          onClick={() => undefined}
          position="static"
        />
      </div>
    ),
    code: `<FAB label="Hoàn tất" icon={Check} disabled onClick={() => undefined} />`,
  },
];

export default function FABDocsPage() {
  return (
    <ComponentDocLayout
      name="FAB"
      tagline="Floating action button — circular primary CTA pinned to the bottom-right of the viewport on mobile. Typically paired with `<PageHeader>`'s `primaryAction` slot, which renders the FAB on small viewports and a regular inline `<Button>` on desktop."
      install={{
        usage: `import { FAB } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Size", value: "size-14 (56px)" },
        { label: "Icon size", value: "size-6 (24px)" },
        { label: "Position (fixed)", value: "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))]" },
        { label: "Primary bg", value: "bg-primary text-primary-fg" },
        { label: "Shadow", value: "shadow-lg" },
      ]}
    />
  );
}
