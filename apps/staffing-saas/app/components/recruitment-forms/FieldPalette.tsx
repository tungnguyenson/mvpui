"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Plus } from "lucide-react";
import { FIELD_KINDS, PALETTE_GENERIC, PALETTE_SMART } from "./field-registry";
import type { FieldKind } from "./form-schema";

interface FieldPaletteProps {
	onAdd: (kind: FieldKind) => void;
}

export function FieldPalette({ onAdd }: FieldPaletteProps) {
	return (
		<div className="flex flex-col gap-5">
			<PaletteGroup title="Trường có sẵn" kinds={PALETTE_SMART} onAdd={onAdd} />
			<PaletteGroup title="Trường tuỳ biến" kinds={PALETTE_GENERIC} onAdd={onAdd} />
		</div>
	);
}

function PaletteGroup({
	title,
	kinds,
	onAdd,
}: {
	title: string;
	kinds: FieldKind[];
	onAdd: (kind: FieldKind) => void;
}) {
	return (
		<div>
			<div className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">
				{title}
			</div>
			<div className="flex flex-col gap-1.5">
				{kinds.map((kind) => (
					<PaletteItem key={kind} kind={kind} onAdd={onAdd} />
				))}
			</div>
		</div>
	);
}

function PaletteItem({ kind, onAdd }: { kind: FieldKind; onAdd: (kind: FieldKind) => void }) {
	const meta = FIELD_KINDS[kind];
	const Icon = meta.icon;
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette:${kind}` });

	return (
		<button
			type="button"
			ref={setNodeRef}
			onClick={() => onAdd(kind)}
			className={`group flex w-full items-center gap-2.5 rounded-lg border border-border bg-bg px-3 py-2 text-left text-sm text-fg-secondary transition-colors hover:border-border-brand hover:bg-bg-secondary ${
				isDragging ? "opacity-40" : ""
			}`}
			{...listeners}
			{...attributes}
		>
			<Icon className="size-4 shrink-0 text-fg-quaternary group-hover:text-fg-brand" />
			<span className="min-w-0 flex-1 truncate">{meta.defaultLabel}</span>
			<GripVertical className="size-4 shrink-0 text-fg-quaternary opacity-0 group-hover:opacity-100" />
			<Plus className="size-4 shrink-0 text-fg-brand" />
		</button>
	);
}
