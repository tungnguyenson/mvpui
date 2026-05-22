"use client";

import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  MetricCard,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Lock,
  ShieldCheck,
  Sparkles,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import {
  ACTION_LABELS,
  ROLE_BY_KEY,
  SPECIAL_PERMISSIONS,
  type Permission,
  type RoleKey,
  type SpecialPermission,
} from "./permissions-data";
import { PermissionMatrix } from "./PermissionMatrix";
import { permissionDiff } from "./permission-helpers";
import { getUsersByRole, USERS } from "../users/users-data";
import { getAvatarFor, getInitials } from "../_shared/assets";

const SPECIAL_KEYS = new Set<Permission>(
  SPECIAL_PERMISSIONS.map((p) => p.key as Permission),
);

interface RoleDetailPageProps {
  roleKey: string;
}

const TAB_DEFS = [
  { id: "permissions", label: "Quyền" },
  { id: "members", label: "Thành viên" },
  { id: "special", label: "Quyền đặc biệt" },
] as const;

export function RoleDetailPage({ roleKey }: RoleDetailPageProps) {
  const role = ROLE_BY_KEY[roleKey as RoleKey];
  if (!role) notFound();

  const originalMatrix = useMemo(
    () => new Set(role.permissions.filter((p) => !SPECIAL_KEYS.has(p))),
    [role],
  );
  const originalSpecial = useMemo(
    () => new Set(role.permissions.filter((p) => SPECIAL_KEYS.has(p))),
    [role],
  );

  const [selectedMatrix, setSelectedMatrix] = useState<Set<Permission>>(
    () => new Set(originalMatrix),
  );
  const [selectedSpecial, setSelectedSpecial] = useState<Set<Permission>>(
    () => new Set(originalSpecial),
  );
  const [showDiff, setShowDiff] = useState(false);

  const matrixDiff = useMemo(
    () =>
      permissionDiff(
        Array.from(originalMatrix),
        Array.from(selectedMatrix),
      ),
    [originalMatrix, selectedMatrix],
  );
  const specialDiff = useMemo(
    () =>
      permissionDiff(
        Array.from(originalSpecial),
        Array.from(selectedSpecial),
      ),
    [originalSpecial, selectedSpecial],
  );

  const isDirty =
    matrixDiff.added.length > 0 ||
    matrixDiff.removed.length > 0 ||
    specialDiff.added.length > 0 ||
    specialDiff.removed.length > 0;

  const members = getUsersByRole(role.key);
  const eligibleNewMembers = USERS.filter(
    (u) => !u.roleKeys.includes(role.key),
  );

  const handleReset = () => {
    setSelectedMatrix(new Set(originalMatrix));
    setSelectedSpecial(new Set(originalSpecial));
    setShowDiff(false);
  };

  const handleSave = () => {
    setShowDiff(true);
  };

  return (
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Vai trò", href: "/roles" },
            { label: role.name },
          ]}
          actions={
            <>
              <Link href="/roles">
                <Button color="secondary" size="sm">
                  Quay lại
                </Button>
              </Link>
              <Button
                color="secondary"
                size="sm"
                disabled={!isDirty}
                onClick={handleReset}
              >
                Hủy thay đổi
              </Button>
              <Button
                color="primary"
                size="sm"
                disabled={!isDirty}
                onClick={handleSave}
              >
                Lưu thay đổi
              </Button>
            </>
          }
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-bg-secondary p-3">
              <ShieldCheck className="size-6 text-fg-brand" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-fg">{role.name}</h1>
                <Badge color={role.color} type="pill-color" size="sm">
                  {role.key}
                </Badge>
                {role.isSystem ? (
                  <Badge color="gray" type="pill-color" size="sm">
                    <Lock className="mr-1 inline size-3" /> Hệ thống
                  </Badge>
                ) : (
                  <Badge color="brand" type="pill-color" size="sm">
                    <Sparkles className="mr-1 inline size-3" /> Tùy chỉnh
                  </Badge>
                )}
              </div>
              <p className="mt-2 max-w-3xl text-base text-fg-tertiary">
                {role.description}
              </p>
            </div>
          </div>
        </AppPageHeader>
      }
    >
      {/* <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Thành viên"
          value={`${members.length}`}
          helpText="User đang gắn vai trò này."
          iconChip={<Users className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Quyền resource"
          value={`${selectedMatrix.size}`}
          helpText="Tổng số ô resource × action đang bật."
          iconChip={<Check className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
        <MetricCard
          label="Quyền đặc biệt"
          value={`${selectedSpecial.size}/${SPECIAL_PERMISSIONS.length}`}
          helpText="Quyền ngoài matrix: impersonate, audit, system…"
          iconChip={<ShieldCheck className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="warning"
          iconPlacement="inline"
        />
      </div> */}

      {role.isSystem ? (
        <div className="flex items-start gap-3 rounded-lg border border-warning-border bg-warning-bg px-4 py-3">
          <AlertTriangle className="mt-0.5 size-4 text-fg-warning" />
          <div>
            <p className="text-sm font-medium text-fg">
              Vai trò hệ thống — chỉ xem trong demo
            </p>
            <p className="text-sm text-fg-tertiary">
              Vai trò seed bị khóa để demo. Hãy nhân bản để tạo vai trò tùy chỉnh
              với cấu hình riêng.
            </p>
          </div>
        </div>
      ) : null}

      {showDiff && isDirty ? (
        <DiffSummary
          matrixDiff={matrixDiff}
          specialDiff={specialDiff}
          onClose={() => setShowDiff(false)}
        />
      ) : null}

      <Tabs defaultSelectedKey="permissions" variant="underline">
        <TabList aria-label="Tab chi tiết vai trò">
          {TAB_DEFS.map((tab) => (
            <Tab key={tab.id} id={tab.id}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanel id="permissions">
          <PermissionMatrix
            selected={selectedMatrix}
            onChange={setSelectedMatrix}
            readOnly={role.isSystem}
          />
        </TabPanel>

        <TabPanel id="members">
          <MembersTab
            roleName={role.name}
            members={members.map((u) => ({
              id: u.id,
              fullName: u.fullName,
              email: u.email,
              region: u.region,
            }))}
            eligible={eligibleNewMembers.map((u) => ({
              id: u.id,
              fullName: u.fullName,
              email: u.email,
              region: u.region,
            }))}
            readOnly={role.isSystem}
          />
        </TabPanel>

        <TabPanel id="special">
          <SpecialPermissionsTab
            selected={selectedSpecial}
            onChange={setSelectedSpecial}
            readOnly={role.isSystem}
          />
        </TabPanel>
      </Tabs>
    </PageScaffold>
  );
}

function DiffSummary({
  matrixDiff,
  specialDiff,
  onClose,
}: {
  matrixDiff: { added: Permission[]; removed: Permission[] };
  specialDiff: { added: Permission[]; removed: Permission[] };
  onClose: () => void;
}) {
  const allAdded = [...matrixDiff.added, ...specialDiff.added];
  const allRemoved = [...matrixDiff.removed, ...specialDiff.removed];

  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-fg">
            Xem trước thay đổi
          </h2>
          <p className="mt-1 text-sm text-fg-tertiary">
            Trước khi xác nhận: {allAdded.length} quyền được thêm, {allRemoved.length}{" "}
            quyền bị gỡ.
          </p>
        </div>
        <Button color="secondary" size="sm" onClick={onClose}>
          Đóng xem trước
        </Button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DiffColumn
          title="Quyền thêm"
          tone="success"
          items={allAdded.map(formatPermission)}
        />
        <DiffColumn
          title="Quyền gỡ"
          tone="error"
          items={allRemoved.map(formatPermission)}
        />
      </div>
    </div>
  );
}

function DiffColumn({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "success" | "error";
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-border-secondary bg-bg-secondary p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge color={tone} type="pill-color" size="sm">
          {items.length}
        </Badge>
        <span className="text-sm font-medium text-fg">{title}</span>
      </div>
      {items.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <li
              key={item}
              className="rounded border border-border-secondary bg-bg px-2 py-0.5 text-xs text-fg-tertiary"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-fg-tertiary">Không có thay đổi.</p>
      )}
    </div>
  );
}

function formatPermission(perm: Permission): string {
  if (SPECIAL_KEYS.has(perm)) {
    const meta = SPECIAL_PERMISSIONS.find((p) => p.key === perm);
    return meta?.label ?? perm;
  }
  const [resource, action] = perm.split(":") as [string, keyof typeof ACTION_LABELS];
  return `${ACTION_LABELS[action] ?? action} · ${resource}`;
}

interface MemberRow {
  id: string;
  fullName: string;
  email: string;
  region: string;
}

function MembersTab({
  roleName,
  members,
  eligible,
  readOnly,
}: {
  roleName: string;
  members: MemberRow[];
  eligible: MemberRow[];
  readOnly: boolean;
}) {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-fg-tertiary">
          {members.length} người đang gắn vai trò <strong>{roleName}</strong>.
        </p>
        {!readOnly ? (
          <Button
            color="primary"
            size="sm"
            iconLeading={UserPlus}
            onClick={() => setAddOpen((v) => !v)}
          >
            {addOpen ? "Đóng" : "Thêm thành viên"}
          </Button>
        ) : null}
      </div>

      {members.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border-secondary bg-bg p-8 text-center">
          <Users className="mx-auto size-8 text-fg-tertiary" />
          <p className="mt-2 text-sm font-medium text-fg">Chưa có thành viên</p>
          <p className="mt-1 text-sm text-fg-tertiary">
            Vai trò này chưa được gán cho user nào.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border-secondary bg-bg px-3 py-2"
            >
              <Link
                href={`${APP_ROUTES.users}/${member.id}`}
                className="flex items-center gap-3"
              >
                <Avatar
                  size="sm"
                  src={getAvatarFor(member.fullName, member.id)}
                  alt={member.fullName}
                  initials={getInitials(member.fullName)}
                />
                <div>
                  <p className="text-sm font-medium text-fg">{member.fullName}</p>
                  <p className="text-xs text-fg-tertiary">
                    {member.email} · {member.region}
                  </p>
                </div>
              </Link>
              {!readOnly ? (
                <Button
                  color="tertiary"
                  size="sm"
                  iconLeading={UserMinus}
                  aria-label={`Gỡ ${member.fullName} khỏi vai trò`}
                >
                  Gỡ
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {addOpen && !readOnly ? (
        <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <div className="mb-2 flex items-center gap-2">
            <UserPlus className="size-4 text-fg-brand" />
            <p className="text-sm font-semibold text-fg">
              Thêm thành viên vào {roleName}
            </p>
          </div>
          <p className="mb-3 text-xs text-fg-tertiary">
            Demo: hành động ko thực sự lưu, chỉ minh họa flow.
          </p>
          <ul className="flex flex-col gap-1">
            {eligible.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between gap-3 rounded border border-border-secondary bg-bg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    src={getAvatarFor(u.fullName, u.id)}
                    alt={u.fullName}
                    initials={getInitials(u.fullName)}
                  />
                  <div>
                    <p className="text-sm text-fg">{u.fullName}</p>
                    <p className="text-xs text-fg-tertiary">{u.email}</p>
                  </div>
                </div>
                <Button color="secondary" size="sm">
                  Thêm
                </Button>
              </li>
            ))}
            {eligible.length === 0 ? (
              <li className="text-sm text-fg-tertiary">
                Mọi user đã có vai trò này.
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function SpecialPermissionsTab({
  selected,
  onChange,
  readOnly,
}: {
  selected: Set<Permission>;
  onChange: (next: Set<Permission>) => void;
  readOnly: boolean;
}) {
  const toggle = (key: SpecialPermission) => {
    if (readOnly) return;
    const next = new Set(selected);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-fg-tertiary">
        Quyền đặc biệt nằm ngoài matrix resource × action. Bật cẩn thận — quyền có
        biểu tượng cảnh báo có thể bypass quy tắc thông thường.
      </p>
      <ul className="flex flex-col gap-2">
        {SPECIAL_PERMISSIONS.map((perm) => {
          const isChecked = selected.has(perm.key as Permission);
          return (
            <li
              key={perm.key}
              className="flex items-start justify-between gap-3 rounded-xl border border-border-secondary bg-bg p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Checkbox
                    isSelected={isChecked}
                    isDisabled={readOnly}
                    onChange={() => toggle(perm.key)}
                    aria-label={perm.label}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-fg">{perm.label}</p>
                    {perm.dangerous ? (
                      <Badge color="error" type="pill-color" size="sm">
                        Nguy hiểm
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-fg-tertiary">
                    {perm.description}
                  </p>
                  <code className="mt-1 inline-block text-xs text-fg-tertiary">
                    {perm.key}
                  </code>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
