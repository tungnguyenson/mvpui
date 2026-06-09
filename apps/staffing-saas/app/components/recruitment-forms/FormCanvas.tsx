"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical, Lock, Plus, Trash2 } from "lucide-react";
import { FIELD_KINDS, sectionIcon } from "./field-registry";
import type { Field, FormConfig, Section } from "./form-schema";

interface FormCanvasProps {
	config: FormConfig;
	selectedFieldId: string | null;
	activeSectionId: string | null;
	onSelectField: (id: string) => void;
	onSelectSection: (id: string) => void;
	onDeleteField: (id: string) => void;
	onMoveSection: (from: number, to: number) => void;
	onDeleteSection: (id: string) => void;
	canDeleteSection: (id: string) => boolean;
	onAddSection: () => void;
}

export function FormCanvas(props: FormCanvasProps) {
	const { config, onMoveSection, onAddSection } = props;
	return (
		<div className="mx-auto flex max-w-2xl flex-col gap-4">
			{config.sections.map((section, i) => (
				<SectionBlock
					key={section.id}
					section={section}
					index={i}
					total={config.sections.length}
					{...props}
					onMoveUp={() => onMoveSection(i, i - 1)}
					onMoveDown={() => onMoveSection(i, i + 1)}
				/>
			))}
			<button
				type="button"
				onClick={onAddSection}
				className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-semibold text-fg-tertiary transition-colors hover:border-border-brand hover:text-fg-brand"
			>
				<Plus className="size-4" />
				Thêm phần
			</button>
		</div>
	);
}

interface SectionBlockProps extends FormCanvasProps {
	section: Section;
	index: number;
	total: number;
	onMoveUp: () => void;
	onMoveDown: () => void;
}

function SectionBlock({
	section,
	index,
	total,
	selectedFieldId,
	activeSectionId,
	onSelectField,
	onSelectSection,
	onDeleteField,
	onDeleteSection,
	canDeleteSection,
	onMoveUp,
	onMoveDown,
}: SectionBlockProps) {
	const { setNodeRef, isOver } = useDroppable({ id: `section:${section.id}` });
	const Icon = sectionIcon(section.icon);
	const isActive = activeSectionId === section.id;

	return (
		<section
			className={`rounded-2xl border bg-bg shadow-xs transition-colors ${
				isActive ? "border-border-brand" : "border-border"
			}`}
		>
			<div className="flex items-center gap-2.5 rounded-t-2xl px-4 py-3">
				<button
					type="button"
					onClick={() => onSelectSection(section.id)}
					className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
				>
					<span className="grid size-7 shrink-0 place-items-center rounded-lg bg-bg-tertiary text-fg-brand">
						<Icon className="size-4" />
					</span>
					<span className="min-w-0 flex-1">
						<span className="block truncate text-sm font-semibold text-fg">{section.title}</span>
						{section.description && (
							<span className="block truncate text-xs text-fg-tertiary">{section.description}</span>
						)}
					</span>
				</button>
				<span className="text-xs text-fg-quaternary">{section.fields.length} trường</span>
				<span className="flex items-center">
					<IconBtn label="Lên" disabled={index === 0} onClick={onMoveUp}>
						<ChevronUp className="size-4" />
					</IconBtn>
					<IconBtn label="Xuống" disabled={index === total - 1} onClick={onMoveDown}>
						<ChevronDown className="size-4" />
					</IconBtn>
					<IconBtn
						label="Xoá phần"
						disabled={!canDeleteSection(section.id)}
						onClick={() => onDeleteSection(section.id)}
					>
						<Trash2 className="size-4" />
					</IconBtn>
				</span>
			</div>

			<div
				ref={setNodeRef}
				className={`flex flex-col gap-1.5 px-3 pb-3 ${isOver ? "rounded-b-2xl bg-bg-secondary" : ""}`}
			>
				<SortableContext
					items={section.fields.map((f) => f.id)}
					strategy={verticalListSortingStrategy}
				>
					{section.fields.length === 0 ? (
						<div className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-fg-tertiary">
							Kéo trường vào đây, hoặc bấm một trường ở cột trái
						</div>
					) : (
						section.fields.map((field) => (
							<FieldRow
								key={field.id}
								field={field}
								selected={selectedFieldId === field.id}
								onSelect={() => onSelectField(field.id)}
								onDelete={() => onDeleteField(field.id)}
							/>
						))
					)}
				</SortableContext>
			</div>
		</section>
	);
}

function FieldRow({
	field,
	selected,
	onSelect,
	onDelete,
}: {
	field: Field;
	selected: boolean;
	onSelect: () => void;
	onDelete: () => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: field.id,
	});
	const meta = FIELD_KINDS[field.kind];
	const Icon = meta.icon;
	const style = { transform: CSS.Transform.toString(transform), transition };

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${
				selected ? "border-border-brand bg-bg-secondary" : "border-border bg-bg"
			} ${isDragging ? "z-10 opacity-80 shadow-md" : ""}`}
		>
			<button
				type="button"
				className="cursor-grab touch-none text-fg-quaternary active:cursor-grabbing"
				aria-label="Kéo để sắp xếp"
				{...listeners}
				{...attributes}
			>
				<GripVertical className="size-4" />
			</button>
			<button
				type="button"
				onClick={onSelect}
				className="flex min-w-0 flex-1 items-center gap-2 text-left"
			>
				<Icon className="size-4 shrink-0 text-fg-quaternary" />
				<span className="min-w-0 flex-1 truncate text-sm text-fg-secondary">{field.label}</span>
				{field.required && <span className="text-fg-error">*</span>}
			</button>
			{field.locked ? (
				<span
					className="grid size-7 place-items-center text-fg-quaternary"
					title="Trường bắt buộc của hệ thống"
				>
					<Lock className="size-3.5" />
				</span>
			) : (
				<IconBtn label="Xoá trường" onClick={onDelete}>
					<Trash2 className="size-4" />
				</IconBtn>
			)}
		</div>
	);
}

function IconBtn({
	children,
	label,
	onClick,
	disabled,
}: {
	children: React.ReactNode;
	label: string;
	onClick: () => void;
	disabled?: boolean;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			title={label}
			disabled={disabled}
			onClick={onClick}
			className="grid size-7 place-items-center rounded-md text-fg-quaternary transition-colors hover:bg-bg-secondary hover:text-fg-secondary disabled:pointer-events-none disabled:opacity-30"
		>
			{children}
		</button>
	);
}
