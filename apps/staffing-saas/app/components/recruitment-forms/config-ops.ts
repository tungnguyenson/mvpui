// Cập nhật FormConfig bất biến (immutable) — không mutate, luôn trả bản sao mới.

import { makeField } from "./field-registry";
import type { Field, FieldKind, FormConfig, Section } from "./form-schema";
import { uid } from "./uid";

export function findContainerOf(config: FormConfig, fieldId: string): string | null {
	for (const s of config.sections) {
		if (s.fields.some((f) => f.id === fieldId)) return s.id;
	}
	return null;
}

export function findField(config: FormConfig, fieldId: string): Field | undefined {
	for (const s of config.sections) {
		const f = s.fields.find((x) => x.id === fieldId);
		if (f) return f;
	}
	return undefined;
}

function mapSection(
	config: FormConfig,
	sectionId: string,
	fn: (s: Section) => Section
): FormConfig {
	return {
		...config,
		sections: config.sections.map((s) => (s.id === sectionId ? fn(s) : s)),
	};
}

export function addFieldToSection(
	config: FormConfig,
	sectionId: string,
	kind: FieldKind,
	index?: number
): { config: FormConfig; field: Field } {
	const field = makeField(kind);
	const next = mapSection(config, sectionId, (s) => {
		const fields = [...s.fields];
		const at = index == null ? fields.length : Math.max(0, Math.min(index, fields.length));
		fields.splice(at, 0, field);
		return { ...s, fields };
	});
	return { config: next, field };
}

/** Thay toàn bộ field của 1 section (dùng cho reorder cùng section). */
export function setSectionFields(
	config: FormConfig,
	sectionId: string,
	fields: Field[]
): FormConfig {
	return mapSection(config, sectionId, (s) => ({ ...s, fields }));
}

export function updateField(
	config: FormConfig,
	fieldId: string,
	patch: Partial<Field>
): FormConfig {
	return {
		...config,
		sections: config.sections.map((s) => ({
			...s,
			fields: s.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)),
		})),
	};
}

export function removeField(config: FormConfig, fieldId: string): FormConfig {
	return {
		...config,
		sections: config.sections.map((s) => ({
			...s,
			fields: s.fields.filter((f) => f.id !== fieldId),
		})),
	};
}

/** Di chuyển field tới section đích ở vị trí index (dùng cho dnd). */
export function moveField(
	config: FormConfig,
	fieldId: string,
	toSectionId: string,
	toIndex: number
): FormConfig {
	const field = findField(config, fieldId);
	if (!field) return config;
	// gỡ khỏi mọi section, rồi chèn vào đích.
	const stripped = config.sections.map((s) => ({
		...s,
		fields: s.fields.filter((f) => f.id !== fieldId),
	}));
	return {
		...config,
		sections: stripped.map((s) => {
			if (s.id !== toSectionId) return s;
			const fields = [...s.fields];
			const at = Math.max(0, Math.min(toIndex, fields.length));
			fields.splice(at, 0, field);
			return { ...s, fields };
		}),
	};
}

export function addSection(config: FormConfig): { config: FormConfig; sectionId: string } {
	const section: Section = {
		id: uid("s"),
		title: "Phần mới",
		icon: "clipboard",
		fields: [],
	};
	return { config: { ...config, sections: [...config.sections, section] }, sectionId: section.id };
}

export function updateSection(
	config: FormConfig,
	sectionId: string,
	patch: Partial<Section>
): FormConfig {
	return mapSection(config, sectionId, (s) => ({ ...s, ...patch }));
}

/** Xoá section + toàn bộ field trong đó. Chặn nếu chứa field locked (core). */
export function canRemoveSection(config: FormConfig, sectionId: string): boolean {
	const s = config.sections.find((x) => x.id === sectionId);
	if (!s) return false;
	if (config.sections.length <= 1) return false;
	return !s.fields.some((f) => f.locked);
}

export function removeSection(config: FormConfig, sectionId: string): FormConfig {
	return { ...config, sections: config.sections.filter((s) => s.id !== sectionId) };
}

export function moveSection(config: FormConfig, from: number, to: number): FormConfig {
	const sections = [...config.sections];
	const [moved] = sections.splice(from, 1);
	if (!moved) return config;
	sections.splice(Math.max(0, Math.min(to, sections.length)), 0, moved);
	return { ...config, sections };
}

// ── option ops (generic choice fields) ──────────────────────
export function addOption(config: FormConfig, fieldId: string): FormConfig {
	const f = findField(config, fieldId);
	if (!f) return config;
	const options = [
		...(f.options ?? []),
		{ id: uid("o"), label: `Lựa chọn ${(f.options?.length ?? 0) + 1}` },
	];
	return updateField(config, fieldId, { options });
}

export function updateOption(
	config: FormConfig,
	fieldId: string,
	optionId: string,
	label: string
): FormConfig {
	const f = findField(config, fieldId);
	if (!f) return config;
	const options = (f.options ?? []).map((o) => (o.id === optionId ? { ...o, label } : o));
	return updateField(config, fieldId, { options });
}

export function removeOption(config: FormConfig, fieldId: string, optionId: string): FormConfig {
	const f = findField(config, fieldId);
	if (!f) return config;
	const options = (f.options ?? []).filter((o) => o.id !== optionId);
	return updateField(config, fieldId, { options });
}
