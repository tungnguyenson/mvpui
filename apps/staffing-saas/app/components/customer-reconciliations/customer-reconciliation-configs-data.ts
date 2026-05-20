export interface ReconciliationContact {
  name: string;
  phone: string;
  email?: string;
  role?: string;
}

export interface CustomerReconciliationConfig {
  id: string;
  accountNumber: string;
  companyName: string;
  brandName: string | null;
  logoUrl: string;
  taxId: string;
  statementDueRule: string;
  invoiceDueRule: string;
  paymentTermDays: number;
  invoiceIssuanceMethod: string;
  paymentDocs: string[];
  contacts: ReconciliationContact[];
  note: string | null;
}

export const PAYMENT_DOC_LABELS: Record<string, string> = {
  einvoice: "Hóa đơn điện tử",
  paymentRequest: "Đề nghị thanh toán",
  signedHardcopy: "Sao kê bản cứng - có chữ ký + dấu",
  contractCopy: "Bản sao hợp đồng",
  shippingProof: "Chứng từ giao nhận",
};

export const CUSTOMER_RECONCILIATION_CONFIGS: CustomerReconciliationConfig[] = [
  {
    id: "ghn-sorting",
    accountNumber: "1591",
    companyName: "CÔNG TY CỔ PHẦN GIAO HÀNG NHANH SORTING",
    brandName: "GHN Sorting",
    logoUrl: "https://business.viec.co/storage/companies/1591/logo.png",
    taxId: "0900001591",
    statementDueRule: "Ngày 1",
    invoiceDueRule: "Ngày 4",
    paymentTermDays: 30,
    invoiceIssuanceMethod:
      "Xuất theo bảng kê (trừ phí phạt nếu có), xuất riêng các kho phân loại Hà Nội, Hưng Yên, HCM 01, HCM 20, Giao hàng nặng KHL (miền Nam), GH nặng Miền Nam, GH nặng Hưng Yên",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Ms Thu",
        phone: "0900015911",
        email: "thu.demo@example.com",
      },
      {
        name: "Mr Cong",
        phone: "0900015912",
        email: "cong.demo@example.com",
      },
      {
        name: "Mr. Bao",
        phone: "0900015913",
        email: "bao.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
      {
        name: "Mr. Huy",
        phone: "0900015914",
        email: "huy.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
      {
        name: "Ms. Trang",
        phone: "0900015915",
        email: "trang.demo@example.com",
        role: "Người chốt sao kê phí",
      },
    ],
    note: "Có bonus",
  },
  {
    id: "ninja-van",
    accountNumber: "42",
    companyName: "CÔNG TY TNHH NINJA VAN VIỆT NAM",
    brandName: "Ninja Van",
    logoUrl: "https://business.viec.co/storage/companies/42/logo.png",
    taxId: "0900000042",
    statementDueRule: "Ngày 28 tháng M+1",
    invoiceDueRule: "Ngày 3-4 tháng M+2",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Mr. Long",
        phone: "0900000421",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "shopee-express-official",
    accountNumber: "2312",
    companyName: "CÔNG TY TNHH SHOPEE EXPRESS OFFICIAL",
    brandName: "Shopee Express Official",
    logoUrl: "https://business.viec.co/storage/companies/2312/logo.png",
    taxId: "0900002312",
    statementDueRule: "Ngày 10 tháng M+2",
    invoiceDueRule: "Ngày 12 tháng M+2",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "An",
        phone: "0900023121",
        email: "an.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "kingfoodmart",
    accountNumber: "2081",
    companyName: "CÔNG TY CỔ PHẦN KINGFOODMART",
    brandName: "Kingfoodmart",
    logoUrl: "https://business.viec.co/storage/companies/July2021/logo83799.png",
    taxId: "0900002081",
    statementDueRule: "Ngày 25 tháng M",
    invoiceDueRule: "Ngày 30 tháng M",
    paymentTermDays: 15,
    invoiceIssuanceMethod: "Xuất theo bảng kê, tách theo cửa hàng",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Hoa",
        phone: "0900020811",
        email: "hoa.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "tiki-now-logistics",
    accountNumber: "2790",
    companyName: "CÔNG TY TNHH TIKINOW SMART LOGISTICS",
    brandName: "Tiki Now Smart Logistics",
    logoUrl: "https://business.viec.co/storage/companies/January2023/logo_(1).png",
    taxId: "0900002790",
    statementDueRule: "Ngày 5 tháng M+1",
    invoiceDueRule: "Ngày 10 tháng M+1",
    paymentTermDays: 45,
    invoiceIssuanceMethod: "Xuất theo bảng kê, gộp theo trung tâm phân loại",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Linh",
        phone: "0900027901",
        email: "linh.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "boxme",
    accountNumber: "2699",
    companyName: "CÔNG TY CỔ PHẦN BOXME GLOBAL",
    brandName: "Boxme",
    logoUrl: "https://business.viec.co/storage/companies/October2022/Logo-Boxme-New.png",
    taxId: "0900002699",
    statementDueRule: "Ngày 3 tháng M+1",
    invoiceDueRule: "Ngày 7 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Phong",
        phone: "0900026991",
        email: "phong.demo@example.com",
      },
    ],
    note: "Yêu cầu gửi soft copy trước hạn",
  },
  {
    id: "ghtk",
    accountNumber: "1553",
    companyName: "CÔNG TY CỔ PHẦN GIAO HÀNG TIẾT KIỆM",
    brandName: "GHTK",
    logoUrl: "https://business.viec.co/storage/companies/1553/logo.jpg",
    taxId: "0900001553",
    statementDueRule: "Ngày 04",
    invoiceDueRule: "Ngày 05",
    paymentTermDays: 15,
    invoiceIssuanceMethod:
      "Xuất theo bảng kê, hồi lại OPS trước khi xuất nếu có nhiều kho",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "DUONG SON",
        phone: "0900015531",
        email: "son.demo@example.com",
      },
      {
        name: "Mr Trung",
        phone: "0900015532",
      },
    ],
    note: null,
  },
  {
    id: "viettel-post-hcm",
    accountNumber: "2771",
    companyName: "TỔNG CÔNG TY CỔ PHẦN BƯU CHÍNH VIETTEL HCM",
    brandName: "Viettel Post HCM",
    logoUrl: "https://business.viec.co/storage/companies/December2022/unnamed.png",
    taxId: "0900002771",
    statementDueRule: "Ngày 15 tháng M+1",
    invoiceDueRule: "Ngày 20 tháng M+1",
    paymentTermDays: 45,
    invoiceIssuanceMethod: "Xuất theo bảng kê, gộp toàn quốc",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy", "contractCopy"],
    contacts: [
      {
        name: "Vuong",
        phone: "0900027711",
        email: "vuong.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "skt-vina",
    accountNumber: "1540",
    companyName: "CÔNG TY TNHH SKT VINA",
    brandName: "SKT Vina",
    logoUrl: "https://business.viec.co/storage/companies/1540/logo.png",
    taxId: "0900001540",
    statementDueRule: "Ngày 8 tháng M+1",
    invoiceDueRule: "Ngày 12 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Phuoc",
        phone: "0900015401",
        email: "phuoc.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "shopee-express",
    accountNumber: "3078",
    companyName: "CÔNG TY TNHH SPX EXPRESS",
    brandName: "Shopee Express",
    logoUrl: "https://business.viec.co/storage/companies/3078/logo.png",
    taxId: "0900003078",
    statementDueRule: "Ngày 6 tháng M+1",
    invoiceDueRule: "Ngày 10 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Bao",
        phone: "0900030781",
        email: "bao.demo@example.com",
      },
    ],
    note: null,
  },
  {
    id: "seedcom-food",
    accountNumber: "2400",
    companyName: "CÔNG TY CỔ PHẦN SEEDCOM FOOD",
    brandName: "Seedcom Food",
    logoUrl:
      "https://business.viec.co/storage/companies/April2022/62069254_1170385843140023_3169201825928708096_n.png",
    taxId: "0900002400",
    statementDueRule: "Ngày 2 tháng M+1",
    invoiceDueRule: "Ngày 5 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Hoang Anh",
        phone: "0900024001",
        email: "anh.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
      {
        name: "Quynh",
        phone: "0900024002",
        email: "quynh.demo@example.com",
        role: "Người chốt sao kê phí",
      },
    ],
    note: null,
  },
  {
    id: "shopee-retail",
    accountNumber: "3128",
    companyName: "CÔNG TY TNHH S-RETAIL VN",
    brandName: "Shopee Retail",
    logoUrl: "https://business.viec.co/storage/companies/3128/logo.jpg",
    taxId: "0900003128",
    statementDueRule: "Ngày 2 tháng M+1",
    invoiceDueRule: "Ngày 5 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Tu",
        phone: "0900031281",
        email: "tu.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
];
