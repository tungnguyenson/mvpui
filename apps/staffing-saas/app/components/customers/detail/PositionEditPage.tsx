"use client";

import { Button, Input, TextArea } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import {
  type CustomerPosition,
  getCustomerPosition,
} from "../customer-detail-data";
import { getCustomerById } from "../customers-data";
import { PageScaffold } from "../../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../../_shell/nav";
import { SectionCard } from "./SectionCard";

interface PositionEditPageProps {
  customerId: string;
  positionId?: string;
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

export function PositionEditPage({
  customerId,
  positionId,
}: PositionEditPageProps) {
  const customer = getCustomerById(customerId);
  if (!customer) {
    notFound();
  }

  const isCreate = !positionId;
  const position = positionId
    ? getCustomerPosition(customer, positionId)
    : undefined;

  if (!isCreate && !position) {
    notFound();
  }

  const backHref = `${APP_ROUTES.customers}/${customer.id}?tab=positions`;
  const title = isCreate ? "Thêm vị trí mới" : position!.name;
  const subtitle = isCreate
    ? "Tạo vị trí làm việc mới cho khách hàng."
    : "Cập nhật mô tả công việc, yêu cầu và quyền lợi cho vị trí.";

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-5">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Khách hàng", href: APP_ROUTES.customers },
              { label: customer.name, href: `${APP_ROUTES.customers}/${customer.id}` },
              { label: "Vị trí làm việc", href: backHref },
              { label: isCreate ? "Thêm mới" : position!.name },
            ]}
          />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-fg">{title}</h1>
              <p className="mt-1 text-sm text-fg-tertiary">{subtitle}</p>
            </div>
          </div>
        </div>
      }
    >
      <PositionEditForm
        initial={position ? toFormState(position) : EMPTY_FORM_STATE}
        backHref={backHref}
        submitLabel={isCreate ? "Tạo vị trí" : "Lưu thay đổi"}
      />
    </PageScaffold>
  );
}

interface PositionEditFormProps {
  initial: PositionFormState;
  backHref: string;
  submitLabel: string;
}

function PositionEditForm({ initial, backHref, submitLabel }: PositionEditFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PositionFormState>(initial);

  const update = <K extends keyof PositionFormState>(
    key: K,
    value: PositionFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    router.push(backHref);
  };

  return (
    <div className="flex flex-col gap-6">
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

      <div className="flex items-center justify-end gap-3">
        <Link href={backHref}>
          <Button color="secondary" size="md">
            Huỷ
          </Button>
        </Link>
        <Button color="primary" size="md" onClick={handleSave}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
