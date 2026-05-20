"use client";

import { Avatar, Badge, Input, MetricCard, Table, TableCard } from "@mvp-ui/ui";
import Link from "next/link";
import { ChevronRight, Mail, Search, UserCheck, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  USERS,
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  type UserRecord,
} from "./users-data";
import { getAvatarFor, getInitials } from "../_shared/assets";

const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hoạt động" },
  { id: "invited", label: "Đã mời" },
  { id: "suspended", label: "Tạm khóa" },
] as const;

const COLUMNS = [
  { id: "user", name: "User", isRowHeader: true as const },
  { id: "role", name: "Vai trò" },
  { id: "region", name: "Khu vực" },
  { id: "lastActive", name: "Hoạt động gần nhất" },
  { id: "status", name: "Trạng thái" },
  { id: "detail", name: "" },
];

function UserRow({ user }: { user: UserRecord }) {
  const status = USER_STATUS_LABELS[user.status];

  return (
    <Table.Row id={user.id}>
      <Table.Cell>
        <Link href={`/users/${user.id}`} className="flex items-center gap-3">
          <Avatar
            size="md"
            src={getAvatarFor(user.fullName, user.id)}
            alt={user.fullName}
            initials={getInitials(user.fullName)}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-fg">{user.fullName}</div>
            <div className="truncate text-sm text-fg-tertiary">{user.email}</div>
          </div>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg">{USER_ROLE_LABELS[user.role]}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{user.region}</div>
      </Table.Cell>
      <Table.Cell>
        <div className="text-sm text-fg-tertiary">{user.lastActiveAt}</div>
      </Table.Cell>
      <Table.Cell>
        <Badge color={status.color} type="pill-color" size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Link
          href={`/users/${user.id}`}
          className="flex items-center justify-end text-fg-tertiary transition-colors hover:text-fg"
          aria-label={`Mở chi tiết ${user.fullName}`}
        >
          <ChevronRight className="size-4" />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    return USERS.filter((user) => {
      const matchesStatus =
        statusFilter === "all" ? true : user.status === statusFilter;
      const matchesSearch =
        search === "" ||
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.region.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const activeCount = USERS.filter((u) => u.status === "active").length;
  const invitedCount = USERS.filter((u) => u.status === "invited").length;
  const operationsCount = USERS.filter((u) => u.role === "operations").length;

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-fg">User</h1>
          <p className="max-w-3xl text-base text-fg-tertiary">
            Quản lý internal users vận hành hệ thống staffing, theo dõi quyền hạn, khu
            vực phụ trách và hoạt động gần đây.
          </p>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="User đang hoạt động"
          value={`${activeCount}`}
          helpText="Tài khoản nội bộ đang vận hành hệ thống mỗi ngày."
          iconChip={<UserCheck className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Đang chờ kích hoạt"
          value={`${invitedCount}`}
          helpText="User đã được mời nhưng chưa xác nhận đăng nhập."
          iconChip={<Mail className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Điều phối viên"
          value={`${operationsCount}`}
          helpText="User chịu trách nhiệm điều phối ca và worker theo khu vực."
          iconChip={<UsersRound className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
      </div>

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên, email hoặc khu vực"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm user"
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
            {filtered.length} user phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Danh sách internal users">
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
              {(user) => <UserRow user={user} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
