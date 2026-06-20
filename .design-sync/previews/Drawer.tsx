import { Drawer, DrawerBody, DrawerFooter, Button, Input, Label, Toggle } from "@mvp-ui/ui";

// Drawer renders open + portaled (slides from `side`); cfg.overrides pins the viewport.
export const SettingsPanel = () => (
  <Drawer
    isOpen
    side="right"
    size="md"
    title="Workspace settings"
    description="Manage how your team collaborates."
    showCloseButton
  >
    <DrawerBody>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label>Workspace name</Label>
          <Input defaultValue="Acme Design" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <p className="text-fg" style={{ fontSize: 14, fontWeight: 500 }}>Public profile</p>
            <p className="text-fg-tertiary" style={{ fontSize: 13 }}>Anyone with the link can view.</p>
          </div>
          <Toggle defaultSelected />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <p className="text-fg" style={{ fontSize: 14, fontWeight: 500 }}>Email notifications</p>
            <p className="text-fg-tertiary" style={{ fontSize: 13 }}>Daily activity digest.</p>
          </div>
          <Toggle />
        </div>
      </div>
    </DrawerBody>
    <DrawerFooter>
      <Button color="secondary">Cancel</Button>
      <Button>Save changes</Button>
    </DrawerFooter>
  </Drawer>
);
