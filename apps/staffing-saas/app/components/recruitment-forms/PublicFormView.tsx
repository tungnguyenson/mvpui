"use client";

import { EmptyState, LoadingIndicator } from "@mvp-ui/ui";
import { FileX, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { FormRenderer } from "./FormRenderer";
import type { FormConfig } from "./form-schema";
import { getFormBySlug } from "./forms-data";

type ViewState =
	| { status: "loading" }
	| { status: "notfound" }
	| { status: "closed"; config: FormConfig }
	| { status: "ok"; config: FormConfig };

interface PublicFormViewProps {
	slug: string;
	preview?: boolean;
}

export function PublicFormView({ slug, preview }: PublicFormViewProps) {
	const [state, setState] = useState<ViewState>({ status: "loading" });

	useEffect(() => {
		const config = getFormBySlug(slug);
		if (!config) {
			setState({ status: "notfound" });
			return;
		}
		if (!preview && config.status !== "active") {
			setState({ status: "closed", config });
			return;
		}
		setState({ status: "ok", config });
	}, [slug, preview]);

	if (state.status === "loading") {
		return (
			<div className="flex min-h-dvh items-center justify-center bg-bg-secondary">
				<LoadingIndicator size="lg" />
			</div>
		);
	}

	if (state.status === "notfound") {
		return (
			<div className="flex min-h-dvh items-center justify-center bg-bg-secondary p-6">
				<EmptyState
					icon={<FileX />}
					title="Không tìm thấy form"
					description="Đường dẫn này không tồn tại hoặc đã bị xoá."
				/>
			</div>
		);
	}

	if (state.status === "closed") {
		return (
			<div className="flex min-h-dvh items-center justify-center bg-bg-secondary p-6">
				<EmptyState
					icon={<Lock />}
					title="Form đã đóng"
					description="Đợt tuyển dụng này hiện không nhận đăng ký. Vui lòng quay lại sau."
				/>
			</div>
		);
	}

	return <FormRenderer config={state.config} preview={preview} />;
}
