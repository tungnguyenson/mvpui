"use client";

import {
  BadgeWithDot,
  Button,
  ButtonUtility,
  DateRangePicker,
  Input,
  MetricCard,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import { CheckCircle2, ChevronRight, Plus, RefreshCw, Search, Sparkles, Wallet } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  BONUS_STATUS_LABELS,
  BONUSES,
  JOB_CODES,
  MANAGERS,
  formatVnd,
  type BonusStatus,
} from "./bonuses-data";

const PAGE_SIZE = 8;

const STATUS_FILTERS: { id: BonusStatus | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "running", label: "Đang chạy" },
  { id: "ended", label: "Đã kết thúc" },
  { id: "cancelled", label: "Đã hủy" },
  { id: "draft", label: "Nháp" },
];

const COLUMNS = [
  { id: "id", name: "ID", isRowHeader: true as const },
  { id: "title", name: "Tiêu đề" },
  { id: "period", name: "Thời gian" },
  { id: "applied", name: "Đã áp dụng" },
  { id: "status", name: "Trạng thái" },
  { id: "manager", name: "Quản lý" },
  { id: "action", name: "" },
];

export function BonusesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BonusStatus | "all">("all");
  const [manager, setManager] = useState<string | "all">("all");
  const [jobCode, setJobCode] = useState<string | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return BONUSES.filter((bonus) => {
      if (statusFilter !== "all" && bonus.status !== statusFilter) return false;
      if (manager !== "all" && bonus.manager !== manager) return false;
      if (
        jobCode !== "all" &&
        !bonus.jobScope.some((scope) => scope.code === jobCode)
      )
        return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${bonus.id} ${bonus.title} ${bonus.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, statusFilter, manager, jobCode]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  const runningCount = BONUSES.filter((b) => b.status === "running").length;
  const totalBudget = BONUSES.reduce(
    (sum, b) => (b.status === "running" ? sum + b.budgetMax : sum),
    0,
  );
  const totalPaid = BONUSES.reduce((sum, b) => sum + b.paidAmount, 0);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Thưởng Adhoc</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Quản lý các chương trình thưởng adhoc theo công việc & thời gian.
              Theo dõi điều kiện áp dụng, ngân sách và payout thực tế.
            </p>
          </div>
          <Button size="sm" color="primary" iconLeading={<Plus className="size-4" />}>
            Tạo thưởng
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Chương trình đang chạy"
          value={`${runningCount}`}
          helpText="Đang ảnh hưởng đến batch thanh toán hiện tại."
          iconChip={<Sparkles className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Ngân sách tối đa (đang chạy)"
          value={formatVnd(totalBudget)}
          helpText="Tổng chi phí tối đa nếu mọi CTV đạt điều kiện."
          iconChip={<Wallet className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Đã thanh toán (toàn bộ)"
          value={formatVnd(totalPaid)}
          helpText="Số tiền đã thực chi cho CTV qua các batch payout."
          iconChip={<CheckCircle2 className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,1.1fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto]">
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo tiêu đề, ID"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm chương trình thưởng"
            />
            <DateRangePicker
              aria-label="Khoảng thời gian áp dụng"
              size="sm"
            />
            <Select
              aria-label="Trạng thái"
              placeholder="Trạng thái"
              items={STATUS_FILTERS.map((filter) => ({
                id: filter.id,
                label: filter.label,
              }))}
              selectedKey={statusFilter}
              onSelectionChange={(key) => {
                setStatusFilter(key as BonusStatus | "all");
                setPage(1);
              }}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            <Select
              aria-label="Quản lý"
              placeholder="Quản lý"
              items={[{ id: "all", label: "Tất cả quản lý" }].concat(
                MANAGERS.map((m) => ({ id: m, label: m })),
              )}
              selectedKey={manager}
              onSelectionChange={(key) => {
                setManager(String(key));
                setPage(1);
              }}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            <Select
              aria-label="Mã công việc"
              placeholder="Mã công việc"
              items={[{ id: "all", label: "Tất cả mã CV" }].concat(
                JOB_CODES.map((code) => ({ id: code, label: code })),
              )}
              selectedKey={jobCode}
              onSelectionChange={(key) => {
                setJobCode(String(key));
                setPage(1);
              }}
            >
              {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
            </Select>
            <ButtonUtility
              color="tertiary"
              size="sm"
              icon={<RefreshCw className="size-4" />}
              tooltip="Làm mới"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setManager("all");
                setJobCode("all");
                setPage(1);
              }}
            />
          </div>
          <div className="text-sm text-fg-tertiary">
            {filtered.length} chương trình phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách thưởng adhoc">
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
            <Table.Body items={pageItems}>
              {(bonus) => {
                const status = BONUS_STATUS_LABELS[bonus.status];
                return (
                  <Table.Row id={bonus.id}>
                    <Table.Cell>
                      <Link
                        href={`/bonuses/${bonus.id}`}
                        className="text-sm font-medium text-fg-brand hover:underline"
                      >
                        {bonus.id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="max-w-md">
                        <Link
                          href={`/bonuses/${bonus.id}`}
                          className="block truncate text-sm font-medium text-fg hover:text-fg-brand"
                        >
                          {bonus.title}
                        </Link>
                        <div className="truncate text-sm text-fg-tertiary">
                          {bonus.description}
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="text-sm text-fg">{bonus.periodFrom}</div>
                      <div className="text-sm text-fg-tertiary">
                        đến {bonus.periodTo}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="text-sm font-medium text-fg">
                        {bonus.appliedCount} CTV
                      </div>
                      <div className="text-sm text-fg-tertiary">
                        {formatVnd(bonus.appliedAmount)}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <BadgeWithDot color={status.color} type="pill-color" size="sm">
                        {status.label}
                      </BadgeWithDot>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="text-sm text-fg-tertiary">
                        {bonus.manager}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`/bonuses/${bonus.id}`}
                        className="flex items-center justify-end gap-1 text-sm text-fg-brand hover:underline"
                        aria-label={`Mở chi tiết ${bonus.id}`}
                      >
                        Chi tiết
                        <ChevronRight className="size-4" />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                );
              }}
            </Table.Body>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="border-t border-border-secondary px-4 py-3">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </TableCard.Root>
    </PageScaffold>
  );
}
