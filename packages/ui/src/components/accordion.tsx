/**
 * Structural pattern adapted from shadcn/ui Accordion (MIT).
 * Restyled with Untitled UI tokens. Built on @radix-ui/react-accordion.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { cn } from "../lib/cn.js";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ==========================================================================
   Accordion — vertically stacked, expandable panels.
   API mirrors shadcn/ui: Accordion (root) → AccordionItem → AccordionTrigger
   + AccordionContent. Both single (collapsible) and multiple types supported
   through Radix props.
   ========================================================================== */

// ─── Accordion (root) ──────────────────────────────────────────────────────

export type AccordionProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Root
> & {
  ref?: Ref<HTMLDivElement>;
};

export const Accordion = ({ className, ref, ...props }: AccordionProps) => (
  <RadixAccordion.Root
    ref={ref}
    className={cn("flex w-full flex-col", className)}
    {...props}
  />
);
Accordion.displayName = "Accordion";

// ─── AccordionItem ─────────────────────────────────────────────────────────

export type AccordionItemProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Item
> & {
  ref?: Ref<HTMLDivElement>;
};

export const AccordionItem = ({
  className,
  ref,
  ...props
}: AccordionItemProps) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn(
      "border-b border-border-secondary last:border-b-0",
      className,
    )}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

// ─── AccordionTrigger ──────────────────────────────────────────────────────

export interface AccordionTriggerProps
  extends ComponentPropsWithoutRef<typeof RadixAccordion.Trigger> {
  /** Optional content rendered to the right of the label (e.g. badges). */
  trailing?: ReactNode;
  /** Hide the default chevron icon. */
  hideChevron?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export const AccordionTrigger = ({
  className,
  children,
  trailing,
  hideChevron,
  ref,
  ...props
}: AccordionTriggerProps) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-fg outline-none transition-colors",
        "hover:text-fg-brand",
        "focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-brand-500/22",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <span className="flex items-center gap-3 text-fg-tertiary">
        {trailing}
        {!hideChevron && (
          <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        )}
      </span>
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
);
AccordionTrigger.displayName = "AccordionTrigger";

// ─── AccordionContent ──────────────────────────────────────────────────────

export type AccordionContentProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Content
> & {
  ref?: Ref<HTMLDivElement>;
};

export const AccordionContent = ({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm text-fg-secondary",
      "data-[state=open]:animate-accordion-down",
      "data-[state=closed]:animate-accordion-up",
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </RadixAccordion.Content>
);
AccordionContent.displayName = "AccordionContent";
