import { Avatar, Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Flag,
  MapPin,
  Target,
} from "lucide-react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import {
  SHIFT_STATUS_LABELS,
  getShiftById,
  type ShiftAssignment,
} from "./shifts-data";
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

function AssignmentItem({ item }: { item: ShiftAssignment }) {
  const tone =
    item.status === "Đã huỷ"
      ? "error"
      : item.status === "Dự bị"
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
            <p className="mt-1 text-sm text-fg-tertiary">{item.role}</p>
          </div>
        </div>
        <Badge color={tone} type="pill-color" size="sm">
          {item.status}
        </Badge>
      </div>
      <p className="mt-3 text-sm text-fg-tertiary">Xác nhận: {item.confirmedAt}</p>
    </div>
  );
}

export function ShiftsDetailPage({ id }: { id: string }) {
  const shift = getShiftById(id);
  if (!shift) notFound();

  const status = SHIFT_STATUS_LABELS[shift.status];
  const fillRate = Math.round((shift.assignedCount / shift.requiredCount) * 100);

  return (
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Lịch làm việc", href: APP_ROUTES.shifts },
            { label: `${shift.code} • ${shift.name}` },
          ]}
          actions={
            <>
              <Link href="/shifts">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Button color="primary" size="sm">
                Mời thêm CTV
              </Button>
            </>
          }
        >
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <CalendarDays className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{shift.name}</h1>
                <BadgeWithDot color={status.color} type="pill-color" size="sm">
                  {status.label}
                </BadgeWithDot>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {shift.code} • {shift.customer} • {shift.site}
              </p>
              <p className="mt-2 text-sm text-fg-tertiary">{shift.schedule}</p>
            </div>
          </div>
        </AppPageHeader>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Tiến độ fill"
          value={`${shift.assignedCount}/${shift.requiredCount} • ${fillRate}%`}
          valueSize="md"
          valueTone="warning"
          iconChip={<Target className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
          helpText="Có rủi ro không đạt đủ số lượng CTV cần thiết để vận hành ca này"
        />
        <MetricCard
          label="Thù lao"
          value={shift.payRate}
          valueSize="md"
          iconChip={<CircleDollarSign className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Ngày"
          value="24/05 - 31/05/2026"
          valueSize="md"
          iconChip={<CalendarDays className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Khung giờ"
          value="08:00 - 17:00"
          valueSize="md"
          iconChip={<Clock className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin ca"
          description="Khách hàng, điểm bán và yêu cầu vận hành cho ca này."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              {(() => {
                const logo = getCustomerLogo(shift.customerId);
                if (logo) {
                  return (
                    <div className="mt-0.5 size-6 shrink-0 overflow-hidden rounded-md">
                      <img
                        src={logo.mark}
                        alt={`Logo ${shift.customer}`}
                        className="size-full object-cover"
                      />
                    </div>
                  );
                }
                return <Building2 className="mt-0.5 size-4 text-fg-brand" />;
              })()}
              <div>
                <p className="text-sm font-medium text-fg">{shift.customer}</p>
                <Link
                  href={`/customers/${shift.customerId}`}
                  className="text-sm text-fg-brand hover:underline"
                >
                  Mở hồ sơ khách hàng
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">{shift.site}</p>
                <p className="text-sm text-fg-tertiary">{shift.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CircleDollarSign className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">{shift.payRate}</p>
                <p className="text-sm text-fg-tertiary">{shift.payRateNote}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg-tertiary">{shift.notes}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Yêu cầu công việc"
          description="Tiêu chí lựa chọn worker và quy định vận hành tại điểm bán."
        >
          <ul className="flex flex-col gap-3">
            {shift.requirements.map((req) => (
              <li
                key={req}
                className="rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3 text-sm text-fg"
              >
                {req}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Workers đã nhận ca"
        description="Danh sách CTV được phân công và trạng thái xác nhận."
      >
        <div className="flex flex-col gap-4">
          {shift.assignments.map((item) => (
            <AssignmentItem key={item.workerId} item={item} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
