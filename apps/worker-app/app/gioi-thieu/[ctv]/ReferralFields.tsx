"use client";

import { Camera, Check } from "lucide-react";

const cx = (...parts: Array<string | false | null | undefined>): string =>
	parts.filter(Boolean).join(" ");

interface LabProps {
	children: React.ReactNode;
	req?: boolean;
	note?: string;
}

// Nhãn hiển thị phía trên field — không bọc trực tiếp input (input tuỳ biến
// là chip/select riêng), nên dùng <div> thay <label> để tránh label rỗng.
export function Lab({ children, req, note }: LabProps) {
	return (
		<div className="lab">
			<span className="ltext">
				{children}
				{req && <span className="req"> *</span>}
			</span>
			{note && <span className="maxnote">{note}</span>}
		</div>
	);
}

export function ErrText({ msg }: { msg: string | undefined }) {
	if (!msg) return null;
	return (
		<div className="err-text">
			<AlertCircle />
			{msg}
		</div>
	);
}

// Lucide không export sẵn icon "alert-circle" theo tên này ở mọi version —
// dùng glyph inline để chắc chắn khớp kích thước qua CSS.
function AlertCircle() {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="8" x2="12" y2="12" />
			<line x1="12" y1="16" x2="12.01" y2="16" />
		</svg>
	);
}

export type SourceId = "zalo" | "facebook" | "tiktok";

export function SourceGlyph({ id }: { id: SourceId }) {
	if (id === "zalo") {
		return (
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 2C6.2 2 1.5 6.03 1.5 11c0 2.77 1.46 5.25 3.76 6.92-.15 1.2-.66 2.4-1.5 3.36-.27.31-.04.8.37.73 1.96-.34 3.6-1.13 4.74-2.02 1.13.32 2.34.49 3.63.49 5.8 0 10.5-4.03 10.5-9S17.8 2 12 2z" />
			</svg>
		);
	}
	if (id === "facebook") {
		return (
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
		</svg>
	);
}

interface ChipProps {
	on: boolean;
	multi?: boolean;
	disabled?: boolean;
	source?: SourceId;
	onClick: () => void;
	children: React.ReactNode;
	sub?: string;
}

export function Chip({ on, multi, disabled, source, onClick, children, sub }: ChipProps) {
	return (
		<button
			type="button"
			className={cx("chip", on && "on", disabled && "disabled")}
			onClick={disabled ? undefined : onClick}
			aria-pressed={on}
			disabled={disabled}
		>
			<span className={cx("mark", multi ? "sq" : "rd")}>{multi ? <Check /> : null}</span>
			{source && (
				<span className="srcic">
					<SourceGlyph id={source} />
				</span>
			)}
			<span className="chip-lbl">{children}</span>
			{sub && <span className="chip-sub">{sub}</span>}
		</button>
	);
}

interface UploadBoxProps {
	label: string;
	value: string | null;
	onChange: (url: string) => void;
}

// <label> bọc input file ẩn — click vào ô mở hộp thoại chọn ảnh, accessible
// nguyên bản (không cần role/tabindex thủ công).
export function UploadBox({ label, value, onChange }: UploadBoxProps) {
	const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		onChange(URL.createObjectURL(file));
	};
	return (
		<label className={cx("upload", value && "filled")} aria-label={`Tải ảnh ${label}`}>
			{value ? (
				<>
					<div className="preview" style={{ backgroundImage: `url(${value})` }} />
					<span className="badge">
						<Check />
					</span>
				</>
			) : (
				<>
					<Camera />
					<span className="ut">{label}</span>
					<span className="us">Chạm để tải lên</span>
				</>
			)}
			<input type="file" accept="image/*" onChange={onFile} />
		</label>
	);
}
