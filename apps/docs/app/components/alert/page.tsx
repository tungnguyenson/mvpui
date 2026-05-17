import Link from "next/link";
import {
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@mvp-ui/ui";

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

export default function AlertPage() {
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
        <h1 className="text-4xl font-semibold text-fg tracking-tight mb-1">Alert</h1>
        <p className="text-md text-fg-tertiary mb-8">
          Inline message with semantic color, optional icon, title, and description.
          Four variants: info, success, warning, error.
        </p>

        <div className="rounded-2xl border border-border bg-bg p-8 shadow-xs">
          <DocSection
            title="Variants"
            description="Each variant uses a semantic color pair — background, border, and text."
          >
            <div className="flex flex-col gap-3">
              <Alert variant="info">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Your account is scheduled for maintenance on Sunday at 2am UTC.
                </AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Payment confirmed</AlertTitle>
                <AlertDescription>
                  Your subscription has been activated. Enjoy all Pro features.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Storage almost full</AlertTitle>
                <AlertDescription>
                  You've used 90% of your storage. Upgrade to avoid interruptions.
                </AlertDescription>
              </Alert>
              <Alert variant="error">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  We couldn't process your payment. Please update your billing details.
                </AlertDescription>
              </Alert>
            </div>
          </DocSection>

          <DocSection
            title="With icons"
            description="Pass any ReactNode to the icon prop — rendered at 20px with currentColor."
          >
            <div className="flex flex-col gap-3">
              <Alert variant="info" icon={<Info />}>
                <AlertTitle>New feature available</AlertTitle>
                <AlertDescription>
                  Check out the new analytics dashboard in your account settings.
                </AlertDescription>
              </Alert>
              <Alert variant="success" icon={<CheckCircle2 />}>
                <AlertTitle>Changes saved</AlertTitle>
                <AlertDescription>
                  Your profile has been updated successfully.
                </AlertDescription>
              </Alert>
              <Alert variant="warning" icon={<AlertTriangle />}>
                <AlertTitle>API rate limit approaching</AlertTitle>
                <AlertDescription>
                  You've used 80% of your API quota. Consider upgrading your plan.
                </AlertDescription>
              </Alert>
              <Alert variant="error" icon={<XCircle />}>
                <AlertTitle>Verification failed</AlertTitle>
                <AlertDescription>
                  The email address could not be verified. Please check and try again.
                </AlertDescription>
              </Alert>
            </div>
          </DocSection>

          <DocSection title="Title only" description="Alert without description for concise messages.">
            <div className="flex flex-col gap-3">
              <Alert variant="info" icon={<Info />}>
                <AlertTitle>Session expires in 5 minutes.</AlertTitle>
              </Alert>
              <Alert variant="success" icon={<CheckCircle2 />}>
                <AlertTitle>Deployment successful.</AlertTitle>
              </Alert>
              <Alert variant="error" icon={<XCircle />}>
                <AlertTitle>Invalid credentials. Please try again.</AlertTitle>
              </Alert>
            </div>
          </DocSection>

          <DocSection title="No icon" description="Works without an icon for simple inline messages.">
            <div className="flex flex-col gap-3">
              <Alert variant="info">
                <AlertDescription>
                  Read our updated privacy policy before continuing.
                </AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertDescription>
                  This action cannot be undone. Proceed with caution.
                </AlertDescription>
              </Alert>
            </div>
          </DocSection>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-bg p-6">
          <h3 className="text-sm font-semibold text-fg mb-3">Token reference</h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-fg-tertiary">
            <div className="flex justify-between">
              <dt>Info bg</dt>
              <dd className="font-mono text-fg-secondary">--color-brand-50</dd>
            </div>
            <div className="flex justify-between">
              <dt>Info border</dt>
              <dd className="font-mono text-fg-secondary">--color-brand-200</dd>
            </div>
            <div className="flex justify-between">
              <dt>Padding</dt>
              <dd className="font-mono text-fg-secondary">p-4 (16px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Radius</dt>
              <dd className="font-mono text-fg-secondary">--radius-xl (12px)</dd>
            </div>
            <div className="flex justify-between">
              <dt>Icon size</dt>
              <dd className="font-mono text-fg-secondary">20px (via [&_svg])</dd>
            </div>
            <div className="flex justify-between">
              <dt>Gap</dt>
              <dd className="font-mono text-fg-secondary">gap-3 (12px)</dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
