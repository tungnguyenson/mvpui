import { useEffect, useState } from "react";
import { CommandMenu } from "@mvp-ui/ui";

// Plain function-component icons (the item `icon` slot renders them as components).
const HomeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5Z" /></svg>
);
const FileIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" /><path d="M14 3v5h5" /></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
);

const items = [
  { id: "home", label: "Go to Home", icon: HomeIcon, shortcut: "⌘H", group: "Navigation" },
  { id: "search", label: "Search files", icon: SearchIcon, shortcut: "⌘F", group: "Navigation" },
  { id: "new-file", label: "New file", icon: FileIcon, shortcut: "⌘N", group: "Files" },
  { id: "open-file", label: "Open file…", icon: FileIcon, shortcut: "⌘O", group: "Files" },
  { id: "settings", label: "Open settings", icon: SettingsIcon, shortcut: "⌘,", group: "System" },
];

const noop = () => {};

export const Grouped = () => {
  // Open AFTER mount so react-aria's ComboBox initializes its collection/focus
  // (a literal isOpen={true} from first render leaves the list empty in capture).
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(true), []);
  return (
    <CommandMenu
      isOpen={open}
      items={items}
      onOpenChange={setOpen}
      onAction={noop}
      placeholder="Type a command or search…"
      emptyMessage="Start typing to search Navigation, Files, and System commands…"
    />
  );
};
