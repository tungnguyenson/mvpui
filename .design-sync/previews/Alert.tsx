import { Alert, AlertTitle, AlertDescription } from "@mvp-ui/ui";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 560 };

export const Variants = () => (
  <div style={stack}>
    <Alert variant="info">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>Your account is scheduled for maintenance on Sunday at 2am UTC.</AlertDescription>
    </Alert>
    <Alert variant="success">
      <AlertTitle>Payment confirmed</AlertTitle>
      <AlertDescription>Your subscription has been activated. Enjoy all Pro features.</AlertDescription>
    </Alert>
    <Alert variant="warning">
      <AlertTitle>Storage almost full</AlertTitle>
      <AlertDescription>You&apos;ve used 90% of your storage. Upgrade to avoid interruptions.</AlertDescription>
    </Alert>
    <Alert variant="error">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>We couldn&apos;t process your payment. Please update your billing details.</AlertDescription>
    </Alert>
  </div>
);

export const WithIcons = () => (
  <div style={stack}>
    <Alert variant="info" icon={<Info />}>
      <AlertTitle>New feature available</AlertTitle>
      <AlertDescription>Check out the new analytics dashboard in your account settings.</AlertDescription>
    </Alert>
    <Alert variant="success" icon={<CheckCircle2 />}>
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your profile has been updated successfully.</AlertDescription>
    </Alert>
    <Alert variant="warning" icon={<AlertTriangle />}>
      <AlertTitle>API rate limit approaching</AlertTitle>
      <AlertDescription>You&apos;ve used 80% of your API quota. Consider upgrading.</AlertDescription>
    </Alert>
    <Alert variant="error" icon={<XCircle />}>
      <AlertTitle>Verification failed</AlertTitle>
      <AlertDescription>The email address could not be verified. Please try again.</AlertDescription>
    </Alert>
  </div>
);

export const TitleOnly = () => (
  <div style={stack}>
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
);
