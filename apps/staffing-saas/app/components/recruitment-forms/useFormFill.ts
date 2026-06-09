"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
	emptyValue,
	type Field,
	type FieldValue,
	type FormConfig,
	type FormValues,
} from "./form-schema";
import { progressPercent, validateForm } from "./validate";

function allFields(config: FormConfig): Field[] {
	return config.sections.flatMap((s) => s.fields);
}

function initValues(config: FormConfig): FormValues {
	const v: FormValues = {};
	for (const f of allFields(config)) v[f.id] = emptyValue(f.kind);
	return v;
}

/** Field hiện theo showWhen (cascade option xử lý riêng ở FieldControl). */
function isVisibleWith(values: FormValues) {
	return (field: Field): boolean => {
		const cond = field.showWhen;
		if (!cond) return true;
		const target = values[cond.fieldId];
		if (Array.isArray(target)) return target.includes(cond.equals);
		if (typeof target === "boolean") return String(target) === cond.equals;
		return target === cond.equals;
	};
}

export interface FormFill {
	values: FormValues;
	setValue: (fieldId: string, value: FieldValue) => void;
	toggleIn: (fieldId: string, item: string, max?: number) => void;
	touch: (fieldId: string) => void;
	submitted: boolean;
	setSubmitted: (v: boolean) => void;
	errors: Record<string, string>;
	show: (fieldId: string) => string | undefined;
	visible: (field: Field) => boolean;
	provinceValue: string;
	progress: number;
	reset: () => void;
	clearDraft: () => void;
}

export function useFormFill(config: FormConfig, draftKey?: string): FormFill {
	const [values, setValues] = useState<FormValues>(() => initValues(config));
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [submitted, setSubmitted] = useState(false);

	const fieldsById = useMemo(() => {
		const m = new Map<string, Field>();
		for (const f of allFields(config)) m.set(f.id, f);
		return m;
	}, [config]);

	// Khôi phục bản nháp (client-only, sau mount → tránh hydration mismatch).
	useEffect(() => {
		if (!draftKey || typeof window === "undefined") return;
		try {
			const raw = window.localStorage.getItem(draftKey);
			if (!raw) return;
			const saved = JSON.parse(raw) as Record<string, FieldValue>;
			setValues((prev) => {
				const merged: FormValues = { ...prev };
				// Chỉ khôi phục key còn tồn tại trong form hiện tại.
				for (const [k, v] of Object.entries(saved)) {
					if (v !== undefined && k in prev) merged[k] = v;
				}
				return merged;
			});
		} catch {
			// bỏ qua nháp hỏng
		}
	}, [draftKey]);

	// Tự lưu nháp (loại bỏ ảnh blob CCCD — không serialize được object url).
	useEffect(() => {
		if (!draftKey || typeof window === "undefined") return;
		try {
			const clean: FormValues = {};
			for (const [k, v] of Object.entries(values)) {
				if (v && typeof v === "object" && !Array.isArray(v)) continue; // cccd blob
				clean[k] = v;
			}
			window.localStorage.setItem(draftKey, JSON.stringify(clean));
		} catch {
			// bộ nhớ đầy — bỏ qua
		}
	}, [values, draftKey]);

	const setValue = useCallback(
		(fieldId: string, value: FieldValue) => {
			setValues((prev) => {
				const field = fieldsById.get(fieldId);
				const next: FormValues = { ...prev, [fieldId]: value };
				// Cascade: đổi tỉnh → reset mọi quận/huyện & công ty.
				if (field?.kind === "province") {
					for (const f of fieldsById.values()) {
						if (f.kind === "district" || f.kind === "company") next[f.id] = emptyValue(f.kind);
					}
				}
				return next;
			});
		},
		[fieldsById]
	);

	const toggleIn = useCallback((fieldId: string, item: string, max?: number) => {
		setValues((prev) => {
			const arr = Array.isArray(prev[fieldId]) ? (prev[fieldId] as string[]) : [];
			if (arr.includes(item)) return { ...prev, [fieldId]: arr.filter((x) => x !== item) };
			if (max && arr.length >= max) return prev;
			return { ...prev, [fieldId]: [...arr, item] };
		});
	}, []);

	const touch = useCallback((fieldId: string) => {
		setTouched((p) => ({ ...p, [fieldId]: true }));
	}, []);

	const visible = useMemo(() => isVisibleWith(values), [values]);
	const errors = useMemo(() => validateForm(config, values, visible), [config, values, visible]);
	const progress = useMemo(
		() => progressPercent(config, values, visible),
		[config, values, visible]
	);

	const provinceValue = useMemo(() => {
		for (const f of fieldsById.values()) {
			if (f.kind === "province") return (values[f.id] as string) || "";
		}
		return "";
	}, [fieldsById, values]);

	const show = useCallback(
		(fieldId: string) => (touched[fieldId] || submitted ? errors[fieldId] : undefined),
		[touched, submitted, errors]
	);

	/** Chỉ xoá nháp lưu trữ — KHÔNG đụng values (dùng sau submit thành công, để
	 * màn success còn đọc được dữ liệu vừa nhập). */
	const clearDraft = useCallback(() => {
		if (draftKey && typeof window !== "undefined") {
			try {
				window.localStorage.removeItem(draftKey);
			} catch {
				// bỏ qua
			}
		}
	}, [draftKey]);

	const reset = useCallback(() => {
		setValues(initValues(config));
		setTouched({});
		setSubmitted(false);
		clearDraft();
	}, [config, clearDraft]);

	return {
		values,
		setValue,
		toggleIn,
		touch,
		submitted,
		setSubmitted,
		errors,
		show,
		visible,
		provinceValue,
		progress,
		reset,
		clearDraft,
	};
}
