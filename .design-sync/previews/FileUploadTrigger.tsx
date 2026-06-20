import { FileUploadTrigger, Button } from "@mvp-ui/ui";
import { Upload, Image, FolderOpen } from "lucide-react";

const noop = () => {};

export const Basic = () => (
  <FileUploadTrigger onSelect={noop}>
    <Button size="sm" color="secondary" iconLeading={Upload}>
      Upload file
    </Button>
  </FileUploadTrigger>
);

export const ImageOnly = () => (
  <FileUploadTrigger acceptedFileTypes={["image/*"]} onSelect={noop}>
    <Button size="sm" color="secondary" iconLeading={Image}>
      Upload image
    </Button>
  </FileUploadTrigger>
);

export const CustomTrigger = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <FileUploadTrigger acceptedFileTypes={["image/*", "application/pdf"]} onSelect={noop}>
      <div
        role="button"
        tabIndex={0}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-fg-tertiary"
      >
        <Upload className="size-6" />
        <span>
          <span className="font-semibold text-fg-brand">Click to upload</span> or drag and drop
        </span>
        <span className="text-xs">Images or PDF</span>
      </div>
    </FileUploadTrigger>
  </div>
);
