"use client";

/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  forwardRef,
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn.js";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs.js";
import { Button } from "./buttons/button.js";
import { FAB, type FabIcon } from "./fab.js";

export interface PageHeaderPrimaryAction {
  /** Visible label on desktop button. Used as `aria-label` for the mobile FAB. */
  label: string;
  /** Icon component or node. Required for the mobile FAB rendering. */
  icon?: FabIcon;
  /** Navigation target. Renders as anchor on both desktop button and mobile FAB. */
  href?: string;
  /** Click handler. Ignored when `href` is provided. */
  onClick?: () => void;
  disabled?: boolean;
}

export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Page title shown as `<h1>`. Required unless `children` is provided to
   * override the title/description column entirely. Hidden on mobile —
   * the app shell renders title in its sticky top bar.
   */
  title?: string;
  /** Optional supporting copy below the title. Hidden on mobile. */
  description?: ReactNode;
  /** Optional breadcrumb trail rendered above the title. Hidden on mobile. */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Primary CTA. Renders as an inline `Button` on desktop alongside other
   * `actions`. On mobile it portals to a fixed bottom-right FAB so the
   * primary call-to-action stays reachable when the title/description
   * collapse into the app-shell sticky bar.
   *
   * Use this for the 80% case of "one create/save action". For pages with
   * multiple buttons (back + save, filter + export + create), use the
   * `actions` slot instead — that slot is always rendered inline and never
   * becomes a FAB.
   */
  primaryAction?: PageHeaderPrimaryAction;
  /**
   * Secondary actions slot. Always rendered inline at every viewport — does
   * not become a FAB on mobile. Wraps to multiple rows when needed.
   */
  actions?: ReactNode;
  /**
   * Override slot for the title/description column. When provided, the
   * default `title` + `description` block is replaced by this node. Use for
   * detail pages whose header needs a leading icon, inline status badges,
   * tag chips, or multi-paragraph meta. The slot is hidden on mobile.
   */
  children?: ReactNode;
  /** Optional custom Link renderer for `primaryAction.href` (e.g. Next.js Link). When omitted, a plain `<a>` is used. */
  linkAs?: ComponentType<{
    href: string;
    className?: string;
    children: ReactNode;
    "aria-label"?: string;
  }>;
  /** Visual variant. `default` matches Untitled UI Figma page header; `compact` reduces vertical rhythm. @default "default" */
  variant?: "default" | "compact";
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      title,
      description,
      breadcrumbs,
      primaryAction,
      actions,
      children,
      linkAs: LinkComp,
      variant = "default",
      className,
      ...props
    },
    ref,
  ) => {
    const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
    const isCompact = variant === "compact";
    const hasActions = Boolean(primaryAction || actions);

    const desktopPrimary = primaryAction ? renderDesktopPrimary(primaryAction, LinkComp) : null;
    const mobileFab = primaryAction?.icon
      ? (
        <FAB
          label={primaryAction.label}
          icon={primaryAction.icon}
          href={primaryAction.href}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
          linkAs={LinkComp}
          position="fixed"
          className="md:hidden"
        />
      )
      : null;

    return (
      <header
        ref={ref}
        className={cn(
          "flex flex-col",
          isCompact ? "gap-3" : "gap-4",
          // Desktop band: bg/shadow/padding wrap the title block.
          "md:bg-bg md:px-8 md:py-8 md:shadow-xs",
          // Mobile band: only when `actions` are visible (multi-button rows
          // need vertical breathing room). When only `primaryAction` (FAB) or
          // nothing renders, the header element has no visible content and
          // collapses to zero height.
          actions ? "bg-bg px-4 py-3 shadow-xs" : "",
          className,
        )}
        {...props}
      >
        {hasBreadcrumbs ? (
          <div className="hidden md:block">
            <Breadcrumbs items={breadcrumbs} showHomeIcon={false} />
          </div>
        ) : null}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between empty:hidden">
          <div className="hidden min-w-0 flex-1 flex-col gap-1 md:flex">
            {children ? (
              children
            ) : (
              <>
                {title ? (
                  <h1
                    className={cn(
                      "font-semibold text-fg",
                      isCompact ? "text-lg" : "text-xl",
                    )}
                  >
                    {title}
                  </h1>
                ) : null}
                {description ? (
                  <p className="max-w-3xl text-base text-fg-tertiary">
                    {description}
                  </p>
                ) : null}
              </>
            )}
          </div>

          {hasActions ? (
            <div
              className={cn(
                "shrink-0 flex-wrap items-center gap-3 md:ml-auto md:flex",
                actions ? "flex" : "hidden",
              )}
            >
              {actions}
              {desktopPrimary ? (
                <span className="hidden md:inline-flex">{desktopPrimary}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {mobileFab}
      </header>
    );
  },
);

PageHeader.displayName = "PageHeader";

function renderDesktopPrimary(
  primary: PageHeaderPrimaryAction,
  LinkComp?: PageHeaderProps["linkAs"],
): ReactNode {
  const button = (
    <Button
      color="primary"
      size="sm"
      iconLeading={primary.icon as React.ComponentProps<typeof Button>["iconLeading"]}
      disabled={primary.disabled}
      onClick={primary.href ? undefined : primary.onClick}
    >
      {primary.label}
    </Button>
  );

  if (primary.href && !primary.disabled) {
    if (LinkComp) {
      return (
        <LinkComp href={primary.href} aria-label={primary.label}>
          {button}
        </LinkComp>
      );
    }
    return (
      <a href={primary.href} aria-label={primary.label}>
        {button}
      </a>
    );
  }

  return button;
}
