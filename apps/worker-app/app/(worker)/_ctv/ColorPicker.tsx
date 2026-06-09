"use client";

import { Card, CardContent } from "@mvp-ui/ui";
import { Check, ExternalLink, Palette } from "lucide-react";
import { colorName, FORM_COLORS } from "../../data/ctv-referral";
import { MiniForm } from "./MiniForm";
import { SectionHead } from "./SectionHead";

interface ColorPickerProps {
	color: string;
	onChange: (hex: string) => void;
	/** Link "Xem trang" — mang theo cả màu + kiểu biểu mẫu đang chọn. */
	previewHref: string;
}

/** Chọn màu thương hiệu trang giới thiệu — đổi --bp toàn feature tức thì. */
export function ColorPicker({ color, onChange, previewHref }: ColorPickerProps) {
	return (
		<section>
			<SectionHead
				icon={<Palette />}
				title="Màu trang giới thiệu"
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
				<CardContent className="flex gap-4 p-4">
					<div className="flex min-w-0 flex-1 flex-col">
						<p className="text-[13px] leading-relaxed text-fg-tertiary">
							Chọn màu thương hiệu cho trang đăng ký bạn gửi đi — áp dụng cho cả mã QR &amp; ảnh
							chia sẻ.
						</p>
						<div className="mt-3.5 flex flex-wrap gap-2.5">
							{FORM_COLORS.map((c) => {
								const selected = c.hex.toLowerCase() === color.toLowerCase();
								return (
									<button
										key={c.hex}
										type="button"
										aria-label={c.name}
										aria-pressed={selected}
										onClick={() => onChange(c.hex)}
										className="grid size-9 place-items-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
										style={{
											background: c.hex,
											boxShadow: selected
												? `0 0 0 2px var(--color-bg), 0 0 0 4px ${c.hex}`
												: "0 0 0 2px var(--color-bg), 0 0 0 3px var(--color-border)",
										}}
									>
										{selected && <Check className="size-3.5 text-white" strokeWidth={3.5} />}
									</button>
								);
							})}
						</div>
						<p className="mt-3.5 text-[13px] text-fg-secondary">
							Đang dùng: <b className="font-semibold text-fg">{colorName(color)}</b>
						</p>
					</div>
					<MiniForm />
				</CardContent>
			</Card>
		</section>
	);
}
