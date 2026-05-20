import { AvatarProfilePhoto, Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  CreditCard,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  WORKER_STATUS_LABELS,
  getWorkerById,
  type WorkerShiftHistory,
} from "./workers-data";
import { PageScaffold } from "../_shell/PageScaffold";
import { getAvatarFor, getInitials } from "../_shared/assets";

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

function ShiftHistoryItem({ item }: { item: WorkerShiftHistory }) {
  const tone =
    item.checkInStatus === "Vắng mặt"
      ? "error"
      : item.checkInStatus === "Đi trễ"
        ? "warning"
        : "success";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fg">{item.shiftName}</p>
          <p className="mt-1 text-sm text-fg-tertiary">{item.customer}</p>
        </div>
        <Badge color={tone} type="pill-color" size="sm">
          {item.checkInStatus}
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div>
          <p className="text-xs text-fg-tertiary">Lịch</p>
          <p className="mt-1 text-sm text-fg">{item.schedule}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Mã ca</p>
          <p className="mt-1 text-sm text-fg">{item.id}</p>
        </div>
        <div>
          <p className="text-xs text-fg-tertiary">Payout</p>
          <p className="mt-1 text-sm font-medium text-fg">{item.payout}</p>
        </div>
      </div>
    </div>
  );
}

export function WorkerDetailPage({ id }: { id: string }) {
  const worker = getWorkerById(id);

  if (!worker) {
    notFound();
  }

  const status = WORKER_STATUS_LABELS[worker.status];

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <AvatarProfilePhoto
              state={worker.status === "active" ? "verified" : worker.status === "locked" ? "blocked" : null}
              size="lg"
              src={getAvatarFor(worker.name, worker.id)}
              alt={worker.name}
              initials={getInitials(worker.name)}
            />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{worker.name}</h1>
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
              </div>
              <p className="mt-1 text-base text-fg-tertiary">
                {worker.district}, {worker.city} • Gia nhập từ {worker.joinedAt}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{worker.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {worker.tags.map((tag) => (
                  <Badge key={tag} color="gray" type="pill-color" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/workers">
              <Button color="secondary" size="sm">
                Quay lại danh sách
              </Button>
            </Link>
            <Button color="primary" size="sm">
              Giao ca mới
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <SummaryCard label="Điểm đánh giá" value={`★ ${worker.rating}`} />
        <SummaryCard label="Ca tuần này" value={`${worker.weeklyShifts}`} />
        <SummaryCard label="Tổng số ca" value={`${worker.totalShifts}`} />
        <SummaryCard label="Batch gần nhất" value={worker.payment.batchId} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Hồ sơ worker"
          description="Thông tin cơ bản và snapshot vận hành cho cộng tác viên này."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{worker.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                Rating hiện tại {worker.rating} với {worker.totalShifts} ca đã hoàn thành.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                Xác thực: {worker.verification.status}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                Vi phạm: {worker.violations.totalCases} case • {worker.violations.latestNote}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">
                Thanh toán gần nhất: {worker.payment.amount} • {worker.payment.status}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Liên kết nghiệp vụ"
          description="Điểm vào nhanh sang các module liên quan đến worker này."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href={`/worker-verifications/${worker.id}`}
              className="rounded-xl border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
            >
              <p className="text-sm font-semibold text-fg">Xác thực</p>
              <p className="mt-1 text-sm text-fg-tertiary">{worker.verification.status}</p>
            </Link>
            <Link
              href={`/worker-violations/${worker.id}`}
              className="rounded-xl border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
            >
              <p className="text-sm font-semibold text-fg">Vi phạm</p>
              <p className="mt-1 text-sm text-fg-tertiary">
                {worker.violations.totalCases} case
              </p>
            </Link>
            <Link
              href={`/worker-payment-batches/${worker.payment.batchId.toLowerCase()}`}
              className="rounded-xl border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
            >
              <p className="text-sm font-semibold text-fg">Thanh toán</p>
              <p className="mt-1 text-sm text-fg-tertiary">{worker.payment.batchId}</p>
            </Link>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Snapshot xác thực, vi phạm, thanh toán"
        description="Tổng hợp các tín hiệu quan trọng để điều phối worker vào ca phù hợp."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-sm font-semibold text-fg">Xác thực</p>
            <p className="mt-2 text-sm text-fg-tertiary">
              SĐT: {worker.verification.phone}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">
              CCCD/CMND: {worker.verification.nationalId}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">MST: {worker.verification.taxId}</p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-sm font-semibold text-fg">Vi phạm</p>
            <p className="mt-2 text-sm text-fg-tertiary">
              Tổng số case: {worker.violations.totalCases}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">
              Mức gần nhất: {worker.violations.latestLevel}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">{worker.violations.latestNote}</p>
          </div>
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
            <p className="text-sm font-semibold text-fg">Thanh toán</p>
            <p className="mt-2 text-sm text-fg-tertiary">
              Batch: {worker.payment.batchId}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">
              Số tiền: {worker.payment.amount}
            </p>
            <p className="mt-1 text-sm text-fg-tertiary">
              Trạng thái: {worker.payment.status}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Lịch sử ca gần đây"
        description="Các ca gần nhất để đánh giá độ ổn định và mức độ phù hợp của worker."
      >
        <div className="flex flex-col gap-4">
          {worker.recentShifts.map((item) => (
            <ShiftHistoryItem key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}
