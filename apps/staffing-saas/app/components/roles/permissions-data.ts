export type ResourceKey =
  | "customers"
  | "customer_reconciliations"
  | "shifts"
  | "hiring_requests"
  | "candidates"
  | "workers"
  | "worker_verifications"
  | "worker_violations"
  | "timesheets"
  | "bonuses"
  | "worker_payment_batches"
  | "reconciliations"
  | "users"
  | "roles"
  | "billing"
  | "audit_log";

export type ActionKey =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "approve"
  | "assign"
  | "export";

export type SpecialPermission =
  | "impersonate:user"
  | "roles:manage"
  | "system:config"
  | "audit:view_all"
  | "users:assign_role"
  | "users:invite_admin";

export type Permission = `${ResourceKey}:${ActionKey}` | SpecialPermission;

export interface ResourceMeta {
  key: ResourceKey;
  label: string;
  group: "customer" | "recruitment" | "worker" | "operations" | "finance" | "system";
  actions: ActionKey[];
}

export const ACTION_LABELS: Record<ActionKey, string> = {
  view: "Xem",
  create: "Tạo",
  edit: "Sửa",
  delete: "Xóa",
  approve: "Duyệt",
  assign: "Gán",
  export: "Xuất",
};

export const GROUP_LABELS: Record<ResourceMeta["group"], string> = {
  customer: "Khách hàng",
  recruitment: "Tuyển dụng",
  worker: "Cộng tác viên",
  operations: "Vận hành",
  finance: "Tài chính",
  system: "Hệ thống",
};

const ALL_ACTIONS: ActionKey[] = [
  "view",
  "create",
  "edit",
  "delete",
  "approve",
  "assign",
  "export",
];

const CRUD: ActionKey[] = ["view", "create", "edit", "delete"];
const CRUD_EXPORT: ActionKey[] = ["view", "create", "edit", "delete", "export"];
const VIEW_EXPORT: ActionKey[] = ["view", "export"];

export const RESOURCES: ResourceMeta[] = [
  {
    key: "customers",
    label: "Khách hàng",
    group: "customer",
    actions: CRUD_EXPORT,
  },
  {
    key: "customer_reconciliations",
    label: "Cấu hình đối soát",
    group: "customer",
    actions: CRUD,
  },
  {
    key: "hiring_requests",
    label: "Yêu cầu tuyển dụng",
    group: "recruitment",
    actions: [...CRUD, "approve", "export"],
  },
  {
    key: "candidates",
    label: "Ứng viên",
    group: "recruitment",
    actions: [...CRUD, "assign", "export"],
  },
  {
    key: "workers",
    label: "Cộng tác viên",
    group: "worker",
    actions: CRUD_EXPORT,
  },
  {
    key: "worker_verifications",
    label: "Xác thực CTV",
    group: "worker",
    actions: ["view", "edit", "approve"],
  },
  {
    key: "worker_violations",
    label: "Vi phạm CTV",
    group: "worker",
    actions: ["view", "create", "edit", "approve"],
  },
  {
    key: "shifts",
    label: "Ca làm việc",
    group: "operations",
    actions: ALL_ACTIONS,
  },
  {
    key: "timesheets",
    label: "Chấm công",
    group: "operations",
    actions: [...CRUD, "approve", "export"],
  },
  {
    key: "reconciliations",
    label: "Đối soát",
    group: "operations",
    actions: [...CRUD, "approve", "export"],
  },
  {
    key: "bonuses",
    label: "Thưởng",
    group: "finance",
    actions: [...CRUD, "approve"],
  },
  {
    key: "worker_payment_batches",
    label: "Thanh toán CTV",
    group: "finance",
    actions: [...CRUD, "approve", "export"],
  },
  {
    key: "billing",
    label: "Hóa đơn khách hàng",
    group: "finance",
    actions: [...CRUD, "approve", "export"],
  },
  {
    key: "users",
    label: "Người dùng",
    group: "system",
    actions: CRUD,
  },
  {
    key: "roles",
    label: "Vai trò",
    group: "system",
    actions: CRUD,
  },
  {
    key: "audit_log",
    label: "Nhật ký kiểm toán",
    group: "system",
    actions: VIEW_EXPORT,
  },
];

export const RESOURCE_BY_KEY: Record<ResourceKey, ResourceMeta> = RESOURCES.reduce(
  (acc, resource) => {
    acc[resource.key] = resource;
    return acc;
  },
  {} as Record<ResourceKey, ResourceMeta>,
);

export const SPECIAL_PERMISSIONS: {
  key: SpecialPermission;
  label: string;
  description: string;
  dangerous?: boolean;
}[] = [
  {
    key: "users:assign_role",
    label: "Gán vai trò cho user",
    description:
      "Cho phép gán / gỡ vai trò khi tạo hoặc sửa người dùng. Vẫn áp dụng quy tắc trần (ko gán vai trò có quyền cao hơn).",
  },
  {
    key: "users:invite_admin",
    label: "Mời quản trị tổ chức",
    description:
      "Bỏ qua quy tắc trần khi mời người dùng mới. Chỉ Org Admin nên giữ quyền này.",
    dangerous: true,
  },
  {
    key: "roles:manage",
    label: "Quản lý vai trò",
    description:
      "Tạo, sửa, xóa các vai trò tùy chỉnh và quyền chi tiết của chúng.",
  },
  {
    key: "system:config",
    label: "Cấu hình hệ thống",
    description: "Sửa cài đặt toàn tổ chức: branding, integrations, billing plan.",
    dangerous: true,
  },
  {
    key: "audit:view_all",
    label: "Xem toàn bộ nhật ký",
    description:
      "Xem audit log của tất cả người dùng (mặc định mỗi user chỉ thấy log của mình).",
  },
  {
    key: "impersonate:user",
    label: "Đóng vai user khác",
    description:
      "Đăng nhập như một user khác để debug. Mọi action đều được ghi log.",
    dangerous: true,
  },
];

export type RoleKey =
  | "super_admin"
  | "owner"
  | "operations"
  | "accounting"
  | "support"
  | "viewer";

export interface RoleDefinition {
  key: RoleKey;
  name: string;
  description: string;
  color: "brand" | "blue" | "indigo" | "success" | "warning" | "gray" | "error";
  isSystem: boolean;
  permissions: Permission[];
}

function allActionsFor(resource: ResourceKey): Permission[] {
  const meta = RESOURCE_BY_KEY[resource];
  return meta.actions.map((action) => `${resource}:${action}` as Permission);
}

function viewExportFor(resource: ResourceKey): Permission[] {
  const meta = RESOURCE_BY_KEY[resource];
  return meta.actions
    .filter((action) => action === "view" || action === "export")
    .map((action) => `${resource}:${action}` as Permission);
}

const ALL_RESOURCES: ResourceKey[] = RESOURCES.map((r) => r.key);

const OWNER_PERMISSIONS: Permission[] = [
  ...ALL_RESOURCES.flatMap(allActionsFor),
  "users:assign_role",
  "users:invite_admin",
  "roles:manage",
  "system:config",
  "audit:view_all",
];

const OPERATIONS_PERMISSIONS: Permission[] = [
  ...allActionsFor("customers"),
  ...viewExportFor("customer_reconciliations"),
  ...allActionsFor("hiring_requests"),
  ...allActionsFor("candidates"),
  ...allActionsFor("workers"),
  ...allActionsFor("worker_verifications").filter((p) => p !== "worker_verifications:approve"),
  ...allActionsFor("worker_violations"),
  ...allActionsFor("shifts"),
  ...allActionsFor("timesheets").filter((p) => p !== "timesheets:approve"),
  ...viewExportFor("reconciliations"),
  ...viewExportFor("bonuses"),
  ...viewExportFor("worker_payment_batches"),
  "users:view" as Permission,
  "users:create" as Permission,
];

const ACCOUNTING_PERMISSIONS: Permission[] = [
  ...viewExportFor("customers"),
  ...allActionsFor("customer_reconciliations"),
  ...viewExportFor("hiring_requests"),
  ...viewExportFor("workers"),
  ...viewExportFor("shifts"),
  ...viewExportFor("timesheets"),
  ...allActionsFor("reconciliations"),
  ...allActionsFor("bonuses"),
  ...allActionsFor("worker_payment_batches"),
  ...allActionsFor("billing"),
  "audit_log:view" as Permission,
  "audit_log:export" as Permission,
];

const SUPPORT_PERMISSIONS: Permission[] = [
  ...viewExportFor("customers"),
  ...viewExportFor("hiring_requests"),
  ...viewExportFor("candidates"),
  ...viewExportFor("workers"),
  ...allActionsFor("worker_verifications"),
  ...allActionsFor("worker_violations"),
  ...viewExportFor("shifts"),
  ...viewExportFor("timesheets"),
];

const VIEWER_PERMISSIONS: Permission[] = ALL_RESOURCES.flatMap(viewExportFor);

export const ROLES: RoleDefinition[] = [
  {
    key: "super_admin",
    name: "Super Admin",
    description: "Cross-org. Ko hiển thị trong UI org thông thường.",
    color: "error",
    isSystem: true,
    permissions: OWNER_PERMISSIONS,
  },
  {
    key: "owner",
    name: "Quản trị viên",
    description: "Toàn quyền trong tổ chức. Quản lý user, role và cấu hình hệ thống.",
    color: "brand",
    isSystem: true,
    permissions: OWNER_PERMISSIONS,
  },
  {
    key: "operations",
    name: "Điều phối vận hành",
    description:
      "Quản lý hiring, ứng viên, ca làm việc, chấm công và vi phạm. Ko đụng tài chính.",
    color: "blue",
    isSystem: true,
    permissions: OPERATIONS_PERMISSIONS,
  },
  {
    key: "accounting",
    name: "Kế toán",
    description:
      "Đối soát, thưởng, thanh toán CTV và hóa đơn khách hàng. Xem được dữ liệu vận hành liên quan.",
    color: "indigo",
    isSystem: true,
    permissions: ACCOUNTING_PERMISSIONS,
  },
  {
    key: "support",
    name: "Chăm sóc khách hàng",
    description:
      "Phụ trách xác thực CTV, theo dõi vi phạm và hỗ trợ khách hàng. Chủ yếu read-only ngoài 2 mảng này.",
    color: "warning",
    isSystem: true,
    permissions: SUPPORT_PERMISSIONS,
  },
  {
    key: "viewer",
    name: "Chỉ xem",
    description:
      "Read-only toàn bộ hệ thống. Phù hợp stakeholder, kiểm toán nội bộ.",
    color: "gray",
    isSystem: true,
    permissions: VIEWER_PERMISSIONS,
  },
];

export const ROLE_BY_KEY: Record<RoleKey, RoleDefinition> = ROLES.reduce(
  (acc, role) => {
    acc[role.key] = role;
    return acc;
  },
  {} as Record<RoleKey, RoleDefinition>,
);

export function getRoleByKey(key: RoleKey): RoleDefinition | undefined {
  return ROLE_BY_KEY[key];
}

export const ROLE_COLOR_TO_BADGE: Record<
  RoleDefinition["color"],
  "brand" | "blue" | "indigo" | "success" | "warning" | "gray" | "error"
> = {
  brand: "brand",
  blue: "blue",
  indigo: "indigo",
  success: "success",
  warning: "warning",
  gray: "gray",
  error: "error",
};
