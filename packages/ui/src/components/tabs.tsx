"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  type ReactNode,
  type Ref,
  createContext,
  useContext,
} from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  type TabListProps as AriaTabListProps,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  type TabsProps as AriaTabsProps,
} from "react-aria-components";
import { useMediaQuery } from "../hooks/use-media-query.js";
import { cn } from "../lib/cn.js";

/** Mobile breakpoint where vertical tabs collapse to horizontal underline. */
const RESPONSIVE_MOBILE_QUERY = "(max-width: 767px)";

/* ==========================================================================
   Tabs — wraps react-aria Tabs with Untitled UI visual design.
   Variants: size (sm | md), style variant (underline | pill),
             orientation (horizontal | vertical).
   ========================================================================== */

export type TabSize = "sm" | "md";
export type TabVariant = "underline" | "pill";
export type TabOrientation = "horizontal" | "vertical";

interface TabsContextValue {
  size: TabSize;
  variant: TabVariant;
  orientation: TabOrientation;
}

const TabsContext = createContext<TabsContextValue>({
  size: "md",
  variant: "underline",
  orientation: "horizontal",
});

// ─── Tabs (root) ───────────────────────────────────────────────────────────

export interface TabsProps extends Omit<AriaTabsProps, "orientation"> {
  size?: TabSize;
  variant?: TabVariant;
  orientation?: TabOrientation;
  /**
   * When true (default), vertical tabs collapse to a horizontal underline bar
   * below the mobile breakpoint (`max-width: 767px`). Set to `false` to keep
   * the supplied orientation/variant on every viewport (e.g. when the tabs
   * live inside a layout that's already hidden on mobile).
   *
   * No effect when `orientation === "horizontal"`.
   */
  responsive?: boolean;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const Tabs = ({
  size = "md",
  variant = "underline",
  orientation = "horizontal",
  responsive = true,
  className,
  children,
  ref,
  ...ariaTabsProps
}: TabsProps) => {
  const isMobile = useMediaQuery(RESPONSIVE_MOBILE_QUERY);
  const shouldCollapse =
    responsive && orientation === "vertical" && isMobile;

  const effectiveOrientation: TabOrientation = shouldCollapse
    ? "horizontal"
    : orientation;
  const effectiveVariant: TabVariant = shouldCollapse ? "underline" : variant;

  return (
    <TabsContext.Provider
      value={{
        size,
        variant: effectiveVariant,
        orientation: effectiveOrientation,
      }}
    >
      <AriaTabs
        {...ariaTabsProps}
        orientation={effectiveOrientation}
        ref={ref}
        className={cn(
          "flex",
          effectiveOrientation === "horizontal"
            ? "flex-col gap-4"
            : "flex-row gap-6",
          className,
        )}
      >
        {children}
      </AriaTabs>
    </TabsContext.Provider>
  );
};
Tabs.displayName = "Tabs";

// ─── TabList ───────────────────────────────────────────────────────────────

export interface TabListProps<T extends object>
  extends AriaTabListProps<T> {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function TabList<T extends object>({
  className,
  ref,
  ...ariaTabListProps
}: TabListProps<T>) {
  const { variant, orientation } = useContext(TabsContext);
  const isVertical = orientation === "vertical";

  return (
    <AriaTabList
      {...ariaTabListProps}
      ref={ref}
      className={cn(
        "flex",
        // horizontal: horizontal scroll, hide scrollbar
        // touch-pan-x = constrain touch gesture to horizontal axis (vertical pan bubbles to page)
        // overscroll-x-contain = stop horizontal rubber-band from scrolling ancestors
        !isVertical &&
        "overflow-x-auto touch-pan-x overscroll-x-contain [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden",
        // ── horizontal layouts ─────────────────────────────────────────────
        !isVertical && variant === "underline" && "gap-3 border-b border-border",
        !isVertical &&
        variant === "pill" &&
        "gap-1 rounded-lg bg-bg-secondary p-1 w-max max-w-full",
        // ── vertical layouts ───────────────────────────────────────────────
        isVertical && "flex-col shrink-0",
        isVertical && variant === "underline" && "gap-1 min-w-40",
        isVertical && variant === "pill" && "gap-1 min-w-44",
        className,
      )}
    />
  );
}
TabList.displayName = "TabList";

// ─── Tab ───────────────────────────────────────────────────────────────────

export interface TabProps extends Omit<AriaTabProps, "className"> {
  /** Optional leading icon. */
  icon?: ReactNode;
  /**
   * Optional trailing value pill (count, label, etc.). Rendered as a neutral
   * badge after the tab label. Pass any ReactNode — numbers, strings, even
   * mini badges. Use this instead of `<Badge>` inside `children` so spacing
   * and styling stay consistent across tabs.
   */
  value?: ReactNode;
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const Tab = ({
  icon,
  value,
  children,
  className,
  ref,
  ...ariaTabProps
}: TabProps) => {
  const { size, variant, orientation } = useContext(TabsContext);
  const isVertical = orientation === "vertical";

  return (
    <AriaTab
      {...ariaTabProps}
      ref={ref}
      className={(state) =>
        cn(
          // base
          "relative inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap font-semibold outline-none transition-colors select-none",
          "min-h-11 md:min-h-0 touch-manipulation",
          // focus ring
          state.isFocusVisible &&
          "rounded-md ring-2 ring-brand-500/22 ring-offset-1",
          // disabled
          state.isDisabled && "cursor-not-allowed opacity-50",

          // ── horizontal underline ─────────────────────────────────────────
          !isVertical && variant === "underline" && [
            size === "sm" && "px-1 pb-3 text-sm",
            size === "md" && "px-1 pb-4 text-md",
            !state.isSelected &&
            "text-fg-tertiary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-fg",
            state.isSelected &&
            "text-fg-brand after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary", // dark-ok: brand action fill indicator
          ],

          // ── horizontal pill ──────────────────────────────────────────────
          !isVertical && variant === "pill" && [
            size === "sm" && "rounded-md px-3 py-1.5 text-sm",
            size === "md" && "rounded-md px-3.5 py-2 text-md",
            !state.isSelected && "text-fg-tertiary hover:text-fg",
            state.isSelected && "bg-bg text-fg shadow-xs ring-1 ring-border",
          ],

          // ── vertical underline (left-line indicator) ─────────────────────
          isVertical && variant === "underline" && [
            "w-full justify-start border-l-2 border-transparent",
            size === "sm" && "px-3 py-0.5 text-sm",
            size === "md" && "px-3.5 py-1 text-md",
            !state.isSelected && "text-fg-tertiary hover:text-fg",
            state.isSelected && "border-primary text-fg-brand", // dark-ok: brand action fill indicator
          ],

          // ── vertical pill (brand-tinted active row) ──────────────────────
          isVertical && variant === "pill" && [
            "w-full justify-start rounded-md",
            size === "sm" && "px-2.5 py-2 text-sm",
            size === "md" && "px-2.5 py-2.5 text-md",
            !state.isSelected && "text-fg-tertiary hover:bg-bg-secondary hover:text-fg",
            state.isSelected && "bg-info-bg text-fg-brand",
          ],

          className,
        )
      }
    >
      {(renderState) => (
        <>
          {icon && (
            <span
              className={cn("shrink-0", size === "sm" ? "size-4" : "size-5")}
            >
              {icon}
            </span>
          )}
          {children}
          {value !== undefined && value !== null && value !== false && (
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-xs font-medium leading-4.5 transition-colors",
                isVertical && "ml-auto",
                renderState.isSelected
                  ? "border-border-brand bg-info-bg text-info-fg"
                  : renderState.isHovered
                    ? "border-border bg-bg-tertiary text-fg-secondary"
                    : "border-neutral-border bg-neutral-bg text-fg-secondary",
              )}
            >
              {value}
            </span>
          )}
        </>
      )}
    </AriaTab>
  );
};
Tab.displayName = "Tab";

// ─── TabPanel ──────────────────────────────────────────────────────────────

export interface TabPanelProps extends AriaTabPanelProps {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const TabPanel = ({
  className,
  ref,
  ...ariaTabPanelProps
}: TabPanelProps) => {
  const { orientation } = useContext(TabsContext);

  return (
    <AriaTabPanel
      {...ariaTabPanelProps}
      ref={ref}
      className={cn(
        "rounded-lg text-sm text-fg outline-none",
        orientation === "vertical" && "flex-1 min-w-0",
        "data-focus-visible:ring-2 data-focus-visible:ring-brand-500/22",
        className,
      )}
    />
  );
};
TabPanel.displayName = "TabPanel";
