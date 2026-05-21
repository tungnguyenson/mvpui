import { BadgeWithDot, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Pause, Play, Square, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
  BATCH_STATUS_LABELS,
  getBatchById,
  type BatchStatus,
  type PaymentBatchRecord,
} from "./worker-payment-batches-data";
import { BatchDetailTabs } from "./detail/BatchDetailTabs";
import { formatDateVi, formatTimeDateVi } from "./detail/formatters";

function HeaderActions({ status }: { status: BatchStatus }): ReactNode {
  if (status === "new") {
    return (
      <>
        <Button
          color="tertiary-destructive"
          size="sm"
          iconLeading={<Trash2 className="size-4" />}
        >
          Huỷ kỳ
        </Button>
        <Button color="primary" size="sm" iconLeading={<Square className="size-4" />}>
          Chốt kỳ
        </Button>
      </>
    );
  }
  if (status === "locked") {
    return (
      <Button color="primary" size="sm" iconLeading={<Play className="size-4" />}>
        Chạy thanh toán
      </Button>
    );
  }
  if (status === "running") {
    return (
      <>
        <Button color="secondary" size="sm" iconLeading={<Pause className="size-4" />}>
          Tạm dừng
        </Button>
        <Button color="primary" size="sm">
          Đánh dấu hoàn thành
        </Button>
      </>
    );
  }
  if (status === "completed") {
    return (
      <Button color="secondary" size="sm" iconLeading={<Download className="size-4" />}>
        Tải báo cáo
      </Button>
    );
  }
  return null;
}

function MetaLine({ label, value }: { label: string; value: ReactNode }) {
  return (
    <span className="text-sm">
      <span className="text-fg-tertiary">{label}: </span>
      <span className="text-fg">{value}</span>
    </span>
  );
}

function renderTimeline(batch: PaymentBatchRecord): ReactNode {
  const lines: ReactNode[] = [];
  lines.push(
    <MetaLine
      key="updated"
      label="Cập nhật"
      value={
        <>
          {formatTimeDateVi(batch.timeline.updatedAt)}, bởi{" "}
          <Link
            href={`/users/${batch.timeline.updatedByPicHandle}`}
            className="font-medium text-fg-brand hover:underline"
          >
            {batch.timeline.updatedByPicHandle}
          </Link>
        </>
      }
    />,
  );
  if (batch.timeline.lockedAt) {
    lines.push(
      <MetaLine
        key="locked"
        label="Chốt kỳ"
        value={formatTimeDateVi(batch.timeline.lockedAt)}
      />,
    );
  }
  if (batch.timeline.completedAt) {
    lines.push(
      <MetaLine
        key="completed"
        label="Hoàn thành"
        value={formatTimeDateVi(batch.timeline.completedAt)}
      />,
    );
  }
  return (
    <div className="flex flex-col gap-1 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-1">
      {lines}
    </div>
  );
}

export function WorkerPaymentBatchesDetailPage({ id }: { id: string }) {
  const batch = getBatchById(id);
  if (!batch) notFound();

  const status = BATCH_STATUS_LABELS[batch.status];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Thanh toán CTV", href: APP_ROUTES.workerPaymentBatches },
              { label: `Kỳ ${batch.code}` },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-semibold text-fg">
                Kỳ thù lao {batch.code}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-fg-tertiary">Trạng thái:</span>
                <BadgeWithDot color={status.color} type="pill-color" size="sm">
                  {status.label}
                </BadgeWithDot>
              </div>
              {renderTimeline(batch)}
              <p className="text-sm text-fg-tertiary">
                Kỳ phát sinh: {formatDateVi(batch.config.periodFrom)} →{" "}
                {formatDateVi(batch.config.periodTo)} · Ngày thanh toán:{" "}
                {formatDateVi(batch.config.payoutDate)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <HeaderActions status={batch.status} />
            </div>
          </div>
        </div>
      }
    >
      <BatchDetailTabs batch={batch} />
    </PageScaffold>
  );
}
