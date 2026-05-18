"use client";

/**
 * Adapted from Untitled UI React (MIT)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/dropdown/dropdown.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { type FC, type RefAttributes, type ReactNode, useCallback } from "react";
import type {
  ButtonProps as AriaButtonProps,
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  PopoverProps as AriaPopoverProps,
  SeparatorProps as AriaSeparatorProps,
  MenuItemRenderProps,
} from "react-aria-components";
import {
  Button as AriaButton,
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger as AriaMenuTrigger,
  Popover as AriaPopover,
  Separator as AriaSeparator,
  SubmenuTrigger as AriaSubmenuTrigger,
} from "react-aria-components";
import { cn } from "../lib/cn.js";

/* -------------------------------------------------------------------------- */
/*  Icon helpers                                                               */
/* -------------------------------------------------------------------------- */

type IconProp = FC<{ className?: string }> | ReactNode;

function renderIcon(icon: IconProp | undefined, className: string) {
  if (!icon) return null;
  if (typeof icon === "function") {
    const Icon = icon as FC<{ className?: string }>;
    return <Icon className={className} />;
  }
  return icon;
}

function DotsVerticalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="10" cy="4" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="10" cy="16" r="1.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8.5l3.5 3.5 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  DropdownItem                                                               */
/* -------------------------------------------------------------------------- */

export interface DropdownItemProps extends AriaMenuItemProps {
  /** Primary text label */
  label?: string;
  /** Keyboard shortcut or secondary text shown on the right */
  addon?: string;
  /** Leading icon component */
  icon?: IconProp;
  /** Avatar image URL (takes precedence over icon) */
  avatarUrl?: string;
  /** Selection indicator style. Defaults to "checkmark". */
  selectionIndicator?: "checkmark" | "none";
  /** If true, renders the item with no MVP UI wrapper styles */
  unstyled?: boolean;
}

const DropdownItem = ({
  label,
  children,
  addon,
  icon,
  avatarUrl,
  unstyled,
  selectionIndicator = "checkmark",
  ...props
}: DropdownItemProps) => {
  const SelectionIndicator = useCallback(
    (state: MenuItemRenderProps & { className?: string }) => {
      if (selectionIndicator === "checkmark") {
        return (
          <CheckIcon
            className={cn(
              "size-4 shrink-0 text-fg-brand",
              !state.isSelected && "invisible",
              state.className,
            )}
          />
        );
      }
      return null;
    },
    [selectionIndicator],
  );

  if (unstyled) {
    return (
      <AriaMenuItem
        id={label ?? "item"}
        textValue={label ?? ""}
        {...props}
      />
    );
  }

  return (
    <AriaMenuItem
      {...props}
      className={(state) =>
        cn(
          "group block cursor-pointer px-1.5 py-px outline-hidden",
          state.isDisabled && "cursor-not-allowed opacity-50",
          typeof props.className === "function"
            ? props.className(state)
            : props.className,
        )
      }
    >
      {(state) => (
        <div
          className={cn(
            "relative flex items-center rounded-md px-2.5 py-2 transition duration-100 ease-linear outline-hidden",
            !state.isDisabled && "group-hover:bg-bg-secondary",
            state.isFocused && "bg-bg-secondary",
            state.isFocusVisible && "ring-2 ring-inset ring-border-brand",
            state.hasSubmenu && "pr-1.5",
          )}
        >
          {state.selectionMode !== "none" && !avatarUrl && !icon && (
            <SelectionIndicator {...state} className="mr-2" />
          )}

          {avatarUrl && (
            <div className="mr-2 flex size-4 items-center justify-center">
              <img
                src={avatarUrl}
                alt={label ?? ""}
                aria-hidden="true"
                className="size-5 rounded-full object-cover"
              />
            </div>
          )}

          {!avatarUrl && icon && (
            <span className="mr-2 flex size-4 shrink-0 items-center justify-center text-fg-tertiary">
              {renderIcon(icon, "size-4 stroke-[2.25px]")}
            </span>
          )}

          <span
            className={cn(
              "grow truncate text-sm font-semibold text-fg-secondary",
              state.isFocused && "text-fg",
            )}
          >
            {label ??
              (typeof children === "function" ? children(state) : children)}
          </span>

          {addon && (
            <span className="ml-1 shrink-0 pr-1 text-xs font-medium text-fg-tertiary">
              {addon}
            </span>
          )}

          {state.selectionMode !== "none" && (avatarUrl || icon) && (
            <SelectionIndicator {...state} className="ml-1" />
          )}

          {state.hasSubmenu && (
            <ChevronRightIcon className="ml-auto size-4 shrink-0 text-fg-tertiary" />
          )}
        </div>
      )}
    </AriaMenuItem>
  );
};
DropdownItem.displayName = "DropdownItem";

/* -------------------------------------------------------------------------- */
/*  DropdownMenu                                                               */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuProps<T extends object> extends AriaMenuProps<T> {}

function DropdownMenu<T extends object>(props: DropdownMenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      className={(state) =>
        cn(
          "h-min overflow-y-auto py-1 outline-hidden select-none",
          typeof props.className === "function"
            ? props.className(state)
            : props.className,
        )
      }
    />
  );
}
DropdownMenu.displayName = "DropdownMenu";

/* -------------------------------------------------------------------------- */
/*  DropdownPopover                                                            */
/* -------------------------------------------------------------------------- */

export interface DropdownPopoverProps extends AriaPopoverProps {
  children?: ReactNode;
}

const DropdownPopover = (props: DropdownPopoverProps) => {
  return (
    <AriaPopover
      placement="bottom right"
      {...props}
      className={(state) =>
        cn(
          "w-62 origin-(--trigger-anchor-point) overflow-auto rounded-lg bg-bg shadow-lg ring-1 ring-border will-change-transform",
          state.isEntering &&
            "duration-150 ease-out animate-in fade-in placement-right:slide-in-from-left-0.5 placement-top:slide-in-from-bottom-0.5 placement-bottom:slide-in-from-top-0.5",
          state.isExiting &&
            "duration-100 ease-in animate-out fade-out placement-right:slide-out-to-left-0.5 placement-top:slide-out-to-bottom-0.5 placement-bottom:slide-out-to-top-0.5",
          typeof props.className === "function"
            ? props.className(state)
            : props.className,
        )
      }
    >
      {props.children}
    </AriaPopover>
  );
};
DropdownPopover.displayName = "DropdownPopover";

/* -------------------------------------------------------------------------- */
/*  DropdownSeparator                                                          */
/* -------------------------------------------------------------------------- */

const DropdownSeparator = (props: AriaSeparatorProps) => {
  return (
    <AriaSeparator
      {...props}
      className={cn("my-1 h-px w-full bg-border-secondary", props.className as string)}
    />
  );
};
DropdownSeparator.displayName = "DropdownSeparator";

/* -------------------------------------------------------------------------- */
/*  DropdownDotsButton                                                         */
/* -------------------------------------------------------------------------- */

export type DropdownDotsButtonProps = AriaButtonProps & RefAttributes<HTMLButtonElement>;

const DropdownDotsButton = (props: DropdownDotsButtonProps) => {
  return (
    <AriaButton
      {...props}
      aria-label={props["aria-label"] ?? "Open menu"}
      className={(state) =>
        cn(
          "cursor-pointer rounded-md text-fg-tertiary transition duration-100 ease-linear outline-hidden",
          (state.isPressed || state.isHovered) && "text-fg-secondary",
          (state.isPressed || state.isFocusVisible) &&
            "ring-2 ring-offset-1 ring-border-brand",
          typeof props.className === "function"
            ? props.className(state)
            : props.className,
        )
      }
    >
      <DotsVerticalIcon className="size-5" />
    </AriaButton>
  );
};
DropdownDotsButton.displayName = "DropdownDotsButton";

/* -------------------------------------------------------------------------- */
/*  DropdownSectionHeader                                                      */
/* -------------------------------------------------------------------------- */

export interface DropdownSectionHeaderProps {
  children: ReactNode;
  className?: string;
}

const DropdownSectionHeader = ({ children, className }: DropdownSectionHeaderProps) => (
  <AriaHeader
    className={cn(
      "px-4 py-1.5 text-xs font-semibold text-fg-tertiary",
      className,
    )}
  >
    {children}
  </AriaHeader>
);
DropdownSectionHeader.displayName = "DropdownSectionHeader";

/* -------------------------------------------------------------------------- */
/*  Compound Dropdown                                                          */
/* -------------------------------------------------------------------------- */

export const Dropdown = {
  Root: AriaMenuTrigger,
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Section: AriaMenuSection,
  SectionHeader: DropdownSectionHeader,
  Item: DropdownItem,
  Separator: DropdownSeparator,
  DotsButton: DropdownDotsButton,
  SubmenuTrigger: AriaSubmenuTrigger,
};
