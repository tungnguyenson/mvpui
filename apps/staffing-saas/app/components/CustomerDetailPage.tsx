import { Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Users,
} from "lucide-react";
import {
  CUSTOMER_STATUS_LABELS,
  getCustomerById,
  type CustomerHiringRequest,
  type CustomerShift,
} from "./customers-data";
import { PageScaffold } from "./PageScaffold";

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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

function RequestItem({ request }: { request: CustomerHiringRequest }) {
  const tone =
    request.status === "Quá hạn"
      ? "error"
      : request.status === "Sắp đủ người"
        ? "warning"
        : "success";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-fg">{request.title}</p>
            <Badge color={tone} type="pill-color" size="sm">
              {request.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-fg-tertiary">{request.area}</p>
        </div>
        <p className="text-sm text-fg-tertiary">Deadline: {request.deadline}</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-xs text-fg-tertiary">Headcount</p>
          <p className="mt-1 text-sm font-medium text-fg">{request.headcount}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Đã fill</p>
          <p className="mt-1 text-sm font-medium text-fg">{request.filled}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Mã request</p>
          <p className="mt-1 text-sm font-medium text-fg">{request.id}</p>
        </div>
      </div>
    </div>
  );
}

function ShiftItem({ shift }: { shift: CustomerShift }) {
  const tone =
    shift.status === "Thiếu gấp"
      ? "error"
      : shift.status === "Đủ người"
        ? "success"
        : "warning";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-fg">{shift.name}</p>
            <Badge color={tone} type="pill-color" size="sm">
              {shift.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-fg-tertiary">{shift.site}</p>
        </div>
        <p className="text-sm text-fg-tertiary">{shift.staffing}</p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-fg-tertiary">
        <CalendarDays className="size-4" />
        {shift.schedule}
      </div>
    </div>
  );
}

export function CustomerDetailPage({ id }: { id: string }) {
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const status = CUSTOMER_STATUS_LABELS[customer.status];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Building2 className="size-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{customer.name}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {customer.industry} • {customer.city} • Bắt đầu hợp tác từ {customer.joinedAt}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{customer.notes}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/customers">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Tạo hiring request
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <SummaryCard label="Hiring requests đang mở" value={`${customer.activeRequests}`} />
        <SummaryCard label="Ca đang mở" value={`${customer.openShifts}`} />
        <SummaryCard label="Chi phí tháng này" value={customer.monthlySpend} />
        <SummaryCard label="Công nợ hiện tại" value={customer.billing.outstanding} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard
          title="Thông tin công ty"
          description="Hồ sơ tài khoản, người liên hệ chính và điều khoản thanh toán."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm font-medium text-fg">{customer.contact.name}</p>
                <p className="text-sm text-fg-tertiary">{customer.contact.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{customer.contact.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{customer.contact.email}</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{customer.city}</p>
            </div>
            <div className="flex items-start gap-3">
              <ReceiptText className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">
                  Điều khoản thanh toán: {customer.billing.paymentTerm}
                </p>
                <p className="text-sm text-fg-tertiary">
                  Tháng trước: {customer.billing.previousMonth}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Billing snapshot"
          description="Tổng hợp nhanh chi phí phát sinh và công nợ cần theo dõi."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Chi phí tháng này</p>
              <p className="mt-2 text-lg font-semibold text-fg">
                {customer.billing.currentMonth}
              </p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Chi phí tháng trước</p>
              <p className="mt-2 text-lg font-semibold text-fg">
                {customer.billing.previousMonth}
              </p>
            </div>
            <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
              <p className="text-xs text-fg-tertiary">Công nợ hiện tại</p>
              <p className="mt-2 text-lg font-semibold text-fg">
                {customer.billing.outstanding}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Hiring requests"
        description="Danh sách yêu cầu tuyển hiện tại của khách hàng này."
      >
        <div className="flex flex-col gap-4">
          {customer.hiringRequests.length > 0 ? (
            customer.hiringRequests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))
          ) : (
            <p className="text-sm text-fg-tertiary">
              Khách hàng hiện không có hiring request đang mở.
            </p>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Ca làm việc đang mở"
        description="Các ca gần nhất cần đội vận hành tiếp tục bổ sung hoặc theo dõi."
      >
        <div className="flex flex-col gap-4">
          {customer.shifts.length > 0 ? (
            customer.shifts.map((shift) => <ShiftItem key={shift.id} shift={shift} />)
          ) : (
            <p className="text-sm text-fg-tertiary">
              Khách hàng hiện không có ca mở trong hệ thống.
            </p>
          )}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
