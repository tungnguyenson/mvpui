// Dữ liệu CTV cho hai màn "Giới thiệu" + "Thưởng".
// Cơ chế thưởng theo chương trình thật của viec.co:
//  • 30.000đ / người khi người được giới thiệu đi làm buổi đầu thành công.
//  • Thưởng vượt mốc theo số người giới thiệu trong tháng (cộng thêm).
//  • Thanh toán vào ngày 5 hằng tháng.
// Số liệu là PLACEHOLDER — khi nối backend, thay bằng API rewards/referrals.
// MILESTONES / STATUS_META / FORM_COLORS giữ làm config.

export type ReferralStatus = "new" | "matching" | "counted" | "failed";

export interface CtvProfile {
	name: string;
	firstName: string;
	role: string;
	level: string;
	avatar: string;
	phone: string;
	phoneFmt: string;
	/** Slug dùng cho link giới thiệu — hiện là số điện thoại. */
	slug: string;
	/** Link hiển thị (không có scheme). */
	link: string;
	/** Link đầy đủ để copy / share / QR. */
	fullLink: string;
	joinedYears: number;
	totalReferred: number;
	totalWorking: number;
	/** Tỷ lệ thành công, %. */
	successRate: number;
}

export interface Milestone {
	people: number;
	bonus: number;
}

export interface Earnings {
	balance: number;
	thisMonth: number;
	pending: number;
	total: number;
	/** Số người đã đi làm buổi đầu trong tháng. */
	monthCount: number;
	monthLabel: string;
	/** Ngày chi trả hằng tháng. */
	payday: number;
}

export interface ReferredPerson {
	id: number;
	name: string;
	initials: string;
	/** Màu monogram avatar. */
	color: string;
	phone: string;
	when: string;
	company: string;
	status: ReferralStatus;
	bonus: number;
	/** Ghi chú phụ (vd lý do "Không thành công" — trùng giới thiệu). */
	note?: string;
}

export interface FormColor {
	hex: string;
	name: string;
}

export type StatusTone = "warning" | "brand" | "success" | "muted";

export interface StatusMeta {
	label: string;
	tone: StatusTone;
}

/** Định dạng tiền VND, ví dụ 30000 → "30.000đ". */
export function money(n: number): string {
	return `${n.toLocaleString("vi-VN")}đ`;
}

/** Tiền có dấu cộng, ví dụ 30000 → "+30.000đ". */
export function plusMoney(n: number): string {
	return `+${money(n)}`;
}

export const CTV: CtvProfile = {
	name: "Trần Anh Tuấn",
	firstName: "Tuấn",
	role: "CTV",
	level: "CTV Vàng",
	avatar: "/ctv-avatar.jpg",
	phone: "0912345678",
	phoneFmt: "0912 345 678",
	slug: "0912345678",
	link: "gioithieu.viec.co/0912345678",
	fullLink: "https://gioithieu.viec.co/0912345678",
	joinedYears: 4,
	totalReferred: 238,
	totalWorking: 186,
	successRate: 78,
};

/** Thưởng giới thiệu theo từng người. */
export const REWARD_PER_PERSON = 30000;

/** Thưởng vượt mốc theo số người giới thiệu / tháng. */
export const MILESTONES: Milestone[] = [
	{ people: 5, bonus: 150000 },
	{ people: 10, bonus: 200000 },
	{ people: 20, bonus: 350000 },
	{ people: 40, bonus: 600000 },
	{ people: 80, bonus: 1100000 },
	{ people: 120, bonus: 1600000 },
];

export const EARNINGS: Earnings = {
	balance: 1230000,
	thisMonth: 560000,
	pending: 90000,
	total: 9860000,
	monthCount: 12,
	monthLabel: "Tháng 6",
	payday: 5,
};

export const PEOPLE: ReferredPerson[] = [
	{
		id: 1,
		name: "Nguyễn Thị Hồng",
		initials: "NH",
		color: "#D9622B",
		phone: "0987 ••• 321",
		when: "Hôm nay",
		company: "Shopee",
		status: "new",
		bonus: 0,
	},
	{
		id: 2,
		name: "Lê Văn Bình",
		initials: "LB",
		color: "#1F8A5B",
		phone: "0934 ••• 108",
		when: "Hôm nay",
		company: "Giao Hàng Nhanh",
		status: "matching",
		bonus: 0,
	},
	{
		id: 3,
		name: "Phạm Minh Đức",
		initials: "PĐ",
		color: "#7A5AE0",
		phone: "0901 ••• 776",
		when: "Hôm qua",
		company: "Tiki",
		status: "counted",
		bonus: 30000,
	},
	{
		id: 4,
		name: "Trần Thị Mai",
		initials: "TM",
		color: "#BE185D",
		phone: "0978 ••• 540",
		when: "2 ngày trước",
		company: "J&T Express",
		status: "counted",
		bonus: 30000,
	},
	{
		id: 5,
		name: "Võ Hoàng Long",
		initials: "VL",
		color: "#0E7490",
		phone: "0967 ••• 213",
		when: "3 ngày trước",
		company: "Bách Hóa Xanh",
		status: "counted",
		bonus: 30000,
	},
	{
		id: 6,
		name: "Đỗ Thị Lan",
		initials: "ĐL",
		color: "#234D82",
		phone: "0945 ••• 887",
		when: "06/06",
		company: "Shopee",
		status: "counted",
		bonus: 30000,
	},
	{
		id: 7,
		name: "Bùi Quốc Việt",
		initials: "BV",
		color: "#B45309",
		phone: "0912 ••• 459",
		when: "04/06",
		company: "Boxme",
		status: "counted",
		bonus: 30000,
	},
	{
		id: 8,
		name: "Hồ Thị Thu",
		initials: "HT",
		color: "#047857",
		phone: "0989 ••• 102",
		when: "02/06",
		company: "Grab Mart",
		status: "matching",
		bonus: 0,
	},
	{
		id: 9,
		name: "Ngô Văn Sơn",
		initials: "NS",
		color: "#525252",
		phone: "0931 ••• 678",
		when: "28/05",
		company: "—",
		status: "failed",
		bonus: 0,
		note: "Trùng — số này đã được người khác giới thiệu trước",
	},
];

export const STATUS_META: Record<ReferralStatus, StatusMeta> = {
	new: { label: "Mới đăng ký", tone: "warning" },
	matching: { label: "Chờ đi làm", tone: "brand" },
	counted: { label: "Đã đi làm", tone: "success" },
	failed: { label: "Không thành công", tone: "muted" },
};

/** Bộ màu CTV có thể chọn cho trang giới thiệu của mình. Phần tử đầu là mặc định. */
export const FORM_COLORS: FormColor[] = [
	{ hex: "#0E7490", name: "Xanh ngọc" },
	{ hex: "#2B5FA1", name: "Xanh dương" },
	{ hex: "#1F8A5B", name: "Xanh lá" },
	{ hex: "#D9622B", name: "Cam" },
	{ hex: "#BE185D", name: "Hồng sen" },
	{ hex: "#7A5AE0", name: "Tím" },
];

export const DEFAULT_FORM_COLOR = FORM_COLORS[0]?.hex ?? "#0E7490";

export function colorName(hex: string): string {
	return FORM_COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase())?.name ?? "Tuỳ chỉnh";
}

/** Kiểu biểu mẫu trang giới thiệu — quyết định lượng field người đăng ký phải điền. */
export type FormVariant = "simple" | "detailed";

export interface FormVariantOption {
	id: FormVariant;
	name: string;
	hint: string;
}

/** Hai kiểu biểu mẫu CTV có thể gửi đi. Phần tử đầu là mặc định (giữ hành vi hiện tại). */
export const FORM_VARIANTS: FormVariantOption[] = [
	{
		id: "detailed",
		name: "Chi tiết",
		hint: "Đầy đủ — có chọn công ty ưu tiên và tải ảnh CCCD 2 mặt.",
	},
	{
		id: "simple",
		name: "Đơn giản",
		hint: "Gọn nhẹ — bỏ công ty ưu tiên và ảnh CCCD, đăng ký nhanh hơn.",
	},
];

export const DEFAULT_FORM_VARIANT: FormVariant = FORM_VARIANTS[0]?.id ?? "detailed";

/** Giao diện khối hero trang giới thiệu — sáng (mặc định) hoặc tối. */
export type HeroTheme = "light" | "dark";

export interface HeroThemeOption {
	id: HeroTheme;
	name: string;
	hint: string;
}

/** Phần tử đầu là mặc định (giữ hành vi hiện tại = sáng). */
export const HERO_THEMES: HeroThemeOption[] = [
	{ id: "light", name: "Sáng", hint: "Nền sáng, chữ tối — nhẹ nhàng, dễ đọc ngoài trời." },
	{ id: "dark", name: "Tối", hint: "Nền màu thương hiệu đậm, chữ trắng — nổi bật, sang hơn." },
];

export const DEFAULT_HERO_THEME: HeroTheme = HERO_THEMES[0]?.id ?? "light";

/** Link xem trước trang giới thiệu theo màu + kiểu biểu mẫu + giao diện hero. */
export function buildPreviewHref(
	color: string,
	variant: FormVariant,
	theme: HeroTheme = DEFAULT_HERO_THEME
): string {
	const params = new URLSearchParams({ brand: color, form: variant, theme });
	return `/gioi-thieu/${CTV.slug}?${params.toString()}`;
}
