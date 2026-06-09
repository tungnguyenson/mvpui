"use client";

import { Button, ButtonGroup, ButtonGroupItem, Input, TextArea, Toggle } from "@mvp-ui/ui";
import { Plus, Trash2 } from "lucide-react";
import { controlCandidates, controlValues } from "./conditional";
import { FIELD_KINDS, SECTION_ICON_KEYS, sectionIcon } from "./field-registry";
import type { Field, FieldOption, FormConfig, FormStatus, Section } from "./form-schema";
import { STATUS_META, STATUS_ORDER } from "./status";

const BRAND_SWATCHES = ["#7f56d9", "#C2660C", "#1570EF", "#039855", "#DD2590", "#0E7490"];

type Mode = "field" | "section" | "form";

interface InspectorProps {
	mode: Mode;
	config: FormConfig;
	field?: Field | undefined;
	section?: Section | undefined;
	onUpdateField: (id: string, patch: Partial<Field>) => void;
	onDeleteField: (id: string) => void;
	onAddOption: (fieldId: string) => void;
	onUpdateOption: (fieldId: string, optionId: string, label: string) => void;
	onRemoveOption: (fieldId: string, optionId: string) => void;
	onUpdateSection: (id: string, patch: Partial<Section>) => void;
	onDeleteSection: (id: string) => void;
	canDeleteSection: (id: string) => boolean;
	onUpdateForm: (patch: Partial<FormConfig>) => void;
}

export function FieldSettingsPanel(props: InspectorProps) {
	if (props.mode === "field" && props.field)
		return <FieldInspector {...props} field={props.field} />;
	if (props.mode === "section" && props.section)
		return <SectionInspector {...props} section={props.section} />;
	return <FormInspector {...props} />;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-2">
			<div className="text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
				{title}
			</div>
			{children}
		</div>
	);
}

// ── Field ────────────────────────────────────────────────────
function FieldInspector({
	config,
	field,
	onUpdateField,
	onDeleteField,
	onAddOption,
	onUpdateOption,
	onRemoveOption,
}: InspectorProps & { field: Field }) {
	const meta = FIELD_KINDS[field.kind];

	return (
		<div className="flex flex-col gap-5">
			<div className="text-sm font-semibold text-fg">Cài đặt trường</div>

			<Input
				label="Nhãn hiển thị"
				value={field.label}
				onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
			/>

			{field.kind !== "static_text" && (
				<Input
					label="Văn bản gợi ý (placeholder)"
					value={field.placeholder ?? ""}
					onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
				/>
			)}

			<TextArea
				label="Mô tả / hướng dẫn"
				value={field.helpText ?? ""}
				rows={2}
				onChange={(v) => onUpdateField(field.id, { helpText: v })}
			/>

			{meta.hasOptions && (
				<Group title="Lựa chọn">
					<OptionsEditor
						options={field.options ?? []}
						onAdd={() => onAddOption(field.id)}
						onUpdate={(oid, label) => onUpdateOption(field.id, oid, label)}
						onRemove={(oid) => onRemoveOption(field.id, oid)}
					/>
				</Group>
			)}

			{(field.kind === "district" || field.kind === "company" || field.kind === "multi_choice") && (
				<Input
					type="number"
					label="Số lựa chọn tối đa"
					value={String(field.max ?? "")}
					min={1}
					onChange={(e) => {
						const n = Number(e.target.value);
						if (Number.isFinite(n) && n > 0) onUpdateField(field.id, { max: n });
					}}
				/>
			)}

			{meta.requiredToggle !== false && field.kind !== "static_text" && (
				<Toggle
					label="Bắt buộc"
					isSelected={field.required}
					onChange={(v) => onUpdateField(field.id, { required: v })}
				/>
			)}

			{!field.locked && field.kind !== "static_text" && (
				<ConditionalEditor config={config} field={field} onUpdate={onUpdateField} />
			)}

			{field.locked ? (
				<p className="rounded-lg bg-bg-secondary px-3 py-2 text-xs text-fg-tertiary">
					Trường hệ thống — luôn có trong form, không thể xoá.
				</p>
			) : (
				<Button
					color="secondary"
					size="sm"
					iconLeading={Trash2}
					onClick={() => onDeleteField(field.id)}
					className="text-fg-error!"
				>
					Xoá trường
				</Button>
			)}
		</div>
	);
}

const SELECT_CLS =
	"w-full rounded-lg border border-border bg-bg px-2.5 py-2 text-sm text-fg outline-none focus:border-border-brand";

function ConditionalEditor({
	config,
	field,
	onUpdate,
}: {
	config: FormConfig;
	field: Field;
	onUpdate: (id: string, patch: Partial<Field>) => void;
}) {
	const candidates = controlCandidates(config, field.id);
	const on = !!field.showWhen;
	const ctrl = field.showWhen ? candidates.find((c) => c.id === field.showWhen?.fieldId) : undefined;
	const values = ctrl ? controlValues(ctrl) : [];

	return (
		<Group title="Hiển thị có điều kiện">
			<Toggle
				label="Chỉ hiện khi thoả điều kiện"
				isSelected={on}
				onChange={(next) => {
					if (!next) {
						onUpdate(field.id, { showWhen: null });
						return;
					}
					const first = candidates[0];
					if (!first) {
						onUpdate(field.id, { showWhen: null });
						return;
					}
					const fv = controlValues(first)[0];
					onUpdate(field.id, { showWhen: { fieldId: first.id, equals: fv?.value ?? "" } });
				}}
			/>

			{on && candidates.length === 0 && (
				<p className="text-xs text-fg-tertiary">
					Chưa có trường lựa chọn nào đứng trước để làm điều kiện.
				</p>
			)}

			{on && field.showWhen && candidates.length > 0 && (
				<div className="flex flex-col gap-2">
					<select
						className={SELECT_CLS}
						value={field.showWhen.fieldId}
						onChange={(e) => {
							const nf = candidates.find((c) => c.id === e.target.value);
							const fv = nf ? controlValues(nf)[0] : undefined;
							onUpdate(field.id, { showWhen: { fieldId: e.target.value, equals: fv?.value ?? "" } });
						}}
					>
						{candidates.map((c) => (
							<option key={c.id} value={c.id}>
								{c.label}
							</option>
						))}
					</select>
					<div className="flex items-center gap-2 text-xs text-fg-tertiary">
						bằng
						<select
							className={SELECT_CLS}
							value={field.showWhen.equals}
							onChange={(e) =>
								onUpdate(field.id, {
									showWhen: { fieldId: field.showWhen?.fieldId ?? "", equals: e.target.value },
								})
							}
						>
							{values.map((v) => (
								<option key={v.value} value={v.value}>
									{v.label}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
		</Group>
	);
}

function OptionsEditor({
	options,
	onAdd,
	onUpdate,
	onRemove,
}: {
	options: FieldOption[];
	onAdd: () => void;
	onUpdate: (id: string, label: string) => void;
	onRemove: (id: string) => void;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			{options.map((o) => (
				<div key={o.id} className="flex items-center gap-1.5">
					<input
						value={o.label}
						onChange={(e) => onUpdate(o.id, e.target.value)}
						className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-2.5 py-1.5 text-sm text-fg outline-none focus:border-border-brand"
					/>
					<button
						type="button"
						aria-label="Xoá lựa chọn"
						onClick={() => onRemove(o.id)}
						disabled={options.length <= 1}
						className="grid size-7 shrink-0 place-items-center rounded-md text-fg-quaternary hover:text-fg-error disabled:opacity-30"
					>
						<Trash2 className="size-4" />
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={onAdd}
				className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-fg-brand"
			>
				<Plus className="size-4" />
				Thêm lựa chọn
			</button>
		</div>
	);
}

// ── Section ──────────────────────────────────────────────────
function SectionInspector({
	section,
	onUpdateSection,
	onDeleteSection,
	canDeleteSection,
}: InspectorProps & { section: Section }) {
	return (
		<div className="flex flex-col gap-5">
			<div className="text-sm font-semibold text-fg">Cài đặt phần</div>

			<Input
				label="Tiêu đề phần"
				value={section.title}
				onChange={(e) => onUpdateSection(section.id, { title: e.target.value })}
			/>
			<TextArea
				label="Mô tả phần"
				value={section.description ?? ""}
				rows={2}
				onChange={(v) => onUpdateSection(section.id, { description: v })}
			/>

			<Group title="Biểu tượng">
				<div className="flex flex-wrap gap-1.5">
					{SECTION_ICON_KEYS.map((key) => {
						const Icon = sectionIcon(key);
						const on = section.icon === key;
						return (
							<button
								type="button"
								key={key}
								aria-label={key}
								onClick={() => onUpdateSection(section.id, { icon: key })}
								className={`grid size-9 place-items-center rounded-lg border transition-colors ${
									on
										? "border-border-brand bg-bg-secondary text-fg-brand"
										: "border-border text-fg-tertiary hover:text-fg-secondary"
								}`}
							>
								<Icon className="size-4" />
							</button>
						);
					})}
				</div>
			</Group>

			<Button
				color="secondary"
				size="sm"
				iconLeading={Trash2}
				disabled={!canDeleteSection(section.id)}
				onClick={() => onDeleteSection(section.id)}
				className="text-fg-error!"
			>
				Xoá phần
			</Button>
		</div>
	);
}

// ── Form ─────────────────────────────────────────────────────
function FormInspector({ config, onUpdateForm }: InspectorProps) {
	return (
		<div className="flex flex-col gap-5">
			<div className="text-sm font-semibold text-fg">Cài đặt form</div>

			<Input
				label="Tên form"
				value={config.title}
				onChange={(e) => onUpdateForm({ title: e.target.value })}
			/>
			<Input
				label="Đường dẫn (slug)"
				value={config.slug}
				onChange={(e) =>
					onUpdateForm({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })
				}
				hint={`/f/${config.slug}`}
			/>
			<TextArea
				label="Mô tả ngắn (hiện ở hero)"
				value={config.description ?? ""}
				rows={2}
				onChange={(v) => onUpdateForm({ description: v })}
			/>

			<Group title="Trạng thái">
				<ButtonGroup
					size="sm"
					selectedKeys={new Set([config.status])}
					disallowEmptySelection
					onSelectionChange={(keys) => {
						const next = [...keys][0] as FormStatus | undefined;
						if (next && STATUS_ORDER.includes(next)) onUpdateForm({ status: next });
					}}
				>
					{STATUS_ORDER.map((s) => (
						<ButtonGroupItem key={s} id={s}>
							{STATUS_META[s].label}
						</ButtonGroupItem>
					))}
				</ButtonGroup>
			</Group>

			<Group title="Màu thương hiệu">
				<div className="flex flex-wrap items-center gap-2">
					{BRAND_SWATCHES.map((hex) => (
						<button
							type="button"
							key={hex}
							aria-label={hex}
							onClick={() => onUpdateForm({ brand: hex })}
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
							onChange={(e) => onUpdateForm({ brand: e.target.value })}
							className="absolute inset-0 size-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0"
						/>
					</label>
				</div>
			</Group>

			<Group title="Hiển thị">
				<Toggle
					label="Hiện khối hero"
					isSelected={config.settings.heroEnabled}
					onChange={(v) => onUpdateForm({ settings: { ...config.settings, heroEnabled: v } })}
				/>
				<Toggle
					label="Thanh tiến độ"
					isSelected={config.settings.progressBar}
					onChange={(v) => onUpdateForm({ settings: { ...config.settings, progressBar: v } })}
				/>
			</Group>
		</div>
	);
}
