import { Avatar, Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarRange, CreditCard, FileText, User2 } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  BATCH_STATUS_LABELS,
  getBatchById,
  type BatchLineItem,
} from "./worker-payment-batches-data";
import { getAvatarFor, getInitials } from "../_shared/assets";

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm text-fg-tertiary">{label}</p>
      <p className="mt-2 text-xl font-semibold text-fg">{value}</p>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function LineItem({ item }: { item: BatchLineItem }) {
  const tone =
    item.status === "Bị từ chối"
      ? "error"
      : item.status === "Chờ chuyển"
        ? "warning"
        : "success";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Avatar
            size="md"
            src={getAvatarFor(item.workerName, item.workerId)}
            alt={item.workerName}
            initials={getInitials(item.workerName)}
          />
          <div>
            <Link
              href={`/workers/${item.workerId}`}
              className="text-sm font-semibold text-fg hover:text-fg-brand"
            >
              {item.workerName}
            </Link>
            <p className="mt-1 text-sm text-fg-tertiary">
              {item.bank} • {item.bankAccount}
            </p>
          </div>
        </div>
        <Badge color={tone} type="pill-color" size="sm">
          {item.status}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs text-fg-tertiary">Số ca</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.totalShifts}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Gross</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.grossAmount}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Khấu trừ</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.deductions}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Net</p>
          <p className="mt-1 text-sm font-semibold text-fg">{item.netAmount}</p>
        </div>
      </div>
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <CreditCard className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{batch.code}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                Kỳ {batch.period} • Cutoff {batch.cutoffDate} • Người tạo {batch.createdBy}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{batch.notes}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/worker-payment-batches">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Duyệt batch
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <SummaryCard label="Số CTV" value={`${batch.workerCount}`} />
        <SummaryCard label="Tổng gross" value={batch.totalAmount} />
        <SummaryCard label="Khấu trừ" value={batch.totalDeductions} />
        <SummaryCard label="Net thanh toán" value={batch.netAmount} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin batch"
          description="Chu kỳ thanh toán, người tạo và thời hạn chi trả."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <CalendarRange className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm font-medium text-fg">Chu kỳ</p>
                <p className="text-sm text-fg-tertiary">
                  {batch.period} • Cutoff {batch.cutoffDate}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User2 className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm font-medium text-fg">Người tạo</p>
                <p className="text-sm text-fg-tertiary">{batch.createdBy}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm font-medium text-fg">Ngày chi trả dự kiến</p>
                <p className="text-sm text-fg-tertiary">{batch.payoutDate}</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Payment breakdown"
          description="Tổng hợp nhanh số tiền batch ở các khâu chính."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Gross</p>
              <p className="mt-2 text-lg font-semibold text-fg">{batch.totalAmount}</p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Khấu trừ</p>
              <p className="mt-2 text-lg font-semibold text-fg">
                {batch.totalDeductions}
              </p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Net</p>
              <p className="mt-2 text-lg font-semibold text-fg">{batch.netAmount}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Workers trong batch"
        description="Danh sách CTV cùng các khoản gross, khấu trừ và net trong batch này."
      >
        <div className="flex flex-col gap-4">
          {batch.items.map((item) => (
            <LineItem key={item.workerId} item={item} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
