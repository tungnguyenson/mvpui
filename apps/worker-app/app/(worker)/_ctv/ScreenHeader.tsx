import type { ReactNode } from "react";
import { CtvAppBar } from "./CtvAppBar";

interface ScreenHeaderProps {
	title: string;
	subtitle: string;
	children?: ReactNode;
}

/**
 * Dải --bp ở đầu mỗi màn: appbar nhận diện CTV + tiêu đề + mô tả. Vừa là header
 * vừa thay top bar của app trên 2 màn referral. Nội dung phía dưới kéo lên đè
 * lên dải này (-mt) — đặt trong cùng `.ctv-referral` để nhận đúng màu.
 */
export function ScreenHeader({ title, subtitle, children }: ScreenHeaderProps) {
	return (
		<header className="relative overflow-hidden bg-primary px-5 pb-[70px] pt-[calc(env(safe-area-inset-top)+0.875rem)] text-primary-fg lg:px-0">
			<div className="ctv-grid" aria-hidden />
			<div className="relative lg:mx-auto lg:max-w-4xl lg:px-8">
				<CtvAppBar />
				<h1 className="mt-4 text-[21px] font-bold leading-tight tracking-[-0.02em]">{title}</h1>
				<p className="mt-1.5 max-w-[300px] text-[13px] leading-relaxed text-primary-fg/80">
					{subtitle}
				</p>
				{children}
			</div>
		</header>
	);
}
