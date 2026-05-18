"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";
import {
  BasicDropdown,
  DropdownWithAddons,
  DropdownWithIcons,
  DropdownWithAvatar,
  DropdownWithSectionHeaders,
  DropdownWithDisabled,
  DropdownDotsMenu,
  DropdownWithSubmenu,
} from "./DropdownExamples";

const SECTIONS: DocExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Simple dropdown with text-only items grouped by section.",
    preview: <BasicDropdown />,
    code: `<Dropdown.Root>
  <Button size="sm" color="secondary">Options</Button>
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Edit" />
        <Dropdown.Item label="Duplicate" />
        <Dropdown.Item label="Archive" />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item label="Delete" />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-addons",
    title: "With keyboard shortcuts",
    description: "Keyboard shortcut hints displayed on the right side of each item via the addon prop.",
    preview: <DropdownWithAddons />,
    code: `<Dropdown.Root>
  <Button size="sm" color="secondary">Edit</Button>
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Cut"       addon="⌘X" />
        <Dropdown.Item label="Copy"      addon="⌘C" />
        <Dropdown.Item label="Paste"     addon="⌘V" />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item label="Select all" addon="⌘A" />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-icons",
    title: "With icons",
    description: "Leading icon passed to each item via the icon prop (lucide-react or any FC<{className?:string}>).",
    preview: <DropdownWithIcons />,
    code: `import { User, Settings, Star, LogOut } from "lucide-react";

<Dropdown.Root>
  <Button size="sm" color="secondary">Account</Button>
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Profile"  icon={User} />
        <Dropdown.Item label="Settings" icon={Settings} />
        <Dropdown.Item label="Starred"  icon={Star} />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item label="Sign out" icon={LogOut} />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-avatar",
    title: "With avatar",
    description: "Avatar image rendered before the label via the avatarUrl prop.",
    preview: <DropdownWithAvatar />,
    code: `<Dropdown.Root>
  <Button size="sm" color="secondary">Assign to</Button>
  <Dropdown.Popover className="w-56">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Olivia Rhye"    avatarUrl="https://..." />
        <Dropdown.Item label="Phoenix Baker"  avatarUrl="https://..." />
        <Dropdown.Item label="Lana Steiner"   avatarUrl="https://..." />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-section-headers",
    title: "With section headers",
    description: "Use Dropdown.SectionHeader inside a Dropdown.Section to label groups.",
    preview: <DropdownWithSectionHeaders />,
    code: `<Dropdown.Root>
  <Button size="sm" color="secondary">Actions</Button>
  <Dropdown.Popover className="w-56">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.SectionHeader>File</Dropdown.SectionHeader>
        <Dropdown.Item label="New file" icon={Copy} />
        <Dropdown.Item label="Open"     icon={Archive} />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.SectionHeader>Edit</Dropdown.SectionHeader>
        <Dropdown.Item label="Cut"   icon={Scissors} />
        <Dropdown.Item label="Copy"  icon={Copy} />
        <Dropdown.Item label="Paste" icon={Clipboard} />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-disabled",
    title: "Disabled items",
    description: "Pass disabledKeys to Dropdown.Menu to disable specific items.",
    preview: <DropdownWithDisabled />,
    code: `<Dropdown.Root>
  <Button size="sm" color="secondary">More</Button>
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu disabledKeys={["archive", "delete"]}>
      <Dropdown.Section>
        <Dropdown.Item id="edit"      label="Edit"      icon={Edit2} />
        <Dropdown.Item id="duplicate" label="Duplicate" icon={Copy} />
        <Dropdown.Item id="archive"   label="Archive"   icon={Archive} />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item id="delete" label="Delete" icon={Trash2} />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "dots-trigger",
    title: "Dots icon trigger",
    description: "Use Dropdown.DotsButton as the trigger for compact icon-only menus.",
    preview: <DropdownDotsMenu />,
    code: `<Dropdown.Root>
  <Dropdown.DotsButton />
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Edit"      icon={Edit2} />
        <Dropdown.Item label="Duplicate" icon={Copy} />
        <Dropdown.Item label="Share"     icon={Share2} />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <Dropdown.Item label="Delete" icon={Trash2} />
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
  {
    id: "with-submenu",
    title: "With submenu",
    description: "Wrap Dropdown.Item in react-aria-components SubmenuTrigger with a nested Dropdown.Popover.",
    preview: <DropdownWithSubmenu />,
    code: `import { SubmenuTrigger } from "react-aria-components";

<Dropdown.Root>
  <Button size="sm" color="secondary">Actions</Button>
  <Dropdown.Popover className="w-54">
    <Dropdown.Menu>
      <Dropdown.Section>
        <Dropdown.Item label="Cut"  addon="⌘X" />
        <Dropdown.Item label="Copy" addon="⌘C" />
      </Dropdown.Section>
      <Dropdown.Separator />
      <Dropdown.Section>
        <SubmenuTrigger>
          <Dropdown.Item label="View details" />
          <Dropdown.Popover placement="right top" offset={-6} className="w-50">
            <Dropdown.Menu>
              <Dropdown.Item label="Share" />
              <Dropdown.Item label="Save as" />
              <Dropdown.Item label="Archive" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </SubmenuTrigger>
      </Dropdown.Section>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown.Root>`,
  },
];

export default function DropdownPage() {
  return (
    <ComponentDocLayout
      name="Dropdown"
      tagline="Accessible menu built on react-aria-components. Supports icons, avatars, keyboard shortcuts, section headers, disabled items, and nested submenus."
      install={{
        usage: `import { Dropdown } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Popover width (default)", value: "w-62" },
        { label: "Popover radius", value: "rounded-lg" },
        { label: "Popover bg", value: "bg-bg ring-1 ring-border shadow-lg" },
        { label: "Item radius", value: "rounded-md" },
        { label: "Item hover bg", value: "bg-bg-secondary" },
        { label: "Item text", value: "text-sm font-semibold text-fg-secondary" },
        { label: "Separator", value: "h-px bg-border-secondary my-1" },
      ]}
    />
  );
}
