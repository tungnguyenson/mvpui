"use client";

import {
  Avatar,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  Input,
  Select,
  Table,
  TableCard,
} from "@mvp-ui/ui";
import { Calendar, Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { getAvatarFor, getInitials } from "../_shared";
import {
  SOCIAL_INSURANCE_MONTHS,
  SOCIAL_INSURANCE_RECORDS,
  type SocialInsuranceRecord,
} from "./social-insurance-data";

const VND = new Intl.NumberFormat("vi-VN");

function monthLabel(monthKey: string): string {
  const [, month] = monthKey.split("-");
  return month ? `Thu nhập tháng ${month}` : "Thu nhập tháng";
}

function incomeMonthHeader(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  if (!year || !month) return monthKey;
  return `Tháng ${month}/${year}`;
}

function hoursLabel(monthKey: string): string {
  const [, month] = monthKey.split("-");
  return month ? `Giờ làm tháng ${month}` : "Giờ làm tháng";
}

function shiftsLabel(monthKey: string): string {
  const [, month] = monthKey.split("-");
  return month ? `Số ca tháng ${month}` : "Số ca tháng";
}

function previousMonth(monthKey: string, step: number): string {
  const [yearStr, monthStr] = monthKey.split("-");
  if (!yearStr || !monthStr) return monthKey;
  let year = Number(yearStr);
  let month = Number(monthStr) - step;
  while (month <= 0) {
    month += 12;
    year -= 1;
  }
  return `${year}-${String(month).padStart(2, "0")}`;
}

function formatHours(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface RowProps {
  record: SocialInsuranceRecord;
  onOpen: (record: SocialInsuranceRecord) => void;
}

function SocialInsuranceRow({ record, onOpen }: RowProps) {
  return (
    <Table.Row
      id={record.id}
      onAction={() => onOpen(record)}
      className="cursor-pointer"
    >
      <Table.Cell>
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            size="md"
            src={getAvatarFor(record.fullName, record.id)}
            alt={record.fullName}
            initials={getInitials(record.fullName)}
          />
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="text-sm font-medium text-fg-brand truncate">
              {record.fullName}
            </div>
            <div>
              <div className="text-xs text-muted-fg">#{record.workerCode}</div>
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg whitespace-nowrap">
          {record.region} - {record.registeredAt}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg tabular-nums">
          {formatHours(record.monthlyHours)}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg tabular-nums">{record.monthlyShifts}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg tabular-nums">
          {VND.format(record.incomeCurrent)}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg tabular-nums">
          {VND.format(record.incomePrev1)}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg tabular-nums">
          {VND.format(record.incomePrev2)}
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

interface DetailRowProps {
  label: string;
  children: React.ReactNode;
}

function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="grid grid-cols-[140px_minmax(0,1fr)] gap-3 py-2.5 border-b border-border-secondary last:border-b-0">
      <div className="text-sm text-fg-tertiary">{label}</div>
      <div className="text-sm text-fg wrap-break-word">{children}</div>
    </div>
  );
}

interface DetailDrawerProps {
  record: SocialInsuranceRecord | null;
  month: string;
  isOpen: boolean;
  onClose: () => void;
}

function DetailDrawer({ record, month, isOpen, onClose }: DetailDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      size="lg"
      showCloseButton
      aria-label="Chi tiết cộng tác viên"
    >
      {record ? (
        <>
          <DrawerHeader>
            <div className="flex items-center gap-3">
              <Avatar
                size="lg"
                src={getAvatarFor(record.fullName, record.id)}
                alt={record.fullName}
                initials={getInitials(record.fullName)}
              />
              <div className="flex flex-col gap-1 min-w-0">
                <div className="text-lg font-semibold text-fg truncate">
                  {record.fullName}
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="orange" type="pill-color" size="sm">
                    Mã CTV {record.workerCode}
                  </Badge>
                  <Badge color="blue" type="pill-color" size="sm">
                    {record.gender}
                  </Badge>
                </div>
              </div>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                  Thông tin liên hệ
                </h3>
                <div>
                  <DetailRow label="Số điện thoại">{record.phone}</DetailRow>
                  <DetailRow label="Email">{record.email}</DetailRow>
                  <DetailRow label="Ngày sinh">{record.dob}</DetailRow>
                </div>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                  Căn cước
                </h3>
                <div>
                  <DetailRow label="CCCD">{record.nationalId}</DetailRow>
                  <DetailRow label="Địa chỉ">{record.address}</DetailRow>
                </div>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                  Phân công
                </h3>
                <div>
                  <DetailRow label="Khu vực">{record.region}</DetailRow>
                  <DetailRow label="Ngày đăng ký">{record.registeredAt}</DetailRow>
                </div>
              </section>

              <section className="flex flex-col gap-1">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                  Công + thu nhập {incomeMonthHeader(month)}
                </h3>
                <div>
                  <DetailRow label="Giờ làm">
                    <span className="tabular-nums">
                      {formatHours(record.monthlyHours)}
                    </span>
                  </DetailRow>
                  <DetailRow label="Số ca">
                    <span className="tabular-nums">{record.monthlyShifts}</span>
                  </DetailRow>
                  <DetailRow label={`Thu nhập ${incomeMonthHeader(month)}`}>
                    <span className="tabular-nums font-medium">
                      {VND.format(record.incomeCurrent)} ₫
                    </span>
                  </DetailRow>
                  <DetailRow
                    label={`Thu nhập ${incomeMonthHeader(previousMonth(month, 1))}`}
                  >
                    <span className="tabular-nums">
                      {VND.format(record.incomePrev1)} ₫
                    </span>
                  </DetailRow>
                  <DetailRow
                    label={`Thu nhập ${incomeMonthHeader(previousMonth(month, 2))}`}
                  >
                    <span className="tabular-nums">
                      {VND.format(record.incomePrev2)} ₫
                    </span>
                  </DetailRow>
                </div>
              </section>
            </div>
          </DrawerBody>
        </>
      ) : null}
    </Drawer>
  );
}

export function SocialInsurancePage() {
  const [month, setMonth] = useState<string>(SOCIAL_INSURANCE_MONTHS[0].value);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (search.trim() === "") return SOCIAL_INSURANCE_RECORDS;
    const q = search.toLowerCase().trim();
    return SOCIAL_INSURANCE_RECORDS.filter((r) =>
      [r.fullName, r.phone, r.workerCode, r.nationalId, r.email]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [search]);

  const selected = useMemo(
    () => SOCIAL_INSURANCE_RECORDS.find((r) => r.id === selectedId) ?? null,
    [selectedId],
  );

  const columns = useMemo(
    () => [
      { id: "name", name: "Họ Tên", isRowHeader: true as const },
      { id: "region", name: "Khu vực và ngày" },
      { id: "hours", name: hoursLabel(month) },
      { id: "shifts", name: shiftsLabel(month) },
      { id: "incomeCurrent", name: monthLabel(month) },
      { id: "incomePrev1", name: monthLabel(previousMonth(month, 1)) },
      { id: "incomePrev2", name: monthLabel(previousMonth(month, 2)) },
    ],
    [month],
  );

  return (
    <PageScaffold
      header={
        <AppPageHeader
          title="Quản lý BHXH"
          description="Theo dõi giờ công, số ca và thu nhập 3 tháng gần nhất của cộng tác viên phục vụ kê khai bảo hiểm xã hội. Nhấp vào một dòng để xem chi tiết."
        />
      }
    >
      <TableCard.Root>
        <div className="flex flex-col gap-3 border-b border-border-secondary px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 lg:grid-cols-[160px_minmax(0,1fr)] lg:items-center">
            <Select
              aria-label="Chọn tháng kê khai BHXH"
              size="sm"
              selectedKey={month}
              onSelectionChange={(key) => setMonth(String(key))}
              icon={Calendar}
            >
              {SOCIAL_INSURANCE_MONTHS.map((m) => (
                <Select.Item key={m.value} id={m.value} textValue={m.label}>
                  {m.label}
                </Select.Item>
              ))}
            </Select>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tên, SĐT, Mã CTV, CCCD, Email..."
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm cộng tác viên"
            />
          </div>
          <Button
            color="primary"
            size="sm"
            iconLeading={<Download className="size-4" />}
          >
            Tải xuống
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Quản lý BHXH cộng tác viên">
            <Table.Header>
              {columns.map((column) => (
                <Table.Head
                  key={column.id}
                  id={column.id}
                  label={column.name}
                  {...(column.isRowHeader && { isRowHeader: true })}
                />
              ))}
            </Table.Header>
            <Table.Body items={filtered}>
              {(record) => (
                <SocialInsuranceRow record={record} onOpen={(r) => setSelectedId(r.id)} />
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="border-t border-border-secondary px-4 py-3 text-sm text-fg-tertiary">
          {filtered.length} cộng tác viên phù hợp với bộ lọc.
        </div>
      </TableCard.Root>

      <DetailDrawer
        record={selected}
        month={month}
        isOpen={selectedId !== null}
        onClose={() => setSelectedId(null)}
      />
    </PageScaffold>
  );
}
