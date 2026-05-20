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
    id: "acme-commerce",
    accountNumber: "6",
    companyName: "CÔNG TY CỔ PHẦN ACME COMMERCE",
    brandName: null,
    taxId: "0900000006",
    statementDueRule: "Ngày 10 tháng M+2",
    invoiceDueRule: "Ngày 12 tháng M+2",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "An",
        phone: "0900000601",
        email: "an.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "northwind-logistics",
    accountNumber: "185",
    companyName: "Công ty Cổ phần Northwind Logistics",
    brandName: null,
    taxId: "0900000185",
    statementDueRule: "Ngày 28 tháng M+1",
    invoiceDueRule: "Ngày 3-4 tháng M+2",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Mr. Long",
        phone: "0900001850",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "swiftship-sorting",
    accountNumber: "1591",
    companyName: "Công ty Cổ phần dịch vụ SwiftShip",
    brandName: "SwiftShip Sorting",
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
    id: "voltmart-appliances",
    accountNumber: "1757",
    companyName: "CÔNG TY CỔ PHẦN VOLTMART APPLIANCES",
    brandName: null,
    taxId: "0900001757",
    statementDueRule: "Ngày 04",
    invoiceDueRule: "Ngày 05",
    paymentTermDays: 15,
    invoiceIssuanceMethod:
      "Xuất theo bảng kê, hồi lại OPS trước khi xuất nếu có nhiều kho",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "DUONG SON",
        phone: "0900017571",
        email: "son.demo@example.com",
      },
      {
        name: "Mr Trung",
        phone: "0900017572",
      },
    ],
    note: null,
  },
  {
    id: "blueriver-marketplace",
    accountNumber: "203",
    companyName: "CÔNG TY TNHH BLUERIVER MARKETPLACE",
    brandName: "BlueRiver Logistics",
    taxId: "0900000203",
    statementDueRule: "Ngày 5 tháng M+1",
    invoiceDueRule: "Ngày 10 tháng M+1",
    paymentTermDays: 45,
    invoiceIssuanceMethod: "Xuất theo bảng kê, gộp theo trung tâm phân loại",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Linh",
        phone: "0900002031",
        email: "linh.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "orangefox-express",
    accountNumber: "412",
    companyName: "CÔNG TY TNHH ORANGEFOX EXPRESS",
    brandName: "OrangeFox Express",
    taxId: "0900000412",
    statementDueRule: "Ngày 2 tháng M+1",
    invoiceDueRule: "Ngày 5 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Hoang Anh",
        phone: "0900004121",
        email: "anh.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
      {
        name: "Quynh",
        phone: "0900004122",
        email: "quynh.demo@example.com",
        role: "Người chốt sao kê phí",
      },
    ],
    note: null,
  },
  {
    id: "redstar-post",
    accountNumber: "78",
    companyName: "TỔNG CÔNG TY CỔ PHẦN REDSTAR POST",
    brandName: "RedStar Post",
    taxId: "0900000078",
    statementDueRule: "Ngày 15 tháng M+1",
    invoiceDueRule: "Ngày 20 tháng M+1",
    paymentTermDays: 45,
    invoiceIssuanceMethod: "Xuất theo bảng kê, gộp toàn quốc",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy", "contractCopy"],
    contacts: [
      {
        name: "Vuong",
        phone: "0900000781",
        email: "vuong.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "gomove-delivery",
    accountNumber: "942",
    companyName: "CÔNG TY CỔ PHẦN GOMOVE DELIVERY",
    brandName: "GoMove",
    taxId: "0900000942",
    statementDueRule: "Ngày 3 tháng M+1",
    invoiceDueRule: "Ngày 7 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Phong",
        phone: "0900009421",
        email: "phong.demo@example.com",
      },
    ],
    note: "Yêu cầu gửi soft copy trước hạn",
  },
  {
    id: "greencare-pharma",
    accountNumber: "311",
    companyName: "CÔNG TY CỔ PHẦN DƯỢC PHẨM GREENCARE",
    brandName: "GreenCare",
    taxId: "0900000311",
    statementDueRule: "Ngày 8 tháng M+1",
    invoiceDueRule: "Ngày 12 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Phuoc",
        phone: "0900003111",
        email: "phuoc.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "nimble-rides",
    accountNumber: "528",
    companyName: "CÔNG TY CỔ PHẦN NIMBLE RIDES",
    brandName: "Nimble",
    taxId: "0900000528",
    statementDueRule: "Ngày 6 tháng M+1",
    invoiceDueRule: "Ngày 10 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest"],
    contacts: [
      {
        name: "Bao",
        phone: "0900005281",
        email: "bao.demo@example.com",
      },
    ],
    note: null,
  },
  {
    id: "summit-foods",
    accountNumber: "67",
    companyName: "CÔNG TY TNHH DỊCH VỤ THỰC PHẨM SUMMIT",
    brandName: "Summit Coffee",
    taxId: "0900000067",
    statementDueRule: "Ngày 25 tháng M",
    invoiceDueRule: "Ngày 30 tháng M",
    paymentTermDays: 15,
    invoiceIssuanceMethod: "Xuất theo bảng kê, tách theo cửa hàng",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Hoa",
        phone: "0900000671",
        email: "hoa.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
  {
    id: "redloop-marts",
    accountNumber: "144",
    companyName: "CÔNG TY TNHH REDLOOP MARTS",
    brandName: "RedLoop",
    taxId: "0900000144",
    statementDueRule: "Ngày 2 tháng M+1",
    invoiceDueRule: "Ngày 5 tháng M+1",
    paymentTermDays: 30,
    invoiceIssuanceMethod: "Xuất theo bảng kê",
    paymentDocs: ["einvoice", "paymentRequest", "signedHardcopy"],
    contacts: [
      {
        name: "Tu",
        phone: "0900001441",
        email: "tu.demo@example.com",
        role: "Người nhận hồ sơ thanh toán",
      },
    ],
    note: null,
  },
];
