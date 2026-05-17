import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Trash2 } from "lucide-react";
import { Button } from "@mvp-ui/ui";

function Section({
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
        {description && (
          <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 min-h-12">
      <span className="w-28 shrink-0 text-xs text-fg-tertiary font-medium uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Button</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Triggers an action or event. Four variants, three sizes.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          {/* Variants */}
          <Section
            title="Variants"
            description="Four semantic roles: primary action, secondary, ghost (no border), and destructive."
          >
            <div className="flex flex-col gap-2">
              <Row label="Primary">
                <Button variant="primary">Save changes</Button>
              </Row>
              <Row label="Secondary">
                <Button variant="secondary">Cancel</Button>
              </Row>
              <Row label="Ghost">
                <Button variant="ghost">Learn more</Button>
              </Row>
              <Row label="Destructive">
                <Button variant="destructive">Delete project</Button>
              </Row>
            </div>
          </Section>

          {/* Sizes */}
          <Section
            title="Sizes"
            description="Three heights: sm (36px), md (44px, default), lg (48px)."
          >
            <div className="flex flex-col gap-2">
              <Row label="sm — 36px">
                <Button size="sm">Save changes</Button>
                <Button size="sm" variant="secondary">Cancel</Button>
                <Button size="sm" variant="ghost">Learn more</Button>
              </Row>
              <Row label="md — 44px">
                <Button size="md">Save changes</Button>
                <Button size="md" variant="secondary">Cancel</Button>
                <Button size="md" variant="ghost">Learn more</Button>
              </Row>
              <Row label="lg — 48px">
                <Button size="lg">Save changes</Button>
                <Button size="lg" variant="secondary">Cancel</Button>
                <Button size="lg" variant="ghost">Learn more</Button>
              </Row>
            </div>
          </Section>

          {/* States */}
          <Section
            title="States"
            description="Disabled reduces opacity to 50% and blocks pointer events."
          >
            <div className="flex flex-col gap-2">
              <Row label="Default">
                <Button>Save changes</Button>
                <Button variant="secondary">Cancel</Button>
                <Button variant="ghost">Learn more</Button>
                <Button variant="destructive">Delete</Button>
              </Row>
              <Row label="Disabled">
                <Button disabled>Save changes</Button>
                <Button variant="secondary" disabled>Cancel</Button>
                <Button variant="ghost" disabled>Learn more</Button>
                <Button variant="destructive" disabled>Delete</Button>
              </Row>
            </div>
          </Section>

          {/* With icons */}
          <Section
            title="With icons"
            description="Icons use currentColor at 16px. Gap between icon and label is 8px."
          >
            <div className="flex flex-col gap-2">
              <Row label="Icon left">
                <Button>
                  <Mail size={16} />
                  Send email
                </Button>
                <Button variant="secondary">
                  <Mail size={16} />
                  Send email
                </Button>
              </Row>
              <Row label="Icon right">
                <Button>
                  Continue
                  <ArrowRight size={16} />
                </Button>
                <Button variant="secondary">
                  Continue
                  <ArrowRight size={16} />
                </Button>
              </Row>
              <Row label="Destructive">
                <Button variant="destructive">
                  <Trash2 size={16} />
                  Delete project
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 size={14} />
                  Delete
                </Button>
              </Row>
            </div>
          </Section>

          {/* asChild */}
          <Section
            title="asChild (polymorphic)"
            description={
              "asChild renders the button styles on the child element via Radix Slot. " +
              "Inspect the DOM — these are <a> tags with button styling."
            }
          >
            <div className="flex flex-col gap-2">
              <Row label="as Link">
                <Button asChild>
                  <Link href="/">Go home</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/">Go home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/">Go home</Link>
                </Button>
              </Row>
              <Row label="with icon">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft size={16} />
                    Back
                  </Link>
                </Button>
              </Row>
            </div>
          </Section>
        </div>

        {/* Token reference */}
        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Primary bg</dt>
              <dd className="font-mono text-fg-secondary">--brand-600</dd>
            </div>
            <div className="flex justify-between">
              <dt>Primary hover</dt>
              <dd className="font-mono text-fg-secondary">--brand-700</dd>
            </div>
            <div className="flex justify-between">
              <dt>Radius</dt>
              <dd className="font-mono text-fg-secondary">--radius-md (8px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Focus ring</dt>
              <dd className="font-mono text-fg-secondary">--brand-500 / 22%</dd>
            </div>
            <div className="flex justify-between">
              <dt>Transition</dt>
              <dd className="font-mono text-fg-secondary">250ms cubic(0.2,0,0,1)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Font weight</dt>
              <dd className="font-mono text-fg-secondary">600 (semibold)</dd>
            </div>
          </dl>
        </div>
    </div>
  );
}
