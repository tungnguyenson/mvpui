import { InputFile } from "@mvp-ui/ui";

export const Default = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputFile label="Resume" hint="PDF or DOCX, up to 5 MB." />
  </div>
);

export const Invalid = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputFile label="Profile photo" isInvalid hint="A file is required." />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputFile label="Attachment" isDisabled hint="Uploads are paused." />
  </div>
);
