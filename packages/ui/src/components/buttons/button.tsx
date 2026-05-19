/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ComponentType,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn.js";

/* ==========================================================================
   Button — API mirrors Untitled UI (color, size, isLoading, iconLeading…).
   We diverge from Untitled in one place: polymorphism is Radix `Slot`
   (`asChild`) instead of an `href` prop. All colors map to @mvp-ui/tokens
   utilities — no hardcoded hex.
   ========================================================================== */

export const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center whitespace-nowrap select-none",
    "font-semibold cursor-pointer",
    "transition-all duration-100 ease-linear",
    "outline-none focus-visible:ring-4",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
  ],
  {
    variants: {
      color: {
        primary: [
          "bg-primary text-primary-fg ring-1 ring-transparent shadow-xs",
          "hover:enabled:bg-primary-hover hover:enabled:shadow-md",
          "active:enabled:bg-primary-active",
          "focus-visible:ring-brand-500/22",
        ],
        secondary: [
          "bg-bg text-fg-secondary ring-1 ring-border shadow-xs",
          "hover:enabled:bg-bg-tertiary active:enabled:bg-border-secondary",
          "focus-visible:ring-brand-500/22",
        ],
        tertiary: [
          "text-fg-secondary",
          "hover:enabled:bg-bg-tertiary active:enabled:bg-border-secondary",
          "focus-visible:ring-brand-500/22",
        ],
        "primary-destructive": [
          "bg-error-600 text-white ring-1 ring-transparent shadow-xs", // dark-ok: solid destructive fill, vivid both modes
          "hover:enabled:bg-error-700 active:enabled:bg-error-700", // dark-ok: solid destructive fill, vivid both modes
          "focus-visible:ring-error-500/24",
        ],
        "secondary-destructive": [
          "bg-bg text-fg-error ring-1 ring-border-error shadow-xs",
          "hover:enabled:bg-bg-tertiary active:enabled:bg-border-secondary",
          "focus-visible:ring-error-500/24",
        ],
        "tertiary-destructive": [
          "text-fg-error",
          "hover:enabled:bg-bg-tertiary active:enabled:bg-border-secondary",
          "focus-visible:ring-error-500/24",
        ],
        "link-color": [
          "p-0! shadow-none ring-0 underline-offset-4 text-fg-brand",
          "hover:enabled:underline",
          "focus-visible:ring-brand-500/22",
        ],
        "link-gray": [
          "p-0! shadow-none ring-0 underline-offset-4 text-fg-tertiary",
          "hover:enabled:text-fg hover:enabled:underline",
          "focus-visible:ring-brand-500/22",
        ],
        "link-destructive": [
          "p-0! shadow-none ring-0 underline-offset-4 text-fg-error",
          "hover:enabled:underline",
          "focus-visible:ring-error-500/24",
        ],
      },
      size: {
        sm: "gap-1 rounded-md px-3 py-2 text-sm",
        md: "gap-1 rounded-md px-3.5 py-2.5 text-sm",
        lg: "gap-1.5 rounded-md px-4 py-2.5 text-md",
        xl: "gap-1.5 rounded-lg px-4.5 py-3 text-md",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "p-2" },
      { iconOnly: true, size: "md", className: "p-2.5" },
      { iconOnly: true, size: "lg", className: "p-3" },
      { iconOnly: true, size: "xl", className: "p-3.5" },
    ],
    defaultVariants: {
      color: "primary",
      size: "sm",
      iconOnly: false,
    },
  }
);

type IconProp = ComponentType<{ className?: string }> | ReactNode;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    Pick<VariantProps<typeof buttonVariants>, "color" | "size"> {
  /** Render styles onto the child element via Radix Slot. */
  asChild?: boolean;
  /** Shows a spinner and blocks interaction. */
  isLoading?: boolean;
  /** Keep the label visible while loading (spinner sits inline). */
  showTextWhileLoading?: boolean;
  /** Icon component or element rendered before the label. */
  iconLeading?: IconProp;
  /** Icon component or element rendered after the label. */
  iconTrailing?: IconProp;
}

const LINK_COLORS = ["link-color", "link-gray", "link-destructive"] as const;

function renderIcon(icon: IconProp, slot: "leading" | "trailing"): ReactNode {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  if (
    typeof icon === "function" ||
    (typeof icon === "object" && "render" in (icon as unknown as Record<string, unknown>))
  ) {
    const Icon = icon as ComponentType<{ className?: string; "data-icon"?: string }>;
    return <Icon className="size-4" data-icon={slot} />;
  }
  return icon as ReactNode;
}

function Spinner({ centered }: { centered: boolean }) {
  return (
    <svg
      fill="none"
      data-icon="loading"
      viewBox="0 0 20 20"
      className={cn(
        "size-4 shrink-0",
        centered && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      )}
      aria-hidden="true"
    >
      <circle
        className="stroke-current opacity-30"
        cx="10"
        cy="10"
        r="8"
        fill="none"
        strokeWidth="2"
      />
      <circle
        className="origin-center animate-spin stroke-current"
        cx="10"
        cy="10"
        r="8"
        fill="none"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      color = "primary",
      size = "sm",
      asChild = false,
      isLoading = false,
      showTextWhileLoading = false,
      iconLeading,
      iconTrailing,
      disabled,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const hasChildren =
      children !== undefined && children !== null && children !== false;
    const isIconOnly = !hasChildren && Boolean(iconLeading || iconTrailing);
    const isLink = LINK_COLORS.includes(
      color as (typeof LINK_COLORS)[number]
    );
    const isDisabled = disabled || isLoading;

    // Children are passed directly (not wrapped in a Fragment): Radix `Slot`
    // only finds `Slottable` among its *direct* children, so a Fragment
    // wrapper would stop `asChild` from styling the slotted element.
    return (
      <Comp
        ref={ref}
        data-loading={isLoading ? true : undefined}
        data-icon-only={isIconOnly ? true : undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        {...(asChild ? {} : { type: type ?? "button", disabled: isDisabled })}
        className={cn(
          buttonVariants({ color, size, iconOnly: isIconOnly }),
          isLoading && "pointer-events-none",
          isLoading &&
            (showTextWhileLoading
              ? "[&>*:not([data-icon=loading]):not([data-text])]:hidden"
              : "[&>*:not([data-icon=loading])]:invisible"),
          className
        )}
        {...props}
      >
        {!isLoading && renderIcon(iconLeading, "leading")}

        {isLoading && <Spinner centered={!showTextWhileLoading} />}

        {hasChildren && (
          <Slottable>
            {asChild ? (
              children
            ) : (
              <span
                data-text
                className={cn(
                  "transition-[inherit]",
                  !isLink && !isIconOnly && "px-0.5"
                )}
              >
                {children}
              </span>
            )}
          </Slottable>
        )}

        {!isLoading && renderIcon(iconTrailing, "trailing")}
      </Comp>
    );
  }
);

Button.displayName = "Button";
