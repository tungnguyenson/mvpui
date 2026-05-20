"use client";

import {
  Badge,
  Button,
  MetricCard,
  Pagination,
  ProgressBar,
  Table,
} from "@mvp-ui/ui";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Download,
  ShieldAlert,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { APP_ROUTES } from "../_shell/nav";
import { PageScaffold } from "../_shell/PageScaffold";
import { WorkerAvatar } from "../_shared";
import { WORKERS, WORKER_STATUS_LABELS } from "../workers/workers-data";

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  spark: [number, number][];
}

interface ModuleCard {
  title: string;
  description: string;
  href: string;
  stat: string;
  tone: "brand" | "success" | "warning";
}

interface HiringRequest {
  id: string;
  customer: string;
  role: string;
  city: string;
  openSlots: string;
  deadline: string;
  progress: number;
}

interface VerificationItem {
  id: string;
  name: string;
  missing: string;
  risk: string;
}

const METRICS: Metric[] = [
  {
    label: "Số CTV cần tuyển",
    value: "1,420",
    change: "18%",
    trend: "up",
    spark: [
      [0, 1180], [1, 1210], [2, 1190], [3, 1240], [4, 1230], [5, 1280],
      [6, 1310], [7, 1290], [8, 1880], [9, 1520], [10, 1450], [11, 1420],
    ],
  },
  {
    label: "Fill rate",
    value: "96%",
    change: "2%",
    trend: "up",
    spark: [
      [0, 91], [1, 92], [2, 90], [3, 93], [4, 94], [5, 92],
      [6, 95], [7, 94], [8, 96], [9, 95], [10, 97], [11, 96],
    ],
  },
  {
    label: "CTV đang hoạt động",
    value: "342",
    change: "8%",
    trend: "up",
    spark: [
      [0, 10], [1, 13], [2, 11], [3, 16], [4, 14], [5, 19],
      [6, 17], [7, 22], [8, 20], [9, 25], [10, 23], [11, 29],
    ],
  },
  {
    label: "CTV không hài lòng",
    value: "12",
    change: "5%",
    trend: "down",
    spark: [
      [0, 22], [1, 21], [2, 23], [3, 20], [4, 19], [5, 18],
      [6, 17], [7, 16], [8, 15], [9, 14], [10, 13], [11, 12],
    ],
  },

];

const MODULES: ModuleCard[] = [
  {
    title: "Khách hàng",
    description: "Theo dõi doanh nghiệp, nhu cầu tuyển và mức sử dụng ca.",
    href: APP_ROUTES.customers,
    stat: "24 khách hàng",
    tone: "brand",
  },
  {
    title: "Danh sách CTV",
    description: "Quản lý hồ sơ, khu vực, hiệu suất và trạng thái hoạt động.",
    href: APP_ROUTES.workers,
    stat: "342 CTV",
    tone: "success",
  },
  {
    title: "Quản lý xác thực",
    description: "Rà soát CCCD/CMND, MST và số điện thoại theo từng worker.",
    href: APP_ROUTES.workerVerifications,
    stat: "27 hồ sơ chờ duyệt",
    tone: "warning",
  },
  {
    title: "Thanh toán CTV",
    description: "Điều phối batch thanh toán và đối soát line item theo worker.",
    href: APP_ROUTES.workerPaymentBatches,
    stat: "6 batch mở",
    tone: "brand",
  },
];

const HIRING_REQUESTS: HiringRequest[] = [
  {
    id: "HR-2401",
    customer: "GHN Sorting",
    role: "CTV bán hàng cuối tuần",
    city: "TP.HCM",
    openSlots: "12/20",
    deadline: "24/05",
    progress: 60,
  },
  {
    id: "HR-2402",
    customer: "Ninja Van",
    role: "CTV kho ca đêm",
    city: "Bình Dương",
    openSlots: "8/15",
    deadline: "25/05",
    progress: 53,
  },
  {
    id: "HR-2403",
    customer: "Shopee Express Official",
    role: "Lễ tân part-time",
    city: "Hà Nội",
    openSlots: "4/6",
    deadline: "27/05",
    progress: 67,
  },
];

const VERIFICATION_QUEUE: VerificationItem[] = [
  {
    id: "VF-101",
    name: "Nguyễn Minh Tâm",
    missing: "Thiếu MST",
    risk: "Ảnh CCCD mờ",
  },
  {
    id: "VF-102",
    name: "Lưu Gia Hân",
    missing: "Chưa xác minh số điện thoại",
    risk: "Thông tin địa chỉ chưa khớp",
  },
  {
    id: "VF-103",
    name: "Trần Quốc Bảo",
    missing: "Thiếu mặt sau CCCD",
    risk: "Không có",
  },
];

const PAYMENT_BATCHES = [
  {
    id: "PAY-0520-A",
    period: "13/05 - 19/05",
    workers: 118,
    amount: "₫286.400.000",
    status: "Đang duyệt",
  },
  {
    id: "PAY-0513-B",
    period: "06/05 - 12/05",
    workers: 94,
    amount: "₫214.750.000",
    status: "Chờ chuyển khoản",
  },
];

const PAGE_SIZE = 5;

const COLUMNS = [
  { id: "worker", name: "CTV", isRowHeader: true as const },
  { id: "area", name: "Khu vực" },
  { id: "status", name: "Trạng thái" },
  { id: "shifts", name: "Tổng số ca" },
  { id: "rating", name: "Đánh giá" },
];

function ModuleTile({ title, description, href, stat, tone }: ModuleCard) {
  const toneClass =
    tone === "success"
      ? "text-fg-success"
      : tone === "warning"
        ? "text-warning-fg"
        : "text-fg-brand";

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-border-secondary bg-bg p-5 shadow-xs transition-colors hover:bg-bg-secondary"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
        </div>
        <ArrowRight className="size-4 shrink-0 text-fg-tertiary transition-transform group-hover:translate-x-0.5" />
      </div>
      <span className={`text-sm font-semibold ${toneClass}`}>{stat}</span>
    </Link>
  );
}

function SectionCard({
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="flex flex-col gap-3 border-b border-border-secondary px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-fg">{title}</h2>
          <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
        </div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="text-sm font-semibold text-fg-brand transition-colors hover:text-fg"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Dashboard() {
  const [page, setPage] = useState(1);

  const activeWorkers = useMemo(
    () => WORKERS.filter((worker) => worker.status === "active"),
    [],
  );
  const totalPages = Math.max(1, Math.ceil(activeWorkers.length / PAGE_SIZE));
  const rows = useMemo(
    () => activeWorkers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [activeWorkers, page],
  );

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Tổng quan vận hành</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Theo dõi nhu cầu tuyển từ khách hàng, tình trạng xác thực CTV, lịch làm việc
              và tiến độ thanh toán theo thời gian thực.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Button color="secondary" size="sm" iconLeading={<Download className="size-4" />}>
              Xuất dữ liệu
            </Button>

          </div>
        </div>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric) => (
          <MetricCard
            key={metric.label}
            {...metric}
            changeStyle="text"
            changeLabel="so với tuần trước"
            variant="framed"
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {MODULES.map((module) => (
          <ModuleTile key={module.href} {...module} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.0fr_1.0fr]">
        <SectionCard
          title="Hiring requests cần ưu tiên"
          description="Các nhu cầu tuyển từ khách hàng đang đến hạn và cần tăng tốc fill."
          actionLabel="Xem tất cả"
          actionHref={APP_ROUTES.hiringRequests}
        >
          <div className="flex flex-col gap-4">
            {HIRING_REQUESTS.map((request) => (
              <Link
                key={request.id}
                href={`${APP_ROUTES.hiringRequests}/${request.id.toLowerCase()}`}
                className="rounded-lg border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-fg">{request.role}</span>
                      <Badge color="brand" type="pill-color" size="sm">
                        {request.id}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-fg-tertiary">
                      {request.customer} • {request.city}
                    </p>
                  </div>
                  <div className="text-sm text-fg-tertiary">
                    Deadline: <span className="font-medium text-fg">{request.deadline}</span>
                  </div>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium text-fg-tertiary">Đã fill</p>
                    <p className="mt-1 text-sm font-semibold text-fg">{request.openSlots}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between text-xs text-fg-tertiary">
                      <span>Tiến độ</span>
                      <span>{request.progress}%</span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={request.progress} max={100} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SectionCard>

        <div className="flex flex-col gap-6">
          <SectionCard
            title="Xác thực cần review"
            description="Ưu tiên các worker còn thiếu giấy tờ hoặc có cảnh báo."
            actionLabel="Mở trung tâm xác thực"
            actionHref={APP_ROUTES.workerVerifications}
          >
            <div className="flex flex-col gap-3">
              {VERIFICATION_QUEUE.map((item) => (
                <Link
                  key={item.id}
                  href={`${APP_ROUTES.workerVerifications}/${item.id.toLowerCase()}`}
                  className="rounded-lg border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-warning-bg text-warning-fg">
                      <ShieldAlert className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-fg">{item.name}</p>
                      <p className="mt-1 text-sm text-fg-tertiary">{item.missing}</p>
                      <p className="mt-1 text-xs text-fg-tertiary">Rủi ro: {item.risk}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Batch thanh toán gần nhất"
            description="Tổng hợp các batch đang chờ duyệt hoặc chờ chuyển khoản."
            actionLabel="Xem tất cả batch"
            actionHref={APP_ROUTES.workerPaymentBatches}
          >
            <div className="flex flex-col gap-3">
              {PAYMENT_BATCHES.map((batch) => (
                <Link
                  key={batch.id}
                  href={`${APP_ROUTES.workerPaymentBatches}/${batch.id.toLowerCase()}`}
                  className="rounded-lg border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-fg">{batch.id}</p>
                      <p className="mt-1 text-sm text-fg-tertiary">{batch.period}</p>
                    </div>
                    <Wallet className="size-5 shrink-0 text-fg-brand" />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-fg-tertiary">Workers</p>
                      <p className="mt-1 text-sm font-semibold text-fg">{batch.workers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-fg-tertiary">Tổng tiền</p>
                      <p className="mt-1 text-sm font-semibold text-fg">{batch.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-fg-tertiary">Trạng thái</p>
                      <p className="mt-1 text-sm font-semibold text-fg">{batch.status}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard
        title="CTV hiệu suất cao tuần này"
        description="Danh sách CTV nổi bật để điều phối vào các ca cần độ ổn định cao."
        actionLabel="Mở danh sách CTV"
        actionHref={APP_ROUTES.workers}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm text-fg-tertiary">
            <CheckCircle2 className="size-4 text-fg-success" />
            4 CTV đạt đủ KPI tuần này
          </div>

          <div className="overflow-x-auto">
            <Table aria-label="CTV hiệu suất cao">
              <Table.Header>
                {COLUMNS.map((column) => (
                  <Table.Head
                    key={column.id}
                    id={column.id}
                    label={column.name}
                    {...(column.isRowHeader && { isRowHeader: true })}
                  />
                ))}
              </Table.Header>
              <Table.Body items={rows}>
                {(row) => (
                  <Table.Row id={row.id}>
                    <Table.Cell>
                      <Link
                        href={`${APP_ROUTES.workers}/${row.id}`}
                        className="flex items-center gap-3"
                      >
                        <WorkerAvatar name={row.name} id={row.id} status={row.status} />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-fg">{row.name}</div>
                          <div className="truncate text-sm text-fg-tertiary">{row.phone}</div>
                        </div>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-sm text-fg-secondary">
                        {row.district}, {row.city}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={WORKER_STATUS_LABELS[row.status].color}
                        type="pill-color"
                        size="sm"
                      >
                        {WORKER_STATUS_LABELS[row.status].label}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex min-w-28 flex-col gap-1">
                        <span className="text-xs text-fg-tertiary">{row.totalShifts}/100</span>
                        <ProgressBar value={row.totalShifts} max={100} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-sm font-medium text-fg">★ {row.rating}</span>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-fg-tertiary">
              <Clock3 className="size-4" />
              Đồng bộ lần cuối lúc 09:30 hôm nay
            </div>
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={setPage}
              compact
            />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href={APP_ROUTES.shifts}
          className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs transition-colors hover:bg-bg-secondary"
        >
          <div className="flex items-center gap-3">
            <Clock3 className="size-5 text-fg-brand" />
            <div>
              <p className="text-sm font-semibold text-fg">Lịch làm việc hôm nay</p>
              <p className="text-sm text-fg-tertiary">18 ca cần check-in trong 4 giờ tới.</p>
            </div>
          </div>
        </Link>
        <Link
          href={APP_ROUTES.timesheets}
          className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs transition-colors hover:bg-bg-secondary"
        >
          <div className="flex items-center gap-3">
            <Users className="size-5 text-fg-success" />
            <div>
              <p className="text-sm font-semibold text-fg">Chấm công</p>
              <p className="text-sm text-fg-tertiary">11 worker chưa checkout ở các ca sáng.</p>
            </div>
          </div>
        </Link>
        <Link
          href={APP_ROUTES.reconciliations}
          className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs transition-colors hover:bg-bg-secondary"
        >
          <div className="flex items-center gap-3">
            <Wallet className="size-5 text-warning-fg" />
            <div>
              <p className="text-sm font-semibold text-fg">Đối soát</p>
              <p className="text-sm text-fg-tertiary">3 kỳ đối soát còn chênh lệch cần xử lý.</p>
            </div>
          </div>
        </Link>
      </div>
    </PageScaffold>
  );
}
