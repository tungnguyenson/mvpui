"use client";

import { Button, Input, TextArea } from "@mvp-ui/ui";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { type CustomerPosition } from "../customer-detail-data";
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
}

const EMPTY_FORM_STATE: PositionFormState = {
  name: "",
  description: "",
  requirements: "",
  benefits: "",
  instructions: "",
};

function toFormState(position: CustomerPosition): PositionFormState {
  return {
    name: position.name,
    description: position.description,
    requirements: position.requirements,
    benefits: position.benefits,
    instructions: position.instructions,
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
