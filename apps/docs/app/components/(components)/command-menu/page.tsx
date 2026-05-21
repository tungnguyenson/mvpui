"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react";
import {
  Button,
  CommandMenu,
  type CommandItem,
} from "@mvp-ui/ui";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}
function FileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const BASIC_ITEMS: CommandItem[] = [
  { id: "home", label: "Go to Home", icon: HomeIcon, shortcut: "⌘H" },
  { id: "search", label: "Search Files", icon: SearchIcon, shortcut: "⌘F" },
  { id: "profile", label: "View Profile", icon: UserIcon },
  { id: "settings", label: "Open Settings", icon: SettingsIcon, shortcut: "⌘," },
  { id: "new-file", label: "New File", icon: FileIcon, shortcut: "⌘N" },
];

const GROUPED_ITEMS: CommandItem[] = [
  { id: "home", label: "Go to Home", icon: HomeIcon, group: "Navigation" },
  { id: "profile", label: "View Profile", icon: UserIcon, group: "Navigation" },
  { id: "dashboard", label: "Dashboard", icon: HomeIcon, group: "Navigation" },
  { id: "new-file", label: "New File", icon: FileIcon, shortcut: "⌘N", group: "Files" },
  { id: "open-file", label: "Open File", icon: FileIcon, shortcut: "⌘O", group: "Files" },
  { id: "settings", label: "Open Settings", icon: SettingsIcon, shortcut: "⌘,", group: "System" },
  { id: "search", label: "Search", icon: SearchIcon, shortcut: "⌘F", group: "System" },
];

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button color="secondary" size="sm" onClick={() => setOpen(true)}>
        Open Command Menu
      </Button>
      <CommandMenu
        isOpen={open}
        onOpenChange={setOpen}
        items={BASIC_ITEMS}
        onAction={(id) => console.log("Selected:", id)}
      />
    </div>
  );
}

function GroupedDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button color="secondary" size="sm" onClick={() => setOpen(true)}>
        Grouped Items
      </Button>
      <CommandMenu
        isOpen={open}
        onOpenChange={setOpen}
        items={GROUPED_ITEMS}
        onAction={(id) => console.log("Selected:", id)}
      />
    </div>
  );
}

function DisabledDemo() {
  const [open, setOpen] = useState(false);
  const items: CommandItem[] = [
    { id: "active", label: "Active Action", icon: HomeIcon },
    { id: "disabled-1", label: "Disabled Action", icon: SettingsIcon, isDisabled: true },
    { id: "also-active", label: "Another Action", icon: FileIcon },
    { id: "disabled-2", label: "Also Disabled", icon: UserIcon, isDisabled: true },
  ];
  return (
    <div className="flex gap-2">
      <Button color="secondary" size="sm" onClick={() => setOpen(true)}>
        With Disabled Items
      </Button>
      <CommandMenu isOpen={open} onOpenChange={setOpen} items={items} />
    </div>
  );
}

function RichDemo() {
  const [open, setOpen] = useState(false);
  const items: CommandItem[] = [
    {
      id: "customer-acme",
      label: "Acme Corp",
      description: "0902 123 456 · Hà Nội",
      keywords: ["0902123456", "ACM-001"],
      icon: HomeIcon,
      group: "Khách hàng",
    },
    {
      id: "hr-2025-04-001",
      label: "HR-2025-04-001 — Tuyển bảo vệ",
      description: "Acme Corp · Quận 1",
      keywords: ["HR2025"],
      icon: FileIcon,
      group: "Y/c tuyển dụng",
    },
    {
      id: "worker-nguyenvana",
      label: "Nguyễn Văn A",
      description: "0911 222 333 · Tp HCM",
      keywords: ["0911222333"],
      icon: UserIcon,
      group: "Cộng tác viên",
    },
  ];
  return (
    <div className="flex gap-2">
      <Button color="secondary" size="sm" onClick={() => setOpen(true)}>
        Rich items (description + keywords)
      </Button>
      <CommandMenu
        isOpen={open}
        onOpenChange={setOpen}
        items={items}
        placeholder="Try '0902' or 'HR2025'…"
        onAction={(id) => console.log("Selected:", id)}
      />
    </div>
  );
}

function EmptyDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex gap-2">
      <Button color="secondary" size="sm" onClick={() => setOpen(true)}>
        Empty State
      </Button>
      <CommandMenu
        isOpen={open}
        onOpenChange={setOpen}
        items={[]}
        emptyMessage="No commands available."
      />
    </div>
  );
}

const SECTIONS = [
  {
    id: "default",
    title: "Default",
    description:
      "Keyboard-accessible command palette. Opens as a modal overlay with search filtering built in.",
    preview: <BasicDemo />,
    code: `const [open, setOpen] = useState(false);

const items: CommandItem[] = [
  { id: "home", label: "Go to Home", icon: HomeIcon, shortcut: "⌘H" },
  { id: "search", label: "Search Files", icon: SearchIcon, shortcut: "⌘F" },
  { id: "settings", label: "Open Settings", icon: SettingsIcon, shortcut: "⌘," },
];

<Button onClick={() => setOpen(true)}>Open Command Menu</Button>

<CommandMenu
  isOpen={open}
  onOpenChange={setOpen}
  items={items}
  onAction={(id) => console.log("Selected:", id)}
/>`,
  },
  {
    id: "grouped",
    title: "Grouped Items",
    description:
      "Assign a `group` to items. Items sharing the same group value render under a labeled section header.",
    preview: <GroupedDemo />,
    code: `const items: CommandItem[] = [
  { id: "home", label: "Go to Home", icon: HomeIcon, group: "Navigation" },
  { id: "profile", label: "View Profile", icon: UserIcon, group: "Navigation" },
  { id: "new-file", label: "New File", icon: FileIcon, shortcut: "⌘N", group: "Files" },
  { id: "settings", label: "Open Settings", icon: SettingsIcon, shortcut: "⌘,", group: "System" },
];

<CommandMenu isOpen={open} onOpenChange={setOpen} items={items} />`,
  },
  {
    id: "disabled",
    title: "Disabled Items",
    description: "Set `isDisabled: true` on individual items to prevent selection.",
    preview: <DisabledDemo />,
    code: `const items: CommandItem[] = [
  { id: "active", label: "Active Action", icon: HomeIcon },
  { id: "disabled", label: "Disabled Action", icon: SettingsIcon, isDisabled: true },
];

<CommandMenu isOpen={open} onOpenChange={setOpen} items={items} />`,
  },
  {
    id: "rich",
    title: "Description & hidden keywords",
    description:
      "Add a `description` for a dim secondary line. Add `keywords` to include terms in search matching without rendering them — useful for IDs, phone numbers, or codes that shouldn't clutter the visible label.",
    preview: <RichDemo />,
    code: `const items: CommandItem[] = [
  {
    id: "customer-acme",
    label: "Acme Corp",
    description: "0902 123 456 · Hà Nội",
    keywords: ["0902123456", "ACM-001"],
    icon: HomeIcon,
    group: "Khách hàng",
  },
  {
    id: "hr-2025-04-001",
    label: "HR-2025-04-001 — Tuyển bảo vệ",
    description: "Acme Corp · Quận 1",
    icon: FileIcon,
    group: "Y/c tuyển dụng",
  },
];

<CommandMenu isOpen={open} onOpenChange={setOpen} items={items} />`,
  },
  {
    id: "empty",
    title: "Empty State",
    description: "Custom `emptyMessage` renders when no items match the search query.",
    preview: <EmptyDemo />,
    code: `<CommandMenu
  isOpen={open}
  onOpenChange={setOpen}
  items={[]}
  emptyMessage="No commands available."
/>`,
  },
] satisfies DocExample[];

export default function Page() {
  return (
    <ComponentDocLayout
      name="Command Menu"
      tagline="Keyboard-accessible command palette. Modal overlay with live search filtering and grouped items."
      install={{
        usage: `import { CommandMenu, type CommandItem } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Overlay", value: "bg-black/40 · backdrop-blur-sm" },
        { label: "Surface", value: "bg-bg · ring-border" },
        { label: "Hover/focus", value: "bg-bg-secondary" },
        { label: "Shortcut kbd", value: "text-fg-tertiary · ring-border" },
        { label: "Icon", value: "text-fg-tertiary" },
      ]}
    />
  );
}
