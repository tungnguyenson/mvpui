/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  isValidElement,
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Input — API mirrors Untitled UI (size, isInvalid, iconLeading…).

   We diverge from Untitled in two places:
   1. Native `<input>` + CSS `focus-within` instead of React Aria — basic
      Input needs no headless layer (see prompt notes).
   2. Always-wrap: the bordered "field" box is a wrapper `<div>`; the inner
      `<input>` is reset and fills it. Uniform `focus-within` ring, one home
      for `data-*` hooks, no bare-vs-grouped branching. `inputVariants`
      therefore styles the FIELD WRAPPER, not the `<input>` element.

   `forwardRef` still targets the inner `<input>`. All colors map to
   @mvp-ui/tokens flipping aliases (dark-safe) — no hardcoded hex.
   ========================================================================== */

export const inputVariants = cva(
  [
    "flex w-full items-center rounded-md border bg-bg shadow-xs",
    "text-fg cursor-text outline-none",
    "transition-shadow duration-100 ease-linear",
    // disabled/read-only react to the inner input's native attributes,
    // declared AFTER the state variants so they win.
    "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:disabled]:bg-bg-secondary",
    "has-[input:read-only]:bg-bg-secondary",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5 [&_svg]:text-fg-tertiary",
  ],
  {
    variants: {
      size: {
        sm: "gap-2 px-3 py-2 text-sm",
        md: "gap-2 px-3.5 py-2.5 text-md",
      },
      state: {
        default:
          "border-border focus-within:border-border-brand focus-within:ring-4 focus-within:ring-brand-500/22",
        error:
          "border-border-error focus-within:border-border-error focus-within:ring-4 focus-within:ring-error-500/24",
        success:
          "border-border-success focus-within:border-border-success focus-within:ring-4 focus-within:ring-success-500/24",
      },
    },
    defaultVariants: {
      size: "sm",
      state: "default",
    },
  }
);

type IconProp = FC<{ className?: string }> | ReactNode;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    Pick<VariantProps<typeof inputVariants>, "size"> {
  /** Red border + error focus ring; also sets `aria-invalid` on the input. */
  isInvalid?: boolean;
  /** Green border + success focus ring. Ignored when invalid. */
  isSuccess?: boolean;
  /** Icon component or element rendered before the input. */
  iconLeading?: IconProp;
  /** Icon component or element rendered after the input. */
  iconTrailing?: IconProp;
  /** Inline text/element before the input (e.g. "$", "https://"). */
  prefix?: ReactNode;
  /** Inline text/element after the input (e.g. "USD", ".com"). */
  suffix?: ReactNode;
  /** Muted keyboard-shortcut hint, rendered trailing (e.g. "⌘K"). */
  shortcut?: ReactNode;
}

function renderIcon(icon: IconProp, slot: "leading" | "trailing"): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  if (typeof icon === "function") {
    const Icon = icon as FC<{ className?: string; "data-icon"?: string }>;
    return <Icon className="size-5" data-icon={slot} />;
  }
  return icon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = "sm",
      isInvalid = false,
      isSuccess = false,
      iconLeading,
      iconTrailing,
      prefix,
      suffix,
      shortcut,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    // aria-invalid (a11y-driven) triggers the error visual even without
    // the isInvalid prop. Invalid always wins over success.
    const invalid =
      isInvalid || ariaInvalid === true || ariaInvalid === "true";
    const state = invalid ? "error" : isSuccess ? "success" : "default";

    return (
      <div
        data-slot="input-wrapper"
        data-invalid={invalid ? true : undefined}
        data-success={!invalid && isSuccess ? true : undefined}
        className={cn(inputVariants({ size, state }), className)}
      >
        {renderIcon(iconLeading, "leading")}

        {prefix != null && prefix !== false && (
          <span
            data-slot="input-prefix"
            className="shrink-0 select-none whitespace-nowrap text-fg-tertiary"
          >
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          data-slot="input"
          aria-invalid={invalid ? true : ariaInvalid}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-fg outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed read-only:cursor-default"
          {...props}
        />

        {suffix != null && suffix !== false && (
          <span
            data-slot="input-suffix"
            className="shrink-0 select-none whitespace-nowrap text-fg-tertiary"
          >
            {suffix}
          </span>
        )}

        {renderIcon(iconTrailing, "trailing")}

        {shortcut != null && shortcut !== false && (
          <kbd
            data-slot="input-shortcut"
            className="shrink-0 select-none rounded-sm border border-border bg-bg-tertiary px-1.5 font-sans text-xs text-fg-tertiary"
          >
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
