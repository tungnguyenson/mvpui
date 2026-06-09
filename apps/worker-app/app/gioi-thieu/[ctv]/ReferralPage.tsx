"use client";

import {
	ArrowRight,
	BadgeCheck,
	Bookmark,
	Briefcase,
	Building2,
	Calendar,
	Check,
	CheckCircle,
	ChevronDown,
	ClipboardCheck,
	Clock,
	Flame,
	Info,
	MapPin,
	Phone,
	RotateCcw,
	ShieldCheck,
	SlidersHorizontal,
	Star,
	User,
	Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	ACTIVE_BY_PROVINCE,
	DEFAULT_BRAND,
	GENDERS,
	JOBTYPES,
	PROVINCES,
	type Province,
	type Referrer,
	SHIFTS,
	SOURCES,
} from "./data";
import { Chip, ErrText, Lab, type SourceId, UploadBox } from "./ReferralFields";
import { SuccessScreen } from "./SuccessScreen";

export interface FormState {
	name: string;
	phone: string;
	gender: string;
	province: string;
	districts: string[];
	companies: string[];
	shifts: string[];
	jobtypes: string[];
	source: string;
	startDate: string;
	cccdFront: string | null;
	cccdBack: string | null;
	consent18: boolean;
}

const DEFAULT_F: FormState = {
	name: "",
	phone: "",
	gender: "",
	province: "",
	districts: [],
	companies: [],
	shifts: [],
	jobtypes: [],
	source: "",
	startDate: "",
	cccdFront: null,
	cccdBack: null,
	consent18: false,
};

const JOBTYPE_ICONS = { clock: Clock, briefcase: Briefcase } as const;

const TOAST_MS = 3200;
const MAX_DISTRICTS = 3;
const MAX_COMPANIES = 3;

function todayISO(offset = 0): string {
	const d = new Date();
	d.setDate(d.getDate() + offset);
	return d.toISOString().slice(0, 10);
}

const REQUIRED_KEYS = [
	"name",
	"phone",
	"province",
	"districts",
	"companies",
	"shifts",
	"jobtypes",
	"source",
	"consent18",
] as const;

interface ReferralPageProps {
	referrer: Referrer;
	brand?: string;
}

export function ReferralPage({ referrer, brand = DEFAULT_BRAND }: ReferralPageProps) {
	const storageKey = `viec_referral_draft_${referrer.phone}`;

	const [f, setF] = useState<FormState>(DEFAULT_F);
	const [restored, setRestored] = useState(false);
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [submitted, setSubmitted] = useState(false);
	const [done, setDone] = useState(false);
	const [shakeKey, setShakeKey] = useState(0);
	const [toast, setToast] = useState("");
	const toastTimer = useRef<number | undefined>(undefined);

	// Khôi phục bản nháp từ localStorage (chỉ chạy ở client, sau mount → tránh hydration mismatch).
	useEffect(() => {
		try {
			const raw = localStorage.getItem(storageKey);
			if (!raw) return;
			const saved = JSON.parse(raw) as Partial<FormState>;
			setF({ ...DEFAULT_F, ...saved, cccdFront: null, cccdBack: null });
			const had = !!(saved.name || saved.phone || saved.province || saved.companies?.length);
			setRestored(had);
		} catch {
			// bỏ qua bản nháp hỏng
		}
	}, [storageKey]);

	// Tự lưu nháp (loại bỏ ảnh blob).
	useEffect(() => {
		try {
			const { cccdFront: _f, cccdBack: _b, ...rest } = f;
			localStorage.setItem(storageKey, JSON.stringify(rest));
		} catch {
			// bộ nhớ đầy / chặn — bỏ qua
		}
	}, [f, storageKey]);

	function set<K extends keyof FormState>(k: K, v: FormState[K]) {
		setF((p) => ({ ...p, [k]: v }));
	}

	const toggleIn = (
		k: "districts" | "companies" | "shifts" | "jobtypes",
		val: string,
		max?: number
	) =>
		setF((p) => {
			const arr = p[k];
			if (arr.includes(val)) return { ...p, [k]: arr.filter((x) => x !== val) };
			if (max && arr.length >= max) return p;
			return { ...p, [k]: [...arr, val] };
		});

	const province = useMemo<Province | undefined>(
		() => PROVINCES.find((p) => p.id === f.province),
		[f.province]
	);
	const companies = useMemo(
		() => (f.province ? (ACTIVE_BY_PROVINCE[f.province] ?? []) : []),
		[f.province]
	);

	const onProvince = (id: string) =>
		setF((p) => ({ ...p, province: id, districts: [], companies: [] }));
	const phoneValid = /^0[35789]\d{8}$/.test(f.phone.replace(/\s/g, ""));

	// ── validation ──
	const errs: Record<string, string> = {};
	if (!f.name.trim()) errs.name = "Vui lòng nhập họ và tên";
	if (!f.phone.trim()) errs.phone = "Vui lòng nhập số điện thoại";
	else if (!phoneValid) errs.phone = "Số điện thoại chưa đúng (VD: 0912345678)";
	if (!f.province) errs.province = "Chọn tỉnh / thành phố";
	if (f.province && f.districts.length === 0) errs.districts = "Chọn ít nhất 1 quận / huyện";
	if (f.companies.length === 0) errs.companies = "Chọn ít nhất 1 công ty";
	if (f.shifts.length === 0) errs.shifts = "Chọn ít nhất 1 ca làm";
	if (f.jobtypes.length === 0) errs.jobtypes = "Chọn ít nhất 1 dạng việc";
	if (!f.source) errs.source = "Cho biết bạn biết đến qua đâu";
	if (!f.consent18) errs.consent18 = "Cần xác nhận bạn trên 18 tuổi";

	const show = (k: string) => (touched[k] || submitted) && errs[k];

	const completed = REQUIRED_KEYS.filter((k) => !errs[k]).length;
	const pct = Math.round((completed / REQUIRED_KEYS.length) * 100);

	const flash = (msg: string) => {
		setToast(msg);
		window.clearTimeout(toastTimer.current);
		toastTimer.current = window.setTimeout(() => setToast(""), TOAST_MS);
	};

	const saveDraft = () => {
		try {
			const { cccdFront: _f, cccdBack: _b, ...rest } = f;
			localStorage.setItem(storageKey, JSON.stringify(rest));
		} catch {
			// bỏ qua
		}
		flash("Đã lưu tạm — quay lại link này bất cứ lúc nào để điền tiếp.");
	};

	const clearDraft = () => {
		try {
			localStorage.removeItem(storageKey);
		} catch {
			// bỏ qua
		}
		setF(DEFAULT_F);
		setTouched({});
		setSubmitted(false);
		setRestored(false);
		window.scrollTo({ top: 0 });
	};

	// Cả trang cuộn theo window ở mọi breakpoint (không còn pane scroll riêng).
	const scrollToField = (key?: string) => {
		if (!key) return;
		const el = document.querySelector<HTMLElement>(`[data-field="${key}"]`);
		if (!el) return;
		const y = el.getBoundingClientRect().top + window.scrollY - 88;
		window.scrollTo({ top: y, behavior: "smooth" });
	};

	const submit = () => {
		setSubmitted(true);
		if (Object.keys(errs).length > 0) {
			setShakeKey((k) => k + 1);
			scrollToField(REQUIRED_KEYS.find((k) => errs[k]));
			return;
		}
		try {
			localStorage.removeItem(storageKey);
		} catch {
			// bỏ qua
		}
		setDone(true);
	};

	const rootStyle = { "--bp": brand } as React.CSSProperties;

	if (done) {
		return (
			<div className="ref-stage" style={rootStyle}>
				<SuccessScreen f={f} province={province} companies={companies} referrer={referrer} />
			</div>
		);
	}

	return (
		<div className="ref-stage" style={rootStyle}>
			<div className="device">
				<div className="layout">
					{/* ── HERO PANE ── */}
					<div className="hero-pane">
						<div className="hero">
							<div className="grid-bg" />
							<div className="brandbar">
								{/* biome-ignore lint/performance/noImgElement: ảnh logo tĩnh nhỏ, không cần next/image */}
								<img className="logo-img" src="/viec-logo-light.png" alt="viec.co" />
								<span className="tag">Tuyển dụng việc làm phổ thông</span>
							</div>
							<div className="referrer">
								<div className="ref-top">
									<div className="av">
										{/* biome-ignore lint/performance/noImgElement: avatar tĩnh, kích thước cố định 42px */}
										<img src={referrer.avatar} alt={referrer.name} width={42} height={42} />
										<span className="vbadge">
											<Check />
										</span>
									</div>
									<div className="meta">
										<div className="lbl">Bạn được giới thiệu bởi</div>
										<div className="nm">
											{referrer.name}
											<span className="role">{referrer.role}</span>
										</div>
									</div>
									<a className="call" href={`tel:${referrer.phone}`} title="Gọi người giới thiệu">
										<Phone />
									</a>
								</div>
								<div className="ref-stats">
									<div className="rs">
										<div className="rs-v">{referrer.years} năm</div>
										<div className="rs-k">Kinh nghiệm</div>
									</div>
									<div className="rs">
										<div className="rs-v">{referrer.referred}</div>
										<div className="rs-k">Đã đi làm</div>
									</div>
									<div className="rs">
										<div className="rs-v">
											<Star />
											{referrer.rating.toFixed(1)}
										</div>
										<div className="rs-k">Hài lòng</div>
									</div>
								</div>
								<div className="ref-cap">
									<BadgeCheck />
									{referrer.reviews} người đánh giá hài lòng về giới thiệu &amp; tư vấn việc làm
								</div>
							</div>
							<h1>
								Tìm việc gần nhà, <span className="hl">đăng ký chỉ 2 phút</span>
							</h1>
							<p className="lede">
								Để lại thông tin, đội ngũ viec.co sẽ liên hệ và xếp việc phù hợp nhất với bạn.
							</p>
							{/* <div className="trust">
								<div className="t">
									<MapPin />
									<div>Việc gần nhà</div>
								</div>
								<div className="t">
									<Wallet />
									<div>Lương theo tuần</div>
								</div>
								<div className="t">
									<Headphones />
									<div>Hỗ trợ 1-1</div>
								</div>
							</div> */}
							<div className="hero-foot">
								<ShieldCheck />
								Miễn phí 100% với người lao động
							</div>
						</div>
					</div>

					{/* ── FORM PANE ── */}
					<div className="form-pane">
						{restored && (
							<div className="restore-banner">
								<RotateCcw />
								<div className="rb-text">Đã khôi phục thông tin bạn điền dở lần trước.</div>
								<button type="button" className="rb-clear" onClick={clearDraft}>
									Nhập lại
								</button>
							</div>
						)}

						<div className="progress-wrap">
							<div className="row">
								<span className="lbl">Hoàn thành hồ sơ</span>
								<span className="pct">{pct}%</span>
							</div>
							<div className="progress-track">
								<div className="progress-fill" style={{ width: `${pct}%` }} />
							</div>
						</div>

						<div className="body">
							{/* SECTION 1 */}
							<div className="section">
								<div className="section-head">
									<span className="ic">
										<User />
									</span>
									<h2>Thông tin của bạn</h2>
									<span className="step">01</span>
								</div>

								<div className="field" data-field="name">
									<Lab req>Họ và tên</Lab>
									<div className={`input${show("name") ? " err" : ""}`}>
										<User className="lead" />
										<input
											value={f.name}
											placeholder="VD: Nguyễn Văn An"
											onChange={(e) => set("name", e.target.value)}
											onBlur={() => setTouched((p) => ({ ...p, name: true }))}
										/>
									</div>
									{show("name") && <ErrText msg={errs.name} />}
								</div>

								<div className="field" data-field="phone">
									<Lab req>Số điện thoại</Lab>
									<div className={`input${show("phone") ? " err" : ""}`}>
										<Phone className="lead" />
										<span className="prefix">+84</span>
										<input
											value={f.phone}
											placeholder="0912 345 678"
											inputMode="numeric"
											onChange={(e) => set("phone", e.target.value)}
											onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
										/>
										{phoneValid && <CheckCircle size={18} style={{ color: "var(--fg-success)" }} />}
									</div>
									{show("phone") ? (
										<ErrText msg={errs.phone} />
									) : (
										<p className="hint">Dùng để đội ngũ viec.co liên hệ xếp việc cho bạn.</p>
									)}
								</div>

								<div className="field" data-field="gender">
									<Lab>Giới tính</Lab>
									<div className="chips">
										{GENDERS.map((g) => (
											<Chip key={g} on={f.gender === g} onClick={() => set("gender", g)}>
												{g}
											</Chip>
										))}
									</div>
								</div>
							</div>

							{/* SECTION 2 */}
							<div className="section">
								<div className="section-head">
									<span className="ic">
										<MapPin />
									</span>
									<h2>Khu vực muốn làm việc</h2>
									<span className="step">02</span>
								</div>

								<div className="field" data-field="province">
									<Lab req>Tỉnh / Thành phố</Lab>
									<div className={`input select-wrap${show("province") ? " err" : ""}`}>
										<Building2 className="lead" />
										<select
											value={f.province}
											className={!f.province ? "placeholder" : ""}
											onChange={(e) => onProvince(e.target.value)}
											onBlur={() => setTouched((p) => ({ ...p, province: true }))}
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
									{show("province") && <ErrText msg={errs.province} />}
								</div>

								{province && (
									<div className="field" data-field="districts">
										<Lab req note={`${f.districts.length}/${MAX_DISTRICTS}`}>
											Quận / Huyện
										</Lab>
										<div className="chips">
											{province.districts.map((d) => {
												const on = f.districts.includes(d);
												const full = !on && f.districts.length >= MAX_DISTRICTS;
												return (
													<Chip
														key={d}
														multi
														on={on}
														disabled={full}
														onClick={() => toggleIn("districts", d, MAX_DISTRICTS)}
													>
														{d}
													</Chip>
												);
											})}
										</div>
										{show("districts") ? (
											<ErrText msg={errs.districts} />
										) : (
											<p className="hint">Chọn tối đa 3 khu vực bạn tiện di chuyển nhất.</p>
										)}
									</div>
								)}
							</div>

							{/* SECTION 3 */}
							<div className="section">
								<div className="section-head">
									<span className="ic">
										<Star />
									</span>
									<h2>Công ty ưu tiên</h2>
									<span className="step">03</span>
								</div>
								<div className="field" data-field="companies">
									<Lab req note={`${f.companies.length}/${MAX_COMPANIES}`}>
										{province ? `Đang tuyển nhiều nhất tại ${province.name}` : "Công ty ưu tiên"}
									</Lab>
									{!f.province ? (
										<div className="region-empty">
											<Info />
											Chọn khu vực ở trên trước — chúng tôi sẽ gợi ý các công ty đang tuyển nhiều
											nhất gần bạn (30 ngày gần đây).
										</div>
									) : (
										<>
											<div className="opt-list">
												{companies.map((c) => {
													const on = f.companies.includes(c.id);
													const full = !on && f.companies.length >= MAX_COMPANIES;
													return (
														<button
															type="button"
															key={c.id}
															className={`opt${on ? " on" : ""}${full ? " disabled" : ""}`}
															onClick={() => !full && toggleIn("companies", c.id, MAX_COMPANIES)}
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
											{show("companies") ? (
												<ErrText msg={errs.companies} />
											) : (
												<p className="hint">Chọn tối đa 3 công ty bạn muốn ưu tiên ứng tuyển.</p>
											)}
										</>
									)}
								</div>
							</div>

							{/* SECTION 4 */}
							<div className="section">
								<div className="section-head">
									<span className="ic">
										<SlidersHorizontal />
									</span>
									<h2>Mong muốn công việc</h2>
									<span className="step">04</span>
								</div>

								<div className="field" data-field="shifts">
									<Lab req>Ưu tiên ca làm</Lab>
									<div className="chips">
										{SHIFTS.map((s) => (
											<Chip
												key={s.id}
												multi
												on={f.shifts.includes(s.id)}
												sub={s.sub}
												onClick={() => toggleIn("shifts", s.id)}
											>
												{s.label}
											</Chip>
										))}
									</div>
									{show("shifts") && <ErrText msg={errs.shifts} />}
								</div>

								<div className="field" data-field="jobtypes">
									<Lab req>Ưu tiên dạng việc</Lab>
									<div className="opt-list">
										{JOBTYPES.map((j) => {
											const on = f.jobtypes.includes(j.id);
											const JobIcon = JOBTYPE_ICONS[j.icon];
											return (
												<button
													type="button"
													key={j.id}
													className={`opt${on ? " on" : ""}`}
													onClick={() => toggleIn("jobtypes", j.id)}
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
									{show("jobtypes") && <ErrText msg={errs.jobtypes} />}
								</div>
							</div>

							{/* SECTION 5 */}
							<div className="section">
								<div className="section-head">
									<span className="ic">
										<ClipboardCheck />
									</span>
									<h2>Hoàn tất hồ sơ</h2>
									<span className="step">05</span>
								</div>

								<div className="field" data-field="source">
									<Lab req>Bạn biết đến viec.co qua đâu?</Lab>
									<div className="chips">
										{SOURCES.map((s) => (
											<Chip
												key={s.id}
												on={f.source === s.id}
												source={s.id as SourceId}
												onClick={() => set("source", s.id)}
											>
												{s.label}
											</Chip>
										))}
									</div>
									{show("source") && <ErrText msg={errs.source} />}
								</div>

								<div className="field">
									<Lab note="Không bắt buộc">Ảnh căn cước công dân</Lab>
									<div className="upload-grid">
										<UploadBox
											label="Mặt trước"
											value={f.cccdFront}
											onChange={(v) => set("cccdFront", v)}
										/>
										<UploadBox
											label="Mặt sau"
											value={f.cccdBack}
											onChange={(v) => set("cccdBack", v)}
										/>
									</div>
									<p className="hint">
										Có thể bổ sung sau khi được liên hệ — giúp xác minh hồ sơ nhanh hơn.
									</p>
								</div>

								<div className="field">
									<Lab note="Không bắt buộc">Ngày sớm nhất có thể đi làm</Lab>
									<div className="input select-wrap">
										<Calendar className="lead" />
										<input
											type="date"
											value={f.startDate}
											min={todayISO(0)}
											max={todayISO(30)}
											onChange={(e) => set("startDate", e.target.value)}
											style={{ colorScheme: "light" }}
										/>
									</div>
									<p className="hint">Chọn trong vòng 30 ngày tới.</p>
								</div>

								<div className="field" data-field="consent18">
									<button
										type="button"
										className={`consent${f.consent18 ? " on" : ""}`}
										onClick={() => set("consent18", !f.consent18)}
										aria-pressed={f.consent18}
									>
										<span className="check">
											<Check />
										</span>
										<span className="ctext">
											Tôi xác nhận mình <b>đã đủ 18 tuổi</b> và thông tin cung cấp là chính xác.
											<span className="req"> *</span>
										</span>
									</button>
									{show("consent18") && <ErrText msg={errs.consent18} />}
								</div>
							</div>
						</div>

						{/* ── SUBMIT BAR ── */}
						<div className="submitbar" key={shakeKey}>
							<div className="sb-row">
								<button type="button" className="btn-secondary" onClick={saveDraft}>
									<Bookmark />
									Lưu tạm
								</button>
								<button
									type="button"
									className={`btn-primary${Object.keys(errs).length && submitted ? " shake" : ""}`}
									onClick={submit}
								>
									Đăng ký đi làm
									<ArrowRight />
								</button>
							</div>
							<p className="sub-note">
								<ShieldCheck />
								Thông tin của bạn được bảo mật
							</p>
						</div>
					</div>
				</div>
			</div>

			{toast && (
				<div className="toast">
					<CheckCircle />
					{toast}
				</div>
			)}
		</div>
	);
}
