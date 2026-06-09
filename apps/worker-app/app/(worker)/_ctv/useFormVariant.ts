"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FORM_VARIANT, type FormVariant } from "../../data/ctv-referral";

/** Khoá lưu kiểu biểu mẫu trang giới thiệu CTV đã chọn. */
const VARIANT_KEY = "viec_ctv_formvariant";

function isVariant(v: string | null): v is FormVariant {
	return v === "simple" || v === "detailed";
}

/**
 * Kiểu biểu mẫu trang giới thiệu của CTV — nguồn sự thật là localStorage để
 * đồng bộ giữa các màn cấu hình. Trả về [variant, setVariant]; setVariant cập
 * nhật state và persist.
 *
 * Khi nối backend: thay localStorage bằng API CTV profile setting (giống màu).
 */
export function useFormVariant(): readonly [FormVariant, (v: FormVariant) => void] {
	const [variant, setVariantState] = useState<FormVariant>(DEFAULT_FORM_VARIANT);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(VARIANT_KEY);
			if (isVariant(saved)) setVariantState(saved);
		} catch {
			// localStorage không khả dụng — giữ mặc định.
		}
	}, []);

	const setVariant = useCallback((v: FormVariant) => {
		setVariantState(v);
		try {
			localStorage.setItem(VARIANT_KEY, v);
		} catch {
			// bỏ qua lỗi ghi.
		}
	}, []);

	return [variant, setVariant] as const;
}
