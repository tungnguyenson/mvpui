import { RadioGroup, RadioButton } from "@mvp-ui/ui";

// RadioButton only renders inside a RadioGroup (context-required leaf).
export const InGroup = () => (
  <RadioGroup aria-label="Notification frequency" defaultValue="daily">
    <RadioButton label="Real-time" hint="Notify me as events happen." value="realtime" />
    <RadioButton label="Daily digest" hint="One summary email each morning." value="daily" />
    <RadioButton label="Weekly digest" hint="A roundup every Monday." value="weekly" />
  </RadioGroup>
);

export const DisabledItem = () => (
  <RadioGroup aria-label="Pricing plans" defaultValue="basic">
    <RadioButton label="Basic plan" hint="Up to 10 users." value="basic" />
    <RadioButton label="Business plan" hint="Up to 20 users." value="business" />
    <RadioButton isDisabled label="Enterprise plan" hint="Contact sales." value="enterprise" />
  </RadioGroup>
);
