"use client";

import { Button, Input, Table, TableCard } from "@mvp-ui/ui";
import { Calendar, Download, Inbox } from "lucide-react";
import { useState } from "react";

const COLUMNS = [
  { id: "worker", name: "Họ tên", isRowHeader: true as const },
  { id: "shift", name: "Ca làm" },
  { id: "in", name: "Giờ vào" },
  { id: "out", name: "Giờ ra" },
  { id: "break", name: "Nghỉ giải lao" },
  { id: "adhoc", name: "Adhoc" },
  { id: "confirmed", name: "Giờ xác nhận" },
  { id: "day-hours", name: "Giờ công ca ngày" },
  { id: "night-hours", name: "Giờ công ca đêm" },
  { id: "day-overtime", name: "Giờ công tăng ca ngày" },
  { id: "night-overtime", name: "Giờ công tăng ca đêm" },
];

export function TimesheetTab() {
  const [month, setMonth] = useState("05-2026");
  const [search, setSearch] = useState("");

  return (
    <TableCard.Root>
      <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid gap-3 md:grid-cols-2 lg:max-w-2xl lg:flex-1">
          <Input
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            placeholder="MM-YYYY"
            iconTrailing={<Calendar className="size-4" />}
            aria-label="Tháng"
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tên, SĐT, Mã CTV"
            aria-label="Tìm bảng công"
          />
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            color="primary"
            size="sm"
            iconLeading={<Download className="size-4" />}
          >
            Tải bảng công
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table aria-label="Bảng công">
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
          <Table.Body items={[]}>{() => <Table.Row id="empty" />}</Table.Body>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl bg-bg-secondary text-fg-tertiary">
          <Inbox className="size-6" />
        </div>
        <p className="text-sm text-fg-tertiary">Trống</p>
      </div>
    </TableCard.Root>
  );
}
