"use client";

import { useDraggable } from "@dnd-kit/core";
import { ChevronDown, GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import { FIELD_KINDS, PALETTE_GENERIC, PALETTE_SMART } from "./field-registry";
import type { FieldKind } from "./form-schema";

interface FieldPaletteProps {
	onAdd: (kind: FieldKind) => void;
}

export function FieldPalette({ onAdd }: FieldPaletteProps) {
	return (
		<div className="flex flex-col gap-3">
			<PaletteGroup title="Trường có sẵn" kinds={PALETTE_SMART} onAdd={onAdd} defaultOpen />
			{/* Tuỳ biến ít dùng → mặc định thu gọn cho đỡ rối. */}
			<PaletteGroup title="Trường tuỳ biến" kinds={PALETTE_GENERIC} onAdd={onAdd} />
		</div>
	);
}

function PaletteGroup({
	title,
	kinds,
	onAdd,
	defaultOpen = false,
}: {
	title: string;
	kinds: FieldKind[];
	onAdd: (kind: FieldKind) => void;
	defaultOpen?: boolean;
}) {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex w-full items-center gap-1.5 px-1 py-1 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary transition-colors hover:text-fg-secondary"
			>
				<ChevronDown className={`size-3.5 transition-transform ${open ? "" : "-rotate-90"}`} />
				{title}
				<span className="ml-auto font-normal normal-case text-fg-quaternary">{kinds.length}</span>
			</button>
			{open && (
				<div className="mt-1.5 flex flex-col gap-1.5">
					{kinds.map((kind) => (
						<PaletteItem key={kind} kind={kind} onAdd={onAdd} />
					))}
				</div>
			)}
		</div>
	);
}

/**
 * Mỗi trường: cả ô là handle KÉO-THẢ vào form; chỉ nút "+" mới click-thêm.
 * Click vào thân ô (nhãn) không thêm — tránh thêm nhầm.
 */
function PaletteItem({ kind, onAdd }: { kind: FieldKind; onAdd: (kind: FieldKind) => void }) {
	const meta = FIELD_KINDS[kind];
	const Icon = meta.icon;
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette:${kind}` });

	return (
		<div
			ref={setNodeRef}
			className={`group flex w-full cursor-grab items-center gap-2.5 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg-secondary transition-colors hover:border-border-brand hover:bg-bg-secondary active:cursor-grabbing ${
				isDragging ? "opacity-40" : ""
			}`}
			{...listeners}
			{...attributes}
		>
			<Icon className="size-4 shrink-0 text-fg-quaternary group-hover:text-fg-brand" />
			<span className="min-w-0 flex-1 truncate">{meta.defaultLabel}</span>
			<GripVertical className="size-4 shrink-0 text-fg-quaternary opacity-0 group-hover:opacity-100" />
			<button
				type="button"
				aria-label={`Thêm ${meta.defaultLabel}`}
				title="Thêm vào form"
				onPointerDown={(e) => e.stopPropagation()}
				onClick={() => onAdd(kind)}
				className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-md text-fg-brand transition-colors hover:bg-bg-tertiary"
			>
				<Plus className="size-4" />
			</button>
		</div>
	);
}
