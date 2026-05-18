/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/avatar/base-components/avatar-add-button.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cn } from "../../lib/cn.js";
import { Tooltip, TooltipTrigger } from "../tooltip.js";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

const SIZES = {
  xs: { button: "size-6", icon: "size-3.5" },
  sm: { button: "size-8", icon: "size-4" },
  md: { button: "size-10", icon: "size-5" },
} as const;

export interface AvatarAddButtonProps {
  size?: "xs" | "sm" | "md";
  label?: string;
  className?: string;
}

export const AvatarAddButton = ({
  size = "md",
  label = "Add person",
  className,
}: AvatarAddButtonProps) => {
  const s = SIZES[size];
  return (
    <Tooltip title={label}>
      <TooltipTrigger
        aria-label={label}
        className={cn(
          "flex items-center justify-center rounded-full border border-dashed border-border bg-bg-tertiary",
          s.button,
          className,
        )}
      >
        <PlusIcon className={cn("text-fg-tertiary", s.icon)} />
      </TooltipTrigger>
    </Tooltip>
  );
};
