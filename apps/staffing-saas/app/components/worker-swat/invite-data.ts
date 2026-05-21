export type InviteStatus = "pending" | "approved" | "rejected" | "unreachable";

export interface InviteRecord {
  id: string;
  worker: {
    name: string;
    phone: string;
    dob: string;
    gender: "Nam" | "Nữ";
    age: number;
  };
  company: {
    name: string;
    city: string;
  };
  totalHours: { hours: number; period: string };
  totalIncome: { amount: number; period: string };
  status: InviteStatus;
  note?: string;
}

export const INVITE_STATUS_LABELS: Record<
  InviteStatus,
  { label: string; color: "warning" | "success" | "error" | "gray" }
> = {
  pending: { label: "Chờ xử lý", color: "warning" },
  approved: { label: "Đồng ý", color: "success" },
  rejected: { label: "Từ chối", color: "error" },
  unreachable: { label: "Không LH được", color: "gray" },
};

export const INVITES: InviteRecord[] = [
  {
    id: "invite-vo-thi-cau",
    worker: {
      name: "Võ Thị Cầu",
      phone: "0904521376",
      dob: "29/08/1979",
      gender: "Nữ",
      age: 48,
    },
    company: { name: "Viettel Post HCM", city: "Hồ Chí Minh" },
    totalHours: { hours: 151.59, period: "Tháng 4/2026" },
    totalIncome: { amount: 5289400, period: "Tháng 4/2026" },
    status: "pending",
  },
  {
    id: "invite-le-thi-cam-nhi",
    worker: {
      name: "Lê Thị Cẩm Nhi",
      phone: "0823667405",
      dob: "11/10/1994",
      gender: "Nữ",
      age: 32,
    },
    company: { name: "Tận Tâm", city: "Hồ Chí Minh" },
    totalHours: { hours: 167.34, period: "Tháng 4/2026" },
    totalIncome: { amount: 6029400, period: "Tháng 4/2026" },
    status: "pending",
  },
  {
    id: "invite-nguyen-thi-my-trang",
    worker: {
      name: "Nguyễn Thị Mỹ Trang",
      phone: "0917283054",
      dob: "13/12/1977",
      gender: "Nữ",
      age: 49,
    },
    company: { name: "Tiki Now Smart Logistics", city: "Hồ Chí Minh" },
    totalHours: { hours: 188.0, period: "Tháng 4/2026" },
    totalIncome: { amount: 6043300, period: "Tháng 4/2026" },
    status: "pending",
  },
  {
    id: "invite-danh-thai-phuong-dung",
    worker: {
      name: "Danh Thái Phương Dung",
      phone: "0786341290",
      dob: "25/02/1991",
      gender: "Nữ",
      age: 35,
    },
    company: { name: "Boxme", city: "Hồ Chí Minh" },
    totalHours: { hours: 243.35, period: "Tháng 4/2026" },
    totalIncome: { amount: 8569300, period: "Tháng 4/2026" },
    status: "approved",
  },
  {
    id: "invite-le-thi-nhu-y",
    worker: {
      name: "Lê Thị Như Ý",
      phone: "0852749013",
      dob: "07/04/2005",
      gender: "Nữ",
      age: 19,
    },
    company: { name: "Boxme", city: "Hồ Chí Minh" },
    totalHours: { hours: 149.5, period: "Tháng 4/2026" },
    totalIncome: { amount: 5317800, period: "Tháng 4/2026" },
    status: "rejected",
    note: "Đã có việc khác",
  },
];
