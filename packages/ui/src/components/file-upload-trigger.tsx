"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/file-upload-trigger/file-upload-trigger.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  type DetailedReactHTMLElement,
  type HTMLAttributes,
  type ReactNode,
  cloneElement,
  useRef,
} from "react";
import React from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface FileUploadTriggerProps {
  /**
   * Accepted MIME types (e.g. ["image/png", "image/jpeg"] or ["image/*"]).
   * Maps to the `accept` attribute of the hidden input.
   */
  acceptedFileTypes?: string[];
  /**
   * Whether multiple files can be selected at once.
   */
  allowsMultiple?: boolean;
  /**
   * Specifies the camera to use for capture on mobile devices.
   * "user" = front-facing, "environment" = rear-facing.
   */
  defaultCamera?: "user" | "environment";
  /**
   * Called when the user selects one or more files.
   */
  onSelect?: (files: FileList | null) => void;
  /**
   * Enables directory selection instead of individual files.
   * Uses the non-standard `webkitdirectory` attribute.
   */
  acceptDirectory?: boolean;
  /**
   * A single pressable React element. Receives an onClick handler that opens
   * the file picker. Must be able to forward DOM event handlers.
   */
  children: ReactNode;
}

/**
 * FileUploadTrigger wraps any pressable element and opens the system file
 * picker when it is clicked. The hidden `<input type="file">` is managed
 * internally — no form wiring is required.
 *
 * Usage:
 * ```tsx
 * <FileUploadTrigger
 *   acceptedFileTypes={["image/*"]}
 *   onSelect={(files) => console.log(files)}
 * >
 *   <Button>Upload image</Button>
 * </FileUploadTrigger>
 * ```
 */
export const FileUploadTrigger = ({
  children,
  onSelect,
  acceptedFileTypes,
  allowsMultiple,
  defaultCamera,
  acceptDirectory,
}: FileUploadTriggerProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Require exactly one child so we know which element to inject onClick into.
  const clonableElement = React.Children.only(children);

  const mainElement = cloneElement(
    clonableElement as DetailedReactHTMLElement<
      HTMLAttributes<HTMLElement>,
      HTMLElement
    >,
    {
      onClick: () => {
        // Reset the input so the same file can be re-selected if needed.
        if (inputRef.current?.value) {
          inputRef.current.value = "";
        }
        inputRef.current?.click();
      },
    },
  );

  return (
    <>
      {mainElement}
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        accept={acceptedFileTypes?.join(",")}
        onChange={(e) => onSelect?.(e.target.files)}
        capture={defaultCamera}
        multiple={allowsMultiple}
        /* @ts-expect-error — non-standard but widely supported */
        webkitdirectory={acceptDirectory ? "" : undefined}
      />
    </>
  );
};
