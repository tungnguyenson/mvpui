"use client";

import { Check } from "lucide-react";
import { ACTIVE_BY_PROVINCE, JOBTYPES, PROVINCES, SHIFT_LABELS } from "./data";
import type { CccdValue, Field, FormConfig, FormValues } from "./form-schema";

/** Hiển thị giá trị 1 field thành chuỗi đọc được (id → nhãn). */
function displayValue(
	field: Field,
	value: FormValues[string],
	provinceValue: string
): string | null {
	if (value == null || value === "" || value === false) return null;

	switch (field.kind) {
		case "province":
			return PROVINCES.find((p) => p.id === value)?.name ?? String(value);
		case "company": {
			const companies = ACTIVE_BY_PROVINCE[provinceValue] ?? [];
			const arr = value as string[];
			if (!arr.length) return null;
			return arr.map((id) => companies.find((c) => c.id === id)?.name ?? id).join(", ");
		}
		case "shift": {
			const arr = value as string[];
			if (!arr.length) return null;
			return arr.map((id) => SHIFT_LABELS[id] ?? id).join(", ");
		}
		case "jobtype": {
			const arr = value as string[];
			if (!arr.length) return null;
			return arr.map((id) => JOBTYPES.find((j) => j.id === id)?.label ?? id).join(", ");
		}
		case "district":
		case "multi_choice": {
			const arr = value as string[];
			if (!arr.length) return null;
			if (field.kind === "multi_choice") {
				return arr.map((id) => field.options?.find((o) => o.id === id)?.label ?? id).join(", ");
			}
			return arr.join(", ");
		}
		case "single_choice":
		case "dropdown":
			return field.options?.find((o) => o.id === value)?.label ?? String(value);
		case "yesno":
			return value === "yes" ? "Có" : "Không";
		case "rating":
			return `${value} sao`;
		case "cccd": {
			const v = value as CccdValue;
			return v.front || v.back ? "Đã tải ảnh" : null;
		}
		case "consent18":
		case "static_text":
			return null;
		default:
			return String(value);
	}
}

interface SuccessScreenProps {
	config: FormConfig;
	values: FormValues;
	provinceValue: string;
}

export function SuccessScreen({ config, values, provinceValue }: SuccessScreenProps) {
	const fields = config.sections.flatMap((s) => s.fields);
	const nameField = fields.find((f) => f.kind === "fullname");
	const fullName = nameField ? String(values[nameField.id] || "") : "";
	const firstName = fullName.trim().split(/\s+/).slice(-1)[0] || "bạn";

	const rows = fields
		.filter((f) => f.kind !== "static_text" && f.kind !== "consent18")
		.map((f) => ({ label: f.label, text: displayValue(f, values[f.id] ?? null, provinceValue) }))
		.filter((r): r is { label: string; text: string } => !!r.text);

	return (
		<div className="device">
			<div className="scroll">
				<div className="success">
					<div className="burst">
						<span className="ring" />
						<Check />
					</div>
					<h1>{config.success.title}</h1>
					<p className="lede">
						Cảm ơn <b>{firstName}</b>. {config.success.message}
					</p>

					{rows.length > 0 && (
						<div className="summary">
							{rows.map((r) => (
								<div className="srow" key={r.label}>
									<span className="k">{r.label}</span>
									<span className="v">{r.text}</span>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
