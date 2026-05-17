import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, Button, Input, Label } from "@mvp-ui/ui";

function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 border-b border-border last:border-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        {description && <p className="mt-1 text-sm text-fg-tertiary">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export default function SectionPage() {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-tertiary hover:text-fg transition-colors"
          >
            <ArrowLeft size={14} />
            Components
          </Link>
        </div>
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Section</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Composition primitive for settings pages. Two-column layout: title/description left,
          content and actions right. Dividers between sections via{" "}
          <code className="text-sm font-mono bg-gray-100 px-1.5 py-0.5 rounded-md">last:border-0</code>.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection title="Basic" description="Section with title and content only.">
            <div className="rounded-xl border border-border bg-bg-secondary p-6">
              <Section title="Notifications" description="Choose what you want to be notified about.">
                <p className="text-sm text-fg-secondary">
                  Notification preferences UI would go here.
                </p>
              </Section>
            </div>
          </DocSection>

          <DocSection
            title="With actions"
            description="Actions render as a flex row at the bottom right of the content column, separated by a border."
          >
            <div className="rounded-xl border border-border bg-bg-secondary p-6">
              <Section
                title="Display name"
                description="Update your display name visible to other users."
                actions={
                  <>
                    <Button variant="secondary" size="sm">Cancel</Button>
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
          </DocSection>

          <DocSection
            title="Settings page pattern"
            description="Multiple sections compose a full settings page. The last section has no divider."
          >
            <div className="rounded-xl border border-border bg-bg overflow-hidden">
              <div className="px-8 py-6 border-b border-border">
                <h2 className="text-lg font-semibold text-fg">My details</h2>
                <p className="text-sm text-fg-tertiary mt-0.5">
                  Update your personal information.
                </p>
              </div>
              <div className="px-8">
                <Section
                  title="Full name"
                  description="Your name as it appears on your profile and in emails."
                  actions={
                    <>
                      <Button variant="secondary" size="sm">Cancel</Button>
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
                  title="Email address"
                  description="Your email is used for notifications and sign-in."
                  actions={
                    <>
                      <Button variant="secondary" size="sm">Cancel</Button>
                      <Button size="sm">Update email</Button>
                    </>
                  }
                >
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email-settings">Email address</Label>
                    <Input
                      id="email-settings"
                      type="email"
                      defaultValue="tung@example.com"
                    />
                  </div>
                </Section>

                <Section
                  title="Danger zone"
                  description="Irreversible actions. Proceed with caution."
                  actions={
                    <Button variant="destructive" size="sm">Delete account</Button>
                  }
                >
                  <p className="text-sm text-fg-secondary">
                    Once deleted, your account and all associated data will be permanently removed.
                    This action cannot be undone.
                  </p>
                </Section>
              </div>
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Padding y</dt>
              <dd className="font-mono text-fg-secondary">py-8 (32px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Left col width</dt>
              <dd className="font-mono text-fg-secondary">280px (md+)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Divider</dt>
              <dd className="font-mono text-fg-secondary">--color-border</dd>
            </div>
            <div className="flex justify-between">
              <dt>Gap (columns)</dt>
              <dd className="font-mono text-fg-secondary">gap-8 (32px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Actions sep</dt>
              <dd className="font-mono text-fg-secondary">border-t border-border</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
