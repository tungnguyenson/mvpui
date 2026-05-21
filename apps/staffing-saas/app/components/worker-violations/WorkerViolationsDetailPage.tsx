import { Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CalendarClock,
  FileWarning,
  Phone,
  Receipt,
  UserCircle2,
} from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
  SEVERITY_LABELS,
  VIOLATION_STATUS_LABELS,
  getViolationWorkerById,
  type ViolationCase,
} from "./worker-violations-data";
import { WorkerProfilePhoto } from "../_shared";

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

function CaseItem({ item }: { item: ViolationCase }) {
  const severity = SEVERITY_LABELS[item.severity];
  const resolutionTone =
    item.resolution === "Chờ phản hồi"
      ? "warning"
      : item.resolution === "Đang xử lý"
        ? "warning"
        : "success";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-fg">{item.category}</p>
            <Badge color={severity.color} type="pill-color" size="sm">
              {severity.label}
            </Badge>
            <Badge color={resolutionTone} type="pill-color" size="sm">
              {item.resolution}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-fg-tertiary">{item.description}</p>
        </div>
        <p className="text-sm text-fg-tertiary">{item.occurredAt}</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-xs text-fg-tertiary">Ca liên quan</p>
          {item.shiftId ? (
            <Link
              href={`/shifts/${item.shiftId.toLowerCase()}`}
              className="mt-1 block text-sm font-medium text-fg-brand hover:underline"
            >
              {item.shiftId} • {item.shiftName}
            </Link>
          ) : (
            <p className="mt-1 text-sm text-fg-tertiary">Không gắn với ca cụ thể</p>
          )}
          {item.customer ? (
            <p className="text-sm text-fg-tertiary">{item.customer}</p>
          ) : null}
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Mức phạt</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.penalty}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Reviewer</p>
          <p className="mt-1 text-sm text-fg">{item.reviewer}</p>
        </div>
      </div>
    </div>
  );
}

export function WorkerViolationsDetailPage({ id }: { id: string }) {
  const record = getViolationWorkerById(id);
  if (!record) notFound();

  const status = VIOLATION_STATUS_LABELS[record.status];
  const severity = SEVERITY_LABELS[record.latestSeverity];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Quản lý vi phạm", href: APP_ROUTES.workerViolations },
              { label: record.workerName },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <WorkerProfilePhoto
                name={record.workerName}
                id={record.id}
                status={record.status}
                size="sm"
              />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold text-fg">{record.workerName}</h1>
                  <BadgeWithDot color={status.color} type="pill-color" size="sm">
                    {status.label}
                  </BadgeWithDot>
                  <Badge color={severity.color} type="pill-color" size="sm">
                    Mức gần nhất: {severity.label}
                  </Badge>
                </div>
                <p className="mt-1 text-base text-fg-tertiary">
                  Mã CTV {record.workerId} • {record.district}, {record.city}
                </p>
                <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{record.notes}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/worker-violations">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Button color="primary" size="sm">
                Mở rộng case mới
              </Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Tổng số case"
          value={`${record.totalCases}`}
          valueSize="md"
          iconChip={<FileWarning className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />

        <MetricCard
          label="Tổng phạt"
          value={record.totalPenalty}
          valueSize="md"
          iconChip={<Receipt className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="error"
          iconPlacement="inline"
        />
        <MetricCard
          label="Lần gần nhất"
          value={record.latestAt}
          valueSize="md"
          iconChip={<CalendarClock className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <SectionCard
        title="Hồ sơ worker"
        description="Thông tin liên hệ và snapshot trạng thái tài khoản của worker."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <UserCircle2 className="mt-0.5 size-4 text-fg-brand" />
            <div>
              <p className="text-sm font-medium text-fg">{record.workerName}</p>
              <p className="text-sm text-fg-tertiary">{record.workerId}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 size-4 text-fg-brand" />
            <p className="text-sm text-fg">{record.phone}</p>
          </div>
          <div className="flex items-start gap-3">
            <CalendarClock className="mt-0.5 size-4 text-fg-brand" />
            <p className="text-sm text-fg">Vi phạm gần nhất: {record.latestAt}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Penalty summary"
        description="Tổng hợp các hình thức xử lý đã áp dụng cho worker này."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <div className="flex items-center gap-2">
              <Receipt className="size-4 text-fg-brand" />
              <p className="text-sm font-medium text-fg">Tổng phạt</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-fg">{record.totalPenalty}</p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-fg-brand" />
              <p className="text-sm font-medium text-fg">Mức xử lý hiện tại</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-fg">{status.label}</p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <div className="flex items-center gap-2">
              <CalendarClock className="size-4 text-fg-brand" />
              <p className="text-sm font-medium text-fg">Số case</p>
            </div>
            <p className="mt-2 text-lg font-semibold text-fg">{record.totalCases}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Lịch sử violation cases"
        description="Một worker có thể có nhiều case vi phạm. Liệt kê theo thứ tự gần nhất."
      >
        <div className="flex flex-col gap-4">
          {record.cases.map((item) => (
            <CaseItem key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
