"use client";

import { Badge, Checkbox } from "@mvp-ui/ui";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ACTION_LABELS,
  GROUP_LABELS,
  RESOURCES,
  type ActionKey,
  type Permission,
  type ResourceMeta,
} from "./permissions-data";

const ACTION_COLUMNS: ActionKey[] = [
  "view",
  "create",
  "edit",
  "delete",
  "approve",
  "assign",
  "export",
];

export interface PermissionMatrixProps {
  selected: Set<Permission>;
  onChange: (next: Set<Permission>) => void;
  readOnly?: boolean;
  lockedPermissions?: Set<Permission>;
  lockedReason?: (perm: Permission) => string | undefined;
}

interface GroupedResources {
  group: ResourceMeta["group"];
  resources: ResourceMeta[];
}

function groupResources(): GroupedResources[] {
  const map = new Map<ResourceMeta["group"], ResourceMeta[]>();
  for (const resource of RESOURCES) {
    const arr = map.get(resource.group) ?? [];
    arr.push(resource);
    map.set(resource.group, arr);
  }
  return Array.from(map.entries()).map(([group, resources]) => ({
    group,
    resources,
  }));
}

function tristate(
  selected: Set<Permission>,
  permissions: Permission[],
): "all" | "none" | "partial" {
  const granted = permissions.filter((p) => selected.has(p)).length;
  if (granted === 0) return "none";
  if (granted === permissions.length) return "all";
  return "partial";
}

function countGranted(
  selected: Set<Permission>,
  permissions: Permission[],
): number {
  return permissions.filter((p) => selected.has(p)).length;
}

function CenteredCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center">{children}</div>
  );
}

export function PermissionMatrix({
  selected,
  onChange,
  readOnly = false,
  lockedPermissions,
  lockedReason,
}: PermissionMatrixProps) {
  const grouped = useMemo(groupResources, []);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());

  const toggleCollapse = (group: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const expandAll = () => setCollapsed(new Set());
  const collapseAll = () =>
    setCollapsed(new Set(grouped.map((g) => g.group)));

  const toggleOne = (perm: Permission) => {
    if (readOnly) return;
    if (lockedPermissions?.has(perm)) return;
    const next = new Set(selected);
    if (next.has(perm)) {
      next.delete(perm);
    } else {
      next.add(perm);
    }
    onChange(next);
  };

  const toggleResourceRow = (resource: ResourceMeta) => {
    if (readOnly) return;
    const perms = resource.actions.map(
      (a) => `${resource.key}:${a}` as Permission,
    );
    const editable = perms.filter((p) => !lockedPermissions?.has(p));
    const next = new Set(selected);
    const state = tristate(selected, editable);
    if (state === "all") {
      for (const p of editable) next.delete(p);
    } else {
      for (const p of editable) next.add(p);
    }
    onChange(next);
  };

  const toggleActionColumn = (action: ActionKey) => {
    if (readOnly) return;
    const perms = RESOURCES.filter((r) => r.actions.includes(action)).map(
      (r) => `${r.key}:${action}` as Permission,
    );
    const editable = perms.filter((p) => !lockedPermissions?.has(p));
    const next = new Set(selected);
    const state = tristate(selected, editable);
    if (state === "all") {
      for (const p of editable) next.delete(p);
    } else {
      for (const p of editable) next.add(p);
    }
    onChange(next);
  };

  const toggleGroup = (group: GroupedResources) => {
    if (readOnly) return;
    const perms = group.resources.flatMap((r) =>
      r.actions.map((a) => `${r.key}:${a}` as Permission),
    );
    const editable = perms.filter((p) => !lockedPermissions?.has(p));
    const next = new Set(selected);
    const state = tristate(selected, editable);
    if (state === "all") {
      for (const p of editable) next.delete(p);
    } else {
      for (const p of editable) next.add(p);
    }
    onChange(next);
  };

  const someCollapsed = collapsed.size > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-fg-tertiary">
          Click chevron để mở rộng / thu gọn nhóm. Cột <strong>TẤT CẢ</strong> bật cả
          hàng / nhóm. Click header cột để bật cả cột.
        </p>
        <button
          type="button"
          onClick={someCollapsed ? expandAll : collapseAll}
          className="text-xs font-medium text-fg-brand hover:underline"
        >
          {someCollapsed ? "Mở rộng tất cả" : "Thu gọn tất cả"}
        </button>
      </div>

      <div className="overflow-auto rounded-xl border border-border-secondary bg-bg">
        <table className="w-full min-w-3xl border-collapse text-sm">
          <thead>
            <tr className="sticky top-0 z-20 bg-bg-secondary">
              <th
                scope="col"
                className="sticky left-0 z-30 w-72 border-b border-r border-border-secondary bg-bg-secondary px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-fg-tertiary"
              >
                Tài nguyên
              </th>
              <th
                scope="col"
                className="border-b border-r border-border-secondary px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-fg-tertiary"
              >
                Tất cả
              </th>
              {ACTION_COLUMNS.map((action) => (
                <th
                  key={action}
                  scope="col"
                  className="border-b border-border-secondary px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-fg-tertiary"
                >
                  <button
                    type="button"
                    onClick={() => toggleActionColumn(action)}
                    disabled={readOnly}
                    className="rounded px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-fg-tertiary hover:bg-bg disabled:cursor-default disabled:hover:bg-transparent"
                    title={`Bật/tắt cột ${ACTION_LABELS[action]}`}
                  >
                    {ACTION_LABELS[action]}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grouped.map((group, index) => (
              <GroupSection
                key={group.group}
                group={group}
                isFirst={index === 0}
                isCollapsed={collapsed.has(group.group)}
                onToggleCollapse={() => toggleCollapse(group.group)}
                selected={selected}
                onToggleGroup={() => toggleGroup(group)}
                onToggleOne={toggleOne}
                onToggleResource={toggleResourceRow}
                readOnly={readOnly}
                lockedPermissions={lockedPermissions}
                lockedReason={lockedReason}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface GroupSectionProps {
  group: GroupedResources;
  isFirst: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleGroup: () => void;
  selected: Set<Permission>;
  onToggleOne: (perm: Permission) => void;
  onToggleResource: (resource: ResourceMeta) => void;
  readOnly: boolean;
  lockedPermissions: Set<Permission> | undefined;
  lockedReason: ((perm: Permission) => string | undefined) | undefined;
}

function GroupSection({
  group,
  isFirst,
  isCollapsed,
  onToggleCollapse,
  onToggleGroup,
  selected,
  onToggleOne,
  onToggleResource,
  readOnly,
  lockedPermissions,
  lockedReason,
}: GroupSectionProps) {
  const groupPerms = group.resources.flatMap((r) =>
    r.actions.map((a) => `${r.key}:${a}` as Permission),
  );
  const groupState = tristate(selected, groupPerms);
  const granted = countGranted(selected, groupPerms);
  const total = groupPerms.length;
  const ChevronIcon = isCollapsed ? ChevronRight : ChevronDown;
  const totalColumns = ACTION_COLUMNS.length + 2;

  return (
    <>
      <tr
        className={`bg-bg-secondary ${isFirst ? "" : "border-t-4 border-bg"}`}
      >
        <th
          scope="col"
          className="sticky left-0 z-10 border-r border-border-secondary bg-bg-secondary px-3 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="flex size-6 items-center justify-center rounded text-fg-tertiary hover:bg-bg hover:text-fg"
              aria-label={
                isCollapsed
                  ? `Mở nhóm ${GROUP_LABELS[group.group]}`
                  : `Thu gọn nhóm ${GROUP_LABELS[group.group]}`
              }
              aria-expanded={!isCollapsed}
            >
              <ChevronIcon className="size-4" />
            </button>
            <span className="text-base font-bold uppercase tracking-wider text-fg">
              {GROUP_LABELS[group.group]}
            </span>
            <span className="ml-auto">
              <Badge
                color={
                  granted === 0
                    ? "gray"
                    : granted === total
                      ? "success"
                      : "warning"
                }
                type="pill-color"
                size="sm"
              >
                {granted} / {total} quyền
              </Badge>
            </span>
          </div>
        </th>
        <td className="border-r border-border-secondary bg-bg-secondary px-2 py-3">
          <CenteredCell>
            <Checkbox
              isSelected={groupState === "all"}
              isIndeterminate={groupState === "partial"}
              isDisabled={readOnly}
              onChange={onToggleGroup}
              size="sm"
              aria-label={`Bật/tắt toàn bộ ${GROUP_LABELS[group.group]}`}
            />
          </CenteredCell>
        </td>
        <td
          colSpan={totalColumns - 2}
          className="bg-bg-secondary"
          aria-hidden
        />
      </tr>

      {isCollapsed
        ? null
        : group.resources.map((resource, resourceIndex) => {
            const rowPerms = resource.actions.map(
              (a) => `${resource.key}:${a}` as Permission,
            );
            const rowState = tristate(selected, rowPerms);
            const rowGranted = countGranted(selected, rowPerms);
            const isLast = resourceIndex === group.resources.length - 1;

            return (
              <tr
                key={resource.key}
                className={`group hover:bg-bg-secondary/40 ${
                  isLast ? "" : "border-b border-border-secondary"
                }`}
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-r border-border-secondary bg-bg px-3 py-3 text-left group-hover:bg-bg-secondary/40"
                >
                  <div className="flex items-center gap-2 pl-9">
                    <button
                      type="button"
                      onClick={() => onToggleResource(resource)}
                      disabled={readOnly}
                      className="text-left text-sm font-normal text-fg hover:text-fg-brand disabled:cursor-default disabled:hover:text-fg"
                    >
                      {resource.label}
                    </button>
                    {rowGranted > 0 ? (
                      <span className="ml-auto text-xs text-fg-tertiary">
                        {rowGranted}/{resource.actions.length}
                      </span>
                    ) : null}
                  </div>
                </th>
                <td className="border-r border-border-secondary px-2 py-3">
                  <CenteredCell>
                    <Checkbox
                      isSelected={rowState === "all"}
                      isIndeterminate={rowState === "partial"}
                      isDisabled={readOnly}
                      onChange={() => onToggleResource(resource)}
                      size="sm"
                      aria-label={`Bật/tắt toàn bộ ${resource.label}`}
                    />
                  </CenteredCell>
                </td>
                {ACTION_COLUMNS.map((action) => {
                  if (!resource.actions.includes(action)) {
                    return (
                      <td
                        key={action}
                        className="px-2 py-3 text-center text-fg-tertiary"
                        aria-label="Không áp dụng"
                      >
                        —
                      </td>
                    );
                  }
                  const perm = `${resource.key}:${action}` as Permission;
                  const isChecked = selected.has(perm);
                  const isLocked = lockedPermissions?.has(perm) ?? false;
                  const reason = isLocked ? lockedReason?.(perm) : undefined;
                  return (
                    <td
                      key={action}
                      className="px-2 py-3"
                      title={reason}
                    >
                      <CenteredCell>
                        <Checkbox
                          isSelected={isChecked}
                          isDisabled={readOnly || isLocked}
                          onChange={() => onToggleOne(perm)}
                          size="sm"
                          aria-label={`Cho phép ${ACTION_LABELS[action]} ${resource.label}`}
                        />
                      </CenteredCell>
                    </td>
                  );
                })}
              </tr>
            );
          })}
    </>
  );
}
