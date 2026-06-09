// Validation thuần từ FormConfig + values. Field ẩn (showWhen) bỏ qua ở lớp gọi.

import {
	type CccdValue,
	type Field,
	type FieldValue,
	type FormConfig,
	type FormValues,
	isBoolKind,
	isMultiKind,
} from "./form-schema";

export const PHONE_RE = /^0[35789]\d{8}$/;

function isEmpty(field: Field, value: FieldValue): boolean {
	if (field.kind === "cccd") {
		const v = (value ?? {}) as CccdValue;
		return !v.front || !v.back;
	}
	if (isBoolKind(field.kind)) return value !== true;
	if (isMultiKind(field.kind)) return !Array.isArray(value) || value.length === 0;
	return value == null || (typeof value === "string" && value.trim() === "");
}

function requiredMessage(field: Field): string {
	switch (field.kind) {
		case "fullname":
			return "Vui lòng nhập họ và tên";
		case "phone":
			return "Vui lòng nhập số điện thoại";
		case "consent18":
			return "Cần xác nhận bạn đủ 18 tuổi";
		case "cccd":
			return "Vui lòng tải đủ ảnh mặt trước và mặt sau";
		case "province":
		case "gender":
		case "license":
		case "source":
		case "single_choice":
		case "dropdown":
		case "district":
		case "company":
		case "shift":
		case "jobtype":
		case "multi_choice":
		case "yesno":
		case "rating":
			return `Vui lòng chọn ${field.label.toLowerCase()}`;
		default:
			return `Vui lòng nhập ${field.label.toLowerCase()}`;
	}
}

/** Lỗi của 1 field (không xét visibility — caller lo). */
export function fieldError(field: Field, value: FieldValue): string | undefined {
	if (isEmpty(field, value)) {
		return field.required ? requiredMessage(field) : undefined;
	}
	if (field.kind === "phone") {
		const digits = String(value).replace(/\s/g, "");
		if (!PHONE_RE.test(digits)) return "Số điện thoại chưa đúng (VD: 0912345678)";
	}
	return undefined;
}

/**
 * Tập lỗi cho toàn form. `isVisible` mặc định coi mọi field hiện
 * (showWhen build sau). Field ẩn → bỏ qua.
 */
export function validateForm(
	config: FormConfig,
	values: FormValues,
	isVisible: (field: Field) => boolean = () => true
): Record<string, string> {
	const errs: Record<string, string> = {};
	for (const section of config.sections) {
		for (const field of section.fields) {
			if (field.kind === "static_text") continue;
			if (!isVisible(field)) continue;
			const msg = fieldError(field, values[field.id] ?? null);
			if (msg) errs[field.id] = msg;
		}
	}
	return errs;
}

/** Field bắt buộc đã hoàn thành — cho progress %. */
export function progressPercent(
	config: FormConfig,
	values: FormValues,
	isVisible: (field: Field) => boolean = () => true
): number {
	const required: Field[] = [];
	for (const section of config.sections) {
		for (const field of section.fields) {
			if (field.kind === "static_text") continue;
			if (!field.required) continue;
			if (!isVisible(field)) continue;
			required.push(field);
		}
	}
	if (required.length === 0) return 100;
	const done = required.filter((f) => !fieldError(f, values[f.id] ?? null)).length;
	return Math.round((done / required.length) * 100);
}
