import { Avatar, Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageScaffold } from "./PageScaffold";
import {
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  getUserById,
  type UserActivity,
  type UserPermission,
} from "./users-data";
import { getAvatarFor, getInitials } from "./assets";

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-secondary bg-bg p-5 shadow-xs">
      <p className="text-sm text-fg-tertiary">{label}</p>
      <p className="mt-2 text-xl font-semibold text-fg">{value}</p>
    </div>
  );
}

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

function PermissionItem({ item }: { item: UserPermission }) {
  const tone = item.level === "Full" ? "success" : item.level === "Edit" ? "warning" : "gray";

  return (
    <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-fg">{item.scope}</p>
        <Badge color={tone} type="pill-color" size="sm">
          {item.level}
        </Badge>
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

  return (
    <PageScaffold
      header={
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
                <Badge color={status.color} type="pill-color" size="sm">
                  {status.label}
                </Badge>
                <Badge color="gray" type="pill-color" size="sm">
                  {USER_ROLE_LABELS[user.role]}
                </Badge>
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
            <Button color="primary" size="sm">
              Cập nhật quyền
            </Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <SummaryCard label="Vai trò" value={USER_ROLE_LABELS[user.role]} />
        <SummaryCard label="Khu vực phụ trách" value={user.region} />
        <SummaryCard label="Gia nhập" value={user.joinedAt} />
        <SummaryCard label="Hoạt động gần nhất" value={user.lastActiveAt} />
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
                <p className="text-sm text-fg">Vai trò {USER_ROLE_LABELS[user.role]}</p>
                <p className="text-sm text-fg-tertiary">Quản lý: {user.manager}</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Quyền hạn / access scope"
          description="Phạm vi module mà user có thể đọc hoặc chỉnh sửa."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {user.permissions.map((item) => (
              <PermissionItem key={item.id} item={item} />
            ))}
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
