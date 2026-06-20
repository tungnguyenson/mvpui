import { InputGroup, InputAddon, InputBase } from "@mvp-ui/ui";
import { ChevronDown } from "lucide-react";

export const LeadingDropdown = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputGroup
      label="Phone number"
      leadingAddon={
        <InputAddon className="gap-1 pr-2">
          <span className="text-sm">US</span>
          <ChevronDown className="size-3.5 text-fg-tertiary" />
        </InputAddon>
      }
    >
      <InputBase type="tel" placeholder="+1 (555) 000-0000" />
    </InputGroup>
  </div>
);

export const TrailingDropdown = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputGroup
      label="Amount"
      trailingAddon={
        <InputAddon position="trailing" className="gap-1 pl-2">
          <span className="text-sm">USD</span>
          <ChevronDown className="size-3.5 text-fg-tertiary" />
        </InputAddon>
      }
    >
      <InputBase placeholder="0.00" inputMode="decimal" />
    </InputGroup>
  </div>
);

export const TrailingButton = () => (
  <div style={{ width: 320, maxWidth: "100%" }}>
    <InputGroup
      label="Referral link"
      trailingAddon={
        <InputAddon position="trailing" className="cursor-pointer px-3 font-medium text-fg-brand">
          Copy
        </InputAddon>
      }
    >
      <InputBase defaultValue="app.acme.co/r/ana-9f3" readOnly />
    </InputGroup>
  </div>
);
