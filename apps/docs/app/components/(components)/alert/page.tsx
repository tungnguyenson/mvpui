/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

/* Snippets authored by hand next to each preview — keep in sync. */

const SECTIONS: DocExample[] = [
  {
    id: "variants",
    title: "Variants",
    description:
      "Each variant uses a semantic color pair — background, border, and text.",
    preview: (
      <div className="flex w-full max-w-xl flex-col gap-3">
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
            You&apos;ve used 90% of your storage. Upgrade to avoid
            interruptions.
          </AlertDescription>
        </Alert>
        <Alert variant="error">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            We couldn&apos;t process your payment. Please update your billing
            details.
          </AlertDescription>
        </Alert>
      </div>
    ),
    code: `<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Your account is scheduled for maintenance on Sunday at 2am UTC.
  </AlertDescription>
</Alert>`,
  },
  {
    id: "with-icons",
    title: "With icons",
    description:
      "Pass any ReactNode to the icon prop — rendered at 20px with currentColor.",
    preview: (
      <div className="flex w-full max-w-xl flex-col gap-3">
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
            You&apos;ve used 80% of your API quota. Consider upgrading.
          </AlertDescription>
        </Alert>
        <Alert variant="error" icon={<XCircle />}>
          <AlertTitle>Verification failed</AlertTitle>
          <AlertDescription>
            The email address could not be verified. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    ),
    code: `<Alert variant="success" icon={<CheckCircle2 />}>
  <AlertTitle>Changes saved</AlertTitle>
  <AlertDescription>
    Your profile has been updated successfully.
  </AlertDescription>
</Alert>`,
  },
  {
    id: "title-only",
    title: "Title only",
    description: "Alert without description for concise messages.",
    preview: (
      <div className="flex w-full max-w-xl flex-col gap-3">
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
    ),
    code: `<Alert variant="info" icon={<Info />}>
  <AlertTitle>Session expires in 5 minutes.</AlertTitle>
</Alert>`,
  },
  {
    id: "no-icon",
    title: "No icon",
    description: "Works without an icon for simple inline messages.",
    preview: (
      <div className="flex w-full max-w-xl flex-col gap-3">
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
    ),
    code: `<Alert variant="info">
  <AlertDescription>
    Read our updated privacy policy before continuing.
  </AlertDescription>
</Alert>`,
  },
];

export default function AlertPage() {
  return (
    <ComponentDocLayout
      name="Alert"
      tagline="Inline message with semantic color, optional icon, title, and description. Four variants: info, success, warning, error. Toggle any example to dark with the moon."
      install={{
        usage: `import { Alert, AlertTitle, AlertDescription } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Info bg", value: "--color-brand-50" },
        { label: "Info border", value: "--color-brand-200" },
        { label: "Padding", value: "p-4 (16px)" },
        { label: "Radius", value: "--radius-xl (12px)" },
        { label: "Icon size", value: "20px (via [&_svg])" },
        { label: "Gap", value: "gap-3 (12px)" },
      ]}
    />
  );
}
