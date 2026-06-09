"use client";

import { Button, QRCode, toast } from "@mvp-ui/ui";
import { Check, Copy, ExternalLink, Link2, ScanLine } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormConfig } from "./form-schema";

const BRAND_SWATCHES = ["#7f56d9", "#C2660C", "#1570EF", "#039855", "#DD2590", "#0E7490"];

interface SharePanelProps {
	config: FormConfig;
	onBrandChange: (brand: string) => void;
}

export function SharePanel({ config, onBrandChange }: SharePanelProps) {
	const [origin, setOrigin] = useState("");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") setOrigin(window.location.origin);
	}, []);

	const url = `${origin}/f/${config.slug}`;
	const displayUrl = url.replace(/^https?:\/\//, "");

	const qrOptions = {
		width: 176,
		height: 176,
		margin: 0,
		qrOptions: { errorCorrectionLevel: "H" as const },
		dotsOptions: { type: "rounded" as const, color: config.brand },
		cornersSquareOptions: { type: "extra-rounded" as const, color: config.brand },
		cornersDotOptions: { type: "dot" as const, color: config.brand },
		backgroundOptions: { color: "#ffffff" },
	};

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			// bỏ qua
		}
		setCopied(true);
		toast.success("Đã sao chép link form");
		setTimeout(() => setCopied(false), 1800);
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{config.status !== "active" && (
				<p className="w-full rounded-lg bg-warning-bg px-3 py-2 text-center text-xs text-warning-fg">
					Form đang ở trạng thái “{config.status === "draft" ? "Nháp" : "Dừng"}” — link công khai
					chỉ mở được khi chuyển sang “Hoạt động”.
				</p>
			)}

			<div className="rounded-2xl border border-border-secondary bg-bg p-3">
				{origin ? (
					<QRCode size="lg" value={url} options={qrOptions} className="border-0 p-0" />
				) : (
					<div className="size-44 animate-pulse rounded-lg bg-bg-secondary" />
				)}
			</div>
			<p className="inline-flex items-center gap-1.5 text-[13px] text-fg-tertiary [&_svg]:size-4 [&_svg]:text-fg-brand">
				<ScanLine />
				Quét mã để mở trang đăng ký
			</p>

			{/* Link row */}
			<div className="flex w-full items-center gap-2.5">
				<div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg bg-bg-secondary px-3.5">
					<Link2 className="size-4 shrink-0 text-fg-brand" />
					<span className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-fg-secondary">
						{displayUrl}
					</span>
				</div>
				<Button color="primary" size="md" iconLeading={copied ? Check : Copy} onClick={copy}>
					{copied ? "Đã chép" : "Sao chép"}
				</Button>
			</div>

			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-fg-brand"
			>
				<ExternalLink className="size-4" />
				Mở trang form
			</a>

			{/* Brand color */}
			<div className="w-full">
				<div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
					Màu thương hiệu
				</div>
				<div className="flex flex-wrap items-center gap-2">
					{BRAND_SWATCHES.map((hex) => (
						<button
							type="button"
							key={hex}
							aria-label={hex}
							onClick={() => onBrandChange(hex)}
							style={{ background: hex }}
							className={`size-7 rounded-full ring-2 ring-offset-2 ring-offset-bg transition-transform hover:scale-110 ${
								config.brand.toLowerCase() === hex.toLowerCase()
									? "ring-border-brand"
									: "ring-transparent"
							}`}
						/>
					))}
					<label className="relative size-7 cursor-pointer overflow-hidden rounded-full border border-border">
						<input
							type="color"
							value={config.brand}
							onChange={(e) => onBrandChange(e.target.value)}
							className="absolute inset-0 size-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
						/>
					</label>
				</div>
			</div>
		</div>
	);
}
