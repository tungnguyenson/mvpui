import { TextArea } from "@mvp-ui/ui";

export const Default = () => (
  <div style={{ width: 384, maxWidth: "100%" }}>
    <TextArea
      isRequired
      label="Description"
      placeholder="Tell us about your project…"
      hint="A short summary helps reviewers."
      rows={5}
    />
  </div>
);

export const Invalid = () => (
  <div style={{ width: 384, maxWidth: "100%" }}>
    <TextArea
      isRequired
      isInvalid
      label="Description"
      placeholder="Tell us about your project…"
      hint="This field is required."
      rows={5}
    />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 384, maxWidth: "100%" }}>
    <TextArea
      isDisabled
      label="Description"
      placeholder="Editing is disabled."
      hint="Read-only for now."
      rows={5}
    />
  </div>
);
