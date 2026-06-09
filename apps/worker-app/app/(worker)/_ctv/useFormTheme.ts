"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_HERO_THEME, type HeroTheme } from "../../data/ctv-referral";

/** Khoá lưu giao diện hero (sáng/tối) trang giới thiệu CTV đã chọn. */
const THEME_KEY = "viec_ctv_herotheme";

function isTheme(v: string | null): v is HeroTheme {
	return v === "light" || v === "dark";
}

/**
 * Giao diện hero trang giới thiệu của CTV — nguồn sự thật là localStorage để
 * đồng bộ giữa các màn cấu hình. Trả về [theme, setTheme]; setTheme cập nhật
 * state và persist. Khi nối backend: thay localStorage bằng API CTV profile.
 */
export function useFormTheme(): readonly [HeroTheme, (v: HeroTheme) => void] {
	const [theme, setThemeState] = useState<HeroTheme>(DEFAULT_HERO_THEME);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(THEME_KEY);
			if (isTheme(saved)) setThemeState(saved);
		} catch {
			// localStorage không khả dụng — giữ mặc định.
		}
	}, []);

	const setTheme = useCallback((v: HeroTheme) => {
		setThemeState(v);
		try {
			localStorage.setItem(THEME_KEY, v);
		} catch {
			// bỏ qua lỗi ghi.
		}
	}, []);

	return [theme, setTheme] as const;
}
