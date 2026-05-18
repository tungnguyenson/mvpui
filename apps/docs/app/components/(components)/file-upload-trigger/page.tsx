"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import {
  BasicUpload,
  ImageOnlyUpload,
  MultipleFilesUpload,
  DirectoryUpload,
  CameraCaptureUpload,
  CustomTriggerUpload,
} from "./FileUploadTriggerExamples";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Wraps any single pressable element. Clicking it opens the native file picker.",
    preview: <BasicUpload />,
    code: `<FileUploadTrigger onSelect={(files) => console.log(files)}>
  <Button size="sm" color="secondary">
    <Upload className="size-4" />
    Upload file
  </Button>
</FileUploadTrigger>`,
  },
  {
    id: "accept-types",
    title: "Accept specific file types",
    description: "Pass acceptedFileTypes with MIME type strings to restrict what the picker shows.",
    preview: <ImageOnlyUpload />,
    code: `<FileUploadTrigger
  acceptedFileTypes={["image/*"]}
  onSelect={(files) => console.log(files)}
>
  <Button size="sm" color="secondary">
    <Image className="size-4" />
    Upload image
  </Button>
</FileUploadTrigger>`,
  },
  {
    id: "multiple",
    title: "Multiple files",
    description: "Enable allowsMultiple to let users pick more than one file at once.",
    preview: <MultipleFilesUpload />,
    code: `<FileUploadTrigger
  allowsMultiple
  onSelect={(files) => console.log([...files])}
>
  <Button size="sm" color="secondary">
    <Upload className="size-4" />
    Upload multiple files
  </Button>
</FileUploadTrigger>`,
  },
  {
    id: "directory",
    title: "Directory selection",
    description: "Set acceptDirectory to let users select an entire folder (uses webkitdirectory — Chrome / Edge / Safari).",
    preview: <DirectoryUpload />,
    code: `<FileUploadTrigger
  acceptDirectory
  onSelect={(files) => console.log(files?.length, "files")}
>
  <Button size="sm" color="secondary">
    <FolderOpen className="size-4" />
    Select folder
  </Button>
</FileUploadTrigger>`,
  },
  {
    id: "camera",
    title: "Camera capture",
    description: "Use defaultCamera to invoke the device camera directly on mobile. \"environment\" = rear-facing, \"user\" = front-facing.",
    preview: <CameraCaptureUpload />,
    code: `<FileUploadTrigger
  defaultCamera="environment"
  acceptedFileTypes={["image/*"]}
  onSelect={(files) => console.log(files)}
>
  <Button size="sm" color="secondary">
    <Camera className="size-4" />
    Take photo
  </Button>
</FileUploadTrigger>`,
  },
  {
    id: "custom-trigger",
    title: "Custom trigger element",
    description: "Any single DOM element works as the trigger — not just Button. The component clones the child and injects an onClick handler.",
    preview: <CustomTriggerUpload />,
    code: `<FileUploadTrigger
  acceptedFileTypes={["image/*", "application/pdf"]}
  onSelect={(files) => console.log(files)}
>
  <div role="button" tabIndex={0} className="...dropzone styles...">
    <Upload className="size-6" />
    <span>Click to upload or drag and drop</span>
  </div>
</FileUploadTrigger>`,
  },
];

export default function FileUploadTriggerPage() {
  return (
    <ComponentDocLayout
      name="FileUploadTrigger"
      tagline="Headless file-picker wrapper. Attach to any pressable element to open the system file dialog without managing a hidden input manually."
      install={{
        usage: `import { FileUploadTrigger } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "acceptedFileTypes", value: 'e.g. ["image/*"] or ["image/png", ".pdf"]' },
        { label: "allowsMultiple", value: "boolean — enables multi-file selection" },
        { label: "defaultCamera", value: '"user" | "environment"' },
        { label: "acceptDirectory", value: "boolean — webkitdirectory (Chrome/Edge/Safari)" },
        { label: "onSelect", value: "(files: FileList | null) => void" },
      ]}
    />
  );
}
