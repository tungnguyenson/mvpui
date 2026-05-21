"use client";

import { Badge, Button, Input, MetricCard, Table, TableCard } from "@mvp-ui/ui";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Lock,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserCog,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PageScaffold } from "../_shell/PageScaffold";
import {
  ROLES,
  type RoleDefinition,
} from "./permissions-data";
import { countMembersByRole } from "../users/users-data";

const COLUMNS = [
  { id: "name", name: "Vai trò", isRowHeader: true as const },
  { id: "description", name: "Mô tả" },
  { id: "members", name: "Thành viên" },
  { id: "permissions", name: "Số quyền" },
  { id: "type", name: "Loại" },
  { id: "detail", name: "" },
];

function RoleRow({ role }: { role: RoleDefinition }) {
  const members = countMembersByRole(role.key);
  return (
    <Table.Row
      id={role.key}
      className="cursor-pointer"
    >
      <Table.Cell>
        <Badge color={role.color} type="pill-color" size="sm">
          {role.name}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <p className="max-w-2xl text-sm text-fg-tertiary">{role.description}</p>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm font-medium text-fg">
          {members > 0 ? `${members} người` : "Chưa có"}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span className="text-sm text-fg-tertiary">
          {role.permissions.length} quyền
        </span>
      </Table.Cell>
      <Table.Cell>
        {role.isSystem ? (
          <Badge color="gray" type="pill-color" size="sm">
            <Lock className="mr-1 inline size-3" /> Hệ thống
          </Badge>
        ) : (
          <Badge color="brand" type="pill-color" size="sm">
            <Sparkles className="mr-1 inline size-3" /> Tùy chỉnh
          </Badge>
        )}
      </Table.Cell>
      <Table.Cell>
        <span
          className="flex items-center justify-end text-fg-tertiary transition-colors group-hover:text-fg"
          aria-hidden
        >
          <ChevronRight className="size-4" />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}

export function RolesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSystem, setShowSystem] = useState(true);

  const filtered = useMemo(() => {
    return ROLES.filter((role) => {
      if (role.key === "super_admin" && !showSystem) return false;
      if (search === "") return true;
      const lower = search.toLowerCase();
      return (
        role.name.toLowerCase().includes(lower) ||
        role.description.toLowerCase().includes(lower)
      );
    });
  }, [search, showSystem]);

  const totalCustom = ROLES.filter((r) => !r.isSystem).length;
  const totalSystem = ROLES.filter((r) => r.isSystem).length;
  const totalAssigned = ROLES.reduce(
    (sum, role) => sum + countMembersByRole(role.key),
    0,
  );

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-fg">Vai trò</h1>
            <p className="max-w-3xl text-base text-fg-tertiary">
              Quản lý vai trò + quyền chi tiết. Mỗi user có thể được gán nhiều vai trò
              cùng lúc; quyền hiệu lực = union mọi vai trò active.
            </p>
          </div>
          <Button color="primary" size="sm" iconLeading={Plus}>
            Tạo vai trò
          </Button>
        </div>
      }
    >
      {/* <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Vai trò hệ thống"
          value={`${totalSystem}`}
          helpText="Mặc định seed, ko xóa được, chỉ đọc trong UI."
          iconChip={<ShieldCheck className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Vai trò tùy chỉnh"
          value={`${totalCustom}`}
          helpText="Vai trò do admin tổ chức tạo ra. Subset của Quản trị viên."
          iconChip={<Sparkles className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
        <MetricCard
          label="Lượt gán hiện tại"
          value={`${totalAssigned}`}
          helpText="Tổng số lượt user được gán vai trò (multi-role tính trùng)."
          iconChip={<UserCog className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
      </div> */}

      <TableCard.Root>
        <div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên vai trò hoặc mô tả"
              iconLeading={<Search className="size-4" />}
              aria-label="Tìm vai trò"
            />
            <label className="flex items-center gap-2 text-sm text-fg-tertiary">
              <input
                type="checkbox"
                checked={showSystem}
                onChange={(event) => setShowSystem(event.target.checked)}
                className="size-4 rounded border-border-secondary text-primary focus:ring-border-brand"
              />
              Hiện vai trò hệ thống
            </label>
          </div>
          <div className="text-sm text-fg-tertiary">
            {filtered.length} vai trò phù hợp với bộ lọc hiện tại.
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            aria-label="Danh sách vai trò"
            onRowAction={(key) => router.push(`/roles/${String(key)}`)}
          >
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
              {(role) => <RoleRow role={role} />}
            </Table.Body>
          </Table>
        </div>
      </TableCard.Root>
    </PageScaffold>
  );
}
