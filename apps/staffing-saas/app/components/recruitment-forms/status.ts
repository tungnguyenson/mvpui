import type { BadgeColor } from "@mvp-ui/ui";
import type { FormStatus } from "./form-schema";

/** Nhãn + màu badge cho trạng thái form. Dùng chung list + builder. */
export const STATUS_META: Record<FormStatus, { label: string; color: BadgeColor }> = {
	draft: { label: "Nháp", color: "gray" },
	active: { label: "Hoạt động", color: "success" },
	paused: { label: "Dừng", color: "warning" },
};

export const STATUS_ORDER: FormStatus[] = ["draft", "active", "paused"];
