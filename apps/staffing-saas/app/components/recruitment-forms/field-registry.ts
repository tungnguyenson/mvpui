// Metadata tĩnh per-kind — dùng cho palette + settings panel.
// KHÔNG chứa logic phụ thuộc (cascade nằm ở useFormFill).

import {
	AlignLeft,
	Briefcase,
	Building2,
	Calendar,
	Car,
	CircleDot,
	ClipboardCheck,
	Clock,
	Hash,
	Heading,
	IdCard,
	List,
	ListChecks,
	type LucideIcon,
	Map as MapIcon,
	MapPin,
	Megaphone,
	Phone,
	ShieldCheck,
	SlidersHorizontal,
	Star,
	ToggleLeft,
	Type,
	User,
	Users,
} from "lucide-react";
import type { Field, FieldKind } from "./form-schema";
import { uid } from "./uid";

export interface FieldKindMeta {
	kind: FieldKind;
	group: "smart" | "generic";
	defaultLabel: string;
	icon: LucideIcon;
	/** core (fullname/phone/gender/consent18) — seed sẵn, không thêm từ palette. */
	lockedCore?: boolean;
	/** generic choice/dropdown — settings cho sửa options. */
	hasOptions?: boolean;
	/** có toggle bắt buộc (static_text không có; consent18 luôn bật). */
	requiredToggle?: boolean;
	/** config mặc định khi thêm field. */
	defaultConfig?: () => Partial<Field>;
}

function defaultOptions(): Pick<Field, "options"> {
	return {
		options: [
			{ id: uid("o"), label: "Lựa chọn 1" },
			{ id: uid("o"), label: "Lựa chọn 2" },
		],
	};
}

export const FIELD_KINDS: Record<FieldKind, FieldKindMeta> = {
	// ── smart ──
	fullname: {
		kind: "fullname",
		group: "smart",
		defaultLabel: "Họ và tên",
		icon: User,
		lockedCore: true,
		requiredToggle: false,
	},
	phone: {
		kind: "phone",
		group: "smart",
		defaultLabel: "Số điện thoại",
		icon: Phone,
		lockedCore: true,
		requiredToggle: false,
	},
	gender: {
		kind: "gender",
		group: "smart",
		defaultLabel: "Giới tính",
		icon: Users,
		lockedCore: true,
		requiredToggle: true,
	},
	province: {
		kind: "province",
		group: "smart",
		defaultLabel: "Tỉnh / Thành phố",
		icon: MapPin,
		requiredToggle: true,
	},
	district: {
		kind: "district",
		group: "smart",
		defaultLabel: "Quận / Huyện",
		icon: MapIcon,
		requiredToggle: true,
		defaultConfig: () => ({ max: 3 }),
	},
	company: {
		kind: "company",
		group: "smart",
		defaultLabel: "Công ty ưu tiên",
		icon: Building2,
		requiredToggle: true,
		defaultConfig: () => ({ max: 3 }),
	},
	shift: {
		kind: "shift",
		group: "smart",
		defaultLabel: "Ưu tiên ca làm",
		icon: Clock,
		requiredToggle: true,
	},
	jobtype: {
		kind: "jobtype",
		group: "smart",
		defaultLabel: "Ưu tiên dạng việc",
		icon: Briefcase,
		requiredToggle: true,
	},
	source: {
		kind: "source",
		group: "smart",
		defaultLabel: "Bạn biết đến qua đâu?",
		icon: Megaphone,
		requiredToggle: true,
	},
	cccd: {
		kind: "cccd",
		group: "smart",
		defaultLabel: "Ảnh căn cước công dân",
		icon: IdCard,
		requiredToggle: true,
	},
	startdate: {
		kind: "startdate",
		group: "smart",
		defaultLabel: "Ngày sớm nhất có thể đi làm",
		icon: Calendar,
		requiredToggle: true,
	},
	license: {
		kind: "license",
		group: "smart",
		defaultLabel: "Bằng lái xe",
		icon: Car,
		requiredToggle: true,
	},
	consent18: {
		kind: "consent18",
		group: "smart",
		defaultLabel: "Xác nhận đủ 18 tuổi & thông tin chính xác",
		icon: ShieldCheck,
		lockedCore: true,
		requiredToggle: false,
	},

	// ── generic ──
	short_text: {
		kind: "short_text",
		group: "generic",
		defaultLabel: "Câu hỏi ngắn",
		icon: Type,
		requiredToggle: true,
	},
	paragraph: {
		kind: "paragraph",
		group: "generic",
		defaultLabel: "Câu trả lời dài",
		icon: AlignLeft,
		requiredToggle: true,
	},
	single_choice: {
		kind: "single_choice",
		group: "generic",
		defaultLabel: "Chọn một",
		icon: CircleDot,
		requiredToggle: true,
		hasOptions: true,
		defaultConfig: defaultOptions,
	},
	multi_choice: {
		kind: "multi_choice",
		group: "generic",
		defaultLabel: "Chọn nhiều",
		icon: ListChecks,
		requiredToggle: true,
		hasOptions: true,
		defaultConfig: defaultOptions,
	},
	dropdown: {
		kind: "dropdown",
		group: "generic",
		defaultLabel: "Danh sách thả xuống",
		icon: List,
		requiredToggle: true,
		hasOptions: true,
		defaultConfig: defaultOptions,
	},
	number: {
		kind: "number",
		group: "generic",
		defaultLabel: "Số",
		icon: Hash,
		requiredToggle: true,
	},
	date: {
		kind: "date",
		group: "generic",
		defaultLabel: "Ngày",
		icon: Calendar,
		requiredToggle: true,
	},
	yesno: {
		kind: "yesno",
		group: "generic",
		defaultLabel: "Có / Không",
		icon: ToggleLeft,
		requiredToggle: true,
	},
	rating: {
		kind: "rating",
		group: "generic",
		defaultLabel: "Đánh giá sao",
		icon: Star,
		requiredToggle: true,
		defaultConfig: () => ({ max: 5 }),
	},
	static_text: {
		kind: "static_text",
		group: "generic",
		defaultLabel: "Đoạn mô tả",
		icon: Heading,
		requiredToggle: false,
	},
};

/** Tạo Field mới từ kind (dùng khi add từ palette). */
export function makeField(kind: FieldKind): Field {
	const meta = FIELD_KINDS[kind];
	return {
		id: uid(),
		kind,
		label: meta.defaultLabel,
		required: kind !== "static_text",
		...meta.defaultConfig?.(),
	};
}

/** Field hiện trong palette (loại core đã seed sẵn). */
export const PALETTE_SMART: FieldKind[] = (Object.values(FIELD_KINDS) as FieldKindMeta[])
	.filter((m) => m.group === "smart" && !m.lockedCore)
	.map((m) => m.kind);

export const PALETTE_GENERIC: FieldKind[] = (Object.values(FIELD_KINDS) as FieldKindMeta[])
	.filter((m) => m.group === "generic")
	.map((m) => m.kind);

// ── Section icons ───────────────────────────────────────────
export const SECTION_ICONS: Record<string, LucideIcon> = {
	user: User,
	location: MapPin,
	star: Star,
	sliders: SlidersHorizontal,
	clipboard: ClipboardCheck,
	building: Building2,
	briefcase: Briefcase,
};

export const SECTION_ICON_KEYS = Object.keys(SECTION_ICONS);

export function sectionIcon(name: string): LucideIcon {
	return SECTION_ICONS[name] ?? ClipboardCheck;
}
