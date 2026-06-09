"use client";

import { ArrowRight, Eye, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FieldControl } from "./FieldControl";
import { sectionIcon } from "./field-registry";
import type { Field, FormConfig } from "./form-schema";
import "./referral-form.css";
import { SuccessScreen } from "./SuccessScreen";
import { useFormFill } from "./useFormFill";

interface FormRendererProps {
	config: FormConfig;
	/** Bản xem thử trong tab mới — hiện banner, không lưu nháp. */
	preview?: boolean | undefined;
}

export function FormRenderer({ config, preview }: FormRendererProps) {
	const draftKey = preview ? undefined : `rf_fill_${config.slug}`;
	const fill = useFormFill(config, draftKey);
	const [done, setDone] = useState(false);
	const [shakeKey, setShakeKey] = useState(0);

	const rootStyle = { "--bp": config.brand } as React.CSSProperties;

	const scrollToField = (id?: string) => {
		if (!id || typeof document === "undefined") return;
		const el = document.querySelector<HTMLElement>(`[data-field="${id}"]`);
		if (!el) return;
		const y = el.getBoundingClientRect().top + window.scrollY - 88;
		window.scrollTo({ top: y, behavior: "smooth" });
	};

	const firstErrorId = (): string | undefined => {
		for (const s of config.sections) {
			for (const f of s.fields) if (fill.errors[f.id]) return f.id;
		}
		return undefined;
	};

	const submit = () => {
		fill.setSubmitted(true);
		if (Object.keys(fill.errors).length > 0) {
			setShakeKey((k) => k + 1);
			scrollToField(firstErrorId());
			return;
		}
		fill.clearDraft(); // xoá nháp nhưng GIỮ values để màn success hiển thị tóm tắt
		setDone(true);
	};

	if (done) {
		return (
			<div className="ref-stage" data-hero={config.heroTheme} style={rootStyle}>
				<SuccessScreen config={config} values={fill.values} provinceValue={fill.provinceValue} />
			</div>
		);
	}

	const hasErrors = Object.keys(fill.errors).length > 0;

	return (
		<div className="ref-stage" data-hero={config.heroTheme} style={rootStyle}>
			{preview && (
				<div className="preview-flag">
					<Eye />
					Bản xem thử — dữ liệu không được gửi đi
				</div>
			)}
			<div className="device">
				<div className="layout">
					<div className="hero-pane">
						<div className="hero">
							<div className="grid-bg" />
							<div className="brandbar">
								{/* biome-ignore lint/performance/noImgElement: logo tĩnh nhỏ, không cần next/image */}
								<img
									className="logo-img"
									src={config.heroTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
									alt="viec.co"
								/>
								<span className="tag">Tuyển dụng việc làm</span>
							</div>
							<h1>{config.title}</h1>
							{config.description && <p className="lede">{config.description}</p>}
							<div className="hero-foot">
								<ShieldCheck />
								Thông tin của bạn được bảo mật
							</div>
						</div>
					</div>

					<div className="form-pane">
						<div className="progress-wrap">
							<div className="row">
								<span className="lbl">Hoàn thành hồ sơ</span>
								<span className="pct">{fill.progress}%</span>
							</div>
							<div className="progress-track">
								<div className="progress-fill" style={{ width: `${fill.progress}%` }} />
							</div>
						</div>

						<div className="body">
							{config.sections.map((section, i) => {
								const visibleFields = section.fields.filter((f) => fill.visible(f));
								if (visibleFields.length === 0) return null;
								const Icon = sectionIcon(section.icon);
								return (
									<div className="section" key={section.id}>
										<div className="section-head">
											<span className="ic">
												<Icon />
											</span>
											<h2>{section.title}</h2>
											<span className="step">{String(i + 1).padStart(2, "0")}</span>
										</div>
										{section.description && <p className="hint">{section.description}</p>}
										{visibleFields.map((field: Field) => (
											<FieldControl
												key={field.id}
												field={field}
												value={fill.values[field.id] ?? null}
												onChange={(v) => fill.setValue(field.id, v)}
												onToggle={(item, max) => fill.toggleIn(field.id, item, max)}
												onBlur={() => fill.touch(field.id)}
												error={fill.show(field.id)}
												provinceValue={fill.provinceValue}
											/>
										))}
									</div>
								);
							})}
						</div>

						<div className="submitbar" key={shakeKey}>
							<div className="sb-row">
								<button type="button" className="btn-secondary" onClick={fill.reset}>
									<RotateCcw />
									Nhập lại
								</button>
								<button
									type="button"
									className={`btn-primary${hasErrors && fill.submitted ? " shake" : ""}`}
									onClick={submit}
								>
									Gửi đăng ký
									<ArrowRight />
								</button>
							</div>
							<p className="sub-note">
								<ShieldCheck />
								Miễn phí 100% với người lao động
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
