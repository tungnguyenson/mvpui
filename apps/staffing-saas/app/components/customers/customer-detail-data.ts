import type { CustomerRecord } from "./customers-data";

export interface CustomerBrandProfile {
  brandName: string;
  urlSlug: string;
  urlLabel: string;
  serviceTags: string[];
}

export interface CustomerLegalProfile {
  legalName: string;
  taxId: string;
  legalAddress: string;
  invoiceEmail: string;
}

export interface CustomerManagementProfile {
  operationalStatusLabel: string;
  verificationStatusLabel: string;
  companyType: string;
  companySize: string;
  industry: string | null;
  isKeyAccount: boolean;
  accountManager: string;
  hubspotUrl: string | null;
}

export interface CustomerDocument {
  id: string;
  name: string;
  type: string;
  validFrom: string;
  validTo: string;
  renewalTerm: string;
  note: string;
  createdAt: string;
}

export interface CustomerUserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface CustomerPosition {
  id: string;
  name: string;
  description: string;
  requirements: string;
  benefits: string;
  instructions: string;
}

export interface CustomerLocation {
  id: string;
  shortName: string;
  address: string;
  province: string;
  jobCount: number;
  workerCount: number;
}

export type CustomerPricingStatus = "active" | "inactive";

export const CUSTOMER_PRICING_STATUS_LABELS: Record<
  CustomerPricingStatus,
  { label: string; color: "success" | "error" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  inactive: { label: "Ngừng hoạt động", color: "error" },
};

export type CustomerPricingShiftType =
  | "day_regular"
  | "day_overtime"
  | "night_regular"
  | "night_overtime"
  | "day_holiday"
  | "night_holiday";

export const CUSTOMER_PRICING_SHIFT_LABELS: Record<
  CustomerPricingShiftType,
  string
> = {
  day_regular: "Ca ngày thường",
  day_overtime: "Tăng ca ngày thường",
  night_regular: "Ca đêm - ngày thường",
  night_overtime: "Tăng ca đêm - ngày thường",
  day_holiday: "Ca ngày lễ",
  night_holiday: "Ca đêm ngày lễ",
};

export interface CustomerPricingRate {
  shiftType: CustomerPricingShiftType;
  payAmount: string;
  feeAmount: string;
  gm0: string;
  expectedShare: string | null;
  actualShareL30: string | null;
}

export interface CustomerPricingConfig {
  id: number;
  name: string;
  appliedFrom: string;
  appliedTo: string;
  province: string;
  jobType: string;
  category: string;
  serviceClass: string;
  status: CustomerPricingStatus;
  rates: CustomerPricingRate[];
}

export interface CustomerReconciliationContact {
  id: string;
  role: string;
  fullName: string;
  phone: string;
  email: string;
  coverageArea: string;
}

export interface CustomerReconciliation {
  cycle: {
    perMonth: string | null;
    startDay: string | null;
    endDay: string | null;
  };
  invoiceProfile: {
    statementDueRule: string | null;
    invoiceDueRule: string | null;
    debtCutoffRule: string | null;
    paymentTermDays: string | null;
    issuanceMethod: string | null;
    templateFile: string | null;
    templateLinkUrl: string | null;
    requiredDocs: string[];
  };
  contacts: CustomerReconciliationContact[];
  channel: {
    kind: string | null;
    bookingGroupUrl: string | null;
    reconciliationGroupUrl: string | null;
  };
  note: string | null;
}

export interface CustomerDetailExtras {
  brand: CustomerBrandProfile;
  legal: CustomerLegalProfile;
  management: CustomerManagementProfile;
  documents: CustomerDocument[];
  users: CustomerUserRecord[];
  positions: CustomerPosition[];
  locations: CustomerLocation[];
  pricingConfigs: CustomerPricingConfig[];
  reconciliation: CustomerReconciliation;
}

const DEFAULT_RATES_RETAIL: CustomerPricingRate[] = [
  { shiftType: "day_regular", payAmount: "40.000", feeAmount: "47.000", gm0: "15%", expectedShare: null, actualShareL30: null },
  { shiftType: "day_overtime", payAmount: "40.000", feeAmount: "47.000", gm0: "15%", expectedShare: null, actualShareL30: null },
  { shiftType: "night_regular", payAmount: "45.000", feeAmount: "52.000", gm0: "13%", expectedShare: null, actualShareL30: null },
  { shiftType: "night_overtime", payAmount: "45.000", feeAmount: "52.000", gm0: "13%", expectedShare: null, actualShareL30: null },
  { shiftType: "day_holiday", payAmount: "45.000", feeAmount: "52.000", gm0: "13%", expectedShare: null, actualShareL30: null },
  { shiftType: "night_holiday", payAmount: "45.000", feeAmount: "52.000", gm0: "13%", expectedShare: null, actualShareL30: null },
];

const DEFAULT_USERS: CustomerUserRecord[] = [
  { id: "u-1", fullName: "Nguyễn Thị Thu", email: "thuntc@example.com", phone: "0346 759 965" },
  { id: "u-2", fullName: "Trần Anh Cường", email: "anctt@example.com", phone: "0356 953 226" },
  { id: "u-3", fullName: "Bùi Duy Đức", email: "ducbd1@example.com", phone: "0978 142 908" },
];

const DEFAULT_LOCATIONS: CustomerLocation[] = [
  {
    id: "loc-1",
    shortName: "70 Lữ Gia",
    address: "70 Lữ Gia, lầu 4",
    province: "Hồ Chí Minh",
    jobCount: 48,
    workerCount: 0,
  },
  {
    id: "loc-2",
    shortName: "Boxme Long Biên Bốc Xếp - Phường Thạch Bàn - Long Biên - Hà Nội",
    address: "Số 1 Huỳnh Tấn Phát - Thạch Bàn - Long Biên - Hà Nội",
    province: "Hà Nội",
    jobCount: 0,
    workerCount: 0,
  },
  {
    id: "loc-3",
    shortName: "Chi nhánh 3",
    address: "Mì cay MC",
    province: "Đồng Nai",
    jobCount: 2,
    workerCount: 0,
  },
  {
    id: "loc-4",
    shortName: "Cầu Giấy - Hà Nội",
    address: "Số 152 Đường Trần Vĩ, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
    province: "Hà Nội",
    jobCount: 0,
    workerCount: 0,
  },
  {
    id: "loc-5",
    shortName: "Dự án Củ Chi",
    address: "Nhà Kho 2, Lô KB2, Khu Kho Bãi 2, đường N13, KCN Tân Phú Trung",
    province: "Hồ Chí Minh",
    jobCount: 1,
    workerCount: 0,
  },
  {
    id: "loc-6",
    shortName: "GHN Xuyên Á",
    address: "Lô HH, đường số 11, KCN Xuyên Á",
    province: "Long An",
    jobCount: 3,
    workerCount: 0,
  },
];

const POSITION_DETAILS_DEFAULT = {
  requirements:
    "- Nam/Nữ 18+, sức khỏe tốt\n- Có kinh nghiệm bán hàng/retail là một lợi thế\n- Trung thực, chăm chỉ, giao tiếp tốt",
  benefits:
    "- Thưởng KPI theo doanh thu\n- Thưởng chuyên cần\n- Hỗ trợ ăn trưa khi ca > 6 tiếng",
  instructions:
    "- Có mặt trước 15 phút để nhận đồng phục và brief\n- Mang theo CCCD bản gốc\n- Liên hệ quản lý ca tại quầy thông tin trước khi bắt đầu",
} as const;

const DEFAULT_POSITIONS: CustomerPosition[] = [
  {
    id: "pos-1",
    name: "CTV lấy hàng",
    description:
      "Nhận đơn theo wave, picking hàng tại kệ theo SKU, gom hàng về khu vực soạn đơn. Yêu cầu di chuyển nhiều, đọc được mã SKU và quét scanner.",
    ...POSITION_DETAILS_DEFAULT,
  },
  {
    id: "pos-2",
    name: "CTV đóng gói",
    description:
      "Soạn hàng theo đơn, kiểm tra số lượng và chất lượng, đóng gói bằng thùng/túi theo SOP, dán nhãn vận chuyển. Yêu cầu cẩn thận, làm việc theo nhịp.",
    ...POSITION_DETAILS_DEFAULT,
  },
  {
    id: "pos-3",
    name: "CTV giao hàng",
    description:
      "Nhận đơn từ kho, vận chuyển đến địa chỉ khách, thu tiền COD nếu có. Yêu cầu có phương tiện cá nhân, thông thuộc khu vực giao.",
    ...POSITION_DETAILS_DEFAULT,
  },
];

const SERVICE_TAGS_BASE = [
  "SaaS ATS - Quản lý Tuyển dụng ATS/Free",
  "On-demand Staffing - Kết nối và quản lý CTV thời vụ Staffing/Enterprise",
];

function slugUrl(slug: string): string {
  return `/job/${slug}`;
}

function defaultExtras(customer: CustomerRecord): CustomerDetailExtras {
  return {
    brand: {
      brandName: customer.name,
      urlSlug: slugUrl(customer.id),
      urlLabel: `job/${customer.id}`,
      serviceTags: SERVICE_TAGS_BASE,
    },
    legal: {
      legalName: `Công ty cổ phần ${customer.name}`,
      taxId: "0314521959",
      legalAddress: "405/15 Xô Viết Nghệ Tĩnh, Phường 24, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
      invoiceEmail: customer.contact.email,
    },
    management: {
      operationalStatusLabel: "Đang hoạt động",
      verificationStatusLabel: "Kích hoạt",
      companyType: "Khách hàng",
      companySize: "Big Corp",
      industry: customer.industry || null,
      isKeyAccount: true,
      accountManager: "Phan Quản Trị",
      hubspotUrl: null,
    },
    documents: [],
    users: DEFAULT_USERS,
    positions: DEFAULT_POSITIONS,
    locations: DEFAULT_LOCATIONS,
    pricingConfigs: defaultPricingConfigs(customer.city),
    reconciliation: emptyReconciliation(),
  };
}

function defaultPricingConfigs(city: string): CustomerPricingConfig[] {
  const province = city || "Hưng Yên";
  return [
    {
      id: 210,
      name: `CTV kho - ${province}`,
      appliedFrom: "01/03/2026",
      appliedTo: "31/12/2026",
      province,
      jobType: "CTV Làm việc kho",
      category: "Kho bãi",
      serviceClass: "Linh hoạt",
      status: "active",
      rates: DEFAULT_RATES_RETAIL,
    },
    {
      id: 207,
      name: `CTV kho - ${province}`,
      appliedFrom: "23/02/2026",
      appliedTo: "28/02/2026",
      province,
      jobType: "CTV Làm việc kho",
      category: "Kho bãi",
      serviceClass: "Linh hoạt",
      status: "inactive",
      rates: DEFAULT_RATES_RETAIL,
    },
    {
      id: 196,
      name: "CTV kho FFM - Hà Nội",
      appliedFrom: "06/01/2026",
      appliedTo: "31/12/2026",
      province: "Hà Nội",
      jobType: "CTV Làm việc kho",
      category: "Kho bãi",
      serviceClass: "Linh hoạt",
      status: "active",
      rates: DEFAULT_RATES_RETAIL,
    },
    {
      id: 168,
      name: "CTV Kho FFM - Long An",
      appliedFrom: "24/12/2025",
      appliedTo: "30/06/2026",
      province: "Long An",
      jobType: "CTV Làm việc kho",
      category: "Kho bãi",
      serviceClass: "Linh hoạt",
      status: "active",
      rates: DEFAULT_RATES_RETAIL,
    },
    {
      id: 83,
      name: "CTV kho FFM - Hà Nội",
      appliedFrom: "03/03/2025",
      appliedTo: "31/12/2025",
      province: "Hà Nội",
      jobType: "CTV Làm việc kho",
      category: "Kho bãi",
      serviceClass: "Linh hoạt",
      status: "inactive",
      rates: DEFAULT_RATES_RETAIL,
    },
  ];
}

function emptyReconciliation(): CustomerReconciliation {
  return {
    cycle: { perMonth: null, startDay: null, endDay: null },
    invoiceProfile: {
      statementDueRule: null,
      invoiceDueRule: null,
      debtCutoffRule: null,
      paymentTermDays: null,
      issuanceMethod: null,
      templateFile: null,
      templateLinkUrl: null,
      requiredDocs: [],
    },
    contacts: [],
    channel: {
      kind: null,
      bookingGroupUrl: null,
      reconciliationGroupUrl: null,
    },
    note: null,
  };
}

const CUSTOMER_EXTRAS_OVERRIDES: Partial<
  Record<string, (base: CustomerDetailExtras, customer: CustomerRecord) => CustomerDetailExtras>
> = {
  "highlands-commerce": (base) => ({
    ...base,
    brand: {
      brandName: "GHN Sorting",
      urlSlug: slugUrl("highlands-commerce"),
      urlLabel: "jobs/highlands-commerce",
      serviceTags: SERVICE_TAGS_BASE,
    },
    legal: {
      legalName: "Công ty cổ phần GHN Sorting",
      taxId: "0312987456",
      legalAddress: "27 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
      invoiceEmail: "billing@highlands.vn",
    },
    documents: [
      {
        id: "doc-1",
        name: "HĐ Khung dịch vụ Staffing 2026",
        type: "Hợp đồng",
        validFrom: "01/03/2026",
        validTo: "28/02/2027",
        renewalTerm: "Tự động gia hạn 12 tháng",
        note: "Đã ký bản gốc, file scan lưu Drive",
        createdAt: "02/03/2026",
      },
    ],
    reconciliation: {
      ...emptyReconciliation(),
      cycle: { perMonth: "1", startDay: "26 tháng trước", endDay: "25 tháng này" },
      invoiceProfile: {
        statementDueRule: "Ngày 28 mỗi tháng",
        invoiceDueRule: "Ngày 02 tháng kế tiếp",
        debtCutoffRule: "Theo ngày phát sinh ca",
        paymentTermDays: "30",
        issuanceMethod: "Hóa đơn điện tử qua MISA",
        templateFile: null,
        templateLinkUrl: null,
        requiredDocs: ["Bảng đối soát", "Hóa đơn GTGT", "Biên bản xác nhận khối lượng"],
      },
      contacts: [
        {
          id: "c-1",
          role: "Đối soát",
          fullName: "Nguyễn Hồng Nhung",
          phone: "0908 220 118",
          email: "nhung.nguyen@highlands.vn",
          coverageArea: "Toàn quốc",
        },
      ],
      channel: {
        kind: "Zalo",
        bookingGroupUrl: "https://zalo.me/g/booking-hc",
        reconciliationGroupUrl: "https://zalo.me/g/oxy-hc",
      },
      note: "Khách ưu tiên gửi sao kê đầu tháng để đối soát đồng thời với dòng tiền nội bộ.",
    },
  }),
  "nova-event-partners": (base) => ({
    ...base,
    management: {
      ...base.management,
      operationalStatusLabel: "Tạm dừng",
      verificationStatusLabel: "Kích hoạt",
      isKeyAccount: false,
    },
  }),
};

export function getCustomerDetailExtras(customer: CustomerRecord): CustomerDetailExtras {
  const base = defaultExtras(customer);
  const override = CUSTOMER_EXTRAS_OVERRIDES[customer.id];
  return override ? override(base, customer) : base;
}

