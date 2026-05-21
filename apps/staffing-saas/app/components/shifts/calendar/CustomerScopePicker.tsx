"use client";

import { Select, SelectItem } from "@mvp-ui/ui";
import { Building2 } from "lucide-react";
import type { CustomerOption } from "./lib/filter-state";

interface CustomerScopePickerProps {
  customerId: string | null;
  options: CustomerOption[];
  onChange: (next: string) => void;
  disabled?: boolean;
}

export function CustomerScopePicker({
  customerId,
  options,
  onChange,
  disabled,
}: CustomerScopePickerProps) {
  const items = options.map((opt) => ({
    id: opt.id,
    label: opt.name,
    supportingText: `${opt.shiftCount} ca`,
  }));

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-bg text-fg-tertiary">
        <Building2 className="size-4" />
      </span>
      <Select
        aria-label="Khách hàng"
        items={items}
        {...(customerId !== null && { selectedKey: customerId })}
        onSelectionChange={(key) => onChange(String(key))}
        {...(disabled !== undefined && { isDisabled: disabled })}
        placeholder="Chọn khách hàng"
      >
        {(item) => (
          <SelectItem id={item.id} label={item.label} supportingText={item.supportingText}>
            {item.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
