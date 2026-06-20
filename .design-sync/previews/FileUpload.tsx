import { FileUpload } from "@mvp-ui/ui";

const FILES = [
  { id: 1, name: "design-spec.pdf", size: 1048576, progress: 100, failed: false },
  { id: 2, name: "mockup-v2.fig", size: 3145728, progress: 60, failed: false },
  { id: 3, name: "assets.zip", size: 512000, progress: 0, failed: true },
];

const noop = () => {};

export const ProgressBarList = () => (
  <div style={{ width: 512, maxWidth: "100%" }}>
    <FileUpload.Root>
      <FileUpload.DropZone onDropFiles={noop} hint="SVG, PNG, JPG or GIF (max. 800×400px)" />
      <FileUpload.List>
        {FILES.map((file) => (
          <FileUpload.ListItemProgressBar
            key={file.id}
            name={file.name}
            size={file.size}
            progress={file.progress}
            failed={file.failed}
            onDelete={noop}
            onRetry={noop}
          />
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  </div>
);

export const ProgressFillList = () => (
  <div style={{ width: 512, maxWidth: "100%" }}>
    <FileUpload.Root>
      <FileUpload.List>
        {FILES.map((file) => (
          <FileUpload.ListItemProgressFill
            key={file.id}
            name={file.name}
            size={file.size}
            progress={file.progress}
            failed={file.failed}
            onDelete={noop}
            onRetry={noop}
          />
        ))}
      </FileUpload.List>
    </FileUpload.Root>
  </div>
);

export const DropZoneOnly = () => (
  <div style={{ width: 512, maxWidth: "100%" }}>
    <FileUpload.DropZone
      accept="image/*,.pdf"
      maxSize={5 * 1024 * 1024}
      hint="PNG, JPG or PDF up to 5 MB"
      onDropFiles={noop}
    />
  </div>
);
