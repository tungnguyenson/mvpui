"use client";

import { Button, Input, TextArea } from "@mvp-ui/ui";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import {
  CUSTOMER_ATTIRE_OPTIONS,
  type CustomerPosition,
  type CustomerPositionAttire,
} from "../customer-detail-data";
import { SectionCard } from "./SectionCard";

interface PositionEditViewProps {
  position?: CustomerPosition;
  backHref: string;
}

interface PositionFormState {
  name: string;
  description: string;
  requirements: string;
  benefits: string;
  instructions: string;
  attire: CustomerPositionAttire | null;
}

const EMPTY_FORM_STATE: PositionFormState = {
  name: "",
  description: "",
  requirements: "",
  benefits: "",
  instructions: "",
  attire: null,
};

function toFormState(position: CustomerPosition): PositionFormState {
  return {
    name: position.name,
    description: position.description,
    requirements: position.requirements,
    benefits: position.benefits,
    instructions: position.instructions,
    attire: position.attire,
  };
}

export function PositionEditView({ position, backHref }: PositionEditViewProps) {
  const isCreate = !position;
  const [form, setForm] = useState<PositionFormState>(
    position ? toFormState(position) : EMPTY_FORM_STATE
  );

  const update = <K extends keyof PositionFormState>(
    key: K,
    value: PositionFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const title = isCreate ? "Thêm vị trí mới" : position.name;
  const subtitle = isCreate
    ? "Tạo vị trí làm việc mới cho khách hàng."
    : "Cập nhật mô tả công việc, yêu cầu và quyền lợi cho vị trí.";
  const submitLabel = isCreate ? "Tạo vị trí" : "Lưu thay đổi";

  return (
    <div className="flex w-full max-w-4xl flex-col gap-6 pb-24">
      <div className="flex flex-col gap-2 border-b border-border-secondary pb-5">
        <Link
          href={backHref}
          scroll={false}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-fg-tertiary hover:text-fg"
        >
          <ArrowLeft className="size-4" /> Quay lại danh sách vị trí
        </Link>
        <h3 className="text-lg font-semibold text-fg">Công việc: {title}</h3>
        <p className="text-sm text-fg-tertiary">{subtitle}</p>
      </div>

      <SectionCard title="Thông tin vị trí">
        <div className="flex flex-col gap-5">
          <Input
            label="Tên vị trí"
            isRequired
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
          <TextArea
            label="Mô tả công việc"
            isRequired
            rows={4}
            value={form.description}
            onChange={(value) => update("description", value)}
          />
          <TextArea
            label="Yêu cầu"
            rows={5}
            value={form.requirements}
            onChange={(value) => update("requirements", value)}
          />
          <TextArea
            label="Quyền lợi"
            rows={5}
            value={form.benefits}
            onChange={(value) => update("benefits", value)}
          />
          <TextArea
            label="Hướng dẫn, tài liệu"
            rows={5}
            value={form.instructions}
            onChange={(value) => update("instructions", value)}
          />

          <AttirePicker
            value={form.attire}
            onChange={(attire) => update("attire", attire)}
          />
        </div>
      </SectionCard>

      <div className="sticky bottom-0 -mx-5 mt-2 flex items-center justify-end gap-3 border-t border-border-secondary bg-bg/95 px-5 py-3 backdrop-blur">
        <Link href={backHref} scroll={false}>
          <Button color="secondary" size="md">
            Huỷ
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

interface AttirePickerProps {
  value: CustomerPositionAttire | null;
  onChange: (attire: CustomerPositionAttire | null) => void;
}

function AttirePicker({ value, onChange }: AttirePickerProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-fg-secondary">
        Đồng phục / Trang phục
      </legend>
      <p className="text-sm text-fg-tertiary">
        Chọn hình ảnh đồng phục đại diện cho vị trí. Bấm lại để bỏ chọn.
      </p>
      <div className="mt-1 flex flex-wrap gap-3">
        {CUSTOMER_ATTIRE_OPTIONS.map((option) => {
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(isSelected ? null : option.id)}
              className={`group relative flex w-28 flex-col overflow-hidden rounded-xl border bg-bg text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-border-brand ${
                isSelected
                  ? "border-border-brand ring-2 ring-border-brand"
                  : "border-border-secondary hover:border-border"
              }`}
            >
              <span className="relative block aspect-1/2 w-full overflow-hidden bg-bg-secondary">
                <Image
                  src={option.imageSrc}
                  alt={option.label}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
                {isSelected && (
                  <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-fg shadow-sm">
                    <Check className="size-3.5" />
                  </span>
                )}
              </span>
              <span className="px-2 py-1.5 text-xs font-medium text-fg">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
