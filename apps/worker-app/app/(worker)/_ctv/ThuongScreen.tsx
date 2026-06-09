"use client";

import {
	Badge,
	type BadgeColor,
	Button,
	Card,
	CardContent,
	ProgressBarBase,
	Tab,
	TabList,
	Tabs,
	toast,
} from "@mvp-ui/ui";
import {
	BadgeCheck,
	Banknote,
	CalendarCheck,
	Clock,
	Gift,
	Info,
	PiggyBank,
	Trophy,
	UserPlus,
	Users,
	X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
	EARNINGS,
	MILESTONES,
	money,
	PEOPLE,
	plusMoney,
	type ReferralStatus,
	type ReferredPerson,
	STATUS_META,
	type StatusTone,
} from "../../data/ctv-referral";
import { ScreenHeader } from "./ScreenHeader";
import { SectionHead } from "./SectionHead";
import { useFormColor } from "./useFormColor";

type Filter = "all" | "processing" | "counted";

const TONE_TO_BADGE: Record<StatusTone, BadgeColor> = {
	warning: "warning",
	brand: "brand",
	success: "success",
	muted: "gray",
};

const STATUS_ICON: Record<ReferralStatus, typeof UserPlus> = {
	new: UserPlus,
	matching: Clock,
	counted: BadgeCheck,
	failed: X,
};

export function ThuongScreen() {
	const [color] = useFormColor();
	const [filter, setFilter] = useState<Filter>("all");

	const counts = useMemo(
		() => ({
			all: PEOPLE.length,
			processing: PEOPLE.filter((p) => p.status === "new" || p.status === "matching").length,
			counted: PEOPLE.filter((p) => p.status === "counted").length,
		}),
		[]
	);

	const shown = useMemo(() => {
		if (filter === "processing")
			return PEOPLE.filter((p) => p.status === "new" || p.status === "matching");
		if (filter === "counted") return PEOPLE.filter((p) => p.status === "counted");
		return PEOPLE;
	}, [filter]);

	return (
		<div className="ctv-referral" style={{ ["--bp" as string]: color }}>
			<ScreenHeader
				title="Thưởng giới thiệu"
				subtitle="Mỗi người đi làm buổi đầu — bạn nhận 30.000đ. Giới thiệu càng nhiều trong tháng, thưởng vượt mốc càng lớn."
			/>

			<div className="relative z-10 -mt-14.5 flex flex-col gap-3.5 px-4 pb-6 lg:mx-auto lg:max-w-4xl lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:px-8">
				{/* Left column on desktop */}
				<div className="contents lg:flex lg:flex-col lg:gap-3.5">
					<EarningsCard />
					<MilestoneCard />
				</div>
				{/* Right column on desktop */}
				<div className="contents lg:flex lg:flex-col lg:gap-3.5">
					<HowItWorks />

					<section>
						<SectionHead icon={<Users />} title="Người bạn đã giới thiệu" />
						<Tabs
							size="sm"
							variant="pill"
							selectedKey={filter}
							onSelectionChange={(key) => setFilter(key as Filter)}
							className="gap-3"
						>
							<TabList aria-label="Lọc người đã giới thiệu">
								<Tab id="all" value={counts.all}>
									Tất cả
								</Tab>
								<Tab id="processing" value={counts.processing}>
									Đang xử lý
								</Tab>
								<Tab id="counted" value={counts.counted}>
									Đã đi làm
								</Tab>
							</TabList>
						</Tabs>
						<ul className="mt-3 flex flex-col gap-2">
							{shown.map((p) => (
								<PersonRow key={p.id} person={p} />
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

function EarningsCard() {
	return (
		<Card className="shadow-lg">
			<CardContent className="p-[18px]">
				<div className="flex items-start justify-between gap-3">
					<div>
						<div className="inline-flex items-center gap-1.5 text-[12px] text-fg-tertiary [&_svg]:size-4">
							<PiggyBank />
							Số dư có thể rút
						</div>
						<div className="mt-1 text-[30px] font-bold leading-none tracking-[-0.02em] text-fg">
							{EARNINGS.balance.toLocaleString("vi-VN")}
							<span className="ml-0.5 align-top text-[16px] font-semibold text-fg-tertiary">đ</span>
						</div>
						<div className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-fg-tertiary [&_svg]:size-3.5">
							<CalendarCheck />
							Chi trả vào ngày {EARNINGS.payday} hằng tháng
						</div>
					</div>
					<Button
						color="primary"
						size="md"
						iconLeading={Banknote}
						onClick={() => toast.success("Mở màn rút tiền…")}
					>
						Rút tiền
					</Button>
				</div>

				<div className="mt-4 grid grid-cols-3 divide-x divide-border-secondary rounded-xl border border-border-secondary">
					<MiniStat label="Tháng này" value={money(EARNINGS.thisMonth)} />
					<MiniStat label="Đang chờ" value={money(EARNINGS.pending)} tone="warning" />
					<MiniStat label="Tổng đã nhận" value={money(EARNINGS.total)} />
				</div>
			</CardContent>
		</Card>
	);
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone?: "warning" }) {
	return (
		<div className="px-3 py-2.5 text-center">
			<div className="text-[11px] text-fg-tertiary">{label}</div>
			<div
				className={`mt-0.5 text-[14px] font-semibold ${tone === "warning" ? "text-warning-fg" : "text-fg"}`}
			>
				{value}
			</div>
		</div>
	);
}

function MilestoneCard() {
	const count = EARNINGS.monthCount;
	const achieved = MILESTONES.filter((m) => count >= m.people);
	const current = achieved.length ? achieved[achieved.length - 1] : null;
	const next = MILESTONES.find((m) => count < m.people) ?? null;
	const base = current ? current.people : 0;
	const target = next ? next.people : current ? current.people : (MILESTONES[0]?.people ?? 1);
	const pct = next ? Math.round(((count - base) / (target - base)) * 100) : 100;

	return (
		<Card className="shadow-sm">
			<CardContent className="p-[18px]">
				<div className="flex items-center gap-3">
					<span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#FFD976,#F0B429)] text-[#7a4b00]">
						<Trophy className="size-5" />
					</span>
					<div className="flex-1">
						<div className="text-[15px] font-bold text-fg">Thưởng vượt mốc</div>
						<div className="text-[12px] text-fg-tertiary">
							{EARNINGS.monthLabel} · càng nhiều, thưởng càng lớn
						</div>
					</div>
					<div className="text-[13px] text-fg-tertiary">
						<b className="text-[16px] font-bold text-fg">{count}</b> người
					</div>
				</div>

				<ProgressBarBase
					value={pct}
					className="mt-3.5 h-[9px]"
					progressClassName="bg-[linear-gradient(90deg,var(--bp),var(--brand-400))]"
				/>

				<p className="mt-2.5 text-[13px] text-fg-secondary">
					{next ? (
						<>
							Còn <b className="font-semibold text-fg">{next.people - count} người</b> nữa để nhận
							thêm <b className="font-semibold text-fg-brand">{plusMoney(next.bonus)}</b>
						</>
					) : (
						<>
							Đã đạt mốc cao nhất tháng này — nhận{" "}
							<b className="font-semibold text-fg-brand">
								{plusMoney(current ? current.bonus : 0)}
							</b>
						</>
					)}
				</p>

				<div className="mt-3.5 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{MILESTONES.map((m) => {
						const got = count >= m.people;
						const isNext = next?.people === m.people;
						const cls = got
							? "border-success-border bg-success-bg text-success-fg"
							: isNext
								? "border-border-brand bg-info-bg text-fg-brand ring-3 ring-info-bg"
								: "border-border-secondary bg-bg-secondary text-fg-tertiary";
						return (
							<div
								key={m.people}
								className={`min-w-20 shrink-0 rounded-xl border px-3 py-2.5 ${cls}`}
							>
								<div className="flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold">
									{got && <BadgeCheck className="size-3" />}
									{m.people} người
								</div>
								<div className="mt-0.5 whitespace-nowrap text-[13px] font-bold tracking-[-0.01em]">
									{plusMoney(m.bonus)}
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}

const STEPS: Array<{ n: number; body: React.ReactNode }> = [
	{
		n: 1,
		body: (
			<>
				<b className="font-semibold text-fg">Chia sẻ link / QR</b> — bạn bè đăng ký bằng số điện
				thoại của bạn.
			</>
		),
	},
	{
		n: 2,
		body: (
			<>
				Bạn bè <b className="font-semibold text-fg">đi làm buổi đầu thành công</b> → bạn nhận ngay{" "}
				<b className="font-semibold text-fg">30.000đ</b>.
			</>
		),
	},
	{
		n: 3,
		body: (
			<>
				Giới thiệu nhiều trong tháng để nhận thêm{" "}
				<b className="font-semibold text-fg">thưởng vượt mốc</b> (tới 1.600.000đ).
			</>
		),
	},
];

function HowItWorks() {
	return (
		<section>
			<SectionHead icon={<Gift />} title="Cách nhận thưởng" />
			<Card className="shadow-sm">
				<CardContent className="flex flex-col gap-3.5 p-[18px]">
					{STEPS.map((s) => (
						<div key={s.n} className="flex gap-3">
							<span className="grid size-6 shrink-0 place-items-center rounded-full bg-info-bg text-[12px] font-bold text-fg-brand">
								{s.n}
							</span>
							<p className="text-[13px] leading-relaxed text-fg-secondary">{s.body}</p>
						</div>
					))}
					<div className="flex items-start gap-2 rounded-lg bg-bg-secondary p-3 text-[12px] leading-relaxed text-fg-tertiary [&_svg]:mt-0.5 [&_svg]:size-3.5 [&_svg]:shrink-0">
						<Info />
						Chốt thưởng theo kỳ, chi trả vào ngày 5 hằng tháng. Hồ sơ của bạn cần được xác thực.
					</div>
				</CardContent>
			</Card>
		</section>
	);
}

function PersonRow({ person }: { person: ReferredPerson }) {
	const meta = STATUS_META[person.status];
	const Icon = STATUS_ICON[person.status];
	return (
		<li className="flex items-start gap-3 rounded-xl border border-border-secondary bg-bg p-3">
			<span
				className="grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-white"
				style={{ background: person.color }}
			>
				{person.initials}
			</span>
			<div className="min-w-0 flex-1">
				<div className="truncate text-[14px] font-semibold text-fg">{person.name}</div>
				<div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[12px] text-fg-tertiary">
					<span>{person.phone}</span>
					{person.company !== "—" && (
						<>
							<span className="size-1 rounded-full bg-border" />
							<span className="truncate">{person.company}</span>
						</>
					)}
					<span className="size-1 rounded-full bg-border" />
					<span>{person.when}</span>
				</div>
				{person.note && (
					<div className="mt-1 flex items-start gap-1 text-[11.5px] leading-snug text-fg-quaternary">
						<Info className="mt-px size-3 shrink-0" />
						<span>{person.note}</span>
					</div>
				)}
			</div>
			<div className="flex shrink-0 flex-col items-end gap-1">
				<Badge color={TONE_TO_BADGE[meta.tone]} size="sm" className="gap-1 [&_svg]:size-3">
					<Icon />
					{meta.label}
				</Badge>
				{person.status === "counted" ? (
					<span className="text-[13px] font-semibold text-fg-success">
						{plusMoney(person.bonus)}
					</span>
				) : person.status === "failed" ? (
					<span className="text-[13px] text-fg-quaternary">—</span>
				) : (
					<span className="text-[12px] text-fg-quaternary">Đang chờ</span>
				)}
			</div>
		</li>
	);
}
