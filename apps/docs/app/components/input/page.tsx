import Link from "next/link";
import { ArrowLeft, Mail, Search, Eye, AlertCircle } from "lucide-react";
import { Input, Label } from "@mvp-ui/ui";

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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 min-h-12">
      <span className="w-28 shrink-0 text-xs text-fg-tertiary font-medium uppercase tracking-wide pt-3">
        {label}
      </span>
      <div className="flex flex-col gap-2 flex-1 max-w-sm">{children}</div>
    </div>
  );
}

export default function InputPage() {
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
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Input</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Text input with focus ring, error state, and optional icon slots.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection title="Variants" description="Default and error states.">
            <div className="flex flex-col gap-4">
              <Row label="Default">
                <Input placeholder="Enter your email" />
              </Row>
              <Row label="Error">
                <Input variant="error" placeholder="Enter your email" defaultValue="invalid-email" />
                <p className="text-xs text-error-600 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Please enter a valid email address.
                </p>
              </Row>
            </div>
          </DocSection>

          <DocSection title="States" description="Disabled and read-only.">
            <div className="flex flex-col gap-4">
              <Row label="Disabled">
                <Input placeholder="Disabled input" disabled />
              </Row>
              <Row label="Read-only">
                <Input defaultValue="Read-only value" readOnly className="cursor-default" />
              </Row>
            </div>
          </DocSection>

          <DocSection title="With icons" description="Start and end icon slots accept any ReactNode at 16px.">
            <div className="flex flex-col gap-4">
              <Row label="Start icon">
                <Input
                  placeholder="Search..."
                  startIcon={<Search size={16} />}
                />
              </Row>
              <Row label="End icon">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  endIcon={<Mail size={16} />}
                />
              </Row>
              <Row label="Both">
                <Input
                  type="password"
                  placeholder="Enter password"
                  startIcon={<Mail size={16} />}
                  endIcon={<Eye size={16} />}
                />
              </Row>
            </div>
          </DocSection>

          <DocSection
            title="With Label"
            description="Compose Label + Input + hint text for a complete form field."
          >
            <div className="flex flex-col gap-5 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email-full">Email address</Label>
                <Input
                  id="email-full"
                  type="email"
                  placeholder="you@example.com"
                  startIcon={<Mail size={16} />}
                />
                <p className="text-xs text-fg-tertiary">We'll never share your email.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email-err">
                  Email address <span className="text-error-500">*</span>
                </Label>
                <Input
                  id="email-err"
                  variant="error"
                  type="email"
                  defaultValue="not-an-email"
                  endIcon={<AlertCircle size={16} className="text-error-500" />}
                />
                <p className="text-xs text-error-600">Please enter a valid email address.</p>
              </div>
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Height</dt>
              <dd className="font-mono text-fg-secondary">h-11 (44px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Border</dt>
              <dd className="font-mono text-fg-secondary">--color-border</dd>
            </div>
            <div className="flex justify-between">
              <dt>Focus ring</dt>
              <dd className="font-mono text-fg-secondary">--brand-500 / 22%</dd>
            </div>
            <div className="flex justify-between">
              <dt>Error border</dt>
              <dd className="font-mono text-fg-secondary">--color-error-500</dd>
            </div>
            <div className="flex justify-between">
              <dt>Radius</dt>
              <dd className="font-mono text-fg-secondary">--radius-md (8px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Padding x</dt>
              <dd className="font-mono text-fg-secondary">px-3.5 (14px)</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
