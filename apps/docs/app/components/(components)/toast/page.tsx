"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Toaster, toast, Button } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default toast",
    description:
      "Render `<Toaster />` once near your app root. Fire toasts with the `toast()` imperative API.",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button color="secondary" size="sm" onClick={() => toast("File saved successfully.")}>
          Default
        </Button>
        <Button color="secondary" size="sm" onClick={() => toast.success("Changes saved!")}>
          Success
        </Button>
        <Button color="secondary" size="sm" onClick={() => toast.error("Something went wrong.")}>
          Error
        </Button>
        <Button color="secondary" size="sm" onClick={() => toast.warning("Your session expires soon.")}>
          Warning
        </Button>
        <Button color="secondary" size="sm" onClick={() => toast.info("New version available.")}>
          Info
        </Button>
      </div>
    ),
    code: `// In your root layout:
<Toaster />

// Fire from anywhere:
toast("File saved successfully.");
toast.success("Changes saved!");
toast.error("Something went wrong.");
toast.warning("Your session expires soon.");
toast.info("New version available.");`,
  },
  {
    id: "with-description",
    title: "With description",
    description: "Pass a `description` for a secondary line below the title.",
    preview: (
      <Button
        color="secondary"
        size="sm"
        onClick={() =>
          toast.success("Payment received", {
            description: "Invoice #1234 for $240.00 has been paid.",
          })
        }
      >
        Toast with description
      </Button>
    ),
    code: `toast.success("Payment received", {
  description: "Invoice #1234 for $240.00 has been paid.",
});`,
  },
  {
    id: "with-action",
    title: "With action",
    description: "Add an `action` button to trigger in-toast interactions.",
    preview: (
      <Button
        color="secondary"
        size="sm"
        onClick={() =>
          toast("File deleted", {
            action: {
              label: "Undo",
              onClick: () => toast("File restored."),
            },
          })
        }
      >
        Toast with action
      </Button>
    ),
    code: `toast("File deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreFile(),
  },
});`,
  },
  {
    id: "promise",
    title: "Promise toast",
    description:
      "`toast.promise()` shows loading → success / error states automatically.",
    preview: (
      <Button
        color="secondary"
        size="sm"
        onClick={() =>
          toast.promise(new Promise((res) => setTimeout(res, 2000)), {
            loading: "Saving changes…",
            success: "Changes saved!",
            error: "Failed to save.",
          })
        }
      >
        Promise toast
      </Button>
    ),
    code: `toast.promise(saveChanges(), {
  loading: "Saving changes…",
  success: "Changes saved!",
  error: "Failed to save.",
});`,
  },
  {
    id: "positions",
    title: "Positions",
    description:
      "The `position` prop on `<Toaster>` controls where toasts appear. Valid values: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.",
    preview: (
      <div className="flex flex-wrap gap-2">
        {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as const).map(
          (pos) => (
            <Button
              key={pos}
              color="secondary"
              size="sm"
              onClick={() => toast(`Position: ${pos}`)}
            >
              {pos}
            </Button>
          )
        )}
      </div>
    ),
    code: `<Toaster position="top-center" />`,
  },
  {
    id: "toaster-setup",
    title: "Toaster setup",
    description:
      "Mount `<Toaster>` once in your root layout. All props are optional — defaults shown below.",
    preview: (
      <div className="w-full rounded-lg bg-bg-secondary p-4 text-sm text-fg-secondary font-mono">
        {"<Toaster"}
        <br />
        {"  position=\"bottom-right\""}
        <br />
        {"  richColors={true}"}
        <br />
        {"  duration={4000}"}
        <br />
        {"  closeButton={false}"}
        <br />
        {"  expand={false}"}
        <br />
        {"/>"}
      </div>
    ),
    code: `// app/layout.tsx (server component — safe to import Toaster)
import { Toaster } from "@mvp-ui/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}`,
  },
];

export default function Page() {
  return (
    <>
      {/* Scoped Toaster for this docs page */}
      <Toaster position="bottom-right" />
      <ComponentDocLayout
        name="Toast"
        tagline="Imperative toast notifications via Sonner. Mount `<Toaster>` once; call `toast()` anywhere."
        install={{
          usage: `import { Toaster, toast } from "@mvp-ui/ui";`,
        }}
        sections={SECTIONS}
        tokenReference={[
          { label: "Surface", value: "bg-bg · ring-border" },
          { label: "Error ring", value: "ring-border-error" },
          { label: "Success ring", value: "ring-border-success" },
          { label: "Warning ring", value: "ring-border-warning" },
          { label: "Info ring", value: "ring-border-brand" },
        ]}
      />
    </>
  );
}
