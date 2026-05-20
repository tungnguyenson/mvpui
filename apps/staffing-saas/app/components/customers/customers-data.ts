export type CustomerStatus = "hiring" | "lead" | "onboarding" | "paused";

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

export interface CustomerHiringStats {
  hired: number;
  target: number;
}

export interface CustomerLeadInfo {
  stage:
    | "Khám phá nhu cầu"
    | "Đang đàm phán"
    | "Đã gửi proposal"
    | "Chờ ký hợp đồng";
  source: "Inbound web" | "Outbound" | "Giới thiệu" | "Event/Hội thảo";
  notes: string;
  lastContactAt: string;
}

export interface CustomerAccountManager {
  name: string;
  title: string;
}

export interface CustomerOnboardingInfo {
  stage:
    | "Ký hợp đồng"
    | "Setup hệ thống"
    | "Đào tạo vận hành"
    | "Pilot job đầu tiên";
  progress: number;
  goLiveDate: string;
  accountManager: CustomerAccountManager;
}

export interface CustomerPausedInfo {
  reason: string;
  since: string;
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
  hiringStats?: CustomerHiringStats;
  lead?: CustomerLeadInfo;
  onboarding?: CustomerOnboardingInfo;
  pausedInfo?: CustomerPausedInfo;
}

export const CUSTOMER_STATUS_LABELS: Record<
  CustomerStatus,
  { label: string; color: "success" | "warning" | "brand" | "gray" }
> = {
  hiring: { label: "Đang tuyển", color: "success" },
  lead: { label: "Lead", color: "brand" },
  onboarding: { label: "Onboarding", color: "warning" },
  paused: { label: "Tạm ngưng", color: "gray" },
};

export const CUSTOMER_VERIFICATION_LABELS: Record<
  CustomerVerificationStatus,
  { label: string; color: "success" | "warning" | "error" }
> = {
  active: { label: "Kích hoạt", color: "success" },
  pending: { label: "Chờ duyệt", color: "warning" },
  rejected: { label: "Từ chối", color: "error" },
};

const EMPTY_BILLING: CustomerBillingSnapshot = {
  currentMonth: "₫0",
  previousMonth: "₫0",
  outstanding: "₫0",
  paymentTerm: "—",
};

export const CUSTOMERS: CustomerRecord[] = [
  {
    id: "highlands-commerce",
    name: "GHN Sorting",
    industry: "Logistics",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Nguyễn Hồng Nhung",
      title: "HRBP khu vực miền Nam",
      phone: "0908 220 118",
      email: "nhung.nguyen@ghn.vn",
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
        title: "CTV phân loại hàng cuối tuần",
        area: "Quận 7, TP.HCM",
        headcount: "20 người",
        filled: "12/20",
        deadline: "24/05",
        status: "Đang tuyển",
      },
      {
        id: "HR-2412",
        title: "CTV bốc xếp trung tâm sorting",
        area: "Bình Chánh, TP.HCM",
        headcount: "8 người",
        filled: "7/8",
        deadline: "22/05",
        status: "Sắp đủ người",
      },
    ],
    shifts: [
      {
        id: "SH-801",
        name: "Ca phân loại cuối tuần",
        site: "GHN Hub Quận 7",
        schedule: "Thứ 7, 08:00 - 17:00",
        staffing: "14/18",
        status: "Đang mở",
      },
      {
        id: "SH-815",
        name: "Ca sorting đêm",
        site: "GHN Hub Bình Chánh",
        schedule: "Chủ nhật, 22:00 - 06:00",
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
    hiringStats: { hired: 142, target: 180 },
  },
  {
    id: "gomart-distribution",
    name: "Ninja Van",
    industry: "Logistics",
    city: "Bình Dương",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Lê Quang Thịnh",
      title: "Warehouse Operations Lead",
      phone: "0907 188 552",
      email: "thinh.le@ninjavan.vn",
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
    ],
    shifts: [
      {
        id: "SH-910",
        name: "Ca kho đêm A",
        site: "Ninja Van DC1",
        schedule: "Hôm nay, 22:00 - 06:00",
        staffing: "11/15",
        status: "Thiếu gấp",
      },
    ],
    billing: {
      currentMonth: "₫286.000.000",
      previousMonth: "₫241.800.000",
      outstanding: "₫24.500.000",
      paymentTerm: "15 ngày",
    },
    hiringStats: { hired: 98, target: 120 },
  },
  {
    id: "ghtk-logistics",
    name: "GHTK",
    industry: "Logistics",
    city: "Hà Nội",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Đỗ Mạnh Cường",
      title: "Operations Manager miền Bắc",
      phone: "0982 445 110",
      email: "cuong.do@ghtk.co",
    },
    activeRequests: 6,
    openShifts: 22,
    totalJobs: 512,
    totalFreelancers: 38210,
    monthlySpend: "₫524.000.000",
    joinedAt: "06/2023",
    notes:
      "Mở rộng mạng lưới 11 bưu cục mới Q2/2026, cần CTV giao nhận và soạn đơn liên tục.",
    hiringRequests: [
      {
        id: "HR-2501",
        title: "CTV giao hàng nội thành",
        area: "Hai Bà Trưng, Hà Nội",
        headcount: "30 người",
        filled: "22/30",
        deadline: "26/05",
        status: "Đang tuyển",
      },
    ],
    shifts: [
      {
        id: "SH-1001",
        name: "Ca soạn đơn sáng",
        site: "GHTK Hub Mễ Trì",
        schedule: "Thứ 2 - Thứ 7, 06:00 - 14:00",
        staffing: "18/22",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫524.000.000",
      previousMonth: "₫488.200.000",
      outstanding: "₫74.300.000",
      paymentTerm: "30 ngày",
    },
    hiringStats: { hired: 218, target: 260 },
  },
  {
    id: "viettel-post-hcm",
    name: "Viettel Post HCM",
    industry: "Logistics",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Hoàng Minh Tuấn",
      title: "Trưởng phòng Vận hành HCM",
      phone: "0989 552 207",
      email: "tuan.hm@viettelpost.com.vn",
    },
    activeRequests: 5,
    openShifts: 16,
    totalJobs: 410,
    totalFreelancers: 26780,
    monthlySpend: "₫378.000.000",
    joinedAt: "01/2024",
    notes:
      "Yêu cầu CTV có thể trực ca cao điểm dịp lễ. Ưu tiên hồ sơ đã xác thực CCCD.",
    hiringRequests: [
      {
        id: "HR-2603",
        title: "CTV phân loại đơn",
        area: "Tân Bình, TP.HCM",
        headcount: "25 người",
        filled: "18/25",
        deadline: "27/05",
        status: "Đang tuyển",
      },
    ],
    shifts: [
      {
        id: "SH-1112",
        name: "Ca phân loại tối",
        site: "Viettel Post Trung tâm HCM",
        schedule: "Hằng ngày, 18:00 - 23:00",
        staffing: "14/20",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫378.000.000",
      previousMonth: "₫344.100.000",
      outstanding: "₫42.800.000",
      paymentTerm: "30 ngày",
    },
    hiringStats: { hired: 165, target: 210 },
  },
  {
    id: "shopee-express",
    name: "Shopee Express",
    industry: "E-commerce Logistics",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Trương Kim Phương",
      title: "SPX Operations Lead",
      phone: "0902 778 414",
      email: "phuong.truong@spx.vn",
    },
    activeRequests: 7,
    openShifts: 24,
    totalJobs: 612,
    totalFreelancers: 47200,
    monthlySpend: "₫645.000.000",
    joinedAt: "09/2024",
    notes:
      "Khách hàng key account. Đỉnh điểm campaign sale 5.5, 6.6, 11.11 cần nâng headcount gấp 3.",
    hiringRequests: [
      {
        id: "HR-2701",
        title: "CTV phân loại SPX Hub",
        area: "Quận 12, TP.HCM",
        headcount: "40 người",
        filled: "31/40",
        deadline: "23/05",
        status: "Đang tuyển",
      },
    ],
    shifts: [
      {
        id: "SH-1201",
        name: "Ca sorting cao điểm",
        site: "SPX Hub Quận 12",
        schedule: "Hằng ngày, 14:00 - 22:00",
        staffing: "28/35",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫645.000.000",
      previousMonth: "₫598.700.000",
      outstanding: "₫112.400.000",
      paymentTerm: "45 ngày",
    },
    hiringStats: { hired: 284, target: 340 },
  },
  {
    id: "bach-hoa-xanh",
    name: "Bách Hoá Xanh",
    industry: "Bán lẻ",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Vũ Thị Hoài Linh",
      title: "Talent Operations Manager",
      phone: "0916 332 871",
      email: "linh.vu@bachhoaxanh.com",
    },
    activeRequests: 4,
    openShifts: 14,
    totalJobs: 298,
    totalFreelancers: 18900,
    monthlySpend: "₫232.000.000",
    joinedAt: "05/2024",
    notes:
      "Mở thêm 24 cửa hàng tại miền Tây trong Q3. Cần CTV bán hàng và soạn đơn online.",
    hiringRequests: [
      {
        id: "HR-2811",
        title: "CTV bán hàng siêu thị",
        area: "Cần Thơ",
        headcount: "18 người",
        filled: "13/18",
        deadline: "29/05",
        status: "Đang tuyển",
      },
    ],
    shifts: [
      {
        id: "SH-1305",
        name: "Ca bán hàng chiều",
        site: "BHX Cần Thơ - Ninh Kiều",
        schedule: "Hằng ngày, 13:00 - 21:00",
        staffing: "10/14",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫232.000.000",
      previousMonth: "₫208.400.000",
      outstanding: "₫31.200.000",
      paymentTerm: "30 ngày",
    },
    hiringStats: { hired: 124, target: 160 },
  },
  {
    id: "tiki-now-smart-logistics",
    name: "Tiki Now Smart Logistics",
    industry: "E-commerce Logistics",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Lý Trọng Khoa",
      title: "Fulfilment Center Lead",
      phone: "0905 671 220",
      email: "khoa.ly@tikinow.vn",
    },
    activeRequests: 3,
    openShifts: 10,
    totalJobs: 174,
    totalFreelancers: 12440,
    monthlySpend: "₫198.000.000",
    joinedAt: "02/2024",
    notes:
      "Ưu tiên CTV đã làm fulfilment center hoặc có chứng chỉ vận hành kho.",
    hiringRequests: [
      {
        id: "HR-2902",
        title: "CTV soạn đơn FFM",
        area: "Quận 7, TP.HCM",
        headcount: "12 người",
        filled: "9/12",
        deadline: "28/05",
        status: "Sắp đủ người",
      },
    ],
    shifts: [
      {
        id: "SH-1402",
        name: "Ca soạn đơn cuối ngày",
        site: "Tiki FFM Quận 7",
        schedule: "Hằng ngày, 16:00 - 24:00",
        staffing: "8/10",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫198.000.000",
      previousMonth: "₫186.500.000",
      outstanding: "₫18.700.000",
      paymentTerm: "30 ngày",
    },
    hiringStats: { hired: 86, target: 108 },
  },
  {
    id: "foodmap",
    name: "FoodMap",
    industry: "F&B / Bán lẻ",
    city: "TP.HCM",
    status: "hiring",
    verificationStatus: "active",
    contact: {
      name: "Phạm Thu Hằng",
      title: "Field Operations Lead",
      phone: "0937 220 119",
      email: "hang.pham@foodmap.asia",
    },
    activeRequests: 2,
    openShifts: 6,
    totalJobs: 84,
    totalFreelancers: 4120,
    monthlySpend: "₫86.000.000",
    joinedAt: "10/2025",
    notes:
      "Kết hợp tuyển CTV chốt đơn livestream và CTV soạn đơn nông sản.",
    hiringRequests: [
      {
        id: "HR-3001",
        title: "CTV chốt đơn livestream",
        area: "Bình Thạnh, TP.HCM",
        headcount: "8 người",
        filled: "5/8",
        deadline: "30/05",
        status: "Đang tuyển",
      },
    ],
    shifts: [
      {
        id: "SH-1501",
        name: "Ca livestream tối",
        site: "FoodMap Studio Bình Thạnh",
        schedule: "Thứ 3 - Thứ 7, 19:00 - 23:00",
        staffing: "4/6",
        status: "Đang mở",
      },
    ],
    billing: {
      currentMonth: "₫86.000.000",
      previousMonth: "₫72.300.000",
      outstanding: "₫9.400.000",
      paymentTerm: "15 ngày",
    },
    hiringStats: { hired: 42, target: 58 },
  },

  {
    id: "medistar-clinic",
    name: "Shopee Express Official",
    industry: "E-commerce Logistics",
    city: "Hà Nội",
    status: "onboarding",
    verificationStatus: "pending",
    contact: {
      name: "Trần Thanh Mai",
      title: "Vendor Onboarding Manager",
      phone: "0903 456 007",
      email: "mai.tran@shopee.com",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "04/2026",
    notes:
      "Đang onboarding hub Hà Nội, dự kiến go-live cuối tháng 6 với 4 ca cố định.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    onboarding: {
      stage: "Setup hệ thống",
      progress: 55,
      goLiveDate: "28/06/2026",
      accountManager: {
        name: "Đặng Quốc Bảo",
        title: "Senior AM - Logistics",
      },
    },
  },
  {
    id: "boxme",
    name: "Boxme",
    industry: "Fulfilment",
    city: "Hà Nội",
    status: "onboarding",
    verificationStatus: "pending",
    contact: {
      name: "Nguyễn Đình Huy",
      title: "COO",
      phone: "0915 778 220",
      email: "huy.nguyen@boxme.asia",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "03/2026",
    notes:
      "Đã ký hợp đồng khung. Cần đào tạo workflow soạn đơn theo SOP riêng.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    onboarding: {
      stage: "Đào tạo vận hành",
      progress: 75,
      goLiveDate: "10/06/2026",
      accountManager: {
        name: "Phan Quản Trị",
        title: "Account Manager",
      },
    },
  },
  {
    id: "tiki-market",
    name: "Tiki - Market",
    industry: "E-commerce",
    city: "TP.HCM",
    status: "onboarding",
    verificationStatus: "active",
    contact: {
      name: "Bùi Hoàng Sơn",
      title: "Marketplace Ops Manager",
      phone: "0989 332 668",
      email: "son.bui@tiki.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "04/2026",
    notes:
      "Đang chốt SOW cho 2 hub HCM. Khách yêu cầu pilot 30 ngày trước khi mở rộng.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    onboarding: {
      stage: "Ký hợp đồng",
      progress: 30,
      goLiveDate: "15/07/2026",
      accountManager: {
        name: "Lê Diệu Hương",
        title: "Senior AM - Marketplace",
      },
    },
  },
  {
    id: "seedcom-food",
    name: "Seedcom Food",
    industry: "F&B",
    city: "TP.HCM",
    status: "onboarding",
    verificationStatus: "active",
    contact: {
      name: "Nguyễn Quốc Khải",
      title: "Field Marketing Lead",
      phone: "0937 116 884",
      email: "khai.nguyen@seedcom.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "04/2026",
    notes:
      "Pilot CTV PG/PB cho chuỗi The Coffee House. Đang chạy pilot job đầu tiên.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    onboarding: {
      stage: "Pilot job đầu tiên",
      progress: 88,
      goLiveDate: "05/06/2026",
      accountManager: {
        name: "Trần Anh Cường",
        title: "Account Manager",
      },
    },
  },

  {
    id: "skt-vina",
    name: "SKT Vina",
    industry: "Sản xuất",
    city: "Bắc Ninh",
    status: "lead",
    verificationStatus: "pending",
    contact: {
      name: "Park Jin-Woo",
      title: "HR Director",
      phone: "0903 117 552",
      email: "jw.park@skt-vina.com",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "—",
    notes:
      "Cần CTV thời vụ cho dây chuyền lắp ráp linh kiện điện tử trong Q3.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    lead: {
      stage: "Đang đàm phán",
      source: "Outbound",
      notes: "Đã có 2 buổi demo, đang chốt mức phí và SLA fill rate.",
      lastContactAt: "18/05/2026",
    },
  },
  {
    id: "tc-logistics",
    name: "T&C Logistics",
    industry: "Logistics",
    city: "Hải Phòng",
    status: "lead",
    verificationStatus: "pending",
    contact: {
      name: "Đào Văn Hùng",
      title: "Giám đốc nhân sự",
      phone: "0986 442 109",
      email: "hung.dao@tclog.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "—",
    notes: "Quan tâm gói Staffing/Enterprise cho 3 kho miền Bắc.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    lead: {
      stage: "Đã gửi proposal",
      source: "Giới thiệu",
      notes: "Anh Hùng đề xuất họp trực tiếp tuần sau để xem hệ thống.",
      lastContactAt: "16/05/2026",
    },
  },
  {
    id: "baspro",
    name: "Baspro",
    industry: "Bán lẻ",
    city: "TP.HCM",
    status: "lead",
    verificationStatus: "pending",
    contact: {
      name: "Nguyễn Hoàng Lan",
      title: "Founder",
      phone: "0908 552 117",
      email: "lan@baspro.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "—",
    notes:
      "Chuỗi shop mỹ phẩm mới mở, cần PG cuối tuần cho 8 cửa hàng.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    lead: {
      stage: "Khám phá nhu cầu",
      source: "Inbound web",
      notes: "Chị Lan đăng ký demo qua landing page, chưa có ngân sách rõ.",
      lastContactAt: "14/05/2026",
    },
  },
  {
    id: "ship60",
    name: "Ship60",
    industry: "Logistics",
    city: "TP.HCM",
    status: "lead",
    verificationStatus: "pending",
    contact: {
      name: "Hoàng Minh Đức",
      title: "Head of Operations",
      phone: "0907 882 113",
      email: "duc.hoang@ship60.com",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "—",
    notes: "Cân nhắc thay thế đội ngũ CTV nội bộ bằng giải pháp staffing.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    lead: {
      stage: "Chờ ký hợp đồng",
      source: "Outbound",
      notes: "Đã thống nhất term, đang chờ legal duyệt hợp đồng cuối.",
      lastContactAt: "19/05/2026",
    },
  },
  {
    id: "viec-co",
    name: "Việc Có",
    industry: "Internal",
    city: "TP.HCM",
    status: "lead",
    verificationStatus: "pending",
    contact: {
      name: "Trịnh Anh Tuấn",
      title: "Internal Project Lead",
      phone: "0908 117 220",
      email: "tuan.trinh@viec.co",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 0,
    totalFreelancers: 0,
    monthlySpend: "₫0",
    joinedAt: "—",
    notes:
      "Internal pilot test cho event sampling nội bộ. Demo tài khoản, không phát sinh phí.",
    hiringRequests: [],
    shifts: [],
    billing: EMPTY_BILLING,
    lead: {
      stage: "Khám phá nhu cầu",
      source: "Event/Hội thảo",
      notes: "Nội bộ team event đang đánh giá flow, không tính doanh thu.",
      lastContactAt: "12/05/2026",
    },
  },

  {
    id: "nova-event-partners",
    name: "Kingfoodmart",
    industry: "Bán lẻ",
    city: "TP.HCM",
    status: "paused",
    verificationStatus: "active",
    contact: {
      name: "Phạm Đức Lâm",
      title: "Project Manager",
      phone: "0905 991 812",
      email: "lam.pham@kingfoodmart.vn",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 54,
    totalFreelancers: 3244,
    monthlySpend: "₫0",
    joinedAt: "08/2025",
    notes:
      "Đang tạm dừng do tái cơ cấu vận hành. Giữ hồ sơ để tái kích hoạt trong quý 3.",
    hiringRequests: [],
    shifts: [],
    billing: {
      currentMonth: "₫0",
      previousMonth: "₫128.000.000",
      outstanding: "₫18.000.000",
      paymentTerm: "30 ngày",
    },
    pausedInfo: {
      reason: "Khách tái cơ cấu vận hành nội bộ",
      since: "02/05/2026",
    },
  },
  {
    id: "tgdd",
    name: "TGDĐ",
    industry: "Bán lẻ",
    city: "TP.HCM",
    status: "paused",
    verificationStatus: "active",
    contact: {
      name: "Lê Quốc Trung",
      title: "Trưởng phòng tuyển dụng",
      phone: "0902 558 117",
      email: "trung.le@thegioididong.com",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 128,
    totalFreelancers: 8420,
    monthlySpend: "₫0",
    joinedAt: "06/2024",
    notes:
      "Tạm ngưng sau campaign Tết, dự kiến mở lại cho campaign tựu trường.",
    hiringRequests: [],
    shifts: [],
    billing: {
      currentMonth: "₫0",
      previousMonth: "₫184.000.000",
      outstanding: "₫32.500.000",
      paymentTerm: "30 ngày",
    },
    pausedInfo: {
      reason: "Hết mùa cao điểm, chờ campaign mới",
      since: "20/02/2026",
    },
  },
  {
    id: "shopee-retail",
    name: "Shopee Retail",
    industry: "E-commerce",
    city: "TP.HCM",
    status: "paused",
    verificationStatus: "active",
    contact: {
      name: "Đinh Thị Bích",
      title: "Vendor Manager",
      phone: "0938 220 117",
      email: "bich.dinh@shopee.com",
    },
    activeRequests: 0,
    openShifts: 0,
    totalJobs: 76,
    totalFreelancers: 5180,
    monthlySpend: "₫0",
    joinedAt: "01/2025",
    notes:
      "Khách yêu cầu pause để rà soát chi phí Q2. Đối soát kỳ trước vẫn còn treo.",
    hiringRequests: [],
    shifts: [],
    billing: {
      currentMonth: "₫0",
      previousMonth: "₫96.500.000",
      outstanding: "₫12.800.000",
      paymentTerm: "45 ngày",
    },
    pausedInfo: {
      reason: "Rà soát chi phí nội bộ Q2/2026",
      since: "28/04/2026",
    },
  },
];

export function getCustomerById(id: string): CustomerRecord | undefined {
  return CUSTOMERS.find((customer) => customer.id === id);
}
