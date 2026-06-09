"use client";

import { Card, CardContent, RadioButton, RadioGroup } from "@mvp-ui/ui";
import { ExternalLink, SunMoon } from "lucide-react";
import { HERO_THEMES, type HeroTheme } from "../../data/ctv-referral";
import { SectionHead } from "./SectionHead";

interface ThemePickerProps {
	theme: HeroTheme;
	onChange: (theme: HeroTheme) => void;
	/** Link "Xem trang" — mang theo cả màu + kiểu biểu mẫu + giao diện đang chọn. */
	previewHref: string;
}

/** Chọn giao diện hero (Sáng / Tối) cho trang đăng ký CTV gửi đi. */
export function ThemePicker({ theme, onChange, previewHref }: ThemePickerProps) {
	return (
		<section>
			<SectionHead
				icon={<SunMoon />}
				title="Giao diện header"
				action={
					<a
						href={previewHref}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-[13px] font-semibold text-fg-brand transition-colors hover:text-fg-brand/80"
					>
						Xem trang
						<ExternalLink className="size-3.5" />
					</a>
				}
			/>
			<Card className="shadow-sm">
				<CardContent className="p-4">
					<p className="mb-3.5 text-[13px] leading-relaxed text-fg-tertiary">
						Chọn tông màu khối đầu trang. Nền tối dùng màu thương hiệu đậm, chữ trắng.
					</p>
					<RadioGroup
						aria-label="Giao diện hero"
						size="md"
						value={theme}
						onChange={(v) => onChange(v as HeroTheme)}
						className="gap-2.5"
					>
						{HERO_THEMES.map((opt) => (
							<RadioButton
								key={opt.id}
								value={opt.id}
								label={opt.name}
								hint={opt.hint}
								className={({ isSelected }) =>
									`cursor-pointer rounded-xl border p-3 transition-colors ${
										isSelected ? "border-border-brand bg-info-bg" : "border-border-secondary"
									}`
								}
							/>
						))}
					</RadioGroup>
				</CardContent>
			</Card>
		</section>
	);
}
