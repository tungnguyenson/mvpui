export type WorkerStatus = "active" | "pending" | "locked";

export interface WorkerVerificationSnapshot {
	status: "Đã xác thực" | "Chờ bổ sung" | "Đang rà soát";
	phone: string;
	nationalId: string;
	taxId: string;
}

export interface WorkerViolationSnapshot {
	totalCases: number;
	latestLevel: "Không có" | "Nhẹ" | "Nghiêm trọng";
	latestNote: string;
}

export interface WorkerPaymentSnapshot {
	batchId: string;
	amount: string;
	status: "Đã chốt" | "Chờ duyệt" | "Chờ chuyển khoản";
}

export interface WorkerShiftHistory {
	id: string;
	shiftName: string;
	customer: string;
	schedule: string;
	checkInStatus: "Đúng giờ" | "Đi trễ" | "Vắng mặt";
	payout: string;
}

/** CCCD/CMND identity + eKYC checklist (legacy "Xử lý hồ sơ" view). */
export interface WorkerIdentity {
	nationalId: string;
	fullNameOnId: string;
	dob: string;
	gender: "Nam" | "Nữ";
	issuedDate: string;
	expiryDate: string;
	issuedPlace: string;
	permanentAddress: string;
	ekyc: {
		service: boolean;
		fraudCheck: boolean;
		logicCheck: boolean;
		ocr: boolean;
	};
}

/** Địa chỉ sinh sống. */
export interface WorkerResidence {
	province: string;
	district: string;
	ward: string;
	street: string;
}

/** Tài khoản ngân hàng nhận lương. */
export interface WorkerBankAccount {
	ownerType: "Chính chủ" | "Không chính chủ";
	bankName: string;
	bankBin: string;
	accountNumber: string;
	accountHolder: string;
	verified: boolean;
	verifiedBy?: string;
}

/** Mã số thuế TNCN + cam kết thuế. */
export interface WorkerTaxInfo {
	taxId: string;
	taxStatus: "Đã kiểm tra" | "Chưa kiểm tra";
	commitment2026: "Đã ký" | "Chưa ký";
}

export interface WorkerSocialInsurance {
	code: string | null;
}

export interface WorkerEmergencyContact {
	name: string;
	phone: string;
	relationship: string;
}

export type WorkerJobKind = "current" | "applying" | "done";

export interface WorkerJob {
	id: string;
	kind: WorkerJobKind;
	period: string;
	company: string;
	position: string;
	hours: string;
}

export interface WorkerCancellation {
	id: string;
	date: string;
	shiftName: string;
	reason: string;
	penalty: string;
}

export interface WorkerChangeLogEntry {
	at: string;
	actor: string;
	field: string;
	from: string;
	to: string;
}

export type WorkerPaymentMethod = "cash" | "bank";

export interface WorkerRecord {
	id: string;
	name: string;
	city: string;
	district: string;
	phone: string;
	status: WorkerStatus;
	rating: string;
	weeklyShifts: number;
	totalShifts: number;
	joinedAt: string;
	tags: string[];
	bio: string;
	verification: WorkerVerificationSnapshot;
	violations: WorkerViolationSnapshot;
	payment: WorkerPaymentSnapshot;
	recentShifts: WorkerShiftHistory[];
	// Extended profile (legacy worker-profile admin → routeless tabs).
	identity?: WorkerIdentity;
	residence?: WorkerResidence;
	bankAccount?: WorkerBankAccount;
	tax?: WorkerTaxInfo;
	socialInsurance?: WorkerSocialInsurance;
	emergencyContact?: WorkerEmergencyContact;
	paymentMethod?: WorkerPaymentMethod;
	jobs?: WorkerJob[];
	cancellations?: WorkerCancellation[];
	changeLog?: WorkerChangeLogEntry[];
}

export const WORKER_STATUS_LABELS: Record<
	WorkerStatus,
	{ label: string; color: "success" | "warning" | "error" }
> = {
	active: { label: "Đang hoạt động", color: "success" },
	pending: { label: "Chờ duyệt", color: "warning" },
	locked: { label: "Tạm khóa", color: "error" },
};

export const ISSUED_PLACE_DEFAULT = "Cục Cảnh sát QLHC về TTXH";

export const WORKERS: WorkerRecord[] = [
	{
		id: "nguyen-van-an",
		name: "Nguyễn Văn An",
		city: "TP.HCM",
		district: "Quận 1",
		phone: "0901 234 567",
		status: "active",
		rating: "4.9",
		weeklyShifts: 6,
		totalShifts: 86,
		joinedAt: "07/2025",
		tags: ["Bán lẻ", "Activation", "Ca cuối tuần"],
		bio: "Worker chuyên bán hàng cuối tuần, tỉ lệ đúng giờ cao và thường được khách hàng yêu cầu quay lại.",
		verification: {
			status: "Đã xác thực",
			phone: "Đã xác minh",
			nationalId: "079205009871",
			taxId: "8563201147",
		},
		violations: {
			totalCases: 0,
			latestLevel: "Không có",
			latestNote: "Không ghi nhận vi phạm trong 90 ngày gần nhất.",
		},
		payment: {
			batchId: "PAY-0520-A",
			amount: "₫4.850.000",
			status: "Chờ chuyển khoản",
		},
		recentShifts: [
			{
				id: "SH-801",
				shiftName: "Ca bán hàng cuối tuần",
				customer: "GHN Sorting",
				schedule: "18/05, 08:00 - 17:00",
				checkInStatus: "Đúng giờ",
				payout: "₫650.000",
			},
			{
				id: "SH-784",
				shiftName: "Ca activation quầy sampling",
				customer: "GHN Sorting",
				schedule: "17/05, 10:00 - 18:00",
				checkInStatus: "Đúng giờ",
				payout: "₫720.000",
			},
		],
		identity: {
			nationalId: "079205009871",
			fullNameOnId: "NGUYỄN VĂN AN",
			dob: "12/03/1996",
			gender: "Nam",
			issuedDate: "15/08/2021",
			expiryDate: "12/03/2036",
			issuedPlace: ISSUED_PLACE_DEFAULT,
			permanentAddress: "12 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
			ekyc: { service: true, fraudCheck: true, logicCheck: true, ocr: true },
		},
		residence: {
			province: "TP.HCM",
			district: "Quận 1",
			ward: "Phường Bến Nghé",
			street: "12 Lê Lợi",
		},
		bankAccount: {
			ownerType: "Chính chủ",
			bankName: "NH TMCP Quân Đội (MB Bank)",
			bankBin: "970422",
			accountNumber: "0927197188",
			accountHolder: "NGUYEN VAN AN",
			verified: true,
			verifiedBy: "Nguyễn Nhân Lâm",
		},
		tax: { taxId: "8563201147", taxStatus: "Đã kiểm tra", commitment2026: "Đã ký" },
		socialInsurance: { code: "7920050098" },
		emergencyContact: { name: "Nguyễn Thị Hoa", phone: "0912 000 111", relationship: "mẹ" },
		paymentMethod: "bank",
		jobs: [
			{
				id: "JOB-A1",
				kind: "current",
				period: "01/06 - nay",
				company: "GHN Sorting",
				position: "Nhân viên bán hàng cuối tuần",
				hours: "48h / tháng",
			},
			{
				id: "JOB-A2",
				kind: "applying",
				period: "Ứng tuyển 06/06",
				company: "Shopee Express Official",
				position: "Activation sampling",
				hours: "—",
			},
			{
				id: "JOB-A3",
				kind: "done",
				period: "03/2025 - 05/2025",
				company: "GHN Sorting",
				position: "Nhân viên sampling",
				hours: "120h",
			},
		],
		cancellations: [],
		changeLog: [
			{
				at: "18/05/2026 09:12",
				actor: "Nguyễn Nhân Lâm",
				field: "Tài khoản ngân hàng",
				from: "Chưa duyệt",
				to: "Đã duyệt",
			},
			{
				at: "07/07/2025 14:30",
				actor: "Hệ thống",
				field: "Trạng thái",
				from: "Chờ duyệt",
				to: "Đang hoạt động",
			},
		],
	},
	{
		id: "tran-thi-bich",
		name: "Trần Thị Bích",
		city: "Hà Nội",
		district: "Cầu Giấy",
		phone: "0902 345 678",
		status: "active",
		rating: "4.8",
		weeklyShifts: 5,
		totalShifts: 72,
		joinedAt: "09/2025",
		tags: ["Lễ tân", "CSKH", "Front desk"],
		bio: "Phù hợp các vị trí front desk và hỗ trợ khách hàng tại điểm bán hoặc phòng khám.",
		verification: {
			status: "Đã xác thực",
			phone: "Đã xác minh",
			nationalId: "001305118745",
			taxId: "1093347812",
		},
		violations: {
			totalCases: 1,
			latestLevel: "Nhẹ",
			latestNote: "Đi trễ 12 phút ở ca ngày 03/05, đã nhắc nhở.",
		},
		payment: {
			batchId: "PAY-0520-A",
			amount: "₫3.920.000",
			status: "Chờ duyệt",
		},
		recentShifts: [
			{
				id: "SH-702",
				shiftName: "Ca lễ tân chiều",
				customer: "Shopee Express Official",
				schedule: "19/05, 13:00 - 18:00",
				checkInStatus: "Đúng giờ",
				payout: "₫480.000",
			},
			{
				id: "SH-695",
				shiftName: "Ca hỗ trợ khách hàng sáng",
				customer: "Shopee Express Official",
				schedule: "17/05, 08:00 - 12:00",
				checkInStatus: "Đi trễ",
				payout: "₫360.000",
			},
		],
		identity: {
			nationalId: "001305118745",
			fullNameOnId: "TRẦN THỊ BÍCH",
			dob: "28/11/1998",
			gender: "Nữ",
			issuedDate: "02/06/2021",
			expiryDate: "28/11/2038",
			issuedPlace: ISSUED_PLACE_DEFAULT,
			permanentAddress: "tổ 5, Phường Dịch Vọng, Cầu Giấy, Hà Nội",
			ekyc: { service: true, fraudCheck: true, logicCheck: true, ocr: true },
		},
		residence: {
			province: "Hà Nội",
			district: "Quận Cầu Giấy",
			ward: "Phường Dịch Vọng",
			street: "tổ 5",
		},
		bankAccount: {
			ownerType: "Chính chủ",
			bankName: "NH TMCP Ngoại Thương (Vietcombank)",
			bankBin: "970436",
			accountNumber: "0011004567890",
			accountHolder: "TRAN THI BICH",
			verified: true,
			verifiedBy: "Phạm Quỳnh Anh",
		},
		tax: { taxId: "1093347812", taxStatus: "Đã kiểm tra", commitment2026: "Đã ký" },
		socialInsurance: { code: "0130511874" },
		emergencyContact: { name: "Trần Văn Minh", phone: "0987 222 333", relationship: "anh trai" },
		paymentMethod: "bank",
		jobs: [
			{
				id: "JOB-B1",
				kind: "current",
				period: "10/2025 - nay",
				company: "Shopee Express Official",
				position: "Lễ tân front desk",
				hours: "40h / tháng",
			},
			{
				id: "JOB-B2",
				kind: "done",
				period: "09/2025",
				company: "Phòng khám Đa khoa An Khang",
				position: "Hỗ trợ tiếp đón",
				hours: "64h",
			},
		],
		cancellations: [
			{
				id: "CXL-B1",
				date: "03/05/2026",
				shiftName: "Ca lễ tân chiều",
				reason: "Bận việc gia đình, báo trước 1 ngày",
				penalty: "₫0",
			},
		],
		changeLog: [
			{
				at: "03/05/2026 16:40",
				actor: "Phạm Quỳnh Anh",
				field: "Vi phạm",
				from: "0 case",
				to: "1 case (Nhẹ)",
			},
		],
	},
	{
		id: "le-hoang-cuong",
		name: "Lê Hoàng Cường",
		city: "Đà Nẵng",
		district: "Hải Châu",
		phone: "0903 456 789",
		status: "pending",
		rating: "4.5",
		weeklyShifts: 3,
		totalShifts: 40,
		joinedAt: "01/2026",
		tags: ["Kho vận", "Ca đêm"],
		bio: "Đã có kinh nghiệm kho nhưng hồ sơ xác thực vẫn cần bổ sung thêm tài liệu thuế.",
		verification: {
			status: "Chờ bổ sung",
			phone: "Đã xác minh",
			nationalId: "201304992118",
			taxId: "Chưa nộp",
		},
		violations: {
			totalCases: 0,
			latestLevel: "Không có",
			latestNote: "Chưa ghi nhận vi phạm.",
		},
		payment: {
			batchId: "PAY-0513-B",
			amount: "₫2.410.000",
			status: "Đã chốt",
		},
		recentShifts: [
			{
				id: "SH-910",
				shiftName: "Ca kho đêm A",
				customer: "Ninja Van",
				schedule: "18/05, 22:00 - 06:00",
				checkInStatus: "Đúng giờ",
				payout: "₫580.000",
			},
			{
				id: "SH-901",
				shiftName: "Ca đóng gói sáng",
				customer: "Ninja Van",
				schedule: "16/05, 07:00 - 15:00",
				checkInStatus: "Đúng giờ",
				payout: "₫470.000",
			},
		],
		identity: {
			nationalId: "201304992118",
			fullNameOnId: "LÊ HOÀNG CƯỜNG",
			dob: "05/07/1994",
			gender: "Nam",
			issuedDate: "20/01/2022",
			expiryDate: "05/07/2034",
			issuedPlace: ISSUED_PLACE_DEFAULT,
			permanentAddress: "45 Núi Thành, Phường Hòa Cường Bắc, Hải Châu, Đà Nẵng",
			ekyc: { service: true, fraudCheck: true, logicCheck: false, ocr: true },
		},
		residence: {
			province: "Đà Nẵng",
			district: "Quận Hải Châu",
			ward: "Phường Hòa Cường Bắc",
			street: "45 Núi Thành",
		},
		bankAccount: {
			ownerType: "Chính chủ",
			bankName: "NH TMCP Kỹ Thương (Techcombank)",
			bankBin: "970407",
			accountNumber: "19036812345678",
			accountHolder: "LE HOANG CUONG",
			verified: false,
		},
		tax: { taxId: "Chưa có MST", taxStatus: "Chưa kiểm tra", commitment2026: "Chưa ký" },
		socialInsurance: { code: null },
		emergencyContact: { name: "Lê Thị Lan", phone: "0905 333 444", relationship: "vợ" },
		paymentMethod: "bank",
		jobs: [
			{
				id: "JOB-C1",
				kind: "applying",
				period: "Ứng tuyển 05/06",
				company: "Ninja Van",
				position: "Nhân viên kho ca đêm",
				hours: "—",
			},
			{
				id: "JOB-C2",
				kind: "done",
				period: "02/2026 - 05/2026",
				company: "Ninja Van",
				position: "Nhân viên đóng gói",
				hours: "96h",
			},
		],
		cancellations: [],
		changeLog: [
			{
				at: "20/01/2026 10:05",
				actor: "Hệ thống",
				field: "Hồ sơ xác thực",
				from: "Mới tạo",
				to: "Chờ bổ sung (thiếu MST)",
			},
		],
	},
	{
		id: "pham-thu-dung",
		name: "Phạm Thu Dung",
		city: "Cần Thơ",
		district: "Ninh Kiều",
		phone: "0904 567 890",
		status: "active",
		rating: "5.0",
		weeklyShifts: 7,
		totalShifts: 91,
		joinedAt: "05/2025",
		tags: ["Bán lẻ", "Siêu thị", "Chăm sóc quầy"],
		bio: "Worker chủ lực cho các ca retail dài ngày, phản hồi tốt từ quản lý điểm bán.",
		verification: {
			status: "Đã xác thực",
			phone: "Đã xác minh",
			nationalId: "366205772931",
			taxId: "4721984430",
		},
		violations: {
			totalCases: 0,
			latestLevel: "Không có",
			latestNote: "Không có vi phạm.",
		},
		payment: {
			batchId: "PAY-0520-A",
			amount: "₫5.210.000",
			status: "Chờ chuyển khoản",
		},
		recentShifts: [
			{
				id: "SH-612",
				shiftName: "Ca chăm sóc quầy FMCG",
				customer: "GHN Sorting",
				schedule: "19/05, 09:00 - 18:00",
				checkInStatus: "Đúng giờ",
				payout: "₫690.000",
			},
		],
		identity: {
			nationalId: "366205772931",
			fullNameOnId: "PHẠM THU DUNG",
			dob: "19/09/1995",
			gender: "Nữ",
			issuedDate: "11/05/2021",
			expiryDate: "19/09/2035",
			issuedPlace: ISSUED_PLACE_DEFAULT,
			permanentAddress: "78 Trần Văn Hoài, Phường An Hòa, Ninh Kiều, Cần Thơ",
			ekyc: { service: true, fraudCheck: true, logicCheck: true, ocr: true },
		},
		residence: {
			province: "Cần Thơ",
			district: "Quận Ninh Kiều",
			ward: "Phường An Hòa",
			street: "78 Trần Văn Hoài",
		},
		bankAccount: {
			ownerType: "Chính chủ",
			bankName: "NH TMCP Quân Đội (MB Bank)",
			bankBin: "970422",
			accountNumber: "0904567890",
			accountHolder: "PHAM THU DUNG",
			verified: true,
			verifiedBy: "Nguyễn Nhân Lâm",
		},
		tax: { taxId: "4721984430", taxStatus: "Đã kiểm tra", commitment2026: "Đã ký" },
		socialInsurance: { code: "3662057729" },
		emergencyContact: { name: "Phạm Văn Tâm", phone: "0911 444 555", relationship: "bố" },
		paymentMethod: "bank",
		jobs: [
			{
				id: "JOB-D1",
				kind: "current",
				period: "06/2025 - nay",
				company: "GHN Sorting",
				position: "Nhân viên chăm sóc quầy",
				hours: "56h / tháng",
			},
			{
				id: "JOB-D2",
				kind: "done",
				period: "05/2025",
				company: "Co.opmart Cần Thơ",
				position: "Nhân viên bán lẻ",
				hours: "80h",
			},
		],
		cancellations: [],
		changeLog: [
			{
				at: "05/05/2025 08:00",
				actor: "Hệ thống",
				field: "Trạng thái",
				from: "Chờ duyệt",
				to: "Đang hoạt động",
			},
		],
	},
	{
		id: "vu-minh-duc",
		name: "Vũ Minh Đức",
		city: "TP.HCM",
		district: "Thủ Đức",
		phone: "0905 678 901",
		status: "locked",
		rating: "3.9",
		weeklyShifts: 1,
		totalShifts: 18,
		joinedAt: "12/2025",
		tags: ["Kho vận", "Bốc xếp"],
		bio: "Đang bị tạm khóa để rà soát lại lịch sử vắng mặt và hồ sơ thanh toán.",
		verification: {
			status: "Đang rà soát",
			phone: "Đã xác minh",
			nationalId: "079105114662",
			taxId: "5412287731",
		},
		violations: {
			totalCases: 3,
			latestLevel: "Nghiêm trọng",
			latestNote: "Vắng mặt không báo trước ở 2 ca kho liên tiếp.",
		},
		payment: {
			batchId: "PAY-0513-B",
			amount: "₫980.000",
			status: "Đã chốt",
		},
		recentShifts: [
			{
				id: "SH-844",
				shiftName: "Ca kho tăng cường",
				customer: "Ninja Van",
				schedule: "11/05, 22:00 - 06:00",
				checkInStatus: "Vắng mặt",
				payout: "₫0",
			},
		],
		identity: {
			nationalId: "079105114662",
			fullNameOnId: "VŨ MINH ĐỨC",
			dob: "23/02/1993",
			gender: "Nam",
			issuedDate: "08/03/2021",
			expiryDate: "23/02/2033",
			issuedPlace: ISSUED_PLACE_DEFAULT,
			permanentAddress: "9 Võ Văn Ngân, Phường Linh Trung, Thủ Đức, TP.HCM",
			ekyc: { service: true, fraudCheck: false, logicCheck: true, ocr: true },
		},
		residence: {
			province: "TP.HCM",
			district: "TP Thủ Đức",
			ward: "Phường Linh Trung",
			street: "9 Võ Văn Ngân",
		},
		bankAccount: {
			ownerType: "Không chính chủ",
			bankName: "NH TMCP Á Châu (ACB)",
			bankBin: "970416",
			accountNumber: "12345678901",
			accountHolder: "VU THI MAI",
			verified: false,
		},
		tax: { taxId: "5412287731", taxStatus: "Đã kiểm tra", commitment2026: "Chưa ký" },
		socialInsurance: { code: "0791051146" },
		emergencyContact: { name: "Vũ Thị Mai", phone: "0903 555 666", relationship: "chị gái" },
		paymentMethod: "cash",
		jobs: [
			{
				id: "JOB-E1",
				kind: "done",
				period: "12/2025 - 04/2026",
				company: "Ninja Van",
				position: "Nhân viên bốc xếp kho",
				hours: "72h",
			},
		],
		cancellations: [
			{
				id: "CXL-E1",
				date: "11/05/2026",
				shiftName: "Ca kho tăng cường",
				reason: "Vắng mặt không báo trước",
				penalty: "₫50.000",
			},
			{
				id: "CXL-E2",
				date: "08/05/2026",
				shiftName: "Ca đóng gói sáng",
				reason: "Báo ốm trong giờ vào ca",
				penalty: "₫0",
			},
		],
		changeLog: [
			{
				at: "12/05/2026 11:20",
				actor: "Nguyễn Nhân Lâm",
				field: "Trạng thái",
				from: "Đang hoạt động",
				to: "Tạm khóa",
			},
			{
				at: "12/05/2026 11:18",
				actor: "Hệ thống",
				field: "Vi phạm",
				from: "2 case",
				to: "3 case (Nghiêm trọng)",
			},
		],
	},
];

export function getWorkerById(id: string): WorkerRecord | undefined {
	return WORKERS.find((worker) => worker.id === id);
}
