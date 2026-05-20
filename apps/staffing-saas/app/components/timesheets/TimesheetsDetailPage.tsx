import { Avatar, Badge, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, AlertTriangle, Building2, CalendarDays, CheckCircle2, ClipboardCheck, Clock, Users } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  ATTENDANCE_LABELS,
  TIMESHEET_STATUS_LABELS,
  getTimesheetById,
  type AttendanceRecord,
} from "./timesheets-data";
import { getAvatarFor, getCustomerLogo, getInitials } from "../_shared/assets";

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

function AttendanceItem({ item }: { item: AttendanceRecord }) {
  const status = ATTENDANCE_LABELS[item.status];

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
            <p className="mt-1 text-sm text-fg-tertiary">{item.role}</p>
          </div>
        </div>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs text-fg-tertiary">Check-in</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.checkInAt}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Check-out</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.checkOutAt}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Số giờ</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.workedHours}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Payout dự kiến</p>
          <p className="mt-1 text-sm font-semibold text-fg">{item.payout}</p>
        </div>
      </div>
      {item.note ? (
        <p className="mt-3 text-sm text-fg-tertiary">{item.note}</p>
      ) : null}
    </div>
  );
}

export function TimesheetsDetailPage({ id }: { id: string }) {
  const record = getTimesheetById(id);
  if (!record) notFound();

  const status = TIMESHEET_STATUS_LABELS[record.status];
  const exceptionRecords = record.records.filter(
    (r) => r.status !== "on-time",
  );

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Clock className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{record.shiftName}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {record.shiftCode} • {record.customer} • {record.date} {record.schedule}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{record.notes}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/timesheets">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Link href={`/shifts/${record.shiftId}`}>
              <Button color="secondary" size="sm">
                Mở ca làm việc
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Chốt chấm công
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Workers dự kiến"
          value={`${record.expectedCount}`}
          iconChip={<Users className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Đã check-in"
          value={`${record.checkedInCount}/${record.expectedCount}`}
          iconChip={<CheckCircle2 className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Bất thường"
          value={`${record.exceptions}`}
          iconChip={<AlertTriangle className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Tóm tắt ca"
          description="Thông tin ca và liên kết tới module liên quan."
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
              <CalendarDays className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                {record.date} • {record.schedule}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ClipboardCheck className="mt-0.5 size-4 text-fg-brand" />
              <Link
                href={`/shifts/${record.shiftId}`}
                className="text-sm text-fg-brand hover:underline"
              >
                Mở chi tiết ca {record.shiftCode}
              </Link>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Bất thường cần xử lý"
          description="Danh sách các bản ghi vắng mặt, trễ giờ hoặc thiếu check-out."
        >
          <div className="flex flex-col gap-3">
            {exceptionRecords.length > 0 ? (
              exceptionRecords.map((item) => {
                const tone = ATTENDANCE_LABELS[item.status];
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-warning-border bg-warning-bg p-3"
                  >
                    <AlertCircle className="mt-0.5 size-4 text-warning-fg" />
                    <div>
                      <p className="text-sm font-semibold text-warning-fg">
                        {item.workerName} • {tone.label}
                      </p>
                      {item.note ? (
                        <p className="mt-1 text-sm text-warning-fg/80">{item.note}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-fg-tertiary">
                Toàn bộ workers check-in/out đúng giờ, không có bất thường.
              </p>
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Attendance records"
        description="Chi tiết check-in, check-out của từng worker trong ca này."
      >
        <div className="flex flex-col gap-4">
          {record.records.map((item) => (
            <AttendanceItem key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
