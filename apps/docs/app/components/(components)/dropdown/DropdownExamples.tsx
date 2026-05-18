"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { ChevronDown, Edit2, Trash2, Copy, Scissors, Clipboard, User, Settings, LogOut, Star, Archive, Share2 } from "lucide-react";
import { Button, Dropdown } from "@mvp-ui/ui";

/* -------------------------------------------------------------------------- */
/*  Basic dropdown with text-only items                                        */
/* -------------------------------------------------------------------------- */

export function BasicDropdown() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Options
        <ChevronDown className="size-4" />
      </Button>
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
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with keyboard shortcut addons                                     */
/* -------------------------------------------------------------------------- */

export function DropdownWithAddons() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Edit
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-54">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item label="Cut" addon="⌘X" />
            <Dropdown.Item label="Copy" addon="⌘C" />
            <Dropdown.Item label="Paste" addon="⌘V" />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item label="Select all" addon="⌘A" />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with leading icons                                                */
/* -------------------------------------------------------------------------- */

export function DropdownWithIcons() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Account
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-54">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item label="Profile" icon={User} />
            <Dropdown.Item label="Settings" icon={Settings} />
            <Dropdown.Item label="Starred" icon={Star} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item label="Sign out" icon={LogOut} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with avatar items                                                 */
/* -------------------------------------------------------------------------- */

export function DropdownWithAvatar() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Assign to
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item
              label="Olivia Rhye"
              avatarUrl="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
            />
            <Dropdown.Item
              label="Phoenix Baker"
              avatarUrl="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
            />
            <Dropdown.Item
              label="Lana Steiner"
              avatarUrl="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
            />
            <Dropdown.Item
              label="Demi Wilkinson"
              avatarUrl="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
            />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with section headers                                              */
/* -------------------------------------------------------------------------- */

export function DropdownWithSectionHeaders() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Actions
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-56">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.SectionHeader>File</Dropdown.SectionHeader>
            <Dropdown.Item label="New file" icon={Copy} />
            <Dropdown.Item label="Open" icon={Archive} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Edit</Dropdown.SectionHeader>
            <Dropdown.Item label="Cut" icon={Scissors} />
            <Dropdown.Item label="Copy" icon={Copy} />
            <Dropdown.Item label="Paste" icon={Clipboard} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Share</Dropdown.SectionHeader>
            <Dropdown.Item label="Share link" icon={Share2} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with disabled items                                               */
/* -------------------------------------------------------------------------- */

export function DropdownWithDisabled() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        More
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-54">
        <Dropdown.Menu disabledKeys={["archive", "delete"]}>
          <Dropdown.Section>
            <Dropdown.Item id="edit" label="Edit" icon={Edit2} />
            <Dropdown.Item id="duplicate" label="Duplicate" icon={Copy} />
            <Dropdown.Item id="archive" label="Archive" icon={Archive} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item id="delete" label="Delete" icon={Trash2} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dots (icon-only) trigger                                                   */
/* -------------------------------------------------------------------------- */

export function DropdownDotsMenu() {
  return (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover className="w-54">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item label="Edit" icon={Edit2} />
            <Dropdown.Item label="Duplicate" icon={Copy} />
            <Dropdown.Item label="Share" icon={Share2} />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item label="Delete" icon={Trash2} />
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dropdown with submenu                                                      */
/* -------------------------------------------------------------------------- */

export function DropdownWithSubmenu() {
  return (
    <Dropdown.Root>
      <Button size="sm" color="secondary">
        Actions
        <ChevronDown className="size-4" />
      </Button>
      <Dropdown.Popover className="w-54">
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.Item label="Cut" addon="⌘X" />
            <Dropdown.Item label="Copy" addon="⌘C" />
            <Dropdown.Item label="Paste" addon="⌘V" />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.Item label="Edit" />
            <Dropdown.Item label="Duplicate" />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SubmenuTrigger>
              <Dropdown.Item label="View details" />
              <Dropdown.Popover placement="right top" offset={-6} className="w-50">
                <Dropdown.Menu>
                  <Dropdown.Item label="Share" />
                  <Dropdown.Item label="Save as" />
                  <Dropdown.Item label="Archive" />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
