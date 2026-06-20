import { HintText } from "@mvp-ui/ui";

export const DefaultAndError = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
    <HintText>We&apos;ll never share your email.</HintText>
    <HintText isInvalid>Please enter a valid email address.</HintText>
  </div>
);

export const Sizes = () => (
  <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
    <HintText size="sm">Small hint text (xs).</HintText>
    <HintText size="md">Medium hint text (sm, default).</HintText>
  </div>
);
