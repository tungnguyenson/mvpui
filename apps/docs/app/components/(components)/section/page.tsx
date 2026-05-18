/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Section, Button, Input, Label } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Section with title and content only.",
    preview: (
      <div className="w-full rounded-xl border border-border bg-bg-secondary p-6">
        <Section
          title="Notifications"
          description="Choose what you want to be notified about."
        >
          <p className="text-sm text-fg-secondary">
            Notification preferences UI would go here.
          </p>
        </Section>
      </div>
    ),
    code: `<Section
  title="Notifications"
  description="Choose what you want to be notified about."
>
  <p className="text-sm text-fg-secondary">
    Notification preferences UI would go here.
  </p>
</Section>`,
  },
  {
    id: "with-actions",
    title: "With actions",
    description:
      "Actions render as a flex row at the bottom right of the content column, separated by a border.",
    preview: (
      <div className="w-full rounded-xl border border-border bg-bg-secondary p-6">
        <Section
          title="Display name"
          description="Update your display name visible to other users."
          actions={
            <>
              <Button color="secondary" size="sm">
                Cancel
              </Button>
              <Button size="sm">Save changes</Button>
            </>
          }
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="display-name">Display name</Label>
            <Input id="display-name" defaultValue="Tung Nguyen" />
          </div>
        </Section>
      </div>
    ),
    code: `<Section
  title="Display name"
  description="Update your display name visible to other users."
  actions={
    <>
      <Button color="secondary" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </>
  }
>
  <Label htmlFor="display-name">Display name</Label>
  <Input id="display-name" defaultValue="Tung Nguyen" />
</Section>`,
  },
  {
    id: "settings-page-pattern",
    title: "Settings page pattern",
    description:
      "Multiple sections compose a full settings page. The last section has no divider.",
    preview: (
      <div className="w-full overflow-hidden rounded-xl border border-border bg-bg">
        <div className="border-b border-border px-8 py-6">
          <h2 className="text-lg font-semibold text-fg">My details</h2>
          <p className="mt-0.5 text-sm text-fg-tertiary">
            Update your personal information.
          </p>
        </div>
        <div className="px-8">
          <Section
            title="Full name"
            description="Your name as it appears on your profile and in emails."
            actions={
              <>
                <Button color="secondary" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save changes</Button>
              </>
            }
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" defaultValue="Tung" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue="Nguyen" />
              </div>
            </div>
          </Section>
          <Section
            title="Danger zone"
            description="Irreversible actions. Proceed with caution."
            actions={
              <Button color="primary-destructive" size="sm">
                Delete account
              </Button>
            }
          >
            <p className="text-sm text-fg-secondary">
              Once deleted, your account and all associated data will be
              permanently removed. This action cannot be undone.
            </p>
          </Section>
        </div>
      </div>
    ),
    code: `<div className="px-8">
  <Section title="Full name" description="..." actions={<>...</>}>
    <Label htmlFor="first-name">First name</Label>
    <Input id="first-name" defaultValue="Tung" />
  </Section>
  <Section
    title="Danger zone"
    description="Irreversible actions. Proceed with caution."
    actions={
      <Button color="primary-destructive" size="sm">Delete account</Button>
    }
  >
    <p className="text-sm text-fg-secondary">This action cannot be undone.</p>
  </Section>
</div>`,
  },
];

export default function SectionPage() {
  return (
    <ComponentDocLayout
      name="Section"
      tagline={
        <>
          Composition primitive for settings pages. Two-column layout:
          title/description left, content and actions right. Dividers between
          sections via <code>last:border-0</code>. Toggle any example to dark
          with the moon.
        </>
      }
      install={{
        usage: `import { Section } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Padding y", value: "py-8 (32px)" },
        { label: "Left col width", value: "280px (md+)" },
        { label: "Divider", value: "--color-border" },
        { label: "Gap (columns)", value: "gap-8 (32px)" },
        { label: "Actions sep", value: "border-t border-border" },
      ]}
    />
  );
}
