import { RadioGroup, RadioButton } from "@mvp-ui/ui";

export const WithHints = () => (
  <RadioGroup aria-label="Pricing plans" defaultValue="business">
    <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
    <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
    <RadioButton label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
  </RadioGroup>
);

export const Disabled = () => (
  <RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
    <RadioButton label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
    <RadioButton label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
  </RadioGroup>
);

export const Sizes = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
    <RadioGroup aria-label="Plan sm" defaultValue="basic">
      <RadioButton label="Small radio" value="basic" />
      <RadioButton label="Another option" value="business" />
    </RadioGroup>
    <RadioGroup aria-label="Plan md" defaultValue="basic" size="md">
      <RadioButton label="Medium radio" value="basic" />
      <RadioButton label="Another option" value="business" />
    </RadioGroup>
  </div>
);
