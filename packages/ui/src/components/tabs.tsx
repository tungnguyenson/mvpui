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
import { cn } from "../lib/cn.js";

/* ==========================================================================
   Tabs — wraps react-aria Tabs with Untitled UI visual design.
   Variants: size (sm | md), style variant (underline | pill).
   ========================================================================== */

export type TabSize = "sm" | "md";
export type TabVariant = "underline" | "pill";

interface TabsContextValue {
  size: TabSize;
  variant: TabVariant;
}

const TabsContext = createContext<TabsContextValue>({
  size: "md",
  variant: "underline",
});

// ─── Tabs (root) ───────────────────────────────────────────────────────────

export interface TabsProps extends AriaTabsProps {
  size?: TabSize;
  variant?: TabVariant;
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const Tabs = ({
  size = "md",
  variant = "underline",
  className,
  children,
  ref,
  ...ariaTabsProps
}: TabsProps) => {
  return (
    <TabsContext.Provider value={{ size, variant }}>
      <AriaTabs
        {...ariaTabsProps}
        ref={ref}
        className={cn("flex flex-col gap-4", className)}
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
  const { variant } = useContext(TabsContext);

  return (
    <AriaTabList
      {...ariaTabListProps}
      ref={ref}
      className={cn(
        "flex",
        variant === "underline" && "gap-3 border-b border-border",
        variant === "pill" &&
          "gap-1 rounded-lg bg-bg-secondary p-1 w-max",
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
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export const Tab = ({
  icon,
  children,
  className,
  ref,
  ...ariaTabProps
}: TabProps) => {
  const { size, variant } = useContext(TabsContext);

  return (
    <AriaTab
      {...ariaTabProps}
      ref={ref}
      className={(state) =>
        cn(
          // base
          "relative inline-flex cursor-pointer items-center gap-2 font-semibold outline-none transition-colors select-none",
          // focus ring
          state.isFocusVisible &&
            "rounded-md ring-2 ring-brand-500/22 ring-offset-1",
          // disabled
          state.isDisabled && "cursor-not-allowed opacity-50",

          // ── underline variant ────────────────────────────────────────────
          variant === "underline" && [
            size === "sm" && "px-1 pb-3 text-sm",
            size === "md" && "px-1 pb-4 text-md",
            // inactive
            !state.isSelected &&
              "text-fg-tertiary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-fg",
            // active
            state.isSelected &&
              "text-fg-brand after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary", // dark-ok: brand action fill indicator
          ],

          // ── pill variant ─────────────────────────────────────────────────
          variant === "pill" && [
            size === "sm" && "rounded-md px-3 py-1.5 text-sm",
            size === "md" && "rounded-md px-3.5 py-2 text-md",
            // inactive
            !state.isSelected && "text-fg-tertiary hover:text-fg",
            // active
            state.isSelected &&
              "bg-bg text-fg shadow-xs ring-1 ring-border",
          ],

          className,
        )
      }
    >
      {icon && (
        <span className={cn("shrink-0", size === "sm" ? "size-4" : "size-5")}>
          {icon}
        </span>
      )}
      {children}
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
  return (
    <AriaTabPanel
      {...ariaTabPanelProps}
      ref={ref}
      className={cn(
        "rounded-lg text-sm text-fg outline-none",
        "data-focus-visible:ring-2 data-focus-visible:ring-brand-500/22",
        className,
      )}
    />
  );
};
TabPanel.displayName = "TabPanel";
