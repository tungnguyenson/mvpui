import { InputTags } from "@mvp-ui/ui";

export const Default = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputTags
      label="Skills"
      placeholder="Add a skill…"
      defaultValue={["TypeScript", "React", "Figma"]}
      hint="Press Enter to add."
    />
  </div>
);

export const Recipients = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputTags
      label="Recipients"
      placeholder="name@team.com"
      defaultValue={["ana@acme.co", "lee@acme.co"]}
    />
  </div>
);

export const Invalid = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputTags
      label="Tags"
      isInvalid
      defaultValue={["draft"]}
      hint="Add at least two tags."
    />
  </div>
);
