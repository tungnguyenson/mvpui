"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FORM_COLOR } from "../../data/ctv-referral";

/** Khoá lưu màu trang giới thiệu CTV đã chọn. */
const COLOR_KEY = "viec_ctv_formcolor";

/**
 * Màu thương hiệu trang giới thiệu của CTV — nguồn sự thật là localStorage để
 * hai màn (/chia-se, /thuong) đồng bộ. Trả về [color, setColor]; setColor cập
 * nhật state (recolor --bp tức thì) và persist.
 *
 * Khi nối backend: thay localStorage bằng API CTV profile setting.
 */
export function useFormColor(): readonly [string, (hex: string) => void] {
  const [color, setColorState] = useState(DEFAULT_FORM_COLOR);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COLOR_KEY);
      if (saved) setColorState(saved);
    } catch {
      // localStorage không khả dụng — giữ màu mặc định.
    }
  }, []);

  const setColor = useCallback((hex: string) => {
    setColorState(hex);
    try {
      localStorage.setItem(COLOR_KEY, hex);
    } catch {
      // bỏ qua lỗi ghi.
    }
  }, []);

  return [color, setColor] as const;
}
