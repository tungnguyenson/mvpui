export type SwatContractStatus = "active" | "expired" | "missing";
export type SwatContractType = "official" | "trial";

export interface SwatContractRecord {
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
  contract: {
    type: SwatContractType;
    status: SwatContractStatus;
    startDate: string;
    endDate: string;
    fileUrl?: string;
  };
  note?: {
    title: string;
    timestamp: string;
    author: string;
  };
}

export const SWAT_CONTRACT_TYPE_LABELS: Record<
  SwatContractType,
  { label: string; color: "success" | "sky" }
> = {
  official: { label: "Chính thức", color: "success" },
  trial: { label: "Thử việc", color: "sky" },
};

export const SWAT_CONTRACT_STATUS_LABELS: Record<
  SwatContractStatus,
  { label: string; color: "success" | "sky" | "error" }
> = {
  active: { label: "Đang hoạt động", color: "success" },
  expired: { label: "H/Đ đã hoàn thành", color: "sky" },
  missing: { label: "Chưa có hợp đồng", color: "error" },
};

export const SWAT_CONTRACTS: SwatContractRecord[] = [
  {
    id: "swat-le-van-sanh-active",
    worker: {
      name: "Lê Văn Sanh",
      phone: "0379445218",
      dob: "22/03/1989",
      gender: "Nam",
      age: 37,
    },
    company: { name: "Shopee Retail", city: "Hồ Chí Minh" },
    contract: {
      type: "official",
      status: "active",
      startDate: "01/09/2025",
      endDate: "31/08/2026",
      fileUrl: "#",
    },
    note: {
      title: "Cập nhật hợp đồng thử việc",
      timestamp: "03/11/2025 11:50",
      author: "Thi Nguyễn",
    },
  },
  {
    id: "swat-le-van-sanh-trial",
    worker: {
      name: "Lê Văn Sanh",
      phone: "0379445218",
      dob: "22/03/1989",
      gender: "Nam",
      age: 37,
    },
    company: { name: "Shopee Retail", city: "Hồ Chí Minh" },
    contract: {
      type: "trial",
      status: "expired",
      startDate: "01/08/2025",
      endDate: "31/08/2025",
    },
    note: {
      title: "migrate data",
      timestamp: "03/11/2025 11:45",
      author: "Tô Tấn Vĩ",
    },
  },
];
