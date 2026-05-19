import {
  Badge,
  Button,
  ButtonUtility,
  Dropdown,
  Input,
  Pagination,
  ProgressBar,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import {
  Filter,
  MoreVertical,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Sparkline                                                                  */
/* -------------------------------------------------------------------------- */

function Sparkline({
  points,
  color,
}: {
  points: [number, number][];
  color: "success" | "error";
}) {
  const W = 300;
  const H = 56;
  const PAD = 4;

  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (x: number) =>
    PAD + ((x - minX) / (maxX - minX || 1)) * (W - PAD * 2);
  const scaleY = (y: number) =>
    H - PAD - ((y - minY) / (maxY - minY || 1)) * (H - PAD * 2);

  const scaled = points.map(([x, y]) => [scaleX(x), scaleY(y)] as [number, number]);
  const first = scaled[0];
  if (!first) return null;

  let d = `M ${first[0]},${first[1]}`;
  for (let i = 1; i < scaled.length; i++) {
    const prev = scaled[i - 1];
    const curr = scaled[i];
    if (!prev || !curr) continue;
    const cpx = (prev[0] + curr[0]) / 2;
    d += ` C ${cpx},${prev[1]} ${cpx},${curr[1]} ${curr[0]},${curr[1]}`;
  }

  const last = scaled.at(-1);
  if (!last) return null;
  const areaD = `${d} L ${last[0]},${H} L ${first[0]},${H} Z`;
  const tone = color === "success" ? "#16a34a" : "#dc2626";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-14 w-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d={areaD} fill={tone} opacity={0.08} />
      <path d={d} fill="none" stroke={tone} strokeWidth="1.5" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  spark: [number, number][];
}

const METRICS: Metric[] = [
  {
    label: "Ca đang mở",
    value: "128",
    change: "12%",
    trend: "up",
    spark: [
      [0, 8], [1, 12], [2, 10], [3, 15], [4, 13], [5, 18],
      [6, 16], [7, 20], [8, 18], [9, 24], [10, 22], [11, 28],
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
    label: "Đơn chờ xác thực",
    value: "27",
    change: "5%",
    trend: "down",
    spark: [
      [0, 30], [1, 27], [2, 29], [3, 24], [4, 26], [5, 21],
      [6, 23], [7, 18], [8, 20], [9, 16], [10, 18], [11, 12],
    ],
  },
];

type StatusKey = "active" | "pending" | "locked";

const STATUS: Record<StatusKey, { color: "success" | "warning" | "error"; label: string }> = {
  active: { color: "success", label: "Đang hoạt động" },
  pending: { color: "warning", label: "Chờ duyệt" },
  locked: { color: "error", label: "Tạm khóa" },
};

interface Ctv {
  id: number;
  name: string;
  phone: string;
  area: string;
  status: StatusKey;
  shifts: number;
  rating: string;
}

const CTVS: Ctv[] = [
  { id: 1, name: "Nguyễn Văn An", phone: "0901 234 567", area: "Quận 1, TP.HCM", status: "active", shifts: 86, rating: "4.9" },
  { id: 2, name: "Trần Thị Bích", phone: "0902 345 678", area: "Cầu Giấy, Hà Nội", status: "active", shifts: 72, rating: "4.8" },
  { id: 3, name: "Lê Hoàng Cường", phone: "0903 456 789", area: "Hải Châu, Đà Nẵng", status: "pending", shifts: 40, rating: "4.5" },
  { id: 4, name: "Phạm Thu Dung", phone: "0904 567 890", area: "Ninh Kiều, Cần Thơ", status: "active", shifts: 91, rating: "5.0" },
  { id: 5, name: "Vũ Minh Đức", phone: "0905 678 901", area: "Thủ Đức, TP.HCM", status: "locked", shifts: 18, rating: "3.9" },
  { id: 6, name: "Đặng Thị Hoa", phone: "0906 789 012", area: "Lê Chân, Hải Phòng", status: "pending", shifts: 33, rating: "4.4" },
  { id: 7, name: "Bùi Quốc Khánh", phone: "0907 890 123", area: "Tân Bình, TP.HCM", status: "active", shifts: 64, rating: "4.7" },
];

const PAGE_SIZE = 7;

const COLUMNS = [
  { id: "ctv", name: "Cộng tác viên", isRowHeader: true as const },
  { id: "area", name: "Khu vực" },
  { id: "status", name: "Trạng thái" },
  { id: "shifts", name: "Ca tuần này" },
  { id: "rating", name: "Đánh giá" },
  { id: "actions", name: "" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/* -------------------------------------------------------------------------- */
/*  Metric card                                                                */
/* -------------------------------------------------------------------------- */

function MetricCard({ label, value, change, trend, spark }: Metric) {
  return (
    <div className="flex min-w-64 flex-1 flex-col overflow-hidden rounded-xl border border-border-secondary bg-bg-secondary shadow-xs">
      <div className="px-5 pt-3 pb-2">
        <span className="text-sm font-semibold text-fg">{label}</span>
      </div>
      <div className="relative m-0 flex flex-col gap-5 rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[30px] font-semibold leading-9.5 text-fg">{value}</span>
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-fg-success" : "text-fg-error"}`}
            >
              {trend === "up" ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
              {change}
            </span>
            <span className="text-sm font-medium text-fg-tertiary">so với tuần trước</span>
          </div>
        </div>
        <Sparkline points={spark} color={trend === "up" ? "success" : "error"} />
        <button
          type="button"
          className="absolute top-4.75 right-4.75 flex size-5 items-center justify-center text-fg-tertiary transition-colors hover:text-fg"
          aria-label="Tùy chọn"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set<number>());

  const filtered = CTVS.filter(
    (c) =>
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8 px-4 py-8 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold text-fg">Tổng quan</h1>
          <p className="text-base text-fg-tertiary">
            Theo dõi ca làm việc, cộng tác viên và doanh thu theo thời gian thực.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={<Upload className="size-4" />}>
            Nhập
          </Button>
          <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
            Thêm CTV
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-5 sm:flex-row">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Table */}
      <TableCard.Root>
        <div className="flex flex-col gap-3 border-b border-border-secondary px-4 py-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <Input
              placeholder="Tìm theo tên hoặc số điện thoại"
              iconLeading={<Search className="size-4" />}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label="Tìm cộng tác viên"
            />
          </div>
          <ButtonUtility
            size="sm"
            color="secondary"
            icon={<Filter className="size-4" />}
            aria-label="Lọc"
          />
        </div>

        <div className="overflow-x-auto">
          <Table
            aria-label="Cộng tác viên"
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={(keys) => {
              if (keys === "all") {
                setSelected(new Set(rows.map((r) => r.id)));
              } else {
                setSelected(keys as Set<number>);
              }
            }}
          >
            <Table.Header>
              {COLUMNS.map((col) => (
                <Table.Head
                  key={col.id}
                  id={col.id}
                  label={col.name}
                  {...(col.isRowHeader && { isRowHeader: true })}
                />
              ))}
            </Table.Header>
            <Table.Body items={rows}>
              {(row) => (
                <Table.Row id={row.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg select-none">
                        {initials(row.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-fg">{row.name}</div>
                        <div className="truncate text-sm text-fg-tertiary">{row.phone}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm text-fg-secondary">{row.area}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={STATUS[row.status].color} type="pill-color" size="sm">
                      {STATUS[row.status].label}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex min-w-28 flex-col gap-1">
                      <span className="text-xs text-fg-tertiary">{row.shifts}/100</span>
                      <ProgressBar value={row.shifts} max={100} />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-sm font-medium text-fg">★ {row.rating}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown.Root>
                      <Dropdown.DotsButton aria-label={`Thao tác cho ${row.name}`} />
                      <Dropdown.Popover>
                        <Dropdown.Menu>
                          <Dropdown.Item id="view">Xem hồ sơ</Dropdown.Item>
                          <Dropdown.Item id="edit">Chỉnh sửa</Dropdown.Item>
                          <Dropdown.Item id="lock">Tạm khóa</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown.Root>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-border-secondary px-4 py-3">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
            compact
          />
        </div>
      </TableCard.Root>
    </div>
  );
}
