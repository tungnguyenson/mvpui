"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { FileUpload, getReadableFileSize } from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const MOCK_FILES = [
  { id: 1, name: "design-spec.pdf", size: 1048576, progress: 100, failed: false },
  { id: 2, name: "mockup-v2.fig", size: 3145728, progress: 60, failed: false },
  { id: 3, name: "assets.zip", size: 512000, progress: 0, failed: true },
];

function DropZoneExample() {
  const [files, setFiles] = useState(MOCK_FILES);

  const onDrop = (list: FileList) => {
    const newEntries = Array.from(list).map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      size: f.size,
      progress: 0,
      failed: false,
    }));
    setFiles((prev) => [...prev, ...newEntries]);
  };

  const remove = (id: number) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <FileUpload.Root>
      <FileUpload.DropZone
        onDropFiles={onDrop}
        hint="SVG, PNG, JPG or GIF (max. 800×400px)"
      />
      {files.length > 0 && (
        <FileUpload.List>
          {files.map((file) => (
            <FileUpload.ListItemProgressBar
              key={file.id}
              name={file.name}
              size={file.size}
              progress={file.progress}
              failed={file.failed}
              onDelete={() => remove(file.id)}
              onRetry={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))}
            />
          ))}
        </FileUpload.List>
      )}
    </FileUpload.Root>
  );
}

function FillVariantExample() {
  const [files, setFiles] = useState(MOCK_FILES);
  const remove = (id: number) => setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <FileUpload.Root>
      <FileUpload.DropZone onDropFiles={() => {}} />
      <FileUpload.List>
        {files.map((file) => (
          <FileUpload.ListItemProgressFill
            key={file.id}
            name={file.name}
            size={file.size}
            progress={file.progress}
            failed={file.failed}
            onDelete={() => remove(file.id)}
            onRetry={() => remove(file.id)}
          />
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  );
}

const SECTIONS: DocExample[] = [
  {
    id: "progress-bar",
    title: "Drop zone + progress bar list",
    description:
      "Drag files onto the drop zone or click to browse. `FileUpload.ListItemProgressBar` shows a progress bar below the file name.",
    preview: (
      <div className="w-full max-w-lg">
        <DropZoneExample />
      </div>
    ),
    code: `<FileUpload.Root>
  <FileUpload.DropZone
    onDropFiles={(files) => console.log(files)}
    hint="SVG, PNG, JPG or GIF (max. 800×400px)"
  />
  <FileUpload.List>
    {files.map((file) => (
      <FileUpload.ListItemProgressBar
        key={file.id}
        name={file.name}
        size={file.size}
        progress={file.progress}
        failed={file.failed}
        onDelete={() => removeFile(file.id)}
        onRetry={() => retryFile(file.id)}
      />
    ))}
  </FileUpload.List>
</FileUpload.Root>`,
  },
  {
    id: "progress-fill",
    title: "Fill progress variant",
    description:
      "`FileUpload.ListItemProgressFill` shows progress as a translucent fill behind the row.",
    preview: (
      <div className="w-full max-w-lg">
        <FillVariantExample />
      </div>
    ),
    code: `<FileUpload.List>
  {files.map((file) => (
    <FileUpload.ListItemProgressFill
      key={file.id}
      name={file.name}
      size={file.size}
      progress={file.progress}
      failed={file.failed}
      onDelete={() => removeFile(file.id)}
    />
  ))}
</FileUpload.List>`,
  },
  {
    id: "drop-zone-only",
    title: "Drop zone only",
    description:
      "`FileUpload.DropZone` can be used standalone. Pass `accept` to restrict file types and `maxSize` (bytes) to enforce a size limit.",
    preview: (
      <div className="w-full max-w-lg">
        <FileUpload.DropZone
          accept="image/*,.pdf"
          maxSize={5 * 1024 * 1024}
          hint="PNG, JPG or PDF up to 5 MB"
          onDropFiles={() => {}}
        />
      </div>
    ),
    code: `<FileUpload.DropZone
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  hint="PNG, JPG or PDF up to 5 MB"
  onDropFiles={(files) => uploadFiles(files)}
  onDropUnacceptedFiles={(files) => showError("Wrong file type")}
  onSizeLimitExceed={(files) => showError("File too large")}
/>`,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Pass `isDisabled` to prevent drops and clicks.",
    preview: (
      <div className="w-full max-w-lg">
        <FileUpload.DropZone isDisabled hint="Upload disabled" onDropFiles={() => {}} />
      </div>
    ),
    code: `<FileUpload.DropZone isDisabled hint="Upload disabled" onDropFiles={() => {}} />`,
  },
];

export default function Page() {
  return (
    <ComponentDocLayout
      name="FileUpload"
      tagline="Drag-and-drop file upload zone with progress list variants."
      install={{
        usage: `import { FileUpload } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Drop zone", value: "bg-bg · ring-border" },
        { label: "Drag active", value: "bg-bg-secondary · ring-border-brand" },
        { label: "List item", value: "bg-bg · ring-border" },
        { label: "Error state", value: "ring-border-error · text-fg-error" },
      ]}
    />
  );
}
