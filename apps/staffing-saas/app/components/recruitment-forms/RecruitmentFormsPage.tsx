"use client";

import { Badge, Button, Dropdown, toast } from "@mvp-ui/ui";
import { Copy, Eye, FileText, MoreVertical, Pencil, Trash2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import type { FormConfig } from "./form-schema";
import { createForm, deleteForm, loadForms, saveForm, slugify } from "./forms-data";
import { STATUS_META } from "./status";
import { uid } from "./uid";

function formatDate(iso: string): string {
	try {
		return new Date(iso).toLocaleDateString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	} catch {
		return "";
	}
}

export function RecruitmentFormsPage() {
	const router = useRouter();
	const [forms, setForms] = useState<FormConfig[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setForms(loadForms());
		setMounted(true);
	}, []);

	const refresh = () => setForms(loadForms());

	const onCreate = () => {
		const form = createForm({ full: true });
		saveForm(form);
		router.push(`/recruitment-forms/${form.id}/edit`);
	};

	const onDuplicate = (form: FormConfig) => {
		const copy: FormConfig = {
			...form,
			id: uid("form"),
			slug: `${slugify(form.title)}-${uid("c").slice(2, 6)}`,
			title: `${form.title} (bản sao)`,
			status: "draft",
			responseCount: 0,
		};
		saveForm(copy);
		refresh();
		toast.success("Đã nhân bản form");
	};

	const onDelete = (form: FormConfig) => {
		deleteForm(form.id);
		refresh();
		toast.success("Đã xoá form");
	};

	const onPreview = (form: FormConfig) => {
		window.open(`/f/${form.slug}?preview=1`, "_blank", "noopener");
	};

	const onCopyLink = async (form: FormConfig) => {
		const url = `${window.location.origin}/f/${form.slug}`;
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			// bỏ qua
		}
		toast.success("Đã sao chép link form");
	};

	return (
		<PageScaffold
			header={
				<AppPageHeader
					title="Form tuyển dụng"
					description="Tạo & quản lý form đăng ký ứng viên — kéo thả field, chia sẻ link và mã QR."
					primaryAction={{ label: "Tạo form", icon: FileText, onClick: onCreate }}
				/>
			}
		>
			<div className="px-4 md:px-0">
				{!mounted ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								className="h-44 animate-pulse rounded-2xl border border-border bg-bg-secondary"
							/>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{forms.map((form) => (
							<FormCard
								key={form.id}
								form={form}
								onEdit={() => router.push(`/recruitment-forms/${form.id}/edit`)}
								onPreview={() => onPreview(form)}
								onCopyLink={() => onCopyLink(form)}
								onDuplicate={() => onDuplicate(form)}
								onDelete={() => onDelete(form)}
							/>
						))}
						<button
							type="button"
							onClick={onCreate}
							className="flex h-full min-h-44 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-bg-secondary/50 text-fg-tertiary transition-colors hover:border-border-brand hover:text-fg-brand"
						>
							<FileText className="size-6" />
							<span className="text-sm font-semibold">Tạo form mới</span>
						</button>
					</div>
				)}
			</div>
		</PageScaffold>
	);
}

interface FormCardProps {
	form: FormConfig;
	onEdit: () => void;
	onPreview: () => void;
	onCopyLink: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
}

function FormCard({ form, onEdit, onPreview, onCopyLink, onDuplicate, onDelete }: FormCardProps) {
	const status = STATUS_META[form.status];
	const fieldCount = form.sections.reduce((n, s) => n + s.fields.length, 0);

	return (
		<div className="group flex flex-col gap-4 rounded-2xl border border-border bg-bg p-5 shadow-xs transition-shadow hover:shadow-md">
			<div className="flex items-start justify-between gap-2">
				<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-bg-tertiary text-fg-brand">
					<FileText className="size-5" />
				</span>
				<div className="flex items-center gap-1.5">
					<Badge color={status.color} size="sm">
						{status.label}
					</Badge>
					<Dropdown.Root>
						<Dropdown.DotsButton aria-label="Tác vụ form">
							<MoreVertical className="size-4" />
						</Dropdown.DotsButton>
						<Dropdown.Popover>
							<Dropdown.Menu>
								<Dropdown.Item icon={Pencil} label="Sửa" onAction={onEdit} />
								<Dropdown.Item icon={Eye} label="Xem thử" onAction={onPreview} />
								<Dropdown.Item icon={Copy} label="Sao chép link" onAction={onCopyLink} />
								<Dropdown.Item label="Nhân bản" onAction={onDuplicate} />
								<Dropdown.Separator />
								<Dropdown.Item icon={Trash2} label="Xoá" onAction={onDelete} />
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown.Root>
				</div>
			</div>

			<div className="min-w-0">
				<h3 className="truncate text-base font-semibold text-fg">{form.title}</h3>
				<p className="mt-0.5 truncate font-mono text-xs text-fg-tertiary">/f/{form.slug}</p>
			</div>

			<div className="flex items-center gap-4 text-xs text-fg-tertiary">
				<span className="inline-flex items-center gap-1.5">
					<Users className="size-3.5" />
					<b className="font-semibold text-fg-secondary">{form.responseCount}</b> phản hồi
				</span>
				<span>{fieldCount} trường</span>
				<span className="ml-auto">Sửa {formatDate(form.updatedAt)}</span>
			</div>

			<div className="flex gap-2 border-t border-border-secondary pt-3">
				<Button
					color="secondary"
					size="sm"
					className="flex-1 justify-center"
					iconLeading={Pencil}
					onClick={onEdit}
				>
					Sửa
				</Button>
				<Button
					color="secondary"
					size="sm"
					className="flex-1 justify-center"
					iconLeading={Eye}
					onClick={onPreview}
				>
					Xem thử
				</Button>
			</div>
		</div>
	);
}
