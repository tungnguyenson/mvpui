"use client";

import {
  Button,
  Input,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import { Download, Inbox, Upload } from "lucide-react";
import { useState } from "react";

const COLUMNS = [
  { id: "worker", name: "Họ tên", isRowHeader: true as const },
  { id: "info", name: "Thông tin" },
  { id: "contract", name: "Loại Hợp đồng" },
  { id: "recent", name: "Lương 3 tháng gần nhất" },
  { id: "all", name: "Tất cả bảng lương" },
];

export function PayslipTab() {
  const [search, setSearch] = useState("");

  return (
    <TableCard.Root>
      <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Tên, SĐT, Mã CTV"
          aria-label="Tìm phiếu lương"
          className="lg:max-w-xs"
        />
        <div className="flex shrink-0 items-center gap-3">
          <Button
            color="primary"
            size="sm"
            iconLeading={<Upload className="size-4" />}
          >
            Tải lên bảng lương
          </Button>
          <Button
            color="secondary"
            size="sm"
            iconLeading={<Download className="size-4" />}
          >
            Tải xuống D/S TKNH
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table aria-label="Danh sách phiếu lương">
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
