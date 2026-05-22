import { Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, CalendarRange, Calculator, CalendarCheck, CircleDollarSign, Percent, Scale, User2 } from "lucide-react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import {
  DISCREPANCY_LABELS,
  RECON_STATUS_LABELS,
  getReconciliationById,
  type ApprovalEntry,
  type DiscrepancyItem,
} from "./reconciliations-data";
import { getCustomerLogo } from "../_shared/assets";

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

function DiscrepancyCard({ item }: { item: DiscrepancyItem }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fg">{DISCREPANCY_LABELS[item.type]}</p>
          {item.shiftName ? (
            <p className="mt-1 text-sm text-fg-tertiary">
              {item.shiftId ? `${item.shiftId} • ` : ""}
              {item.shiftName}
              {item.workerName ? ` • ${item.workerName}` : ""}
            </p>
          ) : null}
        </div>
        <Badge color="warning" type="pill-color" size="sm">
          {item.delta}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs text-fg-tertiary">Hồ sơ dự kiến</p>
          <p className="mt-1 text-sm text-fg">{item.expected}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Thực tế đối soát</p>
          <p className="mt-1 text-sm text-fg">{item.actual}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-fg-tertiary">{item.note}</p>
    </div>
  );
}

function TimelineItem({ entry }: { entry: ApprovalEntry }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="size-2.5 rounded-full bg-primary" />
        <div className="mt-1 w-px flex-1 bg-border-secondary" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-sm font-medium text-fg">{entry.action}</p>
        <p className="mt-1 text-sm text-fg-tertiary">
          {entry.at} • {entry.actor}
        </p>
        {entry.note ? (
          <p className="mt-2 text-sm text-fg-tertiary">{entry.note}</p>
        ) : null}
      </div>
    </div>
  );
}

export function ReconciliationsDetailPage({ id }: { id: string }) {
  const record = getReconciliationById(id);
  if (!record) notFound();

  const status = RECON_STATUS_LABELS[record.status];

  return (
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Đối soát", href: APP_ROUTES.reconciliations },
            { label: `${record.code} • ${record.customer}` },
          ]}
          actions={
            <>
              <Link href="/reconciliations">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Button color="primary" size="sm">
                Gửi duyệt khách hàng
              </Button>
            </>
          }
        >
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Calculator className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{record.code}</h1>
                <BadgeWithDot color={status.color} type="pill-color" size="sm">
                  {status.label}
                </BadgeWithDot>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {record.customer} • Kỳ {record.period}
                {record.closedAt ? ` • Đóng phiếu ${record.closedAt}` : ""}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{record.notes}</p>
            </div>
          </div>
        </AppPageHeader>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Tổng số ca"
          value={`${record.totalShifts}`}
          valueSize="md"
          iconChip={<CalendarCheck className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Tổng tiền"
          value={record.totalAmount}
          valueSize="md"
          iconChip={<CircleDollarSign className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Chênh lệch"
          value={record.variance}
          valueSize="md"
          iconChip={<Scale className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Tỉ lệ"
          value={record.variancePercent}
          valueSize="md"
          iconChip={<Percent className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin phiếu đối soát"
          description="Khách hàng, người phụ trách và phạm vi đối soát."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              {(() => {
                const logo = getCustomerLogo(record.customerId);
                if (logo) {
                  return (
                    <div className="mt-0.5 size-6 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={logo.mark}
                        alt={`Logo ${record.customer}`}
                        className="size-full object-cover"
                      />
                    </div>
                  );
                }
                return <Building2 className="mt-0.5 size-4 text-fg-brand" />;
              })()}
              <div>
                <p className="text-sm font-medium text-fg">{record.customer}</p>
                <Link
                  href={`/customers/${record.customerId}`}
                  className="text-sm text-fg-brand hover:underline"
                >
                  Mở hồ sơ khách hàng
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarRange className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Kỳ đối soát: {record.period}</p>
            </div>
            <div className="flex items-start gap-3">
              <User2 className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Người phụ trách: {record.owner}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Tóm tắt số liệu"
          description="Snapshot nhanh để đội vận hành nắm chênh lệch ở mức tổng."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Tổng số ca</p>
              <p className="mt-2 text-lg font-semibold text-fg">{record.totalShifts}</p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Tổng tiền</p>
              <p className="mt-2 text-lg font-semibold text-fg">{record.totalAmount}</p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Chênh lệch</p>
              <p className="mt-2 text-lg font-semibold text-fg">{record.variance}</p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Tỉ lệ chênh lệch</p>
              <p className="mt-2 text-lg font-semibold text-fg">{record.variancePercent}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Discrepancy items"
        description="Chi tiết các khoản chênh lệch cần khách hàng phê duyệt."
      >
        <div className="flex flex-col gap-4">
          {record.discrepancies.length > 0 ? (
            record.discrepancies.map((item) => (
              <DiscrepancyCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-sm text-fg-tertiary">
              Chưa có khoản chênh lệch nào trong phiếu này.
            </p>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Approval timeline"
        description="Lịch sử xử lý phiếu đối soát từ nội bộ và khách hàng."
      >
        <div className="flex flex-col">
          {record.approvals.length > 0 ? (
            record.approvals.map((entry) => <TimelineItem key={entry.id} entry={entry} />)
          ) : (
            <p className="text-sm text-fg-tertiary">
              Phiếu vẫn ở trạng thái khởi tạo, chưa có hành động nào được ghi nhận.
            </p>
          )}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
