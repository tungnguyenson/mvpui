"use client";

import { ExternalLink, ListChecks } from "lucide-react";
import { Card, CardContent, RadioButton, RadioGroup } from "@mvp-ui/ui";
import { FORM_VARIANTS, type FormVariant } from "../../data/ctv-referral";
import { SectionHead } from "./SectionHead";

interface FormTypePickerProps {
	variant: FormVariant;
	onChange: (variant: FormVariant) => void;
	/** Link "Xem trang" — mang theo cả màu + kiểu biểu mẫu đang chọn. */
	previewHref: string;
}

/** Chọn kiểu biểu mẫu (Đơn giản / Chi tiết) cho trang đăng ký CTV gửi đi. */
export function FormTypePicker({ variant, onChange, previewHref }: FormTypePickerProps) {
	return (
		<section>
			<SectionHead
				icon={<ListChecks />}
				title="Loại biểu mẫu"
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
						Chọn lượng thông tin người đăng ký cần điền. Biểu mẫu gọn giúp đăng ký nhanh hơn.
					</p>
					<RadioGroup
						aria-label="Loại biểu mẫu"
						size="md"
						value={variant}
						onChange={(v) => onChange(v as FormVariant)}
						className="gap-2.5"
					>
						{FORM_VARIANTS.map((opt) => (
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
