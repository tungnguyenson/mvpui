import { Input, HintText } from "@mvp-ui/ui";
import { Mail, Search } from "lucide-react";

export const Default = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <Input placeholder="Enter your full name…" />
  </div>
);

export const LeadingIcon = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <Input iconLeading={<Search />} type="search" placeholder="Search invoices" />
    <Input size="md" iconLeading={<Mail />} type="email" placeholder="you@example.com" />
  </div>
);

export const Sizes = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <Input size="sm" placeholder="Size sm" />
    <Input size="md" placeholder="Size md" />
  </div>
);

export const Invalid = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
    <Input isInvalid defaultValue="not-an-email" />
    <HintText isInvalid>Please enter a valid email address.</HintText>
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <Input placeholder="Unavailable" disabled />
  </div>
);
