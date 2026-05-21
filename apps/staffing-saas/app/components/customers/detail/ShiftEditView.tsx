"use client";

import { Button, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type {
  CustomerLocation,
  CustomerPosition,
  CustomerPricingConfig,
  CustomerShift,
} from "../customer-detail-data";
import { GeneralSection } from "./shift-edit/GeneralSection";
import { PolicySection } from "./shift-edit/PolicySection";
import { PricingSection } from "./shift-edit/PricingSection";
import { ScheduleSection } from "./shift-edit/ScheduleSection";
import {
  EMPTY_FORM,
  type ShiftFormState,
  toFormState,
} from "./shift-edit/types";

interface ShiftEditViewProps {
  shift?: CustomerShift;
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  backHref: string;
  customerId: string;
}

const SUB_TABS = [
  { id: "general", label: "Thông tin chung" },
  { id: "pricing", label: "Cấu hình giá" },
  { id: "policy", label: "Chính sách làm việc" },
  { id: "schedule", label: "Lịch làm việc" },
] as const;

export function ShiftEditView({
  shift,
  positions,
  locations,
  pricingConfigs,
  backHref,
  customerId,
}: ShiftEditViewProps) {
  const isCreate = !shift;
  const [form, setForm] = useState<ShiftFormState>(
    shift ? toFormState(shift) : EMPTY_FORM
  );

  const update = <K extends keyof ShiftFormState>(
    key: K,
    value: ShiftFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const title = isCreate
    ? "Tạo ca làm việc mới"
    : `${shift.id} · ${shift.name}`;
  const submitLabel = isCreate ? "Tạo ca" : "Lưu thay đổi";

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-border-secondary pb-5">
        <div className="flex flex-col gap-2">
          <Link
            href={backHref}
            scroll={false}
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg-tertiary hover:text-fg"
          >
            <ArrowLeft className="size-4" /> Quay lại danh sách
          </Link>
          <h3 className="text-lg font-semibold text-fg">{title}</h3>
          {!isCreate && (
            <p className="text-sm text-fg-tertiary">
              Cập nhật ngày: {shift.updatedAt} · {shift.hiringRequestCount} y/c
              đang dùng
            </p>
          )}
        </div>
        {!isCreate && (
          <div className="flex self-start md:self-center">
            <Link
              href={`/hiring-requests/new?customerId=${encodeURIComponent(
                customerId
              )}&shiftId=${encodeURIComponent(shift.id)}`}
            >
              <Button color="primary" size="sm">
                Tạo Y/c tuyển dụng cho ca này
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Tabs variant="underline" defaultSelectedKey="general">
        <TabList aria-label="Cấu hình ca làm việc">
          {SUB_TABS.map((tab) => (
            <Tab key={tab.id} id={tab.id}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="general">
          <GeneralSection
            form={form}
            update={update}
            positions={positions}
            locations={locations}
            hiringRequests={shift?.hiringRequests ?? []}
          />
        </TabPanel>
        <TabPanel id="schedule">
          <ScheduleSection form={form} update={update} />
        </TabPanel>
        <TabPanel id="pricing">
          <PricingSection
            form={form}
            update={update}
            pricingConfigs={pricingConfigs}
            locations={locations}
          />
        </TabPanel>
        <TabPanel id="policy">
          <PolicySection form={form} update={update} />
        </TabPanel>
      </Tabs>

      <div className="sticky bottom-0 -mx-5 mt-2 flex items-center justify-end gap-3 border-t border-border-secondary bg-bg/95 px-5 py-3 backdrop-blur">
        <Link href={backHref} scroll={false}>
          <Button color="secondary" size="md">
            Hủy
          </Button>
        </Link>
        <Link href={backHref} scroll={false}>
          <Button color="primary" size="md">
            {submitLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
}
