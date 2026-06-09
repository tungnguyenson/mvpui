"use client";

import {
	Briefcase,
	Building2,
	Calendar,
	Check,
	CheckCircle,
	ChevronDown,
	Clock,
	Flame,
	Hash,
	Info,
	Phone,
	Star,
	Type,
	User,
	Users,
} from "lucide-react";
import {
	ACTIVE_BY_PROVINCE,
	GENDERS,
	JOBTYPES,
	LICENSES,
	PROVINCES,
	SHIFTS,
	SOURCES,
} from "./data";
import type { CccdValue, Field, FieldValue } from "./form-schema";
import { Chip, ErrText, Lab, type SourceId, UploadBox } from "./ReferralFields";
import { PHONE_RE } from "./validate";

const JOBTYPE_ICONS = { clock: Clock, briefcase: Briefcase } as const;

function todayISO(offset = 0): string {
	const d = new Date();
	d.setDate(d.getDate() + offset);
	return d.toISOString().slice(0, 10);
}

interface FieldControlProps {
	field: Field;
	value: FieldValue;
	onChange: (v: FieldValue) => void;
	onToggle: (item: string, max?: number) => void;
	onBlur?: (() => void) | undefined;
	error?: string | undefined;
	provinceValue: string;
}

export function FieldControl({
	field,
	value,
	onChange,
	onToggle,
	onBlur,
	error,
	provinceValue,
}: FieldControlProps) {
	// Hai kind có layout riêng (không bọc Lab chuẩn).
	if (field.kind === "static_text") {
		return (
			<div className="field" data-field={field.id}>
				<div className="region-empty">
					<Info />
					<span>
						<b>{field.label}</b>
						{field.helpText ? ` — ${field.helpText}` : ""}
					</span>
				</div>
			</div>
		);
	}

	if (field.kind === "consent18") {
		const on = value === true;
		return (
			<div className="field" data-field={field.id}>
				<button
					type="button"
					className={`consent${on ? " on" : ""}`}
					onClick={() => onChange(!on)}
					aria-pressed={on}
				>
					<span className="check">
						<Check />
					</span>
					<span className="ctext">
						{field.label}
						{field.required && <span className="req"> *</span>}
					</span>
				</button>
				{error && <ErrText msg={error} />}
			</div>
		);
	}

	const note = labNote(field, value);

	return (
		<div className="field" data-field={field.id}>
			<Lab req={field.required} note={note}>
				{field.label}
			</Lab>
			<Control
				field={field}
				value={value}
				onChange={onChange}
				onToggle={onToggle}
				onBlur={onBlur}
				hasError={!!error}
				provinceValue={provinceValue}
			/>
			{error ? (
				<ErrText msg={error} />
			) : field.helpText ? (
				<p className="hint">{field.helpText}</p>
			) : null}
		</div>
	);
}

function labNote(field: Field, value: FieldValue): string | undefined {
	if (field.max && Array.isArray(value)) return `${value.length}/${field.max}`;
	if (!field.required && (field.kind === "cccd" || field.kind === "startdate")) {
		return "Không bắt buộc";
	}
	return undefined;
}

interface ControlProps {
	field: Field;
	value: FieldValue;
	onChange: (v: FieldValue) => void;
	onToggle: (item: string, max?: number) => void;
	onBlur?: (() => void) | undefined;
	hasError: boolean;
	provinceValue: string;
}

function Control({
	field,
	value,
	onChange,
	onToggle,
	onBlur,
	hasError,
	provinceValue,
}: ControlProps) {
	const errCls = hasError ? " err" : "";

	switch (field.kind) {
		// ── text-ish ──
		case "fullname":
		case "short_text": {
			const Lead = field.kind === "fullname" ? User : Type;
			return (
				<div className={`input${errCls}`}>
					<Lead className="lead" />
					<input
						value={(value as string) || ""}
						placeholder={field.placeholder || "Nhập câu trả lời"}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					/>
				</div>
			);
		}

		case "phone": {
			const v = (value as string) || "";
			const valid = PHONE_RE.test(v.replace(/\s/g, ""));
			return (
				<div className={`input${errCls}`}>
					<Phone className="lead" />
					<span className="prefix">+84</span>
					<input
						value={v}
						placeholder={field.placeholder || "0912 345 678"}
						inputMode="numeric"
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					/>
					{valid && <CheckCircle size={18} style={{ color: "var(--fg-success)" }} />}
				</div>
			);
		}

		case "paragraph":
			return (
				<div className={`input textarea-wrap${errCls}`}>
					<textarea
						value={(value as string) || ""}
						placeholder={field.placeholder || "Nhập câu trả lời"}
						rows={3}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					/>
				</div>
			);

		case "number":
			return (
				<div className={`input${errCls}`}>
					<Hash className="lead" />
					<input
						type="number"
						value={(value as string) || ""}
						placeholder={field.placeholder || "0"}
						min={field.min}
						max={field.max}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					/>
				</div>
			);

		case "date":
		case "startdate": {
			const isStart = field.kind === "startdate";
			return (
				<div className={`input select-wrap${errCls}`}>
					<Calendar className="lead" />
					<input
						type="date"
						value={(value as string) || ""}
						min={isStart ? todayISO(0) : undefined}
						max={isStart ? todayISO(30) : undefined}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
						style={{ colorScheme: "light" }}
					/>
				</div>
			);
		}

		// ── single-choice chips ──
		case "gender":
			return (
				<div className="chips">
					{GENDERS.map((g) => (
						<Chip key={g} on={value === g} onClick={() => onChange(g)}>
							{g}
						</Chip>
					))}
				</div>
			);

		case "yesno":
			return (
				<div className="chips">
					{[
						{ id: "yes", label: "Có" },
						{ id: "no", label: "Không" },
					].map((o) => (
						<Chip key={o.id} on={value === o.id} onClick={() => onChange(o.id)}>
							{o.label}
						</Chip>
					))}
				</div>
			);

		case "single_choice":
			return (
				<div className="chips">
					{(field.options ?? []).map((o) => (
						<Chip key={o.id} on={value === o.id} onClick={() => onChange(o.id)}>
							{o.label}
						</Chip>
					))}
				</div>
			);

		case "source":
			return (
				<div className="chips">
					{SOURCES.map((s) => (
						<Chip
							key={s.id}
							on={value === s.id}
							source={s.id as SourceId}
							onClick={() => onChange(s.id)}
						>
							{s.label}
						</Chip>
					))}
				</div>
			);

		// ── selects ──
		case "province":
			return (
				<div className={`input select-wrap${errCls}`}>
					<Building2 className="lead" />
					<select
						value={(value as string) || ""}
						className={!value ? "placeholder" : ""}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					>
						<option value="" disabled>
							Chọn tỉnh / thành phố
						</option>
						{PROVINCES.map((p) => (
							<option key={p.id} value={p.id}>
								{p.name}
							</option>
						))}
					</select>
					<ChevronDown className="chev" />
				</div>
			);

		case "license":
			return (
				<div className={`input select-wrap${errCls}`}>
					<select
						value={(value as string) || ""}
						className={!value ? "placeholder" : ""}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					>
						<option value="" disabled>
							Chọn loại bằng lái
						</option>
						{LICENSES.map((l) => (
							<option key={l} value={l}>
								{l}
							</option>
						))}
					</select>
					<ChevronDown className="chev" />
				</div>
			);

		case "dropdown":
			return (
				<div className={`input select-wrap${errCls}`}>
					<select
						value={(value as string) || ""}
						className={!value ? "placeholder" : ""}
						onChange={(e) => onChange(e.target.value)}
						onBlur={onBlur}
					>
						<option value="" disabled>
							{field.placeholder || "Chọn một"}
						</option>
						{(field.options ?? []).map((o) => (
							<option key={o.id} value={o.id}>
								{o.label}
							</option>
						))}
					</select>
					<ChevronDown className="chev" />
				</div>
			);

		// ── multi chips ──
		case "district": {
			if (!provinceValue) return <RegionEmpty text="Chọn tỉnh / thành phố ở trên trước." />;
			const province = PROVINCES.find((p) => p.id === provinceValue);
			const arr = (value as string[]) || [];
			return (
				<div className="chips">
					{(province?.districts ?? []).map((d) => {
						const on = arr.includes(d);
						const full = !on && !!field.max && arr.length >= field.max;
						return (
							<Chip key={d} multi on={on} disabled={full} onClick={() => onToggle(d, field.max)}>
								{d}
							</Chip>
						);
					})}
				</div>
			);
		}

		case "shift": {
			const arr = (value as string[]) || [];
			return (
				<div className="chips">
					{SHIFTS.map((s) => (
						<Chip
							key={s.id}
							multi
							on={arr.includes(s.id)}
							sub={s.sub}
							onClick={() => onToggle(s.id, field.max)}
						>
							{s.label}
						</Chip>
					))}
				</div>
			);
		}

		case "multi_choice": {
			const arr = (value as string[]) || [];
			return (
				<div className="chips">
					{(field.options ?? []).map((o) => {
						const on = arr.includes(o.id);
						const full = !on && !!field.max && arr.length >= field.max;
						return (
							<Chip
								key={o.id}
								multi
								on={on}
								disabled={full}
								onClick={() => onToggle(o.id, field.max)}
							>
								{o.label}
							</Chip>
						);
					})}
				</div>
			);
		}

		// ── card lists ──
		case "company": {
			if (!provinceValue) {
				return (
					<RegionEmpty text="Chọn khu vực ở trên trước — chúng tôi gợi ý công ty đang tuyển nhiều nhất gần bạn." />
				);
			}
			const arr = (value as string[]) || [];
			const companies = ACTIVE_BY_PROVINCE[provinceValue] ?? [];
			return (
				<div className="opt-list">
					{companies.map((c) => {
						const on = arr.includes(c.id);
						const full = !on && !!field.max && arr.length >= field.max;
						return (
							<button
								type="button"
								key={c.id}
								className={`opt${on ? " on" : ""}${full ? " disabled" : ""}`}
								onClick={() => !full && onToggle(c.id, field.max)}
								aria-pressed={on}
								disabled={full}
							>
								<span className="logo-mono" style={{ background: c.color }}>
									{c.abbr}
								</span>
								<div className="otext">
									<div className="ot">
										{c.name}
										{c.hot && (
											<span className="hot-badge">
												<Flame />
												Tuyển gấp
											</span>
										)}
									</div>
									<div className="os">
										<span>{c.ind}</span>
										<span className="jobs-badge">
											<Users />
											{c.jobs} vị trí
										</span>
									</div>
								</div>
								<span className="check">
									<Check />
								</span>
							</button>
						);
					})}
				</div>
			);
		}

		case "jobtype": {
			const arr = (value as string[]) || [];
			return (
				<div className="opt-list">
					{JOBTYPES.map((j) => {
						const on = arr.includes(j.id);
						const JobIcon = JOBTYPE_ICONS[j.icon];
						return (
							<button
								type="button"
								key={j.id}
								className={`opt${on ? " on" : ""}`}
								onClick={() => onToggle(j.id, field.max)}
								aria-pressed={on}
							>
								<span className="oic" style={{ background: j.color }}>
									<JobIcon />
								</span>
								<div className="otext">
									<div className="ot">{j.label}</div>
									<div className="os">{j.sub}</div>
								</div>
								<span className="check">
									<Check />
								</span>
							</button>
						);
					})}
				</div>
			);
		}

		// ── uploads ──
		case "cccd": {
			const v = (value as CccdValue) || { front: null, back: null };
			return (
				<div className="upload-grid">
					<UploadBox
						label="Mặt trước"
						value={v.front}
						onChange={(url) => onChange({ ...v, front: url })}
					/>
					<UploadBox
						label="Mặt sau"
						value={v.back}
						onChange={(url) => onChange({ ...v, back: url })}
					/>
				</div>
			);
		}

		// ── rating ──
		case "rating": {
			const cur = Number((value as string) || 0);
			const max = field.max || 5;
			return (
				<div className="rating">
					{Array.from({ length: max }, (_, i) => i + 1).map((n) => (
						<button
							type="button"
							key={n}
							className={`star-btn${n <= cur ? " on" : ""}`}
							onClick={() => onChange(String(n))}
							aria-label={`${n} sao`}
						>
							<Star />
						</button>
					))}
				</div>
			);
		}

		default:
			return null;
	}
}

function RegionEmpty({ text }: { text: string }) {
	return (
		<div className="region-empty">
			<Info />
			<span>{text}</span>
		</div>
	);
}
