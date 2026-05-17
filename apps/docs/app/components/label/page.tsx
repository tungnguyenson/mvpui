import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Label, Input } from "@mvp-ui/ui";

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
      <span className="w-28 shrink-0 text-xs text-fg-tertiary font-medium uppercase tracking-wide pt-2">
        {label}
      </span>
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
    </div>
  );
}

export default function LabelPage() {
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
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Label</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Renders a <code className="text-sm font-mono bg-gray-100 px-1.5 py-0.5 rounded-md">&lt;label&gt;</code> element with consistent typography. Always associate with a form control via <code className="text-sm font-mono bg-gray-100 px-1.5 py-0.5 rounded-md">htmlFor</code>.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection title="Basic">
            <div className="flex flex-col gap-2">
              <Row label="Default">
                <Label>Email address</Label>
              </Row>
              <Row label="Required">
                <Label>
                  Email address{" "}
                  <span className="text-error-500">*</span>
                </Label>
              </Row>
              <Row label="Disabled">
                <Label className="opacity-50 cursor-not-allowed">
                  Email address
                </Label>
              </Row>
            </div>
          </DocSection>

          <DocSection
            title="With input"
            description="Label paired with Input via htmlFor — clicking the label focuses the input."
          >
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email-demo">Email address</Label>
                <Input id="email-demo" type="email" placeholder="you@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password-demo">
                  Password <span className="text-error-500">*</span>
                </Label>
                <Input id="password-demo" type="password" placeholder="••••••••" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="disabled-demo" className="opacity-50 cursor-not-allowed">
                  Disabled field
                </Label>
                <Input id="disabled-demo" placeholder="Not editable" disabled />
              </div>
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Font size</dt>
              <dd className="font-mono text-fg-secondary">--text-sm (14px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Font weight</dt>
              <dd className="font-mono text-fg-secondary">500 (medium)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Color</dt>
              <dd className="font-mono text-fg-secondary">--color-fg</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
