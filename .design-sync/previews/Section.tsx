import { Section, Button, Input, Label } from "@mvp-ui/ui";

const card: React.CSSProperties = { width: 720, maxWidth: "100%" };

export const Basic = () => (
  <div style={card} className="rounded-xl border border-border bg-bg-secondary p-6">
    <Section title="Notifications" description="Choose what you want to be notified about.">
      <p className="text-sm text-fg-secondary">
        Notification preferences UI would go here.
      </p>
    </Section>
  </div>
);

export const WithActions = () => (
  <div style={card} className="rounded-xl border border-border bg-bg-secondary p-6">
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
);

export const SettingsPage = () => (
  <div style={card} className="overflow-hidden rounded-xl border border-border bg-bg">
    <div className="border-b border-border px-8 py-6">
      <h2 className="text-lg font-semibold text-fg">My details</h2>
      <p className="mt-0.5 text-sm text-fg-tertiary">Update your personal information.</p>
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
          Once deleted, your account and all associated data will be permanently removed.
          This action cannot be undone.
        </p>
      </Section>
    </div>
  </div>
);
