"use client";

import { Badge, Input, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Gift, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "./PageScaffold";
import {
  REWARD_RULES,
  RULE_KIND_LABELS,
  RULE_STATUS_LABELS,
  type RewardRuleRecord,
} from "./reward-rules-data";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang áp dụng" },
  { id: "paused", label: "Tạm dừng" },
  { id: "draft", label: "Nháp" },
] as const;

const COLUMNS = [
  { id: "rule", name: "Rule", isRowHeader: true as const },
  { id: "kind", name: "Loại" },
  { id: "amount", name: "Mức thưởng" },
  { id: "effective", name: "Hiệu lực" },
  { id: "owner", name: "Phụ trách" },
  { id: "status", name: "Trạng thái" },
  { id: "detail", name: "" },
];

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm font-medium text-fg-tertiary">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-fg">{value}</p>
      <p className="mt-2 text-sm text-fg-tertiary">{description}</p>
    </div>
  );
}

function RuleRow({ rule }: { rule: RewardRuleRecord }) {
  const status = RULE_STATUS_LABELS[rule.status];

  return (
    <Table.Row id={rule.id}>
      <Table.Cell>
        <Link href={`/reward-rules/${rule.id}`} className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
            <Gift className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{rule.name}</div>
            <div className="truncate text-sm text-fg-tertiary">{rule.code}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{RULE_KIND_LABELS[rule.kind]}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm font-medium text-fg">{rule.amount}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">
          {rule.effectiveFrom} → {rule.effectiveTo}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{rule.owner}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/reward-rules/${rule.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${rule.code}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function RewardRulesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return REWARD_RULES.filter((rule) => {
      const matchesStatus =
        statusFilter === "all" ? true : rule.status === statusFilter;
      const matchesSearch =
        search === "" ||
        rule.name.toLowerCase().includes(search.toLowerCase()) ||
        rule.code.toLowerCase().includes(search.toLowerCase()) ||
        rule.description.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const activeCount = REWARD_RULES.filter((r) => r.status === "active").length;
  const pausedCount = REWARD_RULES.filter((r) => r.status === "paused").length;
  const totalEligible = REWARD_RULES.reduce(
    (sum, rule) => sum + rule.eligibleGroups.reduce((s, g) => s + g.size, 0),
    0,
  );

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">Thưởng</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Quản lý các reward rules áp dụng cho worker, theo dõi điều kiện áp dụng, đối
            tượng eligible và mức chi trả thực tế.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <SummaryCard
          label="Rule đang áp dụng"
          value={`${activeCount}`}
          description="Các quy tắc thưởng đang ảnh hưởng đến batch thanh toán hiện tại."
        />
        <SummaryCard
          label="Rule tạm dừng"
          value={`${pausedCount}`}
          description="Đang chờ cập nhật ngân sách hoặc điều chỉnh điều kiện áp dụng."
        />
        <SummaryCard
          label="Worker eligible"
          value={`${totalEligible}`}
          description="Tổng số worker có thể nhận thưởng nếu thoả mãn điều kiện."
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên hoặc mã rule"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm rule thưởng"
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const active = filter.id === statusFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    className={`rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-border-brand bg-bg-secondary text-fg"
                        : "border-border-secondary bg-bg text-fg-tertiary hover:text-fg"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-sm text-fg-tertiary">
            {filtered.length} rule phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách reward rules">
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
            <Table.Body items={filtered}>
              {(rule) => <RuleRow rule={rule} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
