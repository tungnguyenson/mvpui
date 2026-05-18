/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/buttons/close-button.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   CloseButton — dismiss affordance for Alert / Modal / Tags. Diverges from
   Untitled UI source in two places:
     1. Native <button> instead of react-aria `Button` (matches our Button;
        defers react-aria to Wave 2 per plan A1).
     2. Untitled's `theme: "light" | "dark"` is reframed as
        `tone: "default" | "on-color"`. App dark mode is handled by tokens;
        `on-color` is for a close button sitting on a saturated/brand
        surface (e.g. a colored modal header) where neutral fg would vanish.
   Built-in X icon (no icon slot) — mirrors source.
   ========================================================================== */

const closeButtonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg",
    "transition-all duration-100 ease-linear outline-none",
    "focus-visible:ring-4",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      tone: {
        default: [
          "text-muted-fg",
          "hover:enabled:bg-bg-tertiary hover:enabled:text-fg-tertiary",
          "focus-visible:ring-brand-500/22",
        ],
        "on-color": [
          "text-fg-on-brand/70", // dark-ok: on a colored surface, white-ish is mode-independent
          "hover:enabled:bg-fg-on-brand/20 hover:enabled:text-fg-on-brand", // dark-ok: on-color surface
          "focus-visible:ring-fg-on-brand/70", // dark-ok: on-color surface
        ],
      },
      size: {
        xs: "size-7 p-1.5 [&_svg]:size-4",
        sm: "size-9 p-2 [&_svg]:size-5",
        md: "size-10 p-2 [&_svg]:size-5",
        lg: "size-11 p-2 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "sm",
    },
  }
);

export interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof closeButtonVariants> {
  /** Accessible name. Defaults to "Close". */
  label?: string;
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, tone, size, label, type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        aria-label={label ?? "Close"}
        className={cn(closeButtonVariants({ tone, size }), className)}
        {...props}
      >
        <XIcon />
      </button>
    );
  }
);

CloseButton.displayName = "CloseButton";
