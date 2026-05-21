"use client";

import { HintText, Select, SelectItem } from "@mvp-ui/ui";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useMemo } from "react";
import {
  CUSTOMER_PRICING_SHIFT_LABELS,
  type CustomerLocation,
  type CustomerPricingConfig,
} from "../../customer-detail-data";
import { SectionCard } from "../SectionCard";
import type { SectionProps } from "./types";

interface PricingSectionProps extends SectionProps {
  pricingConfigs: CustomerPricingConfig[];
  locations: CustomerLocation[];
}

export function PricingSection({
  form,
  update,
  pricingConfigs,
  locations,
}: PricingSectionProps) {
  const location = locations.find((l) => l.id === form.locationId);
  const province = location?.province;

  const { suggested, others } = useMemo(() => {
    if (!province) return { suggested: [], others: pricingConfigs };
    return {
      suggested: pricingConfigs.filter((c) => c.province === province),
      others: pricingConfigs.filter((c) => c.province !== province),
    };
  }, [pricingConfigs, province]);

  const selected = pricingConfigs.find((c) => c.id === form.pricingConfigId);
  const selectItems = useMemo(() => {
    const items: { id: string; label: string }[] = [];
    suggested.forEach((c) =>
      items.push({
        id: String(c.id),
        label: `★ ${c.name} (áp dụng từ ${c.appliedFrom} đến ${c.appliedTo})`,
      })
    );
    others.forEach((c) =>
      items.push({
        id: String(c.id),
        label: `${c.name} · ${c.province} (áp dụng từ ${c.appliedFrom} đến ${c.appliedTo})`,
      })
    );
    return items;
  }, [suggested, others]);

  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        title="Cấu hình cước phí"
        description="Nguồn duy nhất để tính lương CTV, phí dịch vụ và biên lợi nhuận gộp."
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Cấu hình cước phí"
            isRequired
            placeholder="Chọn cấu hình giá"
            selectedKey={
              form.pricingConfigId !== null ? String(form.pricingConfigId) : null
            }
            onSelectionChange={(key) =>
              update(
                "pricingConfigId",
                key === null ? null : Number(key as string)
              )
            }
            items={selectItems}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
          {province && suggested.length === 0 && (
            <HintText>
              Chưa có cấu hình giá cho địa điểm này ({province}). Đang hiển thị
              toàn bộ cấu hình giá khả dụng.
            </HintText>
          )}

          {selected && (
            <div className="overflow-hidden rounded-lg border border-border-secondary">
              <table className="w-full text-sm">
                <thead className="bg-bg-secondary text-xs uppercase text-fg-tertiary">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Loại ca</th>
                    <th className="px-3 py-2 text-right font-medium">
                      Mức chi trả (VNĐ / giờ)
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      Mức phí (VNĐ / giờ)
                    </th>
                    <th className="px-3 py-2 text-right font-medium">GM0</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.rates.map((rate) => (
                    <tr
                      key={rate.shiftType}
                      className="border-t border-border-secondary"
                    >
                      <td className="px-3 py-2 text-fg">
                        {CUSTOMER_PRICING_SHIFT_LABELS[rate.shiftType]}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.payAmount}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.feeAmount}
                      </td>
                      <td className="px-3 py-2 text-right text-fg">
                        {rate.gm0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-border-secondary bg-bg-secondary px-3 py-2">
                <Link
                  href={`?tab=pricing&config=${selected.id}`}
                  scroll={false}
                  className="inline-flex items-center gap-1 text-xs text-fg-brand hover:underline"
                >
                  Xem cấu hình giá đầy đủ <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-info-border bg-info-bg p-3 text-sm text-info-fg">
            Thu nhập dự tính / ca, % biên LN gộp, thưởng thêm, chu kỳ thanh toán
            sẽ được tính khi tạo y/c tuyển dụng từ ca này.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
