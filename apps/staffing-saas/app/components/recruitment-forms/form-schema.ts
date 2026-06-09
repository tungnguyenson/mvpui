// Schema cho form tuyển dụng. Pure types + hằng — không React, không side-effect.
// FormConfig là nguồn duy nhất: builder ghi, renderer đọc.

export type FormStatus = "draft" | "active" | "paused";

export const STATUS_LABELS: Record<FormStatus, string> = {
	draft: "Nháp",
	active: "Hoạt động",
	paused: "Dừng",
};

/** Loại field. smart = domain (UI + validation built-in); generic = cấu hình tự do. */
export type FieldKind =
	// smart
	| "fullname"
	| "phone"
	| "gender"
	| "province"
	| "district"
	| "company"
	| "shift"
	| "jobtype"
	| "source"
	| "cccd"
	| "startdate"
	| "license"
	| "consent18"
	// generic
	| "short_text"
	| "paragraph"
	| "single_choice"
	| "multi_choice"
	| "dropdown"
	| "number"
	| "date"
	| "yesno"
	| "rating"
	| "static_text";

export interface FieldOption {
	id: string;
	label: string;
}

/** Điều kiện hiển thị — phase cuối. Field ẩn thì bỏ qua validation. */
export interface ShowWhen {
	fieldId: string;
	equals: string;
}

export interface Field {
	id: string;
	kind: FieldKind;
	/** Override nhãn mặc định theo kind. */
	label: string;
	helpText?: string;
	placeholder?: string;
	required: boolean;
	/** 4 core: không xoá / không kéo ra khỏi form. */
	locked?: boolean;
	/** generic choice/dropdown. */
	options?: FieldOption[];
	/** cap multi-select (vd districts 3). */
	max?: number;
	min?: number;
	showWhen?: ShowWhen | null;
}

export interface Section {
	id: string;
	title: string;
	description?: string;
	/** key icon — map sang lucide ở SECTION_ICONS. */
	icon: string;
	fields: Field[];
}

export type HeroTheme = "light" | "dark";

export interface SuccessConfig {
	title: string;
	message: string;
}

export interface FormConfig {
	id: string;
	slug: string;
	title: string;
	description?: string;
	status: FormStatus;
	/** --bp hex. */
	brand: string;
	heroTheme: HeroTheme;
	sections: Section[];
	success: SuccessConfig;
	responseCount: number;
	createdAt: string;
	updatedAt: string;
}

/** Giá trị 1 field khi người dùng điền. */
export type CccdValue = { front: string | null; back: string | null };
export type FieldValue = string | string[] | boolean | CccdValue | null;
export type FormValues = Record<string, FieldValue>;

/** Field core — luôn có, không xoá được. consent18 cũng không tắt required được. */
export const CORE_KINDS: FieldKind[] = ["fullname", "phone", "gender", "consent18"];

/** Kind dùng giá trị mảng (multi-select). */
export const MULTI_KINDS: FieldKind[] = ["district", "company", "shift", "jobtype", "multi_choice"];

/** Kind dùng giá trị boolean. (yesno là string "yes"/"no" để phân biệt chưa chọn.) */
export const BOOL_KINDS: FieldKind[] = ["consent18"];

export function isMultiKind(kind: FieldKind): boolean {
	return MULTI_KINDS.includes(kind);
}

export function isBoolKind(kind: FieldKind): boolean {
	return BOOL_KINDS.includes(kind);
}

/** Giá trị rỗng khởi tạo theo kind. */
export function emptyValue(kind: FieldKind): FieldValue {
	if (kind === "cccd") return { front: null, back: null };
	if (isBoolKind(kind)) return false;
	if (isMultiKind(kind)) return [];
	return "";
}
