// Hỗ trợ điều kiện hiển thị (showWhen): tìm field điều kiện hợp lệ + giá trị.

import { GENDERS, LICENSES, PROVINCES, SOURCES } from "./data";
import type { Field, FieldKind, FormConfig } from "./form-schema";

/** Kind có giá trị rời rạc, dùng làm field điều kiện. */
const ENUM_KINDS: FieldKind[] = [
	"gender",
	"source",
	"license",
	"province",
	"single_choice",
	"dropdown",
	"yesno",
];

export function isControlKind(kind: FieldKind): boolean {
	return ENUM_KINDS.includes(kind);
}

/** Các field đứng TRƯỚC `fieldId` (theo thứ tự form) có thể làm điều kiện. */
export function controlCandidates(config: FormConfig, fieldId: string): Field[] {
	const out: Field[] = [];
	for (const section of config.sections) {
		for (const f of section.fields) {
			if (f.id === fieldId) return out;
			if (isControlKind(f.kind)) out.push(f);
		}
	}
	return out;
}

export function controlValues(field: Field): { value: string; label: string }[] {
	switch (field.kind) {
		case "gender":
			return GENDERS.map((g) => ({ value: g, label: g }));
		case "source":
			return SOURCES.map((s) => ({ value: s.id, label: s.label }));
		case "license":
			return LICENSES.map((l) => ({ value: l, label: l }));
		case "province":
			return PROVINCES.map((p) => ({ value: p.id, label: p.name }));
		case "yesno":
			return [
				{ value: "yes", label: "Có" },
				{ value: "no", label: "Không" },
			];
		case "single_choice":
		case "dropdown":
			return (field.options ?? []).map((o) => ({ value: o.id, label: o.label }));
		default:
			return [];
	}
}
