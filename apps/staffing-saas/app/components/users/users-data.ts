export type UserStatus = "active" | "invited" | "suspended" | "inactive";

export type UserRole = "owner" | "operations" | "accounting" | "support" | "viewer";

export interface UserPermission {
  id: string;
  scope: string;
  level: "Full" | "Edit" | "View";
}

export interface UserActivity {
  id: string;
  at: string;
  action: string;
  detail?: string;
}

export interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  region: string;
  joinedAt: string;
  lastActiveAt: string;
  manager: string;
  permissions: UserPermission[];
  activity: UserActivity[];
  notes: string;
}

export const USER_STATUS_LABELS: Record<
  UserStatus,
  { label: string; color: "success" | "warning" | "error" | "gray" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  invited: { label: "Đã mời", color: "warning" },
  suspended: { label: "Tạm khóa", color: "error" },
  inactive: { label: "Không hoạt động", color: "gray" },
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  owner: "Quản trị viên",
  operations: "Điều phối vận hành",
  accounting: "Kế toán",
  support: "Chăm sóc khách hàng",
  viewer: "Chỉ xem",
};

export const USERS: UserRecord[] = [
  {
    id: "le-quan-tri",
    fullName: "Lê Quản Trị",
    email: "admin@staffing.vn",
    phone: "0912 345 678",
    role: "owner",
    status: "active",
    region: "Toàn quốc",
    joinedAt: "01/2024",
    lastActiveAt: "Hôm nay 09:20",
    manager: "—",
    permissions: [
      { id: "p-1", scope: "Toàn bộ module", level: "Full" },
      { id: "p-2", scope: "Phê duyệt thanh toán", level: "Full" },
      { id: "p-3", scope: "Cấu hình hệ thống", level: "Full" },
    ],
    activity: [
      { id: "a-1", at: "Hôm nay 09:20", action: "Đăng nhập hệ thống" },
      {
        id: "a-2",
        at: "Hôm nay 09:30",
        action: "Mở dashboard tổng quan",
        detail: "Xem chỉ số tuyển dụng và doanh thu khách hàng.",
      },
    ],
    notes: "Tài khoản admin chính. Có quyền cao nhất, mọi thay đổi đều được log.",
  },
  {
    id: "le-thuy-trang",
    fullName: "Lê Thuỳ Trang",
    email: "trang.le@staffing.vn",
    phone: "0908 776 221",
    role: "operations",
    status: "active",
    region: "Miền Nam",
    joinedAt: "03/2024",
    lastActiveAt: "Hôm nay 09:48",
    manager: "Lê Quản Trị",
    permissions: [
      { id: "p-1", scope: "Hiring requests", level: "Edit" },
      { id: "p-2", scope: "Lịch ca & chấm công", level: "Edit" },
      { id: "p-3", scope: "Thanh toán CTV", level: "View" },
    ],
    activity: [
      { id: "a-1", at: "Hôm nay 09:48", action: "Đẩy batch PAY-0520-A lên duyệt" },
      {
        id: "a-2",
        at: "Hôm nay 08:30",
        action: "Cập nhật trạng thái HR-2401",
        detail: "Thêm shortlist 2 worker mới.",
      },
    ],
    notes: "Lead điều phối miền Nam. Quản lý đội điều phối ca cuối tuần.",
  },
  {
    id: "nguyen-quoc-dat",
    fullName: "Nguyễn Quốc Đạt",
    email: "dat.nguyen@staffing.vn",
    phone: "0907 113 882",
    role: "operations",
    status: "active",
    region: "Bình Dương & Long An",
    joinedAt: "07/2024",
    lastActiveAt: "Hôm qua 22:15",
    manager: "Lê Thuỳ Trang",
    permissions: [
      { id: "p-1", scope: "Lịch ca & chấm công", level: "Edit" },
      { id: "p-2", scope: "Hiring requests", level: "Edit" },
      { id: "p-3", scope: "Vi phạm worker", level: "Edit" },
    ],
    activity: [
      {
        id: "a-1",
        at: "Hôm qua 22:15",
        action: "Chốt timesheet TS-SH-910-18",
        detail: "Ca kho đêm GoMart DC1.",
      },
      { id: "a-2", at: "Hôm qua 18:40", action: "Mở vi phạm VL-3198" },
    ],
    notes: "Điều phối ca kho đêm cho Ninja Van.",
  },
  {
    id: "pham-quoc-bao",
    fullName: "Phạm Quốc Bảo",
    email: "bao.pham@staffing.vn",
    phone: "0903 887 998",
    role: "support",
    status: "active",
    region: "Miền Bắc",
    joinedAt: "09/2024",
    lastActiveAt: "Hôm nay 08:55",
    manager: "Lê Thuỳ Trang",
    permissions: [
      { id: "p-1", scope: "Xác thực worker", level: "Edit" },
      { id: "p-2", scope: "CSKH khách hàng", level: "Edit" },
    ],
    activity: [
      {
        id: "a-1",
        at: "Hôm nay 08:55",
        action: "Duyệt xác thực Phạm Thu Dung",
        detail: "Bổ sung MST cá nhân thành công.",
      },
    ],
    notes: "Phụ trách xác thực worker và phối hợp CSKH với khách hàng miền Bắc.",
  },
  {
    id: "tran-mai-linh",
    fullName: "Trần Mai Linh",
    email: "linh.tran@staffing.vn",
    phone: "0911 226 778",
    role: "accounting",
    status: "active",
    region: "Toàn quốc",
    joinedAt: "11/2024",
    lastActiveAt: "Hôm nay 09:05",
    manager: "Lê Quản Trị",
    permissions: [
      { id: "p-1", scope: "Thanh toán CTV", level: "Edit" },
      { id: "p-2", scope: "Đối soát", level: "Edit" },
      { id: "p-3", scope: "Khách hàng (billing)", level: "View" },
    ],
    activity: [
      { id: "a-1", at: "Hôm nay 09:05", action: "Mở batch PAY-0527-D" },
      {
        id: "a-2",
        at: "Hôm qua 16:30",
        action: "Khoá đối soát RC-GM-0430",
        detail: "Khách hàng đã duyệt số liệu cuối.",
      },
    ],
    notes: "Kế toán chính. Phụ trách chốt batch và đối soát với khách hàng.",
  },
  {
    id: "tran-huu-loc",
    fullName: "Trần Hữu Lộc",
    email: "loc.tran@staffing.vn",
    phone: "0905 444 102",
    role: "viewer",
    status: "invited",
    region: "Miền Trung",
    joinedAt: "—",
    lastActiveAt: "Chưa đăng nhập",
    manager: "Lê Thuỳ Trang",
    permissions: [
      { id: "p-1", scope: "Dashboard tổng quan", level: "View" },
      { id: "p-2", scope: "Báo cáo doanh thu", level: "View" },
    ],
    activity: [
      {
        id: "a-1",
        at: "12/05/2026 14:20",
        action: "Đã gửi email mời tham gia",
        detail: "Đang chờ user xác nhận liên kết email.",
      },
    ],
    notes: "Pilot stakeholder cho miền Trung, chờ kích hoạt tài khoản.",
  },
];

export function getUserById(id: string): UserRecord | undefined {
  return USERS.find((user) => user.id === id);
}
