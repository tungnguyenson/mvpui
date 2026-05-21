import { Avatar, Badge, BadgeWithDot, Button, MetricCard } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  CalendarPlus,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
  USER_STATUS_LABELS,
  getUserById,
  type UserActivity,
} from "./users-data";
import { getAvatarFor, getInitials } from "../_shared/assets";
import {
  ACTION_LABELS,
  GROUP_LABELS,
  RESOURCES,
  ROLE_BY_KEY,
  type Permission,
  type ResourceMeta,
} from "../roles/permissions-data";
import { effectivePermissions } from "../roles/permission-helpers";

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
      <div className="border-b border-border-secondary px-5 py-4">
        <h2 className="text-base font-semibold text-fg">{title}</h2>
        <p className="mt-1 text-sm text-fg-tertiary">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PermissionResourceRow({
  resource,
  effective,
}: {
  resource: ResourceMeta;
  effective: Set<Permission>;
}) {
  const grantedActions = resource.actions.filter((action) =>
    effective.has(`${resource.key}:${action}` as Permission),
  );

  if (grantedActions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border-secondary bg-bg-secondary px-3 py-2">
      <span className="min-w-35 text-sm font-medium text-fg">
        {resource.label}
      </span>
      <div className="flex flex-wrap gap-1">
        {grantedActions.map((action) => (
          <Badge key={action} color="brand" type="pill-color" size="sm">
            {ACTION_LABELS[action]}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function ActivityItem({ entry }: { entry: UserActivity }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="size-2.5 rounded-full bg-primary" />
        <div className="mt-1 w-px flex-1 bg-border-secondary" />
      </div>
      <div className="flex-1 pb-4">
        <p className="text-sm font-medium text-fg">{entry.action}</p>
        <p className="mt-1 text-sm text-fg-tertiary">{entry.at}</p>
        {entry.detail ? (
          <p className="mt-2 text-sm text-fg-tertiary">{entry.detail}</p>
        ) : null}
      </div>
    </div>
  );
}

export function UsersDetailPage({ id }: { id: string }) {
  const user = getUserById(id);
  if (!user) notFound();

  const status = USER_STATUS_LABELS[user.status];
  const roles = user.roleKeys
    .map((key) => ROLE_BY_KEY[key])
    .filter((role): role is NonNullable<typeof role> => Boolean(role));
  const effective = effectivePermissions({
    id: user.id,
    roleKeys: user.roleKeys,
  });

  const groupedResources = RESOURCES.reduce<Record<string, ResourceMeta[]>>(
    (acc, resource) => {
      const grantedCount = resource.actions.filter((a) =>
        effective.has(`${resource.key}:${a}` as Permission),
      ).length;
      if (grantedCount === 0) return acc;
      const bucket = acc[resource.group] ?? [];
      bucket.push(resource);
      acc[resource.group] = bucket;
      return acc;
    },
    {},
  );

  const primaryRoleLabel = roles[0]?.name ?? "Chưa gán vai trò";

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-4">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "User", href: APP_ROUTES.users },
              { label: user.fullName },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <Avatar
                size="xl"
                src={getAvatarFor(user.fullName, user.id)}
                alt={user.fullName}
                initials={getInitials(user.fullName)}
              />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold text-fg">{user.fullName}</h1>
                  <BadgeWithDot color={status.color} type="pill-color" size="sm">
                    {status.label}
                  </BadgeWithDot>
                  {roles.map((role) => (
                    <Badge
                      key={role.key}
                      color={role.color}
                      type="pill-color"
                      size="sm"
                    >
                      {role.name}
                    </Badge>
                  ))}
                </div>
                <p className="mt-1 text-base text-fg-tertiary">
                  {user.email} • {user.phone}
                </p>
                <p className="mt-3 max-w-3xl text-sm text-fg-tertiary">{user.notes}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/users">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Link href={`${APP_ROUTES.users}/${user.id}/roles`}>
                <Button color="primary" size="sm">
                  Cập nhật vai trò
                </Button>
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          label="Vai trò chính"
          value={primaryRoleLabel}
          valueSize="md"
          iconChip={<UserCog className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Khu vực phụ trách"
          value={user.region}
          valueSize="md"
          iconChip={<MapPin className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Gia nhập"
          value={user.joinedAt}
          valueSize="md"
          iconChip={<CalendarPlus className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="brand"
          iconPlacement="inline"
        />
        <MetricCard
          label="Hoạt động gần nhất"
          value={user.lastActiveAt}
          valueSize="md"
          iconChip={<Activity className="size-5" />}
          iconChipStyle="tint"
          featuredIconColor="success"
          iconPlacement="inline"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Thông tin tài khoản"
          description="Liên hệ và scope quản lý hệ thống của user này."
        >
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{user.email}</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">{user.phone}</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-fg-brand" />
              <p className="text-sm text-fg">Khu vực: {user.region}</p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 text-fg-brand" />
              <div>
                <p className="text-sm text-fg">
                  {roles.length > 1
                    ? `${roles.length} vai trò: ${roles.map((r) => r.name).join(", ")}`
                    : primaryRoleLabel}
                </p>
                <p className="text-sm text-fg-tertiary">Quản lý: {user.manager}</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Quyền hiệu lực (union các role)"
          description="Tổng hợp resource × action mà user này có thể truy cập."
        >
          <div className="flex flex-col gap-4">
            {Object.entries(groupedResources).map(([group, resources]) => (
              <div key={group} className="flex flex-col gap-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-fg-tertiary">
                  {GROUP_LABELS[group as keyof typeof GROUP_LABELS]}
                </div>
                {resources.map((resource) => (
                  <PermissionResourceRow
                    key={resource.key}
                    resource={resource}
                    effective={effective}
                  />
                ))}
              </div>
            ))}
            {Object.keys(groupedResources).length === 0 ? (
              <p className="text-sm text-fg-tertiary">
                User chưa được gán vai trò nào, ko có quyền truy cập module.
              </p>
            ) : null}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Hoạt động gần đây"
        description="Log thao tác gần nhất do user thực hiện trên hệ thống."
      >
        <div className="flex flex-col">
          {user.activity.length > 0 ? (
            user.activity.map((entry) => <ActivityItem key={entry.id} entry={entry} />)
          ) : (
            <p className="text-sm text-fg-tertiary">
              User chưa có hoạt động được ghi nhận trong hệ thống.
            </p>
          )}
        </div>
      </SectionCard>
    </PageScaffold>
  );
}

