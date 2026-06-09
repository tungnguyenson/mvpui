import type { ReactNode } from "react";

interface SectionHeadProps {
	icon: ReactNode;
	title: string;
	/** Slot phải, ví dụ link "Xem trang". */
	action?: ReactNode;
}

/** Tiêu đề mục: ô icon brand + tên + slot phải tuỳ chọn. */
export function SectionHead({ icon, title, action }: SectionHeadProps) {
	return (
		<div className="mb-2.5 flex items-center gap-2.5">
			<span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-info-bg text-fg-brand [&_svg]:size-4">
				{icon}
			</span>
			<h3 className="flex-1 text-[15px] font-bold tracking-[-0.01em] text-fg">{title}</h3>
			{action}
		</div>
	);
}
