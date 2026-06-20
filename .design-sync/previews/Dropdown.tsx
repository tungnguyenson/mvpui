import { Dropdown, Button } from "@mvp-ui/ui";

// Open menu renders portaled; cfg.overrides pins the viewport.
export const Menu = () => (
  <Dropdown.Root defaultOpen>
    <Dropdown.Trigger>
      <Button color="secondary">Actions</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover className="w-56">
      <Dropdown.Menu>
        <Dropdown.Section>
          <Dropdown.Item label="Edit" addon="⌘E" />
          <Dropdown.Item label="Duplicate" addon="⌘D" />
          <Dropdown.Item label="Share" addon="⌘S" />
        </Dropdown.Section>
        <Dropdown.Separator />
        <Dropdown.Section>
          <Dropdown.Item label="Archive" />
          <Dropdown.Item label="Delete" addon="⌫" />
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown.Root>
);
