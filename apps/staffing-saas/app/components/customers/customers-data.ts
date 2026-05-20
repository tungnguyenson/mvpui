export type CustomerStatus = "active" | "pilot" | "paused";

export type CustomerVerificationStatus = "active" | "pending" | "rejected";

export interface CustomerContact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface CustomerHiringRequest {
  id: string;
  title: string;
  area: string;
  headcount: string;
  filled: string;
  deadline: string;
  status: "Đang tuyển" | "Sắp đủ người" | "Quá hạn";
}

export interface CustomerShift {
  id: string;
  name: string;
  site: string;
  schedule: string;
  staffing: string;
  status: "Đang mở" | "Đủ người" | "Thiếu gấp";
}

export interface CustomerBillingSnapshot {
  currentMonth: string;
  previousMonth: string;
  outstanding: string;
  paymentTerm: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  industry: string;
  city: string;
  status: CustomerStatus;
  verificationStatus: CustomerVerificationStatus;
  contact: CustomerContact;
  activeRequests: number;
  openShifts: number;
  totalJobs: number;
  totalFreelancers: number;
  monthlySpend: string;
  joinedAt: string;
  notes: string;
  hiringRequests: CustomerHiringRequest[];
  shifts: CustomerShift[];
  billing: CustomerBillingSnapshot;
}

export const CUSTOMER_STATUS_LABELS: Record<
  CustomerStatus,
  { label: string; color: "success" | "warning" | "gray" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  pilot: { label: "Đang pilot", color: "warning" },
  paused: { label: "Tạm dừng", color: "gray" },
};

export const CUSTOMER_VERIFICATION_LABELS: Record<
  CustomerVerificationStatus,
  { label: string; color: "success" | "warning" | "error" }
> = {
  active: { label: "Kích hoạt", color: "success" },
  pending: { label: "Chờ duyệt", color: "warning" },
  rejected: { label: "Từ chối", color: "error" },
};

export const CUSTOMERS: CustomerRecord[] = [
  {
    id: "highlands-commerce",
    name: "GHN Sorting",
    industry: "Bán lẻ",
    city: "TP.HCM",
    status: "active",
    verificationStatus: "active",
    contact: {
      name: "Nguyễn Hồng Nhung",
      title: "HRBP khu vực miền Nam",
      phone: "0908 220 118",
      email: "nhung.nguyen@highlands.vn",
    },
    activeRequests: 4,
    openShifts: 18,
    totalJobs: 368,
    totalFreelancers: 51403,
    monthlySpend: "₫412.000.000",
    joinedAt: "03/2025",
    notes:
      "Khách hàng ưu tiên tốc độ fill cuối tuần, thường tăng headcount đột xuất trước ngày chạy activation.",
    hiringRequests: [
      {
        id: "HR-2401",
        title: "CTV bán hàng cuối tuần",
        area: "Quận 1, TP.HCM",
        headcount: "20 người",
        filled: "12/20",
        deadline: "24/05",
        status: "Đang tuyển",
      },
      {
        id: "HR-2412",
        title: "CTV activation trung tâm thương mại",
        area: "Bình Thạnh, TP.HCM",
        headcount: "8 người",
        filled: "7/8",
        deadline: "22/05",
        status: "Sắp đủ người",
      },
    ],
    shifts: [
      {
        id: "SH-801",
        name: "Ca bán hàng cuối tuần",
        site: "Vincom Đồng Khởi",
        schedule: "Thứ 7, 08:00 - 17:00",
        staffing: "14/18",
        status: "Đang mở",
      },
      {
        id: "SH-815",
        name: "Ca activation sampling",
        site: "Gigamall Thủ Đức",
        schedule: "Chủ nhật, 10:00 - 18:00",
        staffing: "6/8",
        status: "Thiếu gấp",
      },
    ],
    billing: {
      currentMonth: "₫412.000.000",
      previousMonth: "₫365.500.000",
      outstanding: "₫58.000.000",
      paymentTerm: "30 ngày",
    },
  },
  {
    id: "gomart-distribution",
    name: "Ninja Van",
    industry: "Kho vận",
    city: "Bình Dương",
    status: "active",
    verificationStatus: "active",
    contact: {
      name: "Lê Quang Thịnh",
      title: "Warehouse Operations Lead",
      phone: "0907 188 552",
      email: "thinh.le@gomart.vn",
    },
    activeRequests: 3,
    openShifts: 12,
    totalJobs: 245,
    totalFreelancers: 28140,
    monthlySpend: "₫286.000.000",
    joinedAt: "11/2024",
    notes:
      "Nhu cầu xoay ca đêm và ca tăng cường cuối tháng. Cần worker đã qua xác thực đầy đủ và có kinh nghiệm kho.",
    hiringRequests: [
      {
        id: "HR-2402",
        title: "CTV kho ca đêm",
        area: "Thuận An, Bình Dương",
        headcount: "15 người",
        filled: "8/15",
        deadline: "25/05",
        status: "Đang tuyển",
      },
      {
        id: "HR-2418",
        title: "CTV đóng gói cuối tháng",
        area: "Dĩ An, Bình Dương",
        headcount: "10 người",
        filled: "10/10",
        deadline: "21/05",
        status: "Sắp đủ người",
      },
    ],
    shifts: [
      {
        id: "SH-910",
        name: "Ca kho đêm A",
        site: "Kho GoMart DC1",
        schedule: "Hôm nay, 22:00 - 06:00",
        staffing: "11/15",
        status: "Thiếu gấp",
      },
      {
        id: "SH-914",
        name: "Ca đóng gói sáng",
        site: "Kho GoMart DC2",
        schedule: "Ngày mai, 07:00 - 15:00",
        staffing: "12/12",
        status: "Đủ người",
      },
    ],
    billing: {
      currentMonth: "₫286.000.000",
      previousMonth: "₫241.800.000",
      outstanding: "₫0",
      paymentTerm: "15 ngày",
    },
  },
  {
    id: "medistar-clinic",
    name: "Shopee Express Official",
    industry: "Y tế",
    city: "Hà Nội",
    status: "pilot",
    verificationStatus: "pending",
    contact: {
      name: "Trần Thanh Mai",
      title: "Clinic Admin Manager",
      phone: "0903 456 007",
      email: "mai.tran@medistar.vn",
    },
    activeRequests: 2,
    openShifts: 6,
    totalJobs: 12,
    totalFreelancers: 187,
    monthlySpend: "₫94.000.000",
    joinedAt: "04/2026",
    notes:
      "Đang ở giai đoạn pilot. Khách hàng yêu cầu worker có kỹ năng front desk và tỷ lệ đúng giờ cao.",
    hiringRequests: [
      {
        id: "HR-2403",
        title: "Lễ tân part-time",
        area: "Cầu Giấy, Hà Nội",
        headcount: "6 người",
        filled: "4/6",
        deadline: "27/05",
        status: "Đang tuyển",
      },
      {
        id: "HR-2409",
        title: "CTV chăm sóc khách hàng",
        area: "Ba Đình, Hà Nội",
        headcount: "4 người",
        filled: "1/4",
        deadline: "28/05",
        status: "Quá hạn",
      },
    ],
    shifts: [
      {
        id: "SH-702",
        name: "Ca lễ tân chiều",
        site: "Medistar Cầu Giấy",
        schedule: "Thứ 2 - Thứ 6, 13:00 - 18:00",
        staffing: "3/6",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫94.000.000",
      previousMonth: "₫0",
      outstanding: "₫94.000.000",
      paymentTerm: "45 ngày",
    },
  },
  {
    id: "nova-event-partners",
    name: "Kingfoodmart",
    industry: "Sự kiện",
    city: "Đà Nẵng",
    status: "paused",
    verificationStatus: "active",
    contact: {
      name: "Phạm Đức Lâm",
      title: "Project Manager",
      phone: "0905 991 812",
      email: "lam.pham@novaevent.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 54,
    totalFreelancers: 3244,
    monthlySpend: "₫0",
    joinedAt: "08/2025",
    notes:
      "Đang tạm dừng do hết mùa sự kiện. Giữ hồ sơ để tái kích hoạt trong quý 3.",
    hiringRequests: [],
    shifts: [],
    billing: {
      currentMonth: "₫0",
      previousMonth: "₫128.000.000",
      outstanding: "₫18.000.000",
      paymentTerm: "30 ngày",
    },
  },
];

export function getCustomerById(id: string): CustomerRecord | undefined {
  return CUSTOMERS.find((customer) => customer.id === id);
}
