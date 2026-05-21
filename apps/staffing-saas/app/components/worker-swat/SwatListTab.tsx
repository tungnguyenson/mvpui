"use client";

import {
  Badge,
  Button,
  Dropdown,
  Input,
  Select,
  SelectItem,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import { FileSignature, Link as LinkIcon, Upload, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { WorkerAvatar } from "../_shared";
import {
  SWAT_CONTRACTS,
  SWAT_CONTRACT_STATUS_LABELS,
  SWAT_CONTRACT_TYPE_LABELS,
  type SwatContractRecord,
  type SwatContractStatus,
  type SwatContractType,
} from "./swat-data";

type StatusFilter = SwatContractStatus | "all";
type TypeFilter = SwatContractType | "all";

const STATUS_OPTIONS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Tất cả trạng thái" },
  { id: "active", label: "Đang hoạt động" },
  { id: "expired", label: "H/Đ đã hoàn thành" },
  { id: "missing", label: "Chưa có hợp đồng" },
];

const TYPE_OPTIONS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "Tất cả loại HĐ" },
  { id: "official", label: "Chính thức" },
  { id: "trial", label: "Thử việc" },
];

const COLUMNS = [
  { id: "worker", name: "Họ tên", isRowHeader: true as const },
  { id: "info", name: "Thông tin" },
  { id: "company", name: "Công ty" },
  { id: "type", name: "Loại hợp đồng" },
  { id: "period", name: "Thời gian" },
  { id: "contract", name: "Hợp đồng" },
  { id: "note", name: "Ghi chú" },
  { id: "actions", name: "" },
];

function ContractCell({ record }: { record: SwatContractRecord }) {
  if (record.contract.fileUrl) {
    return (
      <Button
        color="secondary"
        size="sm"
        iconLeading={<LinkIcon className="size-4" />}
        aria-label="Xem hợp đồng"
      />
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        color="secondary"
        size="sm"
        iconLeading={<Upload className="size-4" />}
        aria-label="Cập nhật hợp đồng"
      />
      <Badge color="error" type="pill-color" size="sm">
        Chưa có
      </Badge>
    </div>
  );
}

function ActionsCell({ record }: { record: SwatContractRecord }) {
  const canRenew = record.contract.status !== "expired";
  const canTerminate = record.contract.status === "active";

  if (!canRenew && !canTerminate) {
    return null;
  }

  return (
    <Dropdown.Root>
      <Dropdown.DotsButton aria-label="Hành động hợp đồng" />
      <Dropdown.Popover className="w-44">
        <Dropdown.Menu>
          {canRenew && (
            <Dropdown.Item label="Ký tiếp H/Đ" icon={FileSignature} />
          )}
          {canTerminate && (
            <Dropdown.Item label="Kết thúc H/Đ" icon={XCircle} />
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

function SwatRow({ record }: { record: SwatContractRecord }) {
  const typeLabel = SWAT_CONTRACT_TYPE_LABELS[record.contract.type];
  const statusLabel = SWAT_CONTRACT_STATUS_LABELS[record.contract.status];
  const showStatusBadge = record.contract.status !== "missing";

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
        <div className="flex flex-col items-start gap-1.5">
          <Badge color={typeLabel.color} type="pill-color" size="sm">
            {typeLabel.label}
          </Badge>
          {showStatusBadge ? (
            <Badge color={statusLabel.color} type="pill-color" size="sm">
              {statusLabel.label}
            </Badge>
          ) : null}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col gap-1 text-sm text-fg">
          <span>{record.contract.startDate}</span>
          <span>{record.contract.endDate}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <ContractCell record={record} />
      </Table.Cell>
      <Table.Cell>
        {record.note ? (
          <div className="flex flex-col gap-1">
            <span className="text-sm text-fg">{record.note.title}</span>
            <span className="text-xs text-fg-tertiary">
              {record.note.timestamp} - {record.note.author}
            </span>
          </div>
        ) : (
          <span className="text-sm text-fg-tertiary">—</span>
        )}
      </Table.Cell>
      <Table.Cell>
        <ActionsCell record={record} />
      </Table.Cell>
    </Table.Row>
  );
}

export function SwatListTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filtered = useMemo(() => {
    return SWAT_CONTRACTS.filter((record) => {
      const matchesSearch =
        search === "" ||
        record.worker.name.toLowerCase().includes(search.toLowerCase()) ||
        record.worker.phone.includes(search);
      const matchesStatus =
        statusFilter === "all" || record.contract.status === statusFilter;
      const matchesType =
        typeFilter === "all" || record.contract.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  return (
    <TableCard.Root>
      <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tên, SĐT, Mã CTV"
            aria-label="Tìm SWAT"
          />
          <Select
            aria-label="Trạng thái HĐ"
            placeholder="Trạng thái HĐ"
            items={STATUS_OPTIONS}
            selectedKey={statusFilter}
            onSelectionChange={(key) => setStatusFilter(key as StatusFilter)}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
          <Select
            aria-label="Loại hợp đồng"
            placeholder="Loại hợp đồng"
            items={TYPE_OPTIONS}
            selectedKey={typeFilter}
            onSelectionChange={(key) => setTypeFilter(key as TypeFilter)}
          >
            {(item) => <SelectItem id={item.id}>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table aria-label="Danh sách SWAT">
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
            {(record) => <SwatRow record={record} />}
          </Table.Body>
        </Table>
      </div>

      <div className="flex items-center justify-end border-t border-border-secondary px-4 py-3 text-sm text-fg-tertiary">
        1-{filtered.length} of {filtered.length} items
      </div>
    </TableCard.Root>
  );
}
