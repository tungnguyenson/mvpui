// Mock dữ liệu khu vực, công ty & người giới thiệu cho trang Referral CTV.
// Danh sách công ty là PLACEHOLDER (monogram), không phải logo thật của thương hiệu.
// Khi nối backend: thay các hàm getReferrer / PROVINCES / ACTIVE_BY_PROVINCE bằng API.

export interface Province {
	id: string;
	name: string;
	districts: string[];
}

export interface Company {
	id: string;
	name: string;
	abbr: string;
	color: string;
	ind: string;
	jobs: number;
	hot: boolean;
}

export interface Referrer {
	name: string;
	phone: string;
	role: string;
	avatar: string;
	years: number;
	referred: number;
	rating: number;
	reviews: number;
}

export interface Shift {
	id: string;
	label: string;
	sub: string;
}

export interface JobType {
	id: string;
	label: string;
	sub: string;
	icon: "clock" | "briefcase";
	color: string;
}

export interface Source {
	id: string;
	label: string;
}

/** Màu thương hiệu mặc định của trang worker (cam đậm). Sẽ cấu hình được sau. */
export const DEFAULT_BRAND = "#C2660C";

export const GENDERS = ["Nam", "Nữ", "Khác"] as const;

export const SHIFTS: Shift[] = [
	{ id: "sang", label: "Sáng", sub: "06:00 – 12:00" },
	{ id: "chieutoi", label: "Chiều – Tối", sub: "12:00 – 22:00" },
	{ id: "dem", label: "Đêm", sub: "22:00 – 06:00" },
];

export const JOBTYPES: JobType[] = [
	{
		id: "thoivu",
		label: "Thời vụ / Bán thời gian",
		sub: "Linh hoạt, nhận lương theo tuần",
		icon: "clock",
		color: "#D9622B",
	},
	{
		id: "toanthoigian",
		label: "Toàn thời gian",
		sub: "Cơ hội thành nhân viên chính thức — đầy đủ BHXH, BHYT, BHTN…",
		icon: "briefcase",
		color: "#1F8A5B",
	},
];

export const SOURCES: Source[] = [
	{ id: "zalo", label: "Zalo" },
	{ id: "facebook", label: "Facebook" },
	{ id: "tiktok", label: "TikTok" },
];

export const SHIFT_LABELS: Record<string, string> = {
	sang: "Sáng",
	chieutoi: "Chiều – Tối",
	dem: "Đêm",
};

// ── Tỉnh / Thành phố → Quận / Huyện ─────────────────────────────
export const PROVINCES: Province[] = [
	{
		id: "hcm",
		name: "TP. Hồ Chí Minh",
		districts: [
			"Quận 1",
			"Quận 3",
			"Quận 4",
			"Quận 5",
			"Quận 7",
			"Quận 8",
			"Quận 10",
			"Quận 12",
			"Bình Thạnh",
			"Gò Vấp",
			"Tân Bình",
			"Tân Phú",
			"Phú Nhuận",
			"Thủ Đức",
			"Bình Tân",
			"Nhà Bè",
			"Hóc Môn",
			"Bình Chánh",
		],
	},
	{
		id: "hn",
		name: "TP. Hà Nội",
		districts: [
			"Ba Đình",
			"Hoàn Kiếm",
			"Đống Đa",
			"Hai Bà Trưng",
			"Cầu Giấy",
			"Thanh Xuân",
			"Hoàng Mai",
			"Long Biên",
			"Hà Đông",
			"Nam Từ Liêm",
			"Bắc Từ Liêm",
			"Tây Hồ",
			"Gia Lâm",
			"Đông Anh",
		],
	},
	{
		id: "bd",
		name: "Bình Dương",
		districts: [
			"Thủ Dầu Một",
			"Dĩ An",
			"Thuận An",
			"Bến Cát",
			"Tân Uyên",
			"Bàu Bàng",
			"Phú Giáo",
			"Dầu Tiếng",
		],
	},
	{
		id: "dn",
		name: "Đồng Nai",
		districts: [
			"Biên Hòa",
			"Long Khánh",
			"Nhơn Trạch",
			"Long Thành",
			"Trảng Bom",
			"Vĩnh Cửu",
			"Thống Nhất",
		],
	},
	{
		id: "dnang",
		name: "TP. Đà Nẵng",
		districts: [
			"Hải Châu",
			"Thanh Khê",
			"Sơn Trà",
			"Ngũ Hành Sơn",
			"Liên Chiểu",
			"Cẩm Lệ",
			"Hòa Vang",
		],
	},
	{
		id: "ct",
		name: "TP. Cần Thơ",
		districts: ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"],
	},
];

// Pool công ty (placeholder). color = nền monogram, ind = ngành.
type CompanyBase = Omit<Company, "jobs" | "hot">;

const C = {
	ghn: { id: "ghn", name: "Giao Hàng Nhanh", abbr: "GH", color: "#1F8A5B", ind: "Giao vận" },
	shopee: { id: "shopee", name: "Shopee", abbr: "S", color: "#D9622B", ind: "Kho vận TMĐT" },
	tiki: { id: "tiki", name: "Tiki", abbr: "T", color: "#2B5FA1", ind: "Kho vận TMĐT" },
	boxme: { id: "boxme", name: "Boxme", abbr: "B", color: "#7A5AE0", ind: "Hoàn tất đơn hàng" },
	jt: { id: "jt", name: "J&T Express", abbr: "JT", color: "#C2410C", ind: "Giao vận" },
	laz: { id: "laz", name: "Lazada Logistics", abbr: "L", color: "#234D82", ind: "Kho vận TMĐT" },
	bhx: { id: "bhx", name: "Bách Hóa Xanh", abbr: "BH", color: "#0E7490", ind: "Bán lẻ" },
	grab: { id: "grab", name: "Grab Mart", abbr: "G", color: "#047857", ind: "Bán lẻ / Giao vận" },
	concung: { id: "concung", name: "Con Cưng", abbr: "CC", color: "#BE185D", ind: "Bán lẻ" },
	ahamove: { id: "ahamove", name: "Ahamove", abbr: "A", color: "#B45309", ind: "Giao vận" },
} satisfies Record<string, CompanyBase>;

function withStats(list: { c: CompanyBase; jobs: number; hot?: boolean }[]): Company[] {
	return list.map((x) => ({ ...x.c, jobs: x.jobs, hot: !!x.hot }));
}

// Công ty active nhất theo khu vực (30 ngày gần nhất) — số liệu mock.
export const ACTIVE_BY_PROVINCE: Record<string, Company[]> = {
	hcm: withStats([
		{ c: C.shopee, jobs: 124, hot: true },
		{ c: C.ghn, jobs: 98, hot: true },
		{ c: C.tiki, jobs: 76 },
		{ c: C.jt, jobs: 54 },
		{ c: C.boxme, jobs: 41 },
		{ c: C.bhx, jobs: 33 },
		{ c: C.grab, jobs: 28 },
	]),
	hn: withStats([
		{ c: C.ghn, jobs: 89, hot: true },
		{ c: C.shopee, jobs: 71, hot: true },
		{ c: C.laz, jobs: 52 },
		{ c: C.jt, jobs: 44 },
		{ c: C.tiki, jobs: 30 },
		{ c: C.concung, jobs: 22 },
	]),
	bd: withStats([
		{ c: C.boxme, jobs: 63, hot: true },
		{ c: C.ghn, jobs: 47 },
		{ c: C.jt, jobs: 38 },
		{ c: C.shopee, jobs: 29 },
		{ c: C.ahamove, jobs: 18 },
	]),
	dn: withStats([
		{ c: C.jt, jobs: 51, hot: true },
		{ c: C.boxme, jobs: 36 },
		{ c: C.ghn, jobs: 31 },
		{ c: C.shopee, jobs: 24 },
	]),
	dnang: withStats([
		{ c: C.ghn, jobs: 42, hot: true },
		{ c: C.shopee, jobs: 30 },
		{ c: C.jt, jobs: 21 },
		{ c: C.grab, jobs: 17 },
	]),
	ct: withStats([
		{ c: C.ghn, jobs: 28, hot: true },
		{ c: C.bhx, jobs: 19 },
		{ c: C.shopee, jobs: 16 },
		{ c: C.concung, jobs: 11 },
	]),
};

// Người giới thiệu mock. Backend sau này sẽ tra theo mã/SĐT CTV trong [ctv].
const DEFAULT_REFERRER: Referrer = {
	name: "Trần Anh Tuấn",
	phone: "0912345678",
	role: "CTV",
	avatar: "/gioi-thieu/referrer.jpg",
	years: 4,
	referred: 238,
	rating: 4.9,
	reviews: 186,
};

const PHONE_RE = /^0\d{9}$/;

/**
 * Tra người giới thiệu theo tham số route [ctv] (mã hoặc SĐT).
 * Hiện trả dữ liệu mock; nếu [ctv] là SĐT hợp lệ thì dùng làm số hiển thị.
 */
export function getReferrer(ctv: string): Referrer {
	const raw = decodeURIComponent(ctv).replace(/\s/g, "");
	if (PHONE_RE.test(raw)) {
		return { ...DEFAULT_REFERRER, phone: raw };
	}
	return DEFAULT_REFERRER;
}
