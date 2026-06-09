"use client";

import {
	closestCorners,
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
	Badge,
	Button,
	Dialog,
	Modal,
	ModalBody,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	Tabs,
} from "@mvp-ui/ui";
import { ArrowLeft, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import {
	addFieldToSection,
	addOption,
	addSection,
	canRemoveSection,
	findContainerOf,
	findField,
	moveField,
	moveSection,
	removeField,
	removeOption,
	removeSection,
	setSectionFields,
	updateField,
	updateOption,
	updateSection,
} from "./config-ops";
import { FieldPalette } from "./FieldPalette";
import { FieldSettingsPanel } from "./FieldSettingsPanel";
import { FormCanvas } from "./FormCanvas";
import { FIELD_KINDS } from "./field-registry";
import type { Field, FieldKind, FormConfig, Section } from "./form-schema";
import { getForm, saveForm } from "./forms-data";
import { ResponsesView } from "./ResponsesView";
import { SharePanel } from "./SharePanel";
import { STATUS_META } from "./status";

type Selection = { kind: "field"; id: string } | { kind: "section"; id: string } | { kind: "form" };

const PALETTE_PREFIX = "palette:";

interface FormBuilderProps {
	formId: string;
}

export function FormBuilder({ formId }: FormBuilderProps) {
	const [config, setConfig] = useState<FormConfig | null>(null);
	const [missing, setMissing] = useState(false);
	const [selection, setSelection] = useState<Selection>({ kind: "form" });
	const [activeDrag, setActiveDrag] = useState<string | null>(null);
	const [shareOpen, setShareOpen] = useState(false);
	const [tab, setTab] = useState<"build" | "data">("build");
	const [inspectorTab, setInspectorTab] = useState<"element" | "form">("form");

	/** Chọn 1 trường/phần → nhảy sang tab "Phần tử" để xem cài đặt ngay. */
	const selectField = (id: string) => {
		setSelection({ kind: "field", id });
		setInspectorTab("element");
	};
	const selectSection = (id: string) => {
		setSelection({ kind: "section", id });
		setInspectorTab("element");
	};

	useEffect(() => {
		const f = getForm(formId);
		if (!f) setMissing(true);
		else setConfig(f);
	}, [formId]);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	/** Mọi thay đổi đi qua đây → cập nhật state + lưu localStorage (preview đọc được ngay). */
	const update = (next: FormConfig) => {
		setConfig(next);
		saveForm(next);
	};

	const activeSectionId = useMemo(() => {
		if (!config) return null;
		if (selection.kind === "field") return findContainerOf(config, selection.id);
		if (selection.kind === "section") return selection.id;
		return config.sections[config.sections.length - 1]?.id ?? null;
	}, [config, selection]);

	if (missing) {
		return (
			<div className="grid min-h-[60vh] place-items-center text-sm text-fg-tertiary">
				Không tìm thấy form.{" "}
				<Link href={APP_ROUTES.recruitmentForms} className="ml-1 font-semibold text-fg-brand">
					Quay lại danh sách
				</Link>
			</div>
		);
	}
	if (!config) {
		return (
			<div className="grid min-h-[60vh] place-items-center text-sm text-fg-tertiary">Đang tải…</div>
		);
	}

	const selectedField: Field | undefined =
		selection.kind === "field" ? findField(config, selection.id) : undefined;
	const selectedSection: Section | undefined =
		selection.kind === "section" ? config.sections.find((s) => s.id === selection.id) : undefined;

	// ── palette add ──
	const onAddField = (kind: FieldKind) => {
		const sectionId = activeSectionId ?? config.sections[config.sections.length - 1]?.id;
		if (!sectionId) return;
		const { config: next, field } = addFieldToSection(config, sectionId, kind);
		update(next);
		selectField(field.id);
	};

	// ── dnd ──
	const resolveDrop = (overId: string): { sectionId: string | null; index: number } => {
		if (overId.startsWith("section:")) {
			const sectionId = overId.slice("section:".length);
			const s = config.sections.find((x) => x.id === sectionId);
			return { sectionId, index: s ? s.fields.length : 0 };
		}
		const sectionId = findContainerOf(config, overId);
		const s = config.sections.find((x) => x.id === sectionId);
		const index = s ? s.fields.findIndex((f) => f.id === overId) : 0;
		return { sectionId, index: index < 0 ? 0 : index };
	};

	const handleDragStart = (e: DragStartEvent) => setActiveDrag(String(e.active.id));

	const handleDragEnd = (e: DragEndEvent) => {
		setActiveDrag(null);
		const { active, over } = e;
		if (!over) return;
		const activeId = String(active.id);
		const overId = String(over.id);

		if (activeId.startsWith(PALETTE_PREFIX)) {
			const kind = activeId.slice(PALETTE_PREFIX.length) as FieldKind;
			const { sectionId, index } = resolveDrop(overId);
			if (!sectionId) return;
			const { config: next, field } = addFieldToSection(config, sectionId, kind, index);
			update(next);
			selectField(field.id);
			return;
		}

		const fromSection = findContainerOf(config, activeId);
		if (!fromSection) return;
		const { sectionId: toSection, index: toIndex } = resolveDrop(overId);
		if (!toSection) return;

		if (fromSection === toSection) {
			const section = config.sections.find((s) => s.id === fromSection);
			if (!section) return;
			const oldIndex = section.fields.findIndex((f) => f.id === activeId);
			const newIndex = Math.min(toIndex, section.fields.length - 1);
			if (oldIndex >= 0 && oldIndex !== newIndex) {
				update(
					setSectionFields(config, fromSection, arrayMove(section.fields, oldIndex, newIndex))
				);
			}
		} else {
			update(moveField(config, activeId, toSection, toIndex));
		}
	};

	// ── field/section/form mutations ──
	const onDeleteField = (id: string) => {
		update(removeField(config, id));
		if (selection.kind === "field" && selection.id === id) setSelection({ kind: "form" });
	};
	const onDeleteSection = (id: string) => {
		if (!canRemoveSection(config, id)) return;
		update(removeSection(config, id));
		if (selection.kind === "section" && selection.id === id) setSelection({ kind: "form" });
	};

	const onPreview = () => {
		saveForm(config); // flush trước khi mở tab mới
		window.open(`/f/${config.slug}?preview=1`, "_blank", "noopener");
	};

	const status = STATUS_META[config.status];

	const inspectorHandlers = {
		config,
		field: selectedField,
		section: selectedSection,
		onUpdateField: (id: string, patch: Partial<Field>) => update(updateField(config, id, patch)),
		onDeleteField,
		onAddOption: (fid: string) => update(addOption(config, fid)),
		onUpdateOption: (fid: string, oid: string, label: string) =>
			update(updateOption(config, fid, oid, label)),
		onRemoveOption: (fid: string, oid: string) => update(removeOption(config, fid, oid)),
		onUpdateSection: (id: string, patch: Partial<Section>) =>
			update(updateSection(config, id, patch)),
		onDeleteSection,
		canDeleteSection: (id: string) => canRemoveSection(config, id),
		onUpdateForm: (patch: Partial<FormConfig>) => update({ ...config, ...patch }),
	};

	return (
		<div className="flex min-h-[calc(100dvh-3.5rem)] flex-col">
			<SetPageBreadcrumb
				items={[
					{ label: "Form tuyển dụng", href: APP_ROUTES.recruitmentForms },
					{ label: config.title },
				]}
			/>

			<Tabs
				selectedKey={tab}
				onSelectionChange={(key) => setTab(key === "data" ? "data" : "build")}
				variant="pill"
				className="flex flex-1 flex-col"
			>
				{/* Toolbar */}
				<div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-bg/95 px-4 py-2 backdrop-blur">
					<Link
						href={APP_ROUTES.recruitmentForms}
						className="grid size-8 shrink-0 place-items-center rounded-lg text-fg-tertiary hover:bg-bg-secondary hover:text-fg-secondary"
						aria-label="Quay lại"
					>
						<ArrowLeft className="size-4.5" />
					</Link>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-2">
							<span className="truncate text-sm font-semibold text-fg">{config.title}</span>
							<span className="shrink-0">
								<Badge color={status.color} size="sm">
									{status.label}
								</Badge>
							</span>
						</div>
						<div className="truncate font-mono text-[11px] text-fg-tertiary">/f/{config.slug}</div>
					</div>

					<TabList aria-label="Chế độ form" className="shrink-0">
						<Tab id="build">Cài đặt</Tab>
						<Tab id="data">Dữ liệu</Tab>
					</TabList>

					<Button color="secondary" size="sm" iconLeading={Eye} onClick={onPreview}>
						<span className="hidden sm:inline">Xem thử</span>
					</Button>
					<Button color="primary" size="sm" iconLeading={Share2} onClick={() => setShareOpen(true)}>
						<span className="hidden sm:inline">Chia sẻ</span>
					</Button>
				</div>

				{/* Cài đặt: builder 3 cột */}
				<TabPanel id="build" className="flex flex-1 flex-col">
					<DndContext
						sensors={sensors}
						collisionDetection={closestCorners}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					>
						<div className="grid flex-1 grid-cols-1 lg:grid-cols-[15rem_1fr_20rem]">
							{/* palette */}
							<aside className="border-border border-b p-3 lg:border-r lg:border-b-0 lg:overflow-y-auto">
								<FieldPalette onAdd={onAddField} />
							</aside>

							{/* canvas */}
							<main className="bg-bg-secondary/40 p-4 lg:overflow-y-auto">
								<FormCanvas
									config={config}
									selectedFieldId={selection.kind === "field" ? selection.id : null}
									activeSectionId={activeSectionId}
									onSelectField={selectField}
									onSelectSection={selectSection}
									onSelectForm={() => setInspectorTab("form")}
									onDeleteField={onDeleteField}
									onMoveSection={(from, to) => update(moveSection(config, from, to))}
									onDeleteSection={onDeleteSection}
									canDeleteSection={(id) => canRemoveSection(config, id)}
									onAddSection={() => {
										const { config: next, sectionId } = addSection(config);
										update(next);
										selectSection(sectionId);
									}}
								/>
							</main>

							{/* inspector — 2 tab: phần tử đang chọn vs cài đặt form */}
							<aside className="flex flex-col border-border border-t lg:border-t-0 lg:border-l lg:overflow-hidden">
								<Tabs
									selectedKey={inspectorTab}
									onSelectionChange={(key) =>
										setInspectorTab(key === "form" ? "form" : "element")
									}
									variant="underline"
									className="flex min-h-0 flex-1 flex-col"
								>
									<TabList aria-label="Cài đặt chi tiết" className="shrink-0 px-4 pt-3">
										<Tab id="element">Phần tử</Tab>
										<Tab id="form">Form</Tab>
									</TabList>
									<TabPanel id="element" className="min-h-0 flex-1 p-4 lg:overflow-y-auto">
										<FieldSettingsPanel view="element" {...inspectorHandlers} />
									</TabPanel>
									<TabPanel id="form" className="min-h-0 flex-1 p-4 lg:overflow-y-auto">
										<FieldSettingsPanel view="form" {...inspectorHandlers} />
									</TabPanel>
								</Tabs>
							</aside>
						</div>

						<DragOverlay>
							{activeDrag ? <DragChip id={activeDrag} config={config} /> : null}
						</DragOverlay>
					</DndContext>
				</TabPanel>

				{/* Dữ liệu: bảng phản hồi */}
				<TabPanel id="data" className="flex-1">
					<ResponsesView config={config} />
				</TabPanel>
			</Tabs>

			<ModalOverlay isDismissable isOpen={shareOpen} onOpenChange={setShareOpen}>
				<Modal size="lg">
					<Dialog aria-label="Chia sẻ form">
						<ModalHeader>Chia sẻ form</ModalHeader>
						<ModalBody className="pb-5">
							<SharePanel config={config} onBrandChange={(brand) => update({ ...config, brand })} />
						</ModalBody>
					</Dialog>
				</Modal>
			</ModalOverlay>
		</div>
	);
}

function DragChip({ id, config }: { id: string; config: FormConfig }) {
	let label = "";
	if (id.startsWith(PALETTE_PREFIX)) {
		label = FIELD_KINDS[id.slice(PALETTE_PREFIX.length) as FieldKind].defaultLabel;
	} else {
		label = findField(config, id)?.label ?? "";
	}
	return (
		<div className="rounded-lg border border-border-brand bg-bg px-3 py-2 text-sm font-medium text-fg shadow-lg">
			{label}
		</div>
	);
}
