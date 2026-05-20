import {
  AlertTriangle,
  Building2,
  Calendar,
  Calculator,
  Clock,
  CreditCard,
  Gift,
  HardHat,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import type { FC } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: FC<{ className?: string }>;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const APP_ROUTES = {
  dashboard: "/",
  customers: "/customers",
  customerReconciliations: "/customer-reconciliations",
  workers: "/workers",
  workerVerifications: "/worker-verifications",
  workerViolations: "/worker-violations",
  workerPaymentBatches: "/worker-payment-batches",
  shifts: "/shifts",
  timesheets: "/timesheets",
  reconciliations: "/reconciliations",
  hiringRequests: "/hiring-requests",
  rewardRules: "/reward-rules",
  users: "/users",
} as const;

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: APP_ROUTES.dashboard,
        icon: LayoutDashboard,
      }
    ],
  },
  {
    label: "",
    items: [
      {
        id: "customers",
        label: "Khách hàng",
        href: APP_ROUTES.customers,
        icon: Building2,
      },
      {
        id: "customer-reconciliations",
        label: "Cấu hình đối soát",
        href: APP_ROUTES.customerReconciliations,
        icon: Receipt,
      },
    ],
  },
  {
    label: "Cộng tác viên",
    items: [
      {
        id: "workers",
        label: "Danh sách CTV",
        href: APP_ROUTES.workers,
        icon: HardHat,
      },
      {
        id: "worker-verifications",
        label: "Quản lý xác thực",
        href: APP_ROUTES.workerVerifications,
        icon: ShieldCheck,
      },
      {
        id: "worker-violations",
        label: "Quản lý vi phạm",
        href: APP_ROUTES.workerViolations,
        icon: AlertTriangle,
      },
      {
        id: "worker-payment-batches",
        label: "Thanh toán CTV",
        href: APP_ROUTES.workerPaymentBatches,
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Ca làm việc",
    items: [
      {
        id: "shifts",
        label: "Lịch làm việc",
        href: APP_ROUTES.shifts,
        icon: Calendar,
      },
      {
        id: "timesheets",
        label: "Chấm công",
        href: APP_ROUTES.timesheets,
        icon: Clock,
      },
      {
        id: "reconciliations",
        label: "Đối soát",
        href: APP_ROUTES.reconciliations,
        icon: Calculator,
      },
      {
        id: "hiring-requests",
        label: "Tuyển dụng",
        href: APP_ROUTES.hiringRequests,
        icon: UserPlus,
      },
    ],
  },
  {
    label: "Cấu hình",
    items: [
      {
        id: "reward-rules",
        label: "Thưởng",
        href: APP_ROUTES.rewardRules,
        icon: Gift,
      },
      {
        id: "users",
        label: "User",
        href: APP_ROUTES.users,
        icon: User,
      },
    ],
  },
];

export interface AppBreadcrumb {
  label: string;
  href?: string;
}

const PATH_TO_LABEL = new Map<string, string>(
  NAV_SECTIONS.flatMap((section) =>
    section.items.map((item) => [item.href, item.label] as const),
  ),
);

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function activeHrefForPath(pathname: string): string {
  const normalized = normalizePathname(pathname);
  if (PATH_TO_LABEL.has(normalized)) {
    return normalized;
  }

  const match = [...PATH_TO_LABEL.keys()].find((href) =>
    normalized.startsWith(`${href}/`),
  );
  return match ?? APP_ROUTES.dashboard;
}

export function labelForPath(pathname: string): string {
  const normalized = normalizePathname(pathname);
  if (PATH_TO_LABEL.has(normalized)) {
    return PATH_TO_LABEL.get(normalized) ?? "Trang";
  }

  const match = [...PATH_TO_LABEL.entries()].find(([href]) =>
    normalized.startsWith(`${href}/`),
  );
  if (!match) return "Trang";
  return `Chi tiết ${match[1].toLowerCase()}`;
}

export function breadcrumbsForPath(pathname: string): AppBreadcrumb[] {
  const normalized = normalizePathname(pathname);
  if (normalized === APP_ROUTES.dashboard) {
    return [{ label: "Dashboard" }];
  }

  const activeHref = activeHrefForPath(normalized);
  const sectionLabel = PATH_TO_LABEL.get(activeHref) ?? "Trang";
  if (normalized === activeHref) {
    return [
      { label: "Dashboard", href: APP_ROUTES.dashboard },
      { label: sectionLabel },
    ];
  }

  return [
    { label: "Dashboard", href: APP_ROUTES.dashboard },
    { label: sectionLabel, href: activeHref },
    { label: "Chi tiết" },
  ];
}
