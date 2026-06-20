import { Label, Input } from "@mvp-ui/ui";

export const Basic = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
    <Label>Email address</Label>
    <Label isRequired>Email address</Label>
    <Label isRequired isInvalid>Email address</Label>
    <Label style={{ opacity: 0.5 }}>Email address (disabled)</Label>
  </div>
);

export const WithInput = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
    <Label htmlFor="email-demo" isRequired>Work email</Label>
    <Input id="email-demo" type="email" placeholder="you@example.com" />
  </div>
);

export const WithTooltip = () => (
  <Label tooltip="We use this to send receipts." tooltipDescription="Never shared with third parties.">
    Billing email
  </Label>
);
