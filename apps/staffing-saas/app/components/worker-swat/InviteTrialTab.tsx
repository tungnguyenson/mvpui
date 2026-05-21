"use client";

import {
  Badge,
  Dropdown,
  Input,
  Tab,
  TabList,
  Table,
  TableCard,
  Tabs,
} from "@mvp-ui/ui";
import { Check, PhoneOff, X } from "lucide-react";
import { useMemo, useState } from "react";
import { WorkerAvatar } from "../_shared";
import {
  INVITES,
  type InviteRecord,
  type InviteStatus,
} from "./invite-data";

type TabId = InviteStatus | "all";

const TABS: { id: TabId; label: string }[] = [
  { id: "pending", label: "Chờ xử lý" },
  { id: "approved", label: "Đồng ý" },
  { id: "rejected", label: "Từ chối" },
  { id: "unreachable", label: "Không LH được" },
  { id: "all", label: "Tất cả" },
];

const COLUMNS = [
  { id: "worker", name: "Họ tên", isRowHeader: true as const },
  { id: "info", name: "Thông tin" },
  { id: "company", name: "Công ty" },
  { id: "hours", name: "Tổng giờ công" },
  { id: "income", name: "Tổng thu nhập" },
  { id: "note", name: "Ghi chú" },
  { id: "actions", name: "" },
];

const CURRENCY_FORMATTER = new Intl.NumberFormat("vi-VN");

function InviteRow({ record }: { record: InviteRecord }) {
  return (
    <Table.Row id={record.id}>
      <Table.Cell>
        <button
          type="button"
          className="flex items-center gap-3 text-left"
        >
          <WorkerAvatar name={record.worker.name} id={record.id} size="md" />
          <span className="text-sm font-medium text-fg-warning hover:underline">
            {record.worker.name}
          </span>
        </button>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col items-start gap-1.5">
          <Badge color="sky" type="pill-color" size="sm">
            {record.worker.phone}
          </Badge>
          <Badge color="gray" type="pill-color" size="sm">
            {record.worker.dob}
          </Badge>
          <Badge color="gray" type="pill-color" size="sm">
            {record.worker.gender} - {record.worker.age} tuổi
          </Badge>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col items-start gap-1.5">
          <Badge color="gray" type="pill-color" size="sm">
            {record.company.name}
          </Badge>
          <Badge color="gray" type="pill-color" size="sm">
            {record.company.city}
          </Badge>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-fg">
            {record.totalHours.hours.toFixed(2)} giờ
          </span>
          <span className="text-fg-tertiary">{record.totalHours.period}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col gap-1 text-sm">
          <span className="text-fg">
            {CURRENCY_FORMATTER.format(record.totalIncome.amount)}
          </span>
          <span className="text-fg-tertiary">{record.totalIncome.period}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-fg-tertiary">
          {record.note ?? "Chưa có ghi chú"}
        </span>
      </Table.Cell>
      <Table.Cell>
        <Dropdown.Root>
          <Dropdown.DotsButton aria-label="Hành động lời mời" />
          <Dropdown.Popover className="w-44">
            <Dropdown.Menu>
              <Dropdown.Item label="Đồng ý" icon={Check} />
              <Dropdown.Item label="Từ chối" icon={X} />
              <Dropdown.Item label="Không LH được" icon={PhoneOff} />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </Table.Cell>
    </Table.Row>
  );
}

export function InviteTrialTab() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabId>("pending");

  const filtered = useMemo(() => {
    return INVITES.filter((record) => {
      const matchesTab = tab === "all" || record.status === tab;
      const matchesSearch =
        search === "" ||
        record.worker.name.toLowerCase().includes(search.toLowerCase()) ||
        record.worker.phone.includes(search);
      return matchesTab && matchesSearch;
    });
  }, [search, tab]);

  const counts = useMemo(() => {
    const base: Record<InviteStatus, number> = {
      pending: 0,
      approved: 0,
      rejected: 0,
      unreachable: 0,
    };
    for (const i of INVITES) base[i.status] += 1;
    return { ...base, all: INVITES.length };
  }, []);

  return (
    <TableCard.Root>
      <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
        <Tabs
          variant="pill"
          size="md"
          selectedKey={tab}
          onSelectionChange={(key) => setTab(key as TabId)}
          className="-mx-4 -mb-4 px-4"
        >
          <TabList aria-label="Lọc lời mời theo trạng thái">
            {TABS.map((t) => (
              <Tab key={t.id} id={t.id} value={counts[t.id]}>
                {t.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>

        <div className="grid gap-3 mt-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tên, SĐT, Mã CTV"
            aria-label="Tìm lời mời"
          />
          <div className="flex items-center text-sm text-fg-tertiary">
            {filtered.length} lời mời phù hợp.
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table key={tab} aria-label="Danh sách mời thử việc">
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
            {(record) => <InviteRow record={record} />}
          </Table.Body>
        </Table>
      </div>
    </TableCard.Root>
  );
}
