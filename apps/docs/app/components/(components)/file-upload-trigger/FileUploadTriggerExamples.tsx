"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import { Upload, Image, FolderOpen, Camera } from "lucide-react";
import { Button } from "@mvp-ui/ui";
import { FileUploadTrigger } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Basic                                                                      */
/* -------------------------------------------------------------------------- */

export function BasicUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger onSelect={(f) => setFiles(f ? [...f].map((x) => x.name) : [])}>
        <Button size="sm" color="secondary">
          <Upload className="size-4" />
          Upload file
        </Button>
      </FileUploadTrigger>
      {files.length > 0 && (
        <p className="text-sm text-fg-secondary">
          Selected: {files.join(", ")}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accept specific file types                                                  */
/* -------------------------------------------------------------------------- */

export function ImageOnlyUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger
        acceptedFileTypes={["image/*"]}
        onSelect={(f) => setFiles(f ? [...f].map((x) => x.name) : [])}
      >
        <Button size="sm" color="secondary">
          <Image className="size-4" />
          Upload image
        </Button>
      </FileUploadTrigger>
      {files.length > 0 && (
        <p className="text-sm text-fg-secondary">
          Selected: {files.join(", ")}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Multiple files                                                             */
/* -------------------------------------------------------------------------- */

export function MultipleFilesUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger
        allowsMultiple
        onSelect={(f) => setFiles(f ? [...f].map((x) => x.name) : [])}
      >
        <Button size="sm" color="secondary">
          <Upload className="size-4" />
          Upload multiple files
        </Button>
      </FileUploadTrigger>
      {files.length > 0 && (
        <div className="text-sm text-fg-secondary">
          <p className="font-medium text-fg">{files.length} file(s) selected:</p>
          <ul className="mt-1 list-disc pl-4">
            {files.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Directory selection                                                        */
/* -------------------------------------------------------------------------- */

export function DirectoryUpload() {
  const [fileCount, setFileCount] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger
        acceptDirectory
        onSelect={(f) => setFileCount(f ? f.length : 0)}
      >
        <Button size="sm" color="secondary">
          <FolderOpen className="size-4" />
          Select folder
        </Button>
      </FileUploadTrigger>
      {fileCount !== null && (
        <p className="text-sm text-fg-secondary">
          {fileCount} file(s) in folder
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera capture (mobile)                                                    */
/* -------------------------------------------------------------------------- */

export function CameraCaptureUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger
        defaultCamera="environment"
        acceptedFileTypes={["image/*"]}
        onSelect={(f) => setFiles(f ? [...f].map((x) => x.name) : [])}
      >
        <Button size="sm" color="secondary">
          <Camera className="size-4" />
          Take photo
        </Button>
      </FileUploadTrigger>
      {files.length > 0 && (
        <p className="text-sm text-fg-secondary">
          Captured: {files.join(", ")}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Custom trigger element (not a Button)                                      */
/* -------------------------------------------------------------------------- */

export function CustomTriggerUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-start gap-3">
      <FileUploadTrigger
        acceptedFileTypes={["image/*", "application/pdf"]}
        onSelect={(f) => setFiles(f ? [...f].map((x) => x.name) : [])}
      >
        <div
          role="button"
          tabIndex={0}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-fg-tertiary transition hover:border-border-brand hover:text-fg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
        >
          <Upload className="size-6" />
          <span>
            <span className="font-semibold text-fg-brand">Click to upload</span>
            {" "}or drag and drop
          </span>
          <span className="text-xs">Images or PDF</span>
        </div>
      </FileUploadTrigger>
      {files.length > 0 && (
        <p className="text-sm text-fg-secondary">
          Selected: {files.join(", ")}
        </p>
      )}
    </div>
  );
}
