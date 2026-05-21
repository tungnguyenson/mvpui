"use client";

import { Input, Select, SelectItem, Toggle } from "@mvp-ui/ui";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type {
  CustomerLocation,
  CustomerPosition,
  CustomerShiftHiringRequestRef,
} from "../../customer-detail-data";
import { SectionCard } from "../SectionCard";
import { HiringRequestList } from "./HiringRequestList";
import type { SectionProps } from "./types";

interface GeneralSectionProps extends SectionProps {
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  hiringRequests: CustomerShiftHiringRequestRef[];
}

export function GeneralSection({
  form,
  update,
  positions,
  locations,
  hiringRequests,
}: GeneralSectionProps) {
  const selectedPosition = positions.find((p) => p.id === form.positionId);
  const selectedLocation = locations.find((l) => l.id === form.locationId);

  const activeHRs = hiringRequests.filter(
    (hr) => hr.status === "publishing" || hr.status === "draft"
  );
  const lockedActive = activeHRs.length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <SectionCard title="Thông tin chung">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4 rounded-lg border border-border-secondary bg-bg-secondary px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-fg">
                Trạng thái hoạt động
              </span>
              <span className="text-xs text-fg-tertiary">
                {lockedActive
                  ? `Không thể ngừng — còn ${activeHRs.length} y/c tuyển dụng đang dùng ca này. Dừng các y/c trước.`
                  : form.status === "active"
                    ? "Ca đang được dùng để tạo y/c tuyển dụng"
                    : "Ca tạm ngưng — không cho tạo y/c mới"}
              </span>
            </div>
            <Toggle
              size="sm"
              isSelected={form.status === "active"}
              isDisabled={lockedActive}
              onChange={(isSelected) =>
                update("status", isSelected ? "active" : "inactive")
              }
              label={form.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
            />
          </div>

          <Input
            label="Tên ca"
            isRequired
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Ví dụ: Ca tối kho ECDC"
            hint="Tên ca thường bao gồm cả vị trí và địa điểm để dễ nhận diện."
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Vị trí"
              isRequired
              placeholder="Chọn vị trí"
              selectedKey={form.positionId || null}
              onSelectionChange={(key) =>
                update("positionId", (key as string) ?? "")
              }
              items={positions.map((p) => ({ id: p.id, label: p.name }))}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            {selectedPosition && (
              <div className="rounded-lg border border-border-secondary bg-bg-secondary p-3">
                <p className="text-sm font-semibold text-fg">
                  {selectedPosition.name}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-fg-tertiary">
                  {selectedPosition.description}
                </p>
                <Link
                  href={`?tab=positions&position=${selectedPosition.id}`}
                  scroll={false}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-fg-brand hover:underline"
                >
                  Xem chi tiết <ExternalLink className="size-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label="Địa điểm làm việc"
              isRequired
              placeholder="Chọn địa điểm"
              selectedKey={form.locationId || null}
              onSelectionChange={(key) =>
                update("locationId", (key as string) ?? "")
              }
              items={locations.map((l) => ({ id: l.id, label: l.shortName }))}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            {selectedLocation && (
              <p className="text-sm text-fg-tertiary">
                Đ/c: {selectedLocation.address}
              </p>
            )}
          </div>
        </div>
      </SectionCard>

      <aside className="lg:sticky lg:top-4 lg:self-start">
        <HiringRequestList hiringRequests={hiringRequests} />
      </aside>
    </div>
  );
}
