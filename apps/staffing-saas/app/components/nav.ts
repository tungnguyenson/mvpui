import {
  AlertTriangle,
  Building2,
  Calculator,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Gift,
  HardHat,
  LayoutDashboard,
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

export const DASHBOARD_HREF = "#dashboard";

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "",
    items: [
      { id: "dashboard", label: "Dashboard", href: DASHBOARD_HREF, icon: LayoutDashboard },
      { id: "kh-list", label: "Khách hàng", href: "#khach-hang", icon: Building2 },
    ],
  },
  {
    label: "Cộng tác viên",
    items: [
      { id: "ctv-list", label: "Danh sách CTV", href: "#ctv", icon: HardHat },
      { id: "ctv-xac-thuc", label: "Quản lý xác thực", href: "#xac-thuc", icon: ShieldCheck },
      { id: "ctv-vi-pham", label: "Quản lý vi phạm", href: "#vi-pham", icon: AlertTriangle },
      { id: "ctv-thanh-toan", label: "Thanh toán CTV", href: "#thanh-toan", icon: CreditCard },
    ],
  },
  {
    label: "Ca làm việc",
    items: [
      { id: "ca-lich", label: "Lịch làm việc", href: "#lich-lam-viec", icon: Calendar },
      { id: "ca-cham-cong", label: "Chấm công", href: "#cham-cong", icon: Clock },
      { id: "ca-doi-soat", label: "Đối soát", href: "#doi-soat", icon: Calculator },
      { id: "ca-tuyen-dung", label: "Tuyển dụng", href: "#tuyen-dung", icon: UserPlus },
    ],
  },
  {
    label: "Cấu hình",
    items: [
      { id: "cf-thuong", label: "Thưởng", href: "#thuong", icon: Gift },
      { id: "cf-user", label: "User", href: "#user", icon: User },
      { id: "cf-gia", label: "Chính sách giá", href: "#chinh-sach-gia", icon: DollarSign },
    ],
  },
];

const HREF_TO_LABEL = new Map<string, string>(
  NAV_SECTIONS.flatMap((s) => s.items.map((i) => [i.href, i.label] as const)),
);

export function labelForHref(href: string): string {
  return HREF_TO_LABEL.get(href) ?? "Trang";
}
