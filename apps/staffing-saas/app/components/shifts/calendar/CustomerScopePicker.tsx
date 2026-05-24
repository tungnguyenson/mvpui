"use client";

import { Select, SelectItem } from "@mvp-ui/ui";
import type { CustomerOption } from "../lib/filter-state";

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
  const items = options.map((opt) =>
    opt.logoUrl
      ? {
          id: opt.id,
          label: opt.name,
          supportingText: `${opt.shiftCount} ca`,
          avatarUrl: opt.logoUrl,
        }
      : {
          id: opt.id,
          label: opt.name,
          supportingText: `${opt.shiftCount} ca`,
        },
  );

  return (
    <Select
      aria-label="Khách hàng"
      items={items}
      {...(customerId !== null && { selectedKey: customerId })}
      onSelectionChange={(key) => onChange(String(key))}
      {...(disabled !== undefined && { isDisabled: disabled })}
      placeholder="Chọn khách hàng"
    >
      {(item) => (
        <SelectItem
          id={item.id}
          label={item.label}
          supportingText={item.supportingText}
          {...("avatarUrl" in item && item.avatarUrl
            ? { avatarUrl: item.avatarUrl }
            : {})}
        >
          {item.label}
        </SelectItem>
      )}
    </Select>
  );
}
