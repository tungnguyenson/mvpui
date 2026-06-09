"use client";

import { Badge, BadgeWithDot, EmptyState, QRCode, Tab, TabList, TabPanel, Tabs } from "@mvp-ui/ui";
import {
	AlertTriangle,
	ArrowUpRight,
	Banknote,
	Briefcase,
	CalendarX2,
	CreditCard,
	FileImage,
	History,
	IdCard,
	Landmark,
	LayoutDashboard,
	MapPin,
	Phone,
	Receipt,
	ScrollText,
	ShieldCheck,
	Star,
	UserRound,
	Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { WorkerJob, WorkerJobKind, WorkerRecord } from "./workers-data";

interface WorkerDetailTabsProps {
	worker: WorkerRecord;
}

const TAB_IDS = ["overview", "identity", "profile", "jobs", "finance", "activity"] as const;

/* ------------------------------------------------------------------ helpers */

function SectionCard({
	title,
	description,
	children,
	action,
}: {
	title: string;
	description?: string;
	children: ReactNode;
	action?: ReactNode;
}) {
	return (
		<div className="rounded-xl border border-border-secondary bg-bg shadow-xs">
			<div className="flex items-start justify-between gap-3 border-b border-border-secondary px-5 py-4">
				<div>
					<h2 className="text-base font-semibold text-fg">{title}</h2>
					{description ? <p className="mt-1 text-sm text-fg-tertiary">{description}</p> : null}
				</div>
				{action ? <div className="shrink-0">{action}</div> : null}
			</div>
			<div className="p-5">{children}</div>
		</div>
	);
}

function Field({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div>
			<p className="text-xs text-fg-tertiary">{label}</p>
			<p className="mt-1 text-sm text-fg">{value}</p>
		</div>
	);
}

function IconRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
	return (
		<div className="flex items-start gap-3">
			<span className="mt-0.5 text-fg-brand">{icon}</span>
			<div className="text-sm text-fg">{children}</div>
		</div>
	);
}

function NoData({ children }: { children: ReactNode }) {
	return (
		<div className="rounded-xl border border-dashed border-border-secondary bg-bg-secondary p-6 text-center text-sm text-fg-tertiary">
			{children}
		</div>
	);
}

/* ------------------------------------------------------------------ overview */

const VERIFICATION_TONE: Record<string, "success" | "warning" | "error"> = {
	"Đã xác thực": "success",
	"Chờ bổ sung": "warning",
	"Đang rà soát": "error",
};

function OverviewPanel({ worker }: { worker: WorkerRecord }) {
	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
				<SectionCard
					title="Thông tin liên hệ"
					description="Liên hệ và khu vực hoạt động của cộng tác viên."
				>
					<div className="grid gap-4">
						<IconRow icon={<Phone className="size-4" />}>{worker.phone}</IconRow>
						<IconRow icon={<MapPin className="size-4" />}>
							{worker.district}, {worker.city} • Gia nhập {worker.joinedAt}
						</IconRow>
						<IconRow icon={<Star className="size-4" />}>
							Đánh giá {worker.rating} với {worker.totalShifts} ca đã hoàn thành.
						</IconRow>
						{worker.emergencyContact ? (
							<IconRow icon={<UserRound className="size-4" />}>
								Khẩn cấp: {worker.emergencyContact.name} ({worker.emergencyContact.relationship}) •{" "}
								{worker.emergencyContact.phone}
							</IconRow>
						) : null}
					</div>
				</SectionCard>

				<SectionCard
					title="Tín hiệu vận hành"
					description="Tổng hợp xác thực, vi phạm và thanh toán gần nhất."
				>
					<div className="grid gap-4 sm:grid-cols-3">
						<div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
							<div className="flex items-center gap-2">
								<ShieldCheck className="size-4 text-fg-brand" />
								<p className="text-sm font-semibold text-fg">Xác thực</p>
							</div>
							<Badge
								className="mt-3"
								color={VERIFICATION_TONE[worker.verification.status] ?? "gray"}
								type="pill-color"
								size="sm"
							>
								{worker.verification.status}
							</Badge>
						</div>
						<div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
							<div className="flex items-center gap-2">
								<AlertTriangle className="size-4 text-fg-brand" />
								<p className="text-sm font-semibold text-fg">Vi phạm</p>
							</div>
							<p className="mt-3 text-sm text-fg">{worker.violations.totalCases} case</p>
							<p className="mt-1 text-sm text-fg-tertiary">{worker.violations.latestLevel}</p>
						</div>
						<div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
							<div className="flex items-center gap-2">
								<Wallet className="size-4 text-fg-brand" />
								<p className="text-sm font-semibold text-fg">Thanh toán</p>
							</div>
							<p className="mt-3 text-sm text-fg">{worker.payment.amount}</p>
							<p className="mt-1 text-sm text-fg-tertiary">{worker.payment.status}</p>
						</div>
					</div>
				</SectionCard>
			</div>

			<SectionCard
				title="Liên kết nghiệp vụ"
				description="Điểm vào nhanh sang các module liên quan đến cộng tác viên này."
			>
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					<LinkCard
						href={`/worker-verifications/${worker.id}`}
						title="Xác thực hồ sơ"
						detail={worker.verification.status}
					/>
					<LinkCard
						href={`/worker-violations/${worker.id}`}
						title="Vi phạm"
						detail={`${worker.violations.totalCases} case • ${worker.violations.latestLevel}`}
					/>
					<LinkCard
						href={`/worker-payment-batches/${worker.payment.batchId.toLowerCase()}`}
						title="Đợt thanh toán"
						detail={worker.payment.batchId}
					/>
					<LinkCard
						href="/worker-social-insurance"
						title="Bảo hiểm xã hội"
						detail={worker.socialInsurance?.code ?? "Chưa có mã"}
					/>
				</div>
			</SectionCard>
		</div>
	);
}

function LinkCard({ href, title, detail }: { href: string; title: string; detail: string }) {
	return (
		<Link
			href={href}
			className="group flex items-start justify-between gap-3 rounded-xl border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
		>
			<div>
				<p className="text-sm font-semibold text-fg">{title}</p>
				<p className="mt-1 text-sm text-fg-tertiary">{detail}</p>
			</div>
			<ArrowUpRight className="size-4 shrink-0 text-fg-tertiary transition-colors group-hover:text-fg-brand" />
		</Link>
	);
}

/* ------------------------------------------------------------------ identity */

function EkycRow({ label, passed }: { label: string; passed: boolean }) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3">
			<p className="text-sm text-fg">{label}</p>
			<BadgeWithDot color={passed ? "success" : "error"} type="pill-color" size="sm">
				{passed ? "Đạt" : "Chưa đạt"}
			</BadgeWithDot>
		</div>
	);
}

function ImagePlaceholder({ caption }: { caption: string }) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-secondary bg-bg-secondary px-4 py-8 text-center">
			<FileImage className="size-6 text-fg-tertiary" />
			<p className="text-xs text-fg-tertiary">{caption}</p>
		</div>
	);
}

function IdentityPanel({ worker }: { worker: WorkerRecord }) {
	const id = worker.identity;
	if (!id) {
		return (
			<SectionCard title="Hồ sơ & CCCD" description="Thông tin định danh từ giấy tờ tùy thân.">
				<NoData>Chưa có dữ liệu định danh cho cộng tác viên này.</NoData>
			</SectionCard>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<SectionCard
				title="Thông tin CCCD/CMND"
				description="Trích xuất từ giấy tờ tùy thân (OCR)."
				action={
					<Link
						href={`/worker-verifications/${worker.id}`}
						className="inline-flex items-center gap-1 text-sm font-medium text-fg-brand hover:underline"
					>
						Mở quy trình xác thực
						<ArrowUpRight className="size-4" />
					</Link>
				}
			>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<Field label="Số CCCD/CMND" value={id.nationalId} />
					<Field label="Họ và tên" value={id.fullNameOnId} />
					<Field label="Ngày sinh" value={id.dob} />
					<Field label="Giới tính" value={id.gender} />
					<Field label="Ngày cấp" value={id.issuedDate} />
					<Field label="Ngày hết hạn" value={id.expiryDate} />
					<div className="sm:col-span-2 lg:col-span-3">
						<Field label="Nơi cấp" value={id.issuedPlace} />
					</div>
					<div className="sm:col-span-2 lg:col-span-3">
						<Field label="Địa chỉ thường trú" value={id.permanentAddress} />
					</div>
				</div>
			</SectionCard>

			<div className="grid gap-6 lg:grid-cols-2">
				<SectionCard title="Kiểm tra eKYC" description="Kết quả tự động khi đối soát giấy tờ.">
					<div className="grid gap-3">
						<EkycRow label="eKYC Service" passed={id.ekyc.service} />
						<EkycRow label="eKYC Fraud Check" passed={id.ekyc.fraudCheck} />
						<EkycRow label="eKYC Logic Check" passed={id.ekyc.logicCheck} />
						<EkycRow label="eKYC OCR" passed={id.ekyc.ocr} />
					</div>
				</SectionCard>

				<SectionCard title="Ảnh giấy tờ & chân dung" description="Tài liệu gốc dùng để đối soát.">
					<div className="grid gap-4 sm:grid-cols-3">
						<ImagePlaceholder caption="Mặt trước CCCD" />
						<ImagePlaceholder caption="Mặt sau CCCD" />
						<ImagePlaceholder caption="Ảnh chân dung" />
					</div>
				</SectionCard>
			</div>
		</div>
	);
}

/* ------------------------------------------------------- address + bank */

function ProfilePanel({ worker }: { worker: WorkerRecord }) {
	const { residence, bankAccount, emergencyContact } = worker;

	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-6 lg:grid-cols-2">
				<SectionCard title="Địa chỉ sinh sống" description="Nơi cư trú hiện tại.">
					{residence ? (
						<div className="grid gap-4 sm:grid-cols-2">
							<Field label="Tỉnh / Thành phố" value={residence.province} />
							<Field label="Quận / Huyện" value={residence.district} />
							<Field label="Phường / Xã" value={residence.ward} />
							<Field label="Địa chỉ" value={residence.street} />
						</div>
					) : (
						<NoData>Chưa khai báo địa chỉ.</NoData>
					)}
				</SectionCard>

				<SectionCard title="Liên hệ khẩn cấp" description="Người liên hệ khi cần.">
					{emergencyContact ? (
						<div className="grid gap-4">
							<Field label="Họ tên" value={emergencyContact.name} />
							<Field label="Số điện thoại" value={emergencyContact.phone} />
							<Field label="Mối quan hệ" value={emergencyContact.relationship} />
						</div>
					) : (
						<NoData>Chưa khai báo liên hệ khẩn cấp.</NoData>
					)}
				</SectionCard>
			</div>

			<SectionCard
				title="Tài khoản ngân hàng"
				description="Tài khoản nhận lương của cộng tác viên."
				action={
					bankAccount ? (
						<Badge color={bankAccount.verified ? "success" : "warning"} type="pill-color" size="sm">
							{bankAccount.verified ? "Đã duyệt" : "Chờ kiểm tra"}
						</Badge>
					) : null
				}
			>
				{bankAccount ? (
					<div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
						<div className="grid gap-4 sm:grid-cols-2">
							<Field label="Loại tài khoản" value={bankAccount.ownerType} />
							<Field label="Ngân hàng" value={bankAccount.bankName} />
							<Field label="Số tài khoản" value={bankAccount.accountNumber} />
							<Field label="Chủ tài khoản" value={bankAccount.accountHolder} />
							{bankAccount.verified && bankAccount.verifiedBy ? (
								<div className="sm:col-span-2 flex items-center gap-2 text-sm text-fg-success">
									<ShieldCheck className="size-4" />
									Đã kiểm tra bởi {bankAccount.verifiedBy}
								</div>
							) : null}
						</div>
						<div className="flex flex-col items-center gap-2 rounded-xl border border-border-secondary bg-bg-secondary p-4">
							<QRCode
								value={`${bankAccount.bankBin}|${bankAccount.accountNumber}|${bankAccount.accountHolder}`}
								size="md"
							/>
							<p className="text-xs text-fg-tertiary">VietQR</p>
						</div>
					</div>
				) : (
					<NoData>Chưa khai báo tài khoản ngân hàng.</NoData>
				)}
			</SectionCard>
		</div>
	);
}

/* ------------------------------------------------------------------ jobs */

const JOB_GROUPS: { kind: WorkerJobKind; title: string; empty: string }[] = [
	{ kind: "current", title: "Đang làm", empty: "Không có công việc đang làm." },
	{ kind: "applying", title: "Đang ứng tuyển", empty: "Không có công việc đang ứng tuyển." },
	{ kind: "done", title: "Đã làm", empty: "Chưa có lịch sử công việc." },
];

function JobRow({ job }: { job: WorkerJob }) {
	return (
		<li className="flex flex-col gap-2 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<p className="text-sm font-medium text-fg">{job.position}</p>
				<p className="mt-0.5 text-sm text-fg-tertiary">{job.company}</p>
			</div>
			<div className="flex items-center gap-4 text-sm text-fg-tertiary">
				<span>{job.period}</span>
				<span className="font-medium text-fg">{job.hours}</span>
			</div>
		</li>
	);
}

function JobsPanel({ worker }: { worker: WorkerRecord }) {
	const jobs = worker.jobs ?? [];

	return (
		<div className="flex flex-col gap-6">
			{JOB_GROUPS.map((group) => {
				const items = jobs.filter((j) => j.kind === group.kind);
				return (
					<SectionCard key={group.kind} title={group.title}>
						{items.length > 0 ? (
							<ul className="flex flex-col gap-3">
								{items.map((job) => (
									<JobRow key={job.id} job={job} />
								))}
							</ul>
						) : (
							<NoData>{group.empty}</NoData>
						)}
					</SectionCard>
				);
			})}

			<SectionCard
				title="Lịch sử ca gần đây"
				description="Các ca gần nhất để đánh giá độ ổn định và mức độ phù hợp."
			>
				{worker.recentShifts.length > 0 ? (
					<div className="flex flex-col gap-3">
						{worker.recentShifts.map((item) => {
							const tone =
								item.checkInStatus === "Vắng mặt"
									? "error"
									: item.checkInStatus === "Đi trễ"
										? "warning"
										: "success";
							return (
								<div
									key={item.id}
									className="rounded-xl border border-border-secondary bg-bg-secondary p-4"
								>
									<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
										<div>
											<p className="text-sm font-semibold text-fg">{item.shiftName}</p>
											<p className="mt-1 text-sm text-fg-tertiary">{item.customer}</p>
										</div>
										<Badge color={tone} type="pill-color" size="sm">
											{item.checkInStatus}
										</Badge>
									</div>
									<div className="mt-4 grid gap-3 md:grid-cols-3">
										<Field label="Lịch" value={item.schedule} />
										<Field label="Mã ca" value={item.id} />
										<Field label="Payout" value={item.payout} />
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<NoData>Chưa có ca làm nào gần đây.</NoData>
				)}
			</SectionCard>
		</div>
	);
}

/* ------------------------------------------------------------ finance + tax */

function FinancePanel({ worker }: { worker: WorkerRecord }) {
	const { tax, paymentMethod, payment, socialInsurance } = worker;

	return (
		<div className="flex flex-col gap-6">
			<SectionCard title="Phương thức nhận tiền" description="Cách cộng tác viên nhận lương.">
				<div className="grid gap-4 sm:grid-cols-2">
					<div
						className={`flex items-center gap-3 rounded-xl border p-4 ${
							paymentMethod === "cash"
								? "border-border-brand bg-bg-secondary"
								: "border-border-secondary bg-bg"
						}`}
					>
						<Banknote className="size-5 text-fg-brand" />
						<div>
							<p className="text-sm font-semibold text-fg">Tiền mặt</p>
							<p className="mt-0.5 text-xs text-fg-tertiary">
								{paymentMethod === "cash" ? "Mặc định" : "Không dùng"}
							</p>
						</div>
					</div>
					<div
						className={`flex items-center gap-3 rounded-xl border p-4 ${
							paymentMethod === "bank"
								? "border-border-brand bg-bg-secondary"
								: "border-border-secondary bg-bg"
						}`}
					>
						<Landmark className="size-5 text-fg-brand" />
						<div>
							<p className="text-sm font-semibold text-fg">Tài khoản ngân hàng</p>
							<p className="mt-0.5 text-xs text-fg-tertiary">
								{paymentMethod === "bank" ? "Mặc định" : "Không dùng"}
							</p>
						</div>
					</div>
				</div>
			</SectionCard>

			<div className="grid gap-6 lg:grid-cols-2">
				<SectionCard title="Mã số thuế (TNCN)" description="Thông tin thuế thu nhập cá nhân.">
					{tax ? (
						<div className="grid gap-4">
							<Field label="Mã số thuế" value={tax.taxId} />
							<div className="flex items-center gap-2">
								<p className="text-xs text-fg-tertiary">Trạng thái:</p>
								<Badge
									color={tax.taxStatus === "Đã kiểm tra" ? "success" : "warning"}
									type="pill-color"
									size="sm"
								>
									{tax.taxStatus}
								</Badge>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-xs text-fg-tertiary">Cam kết thuế 2026:</p>
								<Badge
									color={tax.commitment2026 === "Đã ký" ? "success" : "warning"}
									type="pill-color"
									size="sm"
								>
									{tax.commitment2026}
								</Badge>
							</div>
						</div>
					) : (
						<NoData>Chưa có thông tin thuế.</NoData>
					)}
				</SectionCard>

				<SectionCard
					title="Đợt thanh toán & BHXH"
					description="Liên kết tới module thanh toán và bảo hiểm xã hội."
				>
					<div className="grid gap-4">
						<LinkCard
							href={`/worker-payment-batches/${payment.batchId.toLowerCase()}`}
							title={`Đợt ${payment.batchId}`}
							detail={`${payment.amount} • ${payment.status}`}
						/>
						<LinkCard
							href="/worker-social-insurance"
							title="Bảo hiểm xã hội"
							detail={socialInsurance?.code ?? "Chưa có mã BHXH"}
						/>
					</div>
				</SectionCard>
			</div>
		</div>
	);
}

/* ------------------------------------------------------------------ activity */

function ActivityPanel({ worker }: { worker: WorkerRecord }) {
	const changeLog = worker.changeLog ?? [];
	const cancellations = worker.cancellations ?? [];

	return (
		<div className="flex flex-col gap-6">
			<SectionCard
				title="Vi phạm"
				description="Tổng hợp ngắn — chi tiết ở module vi phạm."
				action={
					<Link
						href={`/worker-violations/${worker.id}`}
						className="inline-flex items-center gap-1 text-sm font-medium text-fg-brand hover:underline"
					>
						Mở module vi phạm
						<ArrowUpRight className="size-4" />
					</Link>
				}
			>
				<div className="flex flex-wrap items-center gap-3">
					<Badge
						color={
							worker.violations.latestLevel === "Nghiêm trọng"
								? "error"
								: worker.violations.latestLevel === "Nhẹ"
									? "warning"
									: "success"
						}
						type="pill-color"
						size="sm"
					>
						{worker.violations.totalCases} case • {worker.violations.latestLevel}
					</Badge>
					<p className="text-sm text-fg-tertiary">{worker.violations.latestNote}</p>
				</div>
			</SectionCard>

			<SectionCard title="Lịch sử hủy ca" description="Các ca bị hủy và mức phạt áp dụng.">
				{cancellations.length > 0 ? (
					<ul className="flex flex-col gap-3">
						{cancellations.map((c) => (
							<li
								key={c.id}
								className="flex flex-col gap-2 rounded-xl border border-border-secondary bg-bg-secondary px-4 py-3 sm:flex-row sm:items-start sm:justify-between"
							>
								<div className="flex items-start gap-3">
									<CalendarX2 className="mt-0.5 size-4 text-fg-brand" />
									<div>
										<p className="text-sm font-medium text-fg">{c.shiftName}</p>
										<p className="mt-0.5 text-sm text-fg-tertiary">
											{c.date} • {c.reason}
										</p>
									</div>
								</div>
								<Badge color={c.penalty === "₫0" ? "gray" : "error"} type="pill-color" size="sm">
									Phạt {c.penalty}
								</Badge>
							</li>
						))}
					</ul>
				) : (
					<EmptyState
						icon={<CalendarX2 className="size-6 text-fg-tertiary" />}
						title="Không có lịch sử hủy ca"
						description="Cộng tác viên chưa hủy ca nào được ghi nhận."
					/>
				)}
			</SectionCard>

			<SectionCard title="Change Log" description="Nhật ký thay đổi hồ sơ.">
				{changeLog.length > 0 ? (
					<div className="flex flex-col">
						{changeLog.map((entry, index) => {
							const isLast = index === changeLog.length - 1;
							return (
								<div key={`${entry.at}-${entry.field}`} className="flex gap-4">
									<div className="flex flex-col items-center">
										<div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-fg-brand">
											<History className="size-4" />
										</div>
										{!isLast ? <div className="mt-1 w-px flex-1 bg-border-secondary" /> : null}
									</div>
									<div className="flex-1 pb-5">
										<p className="text-sm font-medium text-fg">{entry.field}</p>
										<p className="mt-1 text-sm text-fg-tertiary">
											{entry.from} → {entry.to}
										</p>
										<p className="mt-1 text-xs text-fg-tertiary">
											{entry.at} • {entry.actor}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<NoData>Chưa có thay đổi nào được ghi nhận.</NoData>
				)}
			</SectionCard>
		</div>
	);
}

/* ------------------------------------------------------------------ shell */

const TAB_DEFS = [
	{ id: "overview", label: "Tổng quan", icon: LayoutDashboard },
	{ id: "identity", label: "Hồ sơ & CCCD", icon: IdCard },
	{ id: "profile", label: "Địa chỉ & ngân hàng", icon: CreditCard },
	{ id: "jobs", label: "Công việc", icon: Briefcase },
	{ id: "finance", label: "Thanh toán & thuế", icon: Receipt },
	{ id: "activity", label: "Nhật ký", icon: ScrollText },
] as const;

export function WorkerDetailTabs({ worker }: WorkerDetailTabsProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const tabParam = searchParams.get("tab");
	const selectedTab =
		tabParam && (TAB_IDS as readonly string[]).includes(tabParam) ? tabParam : "overview";

	const handleTabChange = (key: string) => {
		if (key === selectedTab) return;
		const params = new URLSearchParams(searchParams.toString());
		params.set("tab", key);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	return (
		<Tabs
			variant="underline"
			size="md"
			selectedKey={selectedTab}
			onSelectionChange={(key) => handleTabChange(key as string)}
		>
			<TabList aria-label="Phần chi tiết cộng tác viên">
				{TAB_DEFS.map((tab) => {
					const Icon = tab.icon;
					return (
						<Tab key={tab.id} id={tab.id} icon={<Icon className="size-full" strokeWidth={1.75} />}>
							{tab.label}
						</Tab>
					);
				})}
			</TabList>

			<TabPanel id="overview">
				<OverviewPanel worker={worker} />
			</TabPanel>
			<TabPanel id="identity">
				<IdentityPanel worker={worker} />
			</TabPanel>
			<TabPanel id="profile">
				<ProfilePanel worker={worker} />
			</TabPanel>
			<TabPanel id="jobs">
				<JobsPanel worker={worker} />
			</TabPanel>
			<TabPanel id="finance">
				<FinancePanel worker={worker} />
			</TabPanel>
			<TabPanel id="activity">
				<ActivityPanel worker={worker} />
			</TabPanel>
		</Tabs>
	);
}
