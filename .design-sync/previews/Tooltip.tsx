import { Tooltip, TooltipTrigger, Button } from "@mvp-ui/ui";

// defaultOpen so the bubble renders statically; cfg.overrides pins the viewport.
export const WithArrow = () => (
  <div style={{ display: "grid", placeItems: "center", paddingTop: 96 }}>
    <Tooltip defaultOpen arrow placement="bottom" title="Keyboard shortcut" description="Press ⌘K to open the command menu.">
      <TooltipTrigger className="cursor-pointer">
        <Button color="secondary">Hover me</Button>
      </TooltipTrigger>
    </Tooltip>
  </div>
);
