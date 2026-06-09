// Mock store cho FormConfig. 1 key localStorage `rf_forms`. SSR-safe: chỉ
// đụng localStorage trong nhánh có window; component đọc sau mount.

import { makeField } from "./field-registry";
import type { Field, FieldKind, FormConfig, Section } from "./form-schema";
import { uid } from "./uid";

const STORAGE_KEY = "rf_forms";
const SEED_DATE = "2026-06-01T00:00:00.000Z";

function coreField(kind: FieldKind, required: boolean): Field {
	return { ...makeField(kind), required, locked: true };
}

function smart(kind: FieldKind, required: boolean): Field {
	return { ...makeField(kind), required };
}

/** 5 section mặc định — bám cấu trúc trang referral. Core field locked. */
export function defaultSections(): Section[] {
	return [
		{
			id: uid("s"),
			title: "Thông tin của bạn",
			icon: "user",
			fields: [coreField("fullname", true), coreField("phone", true), coreField("gender", false)],
		},
		{
			id: uid("s"),
			title: "Khu vực muốn làm việc",
			icon: "location",
			fields: [smart("province", true), smart("district", true)],
		},
		{
			id: uid("s"),
			title: "Công ty ưu tiên",
			icon: "star",
			fields: [smart("company", true)],
		},
		{
			id: uid("s"),
			title: "Mong muốn công việc",
			icon: "sliders",
			fields: [smart("shift", true), smart("jobtype", true)],
		},
		{
			id: uid("s"),
			title: "Hoàn tất hồ sơ",
			icon: "clipboard",
			fields: [
				smart("source", true),
				smart("cccd", false),
				smart("startdate", false),
				coreField("consent18", true),
			],
		},
	];
}

/** Form tối thiểu — chỉ 4 core field, 1 section. Dùng khi tạo mới "trống". */
export function minimalSections(): Section[] {
	return [
		{
			id: uid("s"),
			title: "Thông tin ứng viên",
			icon: "user",
			fields: [
				coreField("fullname", true),
				coreField("phone", true),
				coreField("gender", false),
				coreField("consent18", true),
			],
		},
	];
}

function nowISO(): string {
	return typeof window === "undefined" ? SEED_DATE : new Date().toISOString();
}

export function createForm(opts?: { title?: string; full?: boolean }): FormConfig {
	const title = opts?.title?.trim() || "Form tuyển dụng mới";
	const ts = nowISO();
	return {
		id: uid("form"),
		slug: slugify(title) || uid("f"),
		title,
		description: "",
		status: "draft",
		brand: "#7f56d9",
		heroTheme: "dark",
		sections: opts?.full ? defaultSections() : minimalSections(),
		success: {
			title: "Đăng ký thành công!",
			message: "Cảm ơn bạn. Hồ sơ đã được gửi — đội ngũ sẽ liên hệ trong vòng 24 giờ làm việc.",
		},
		responseCount: 0,
		createdAt: ts,
		updatedAt: ts,
	};
}

export function slugify(s: string): string {
	return s
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 48);
}

// ── Seed demo ───────────────────────────────────────────────
function buildSeed(): FormConfig[] {
	const a = createForm({ title: "Tuyển dụng nhân viên kho — TP.HCM", full: true });
	const b = createForm({ title: "Tuyển tài xế giao hàng — Hà Nội", full: true });
	const c = createForm({ title: "Tuyển CTV thời vụ Tết", full: false });
	return [
		{
			...a,
			slug: "kho-hcm",
			status: "active",
			responseCount: 128,
			createdAt: SEED_DATE,
			updatedAt: SEED_DATE,
		},
		{
			...b,
			slug: "tai-xe-hn",
			status: "active",
			responseCount: 64,
			createdAt: SEED_DATE,
			updatedAt: SEED_DATE,
		},
		{
			...c,
			slug: "ctv-tet",
			status: "draft",
			responseCount: 0,
			createdAt: SEED_DATE,
			updatedAt: SEED_DATE,
		},
	];
}

// ── Persistence ─────────────────────────────────────────────
export function loadForms(): FormConfig[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			const seeded = buildSeed();
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
			return seeded;
		}
		return JSON.parse(raw) as FormConfig[];
	} catch {
		return buildSeed();
	}
}

function persist(forms: FormConfig[]): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
	} catch {
		// bộ nhớ đầy / chặn — bỏ qua (prototype).
	}
}

export function getForm(id: string): FormConfig | undefined {
	return loadForms().find((f) => f.id === id);
}

export function getFormBySlug(slug: string): FormConfig | undefined {
	return loadForms().find((f) => f.slug === slug);
}

/** Ghi đè / thêm form, cập nhật updatedAt. */
export function saveForm(config: FormConfig): void {
	const forms = loadForms();
	const next: FormConfig = { ...config, updatedAt: nowISO() };
	const idx = forms.findIndex((f) => f.id === config.id);
	if (idx === -1) forms.push(next);
	else forms[idx] = next;
	persist(forms);
}

export function deleteForm(id: string): void {
	persist(loadForms().filter((f) => f.id !== id));
}
