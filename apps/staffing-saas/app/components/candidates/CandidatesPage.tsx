"use client";

import {
	AvatarProfilePhoto,
	Badge,
	Button,
	Dropdown,
	Input,
	Tab,
	TabList,
	Table,
	TableCard,
	Tabs,
} from "@mvp-ui/ui";
import { Mars, Plus, Search, UserPlus, Venus } from "lucide-react";
import { useMemo, useState } from "react";
import { getAvatarFor, getInitials } from "../_shared/assets";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { type DocumentState, SOURCE_LABELS } from "./candidates-data";
import { CandidateQuickView } from "./CandidateQuickView";
import {
	SHIFT_OPTIONS_BY_CUSTOMER,
	type ShiftOption,
	shiftShortage,
} from "./shift-options-data";
import {
	ACTION_TABS,
	ACTIONS,
	type ActionDef,
	JOBTYPE_PREF_LABELS,
	SHIFT_PREF_LABELS,
	SOURCING_LEADS,
	type SourcingLead,
	type SourcingTab,
	TAB_LABELS,
	TAB_ORDER,
	WORK_STATUS_LABELS,
	type WorkStatus,
} from "./sourcing-data";

/** Demo: leads owned by this user show full phone; others are masked. */
const CURRENT_USER = "Lê Thuỳ Trang";

type TimeWindow = "7" | "30" | "90" | "all";
const TIME_OPTIONS: { id: TimeWindow; label: string }[] = [
	{ id: "7", label: "7 ngày" },
	{ id: "30", label: "30 ngày" },
	{ id: "90", label: "90 ngày" },
	{ id: "all", label: "Tất cả" },
];
const TODAY = new Date(2026, 4, 29); // demo "today" = 29/05/2026

function parseVnDate(s: string): Date | null {
	const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
	if (!m) return null;
	return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}

function withinWindow(dateStr: string, window: TimeWindow): boolean {
	if (window === "all") return true;
	const d = parseVnDate(dateStr);
	if (!d) return true;
	const days = (TODAY.getTime() - d.getTime()) / 86_400_000;
	return days <= Number(window);
}

function maskPhone(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	return `***${digits.slice(-4)}`;
}

const COLUMNS = [
	{ id: "candidate", name: "Thông tin CTV", isRowHeader: true as const },
	{ id: "source", name: "Nguồn" },
	{ id: "contact", name: "Liên hệ" },
	{ id: "prefArea", name: "Khách hàng / Khu vực" },
	{ id: "prefTime", name: "Ca / Loại hình" },
	{ id: "cccd", name: "Hồ sơ (CCCD)" },
	{ id: "work", name: "Trạng thái đi làm" },
	{ id: "action", name: "Hành động" },
];

const CCCD_DISPLAY: Record<DocumentState, { label: string; color: "gray" | "warning" | "success" | "error" }> = {
	missing: { label: "Chưa có", color: "gray" },
	submitted: { label: "Chưa xác thực", color: "warning" },
	verified: { label: "Đã xác thực", color: "success" },
	rejected: { label: "Bị loại", color: "error" },
};

function GenderIcon({ gender }: { gender: "male" | "female" }) {
	const Icon = gender === "male" ? Mars : Venus;
	return (
		<Icon
			className="size-3.5 shrink-0 text-fg-tertiary"
			aria-label={gender === "male" ? "Nam" : "Nữ"}
		/>
	);
}

function SourceCell({ lead }: { lead: SourcingLead }) {
	if (lead.source === "referral") {
		return (
			<div className="flex flex-col items-start gap-0.5">
				<Badge color="brand" type="pill-color" size="sm">
					Giới thiệu
				</Badge>
				{lead.referrer ? (
					<span className="text-sm text-fg-tertiary">bởi {lead.referrer}</span>
				) : null}
			</div>
		);
	}
	if (lead.source === "direct") {
		return (
			<Badge color="gray" type="pill-color" size="sm">
				Hệ thống
			</Badge>
		);
	}
	return (
		<Badge color="gray" type="pill-color" size="sm">
			{SOURCE_LABELS[lead.source]}
		</Badge>
	);
}

function CccdBadge({ state }: { state: DocumentState }) {
	const d = CCCD_DISPLAY[state];
	return (
		<Badge color={d.color} type="pill-color" size="sm">
			{d.label}
		</Badge>
	);
}

function WorkStatusCell({ status }: { status: WorkStatus }) {
	if (status.state === "none") {
		return <span className="text-sm text-fg-tertiary">Chưa đi làm</span>;
	}
	const isWorked = status.state === "worked";
	return (
		<div className="flex flex-col items-start gap-0.5">
			<Badge color={isWorked ? "success" : "warning"} type="pill-color" size="sm">
				{WORK_STATUS_LABELS[status.state]}
			</Badge>
			<span className="text-sm text-fg-tertiary">
				{status.date}
				{!isWorked && status.warehouse ? ` • ${status.warehouse}` : ""}
			</span>
		</div>
	);
}

/** Popover chọn ca khi "Chốt ca làm": Khách hàng → Ca, kèm số cần / thiếu. */
function ShiftPicker({ onPick }: { onPick: (shift: ShiftOption) => void }) {
	return (
		<Dropdown.Root>
			<Dropdown.Trigger color="primary" size="sm">
				Chốt ca làm
			</Dropdown.Trigger>
			<Dropdown.Popover className="w-80">
				<Dropdown.Menu>
					{SHIFT_OPTIONS_BY_CUSTOMER.map((group) => (
						<Dropdown.Section key={group.customer}>
							<Dropdown.SectionHeader>{group.customer}</Dropdown.SectionHeader>
							{group.shifts.map((s) => {
								const short = shiftShortage(s);
								return (
									<Dropdown.Item
										key={s.id}
										label={`${s.shift} · ${s.site}`}
										addon={short > 0 ? `Thiếu ${short}/${s.required}` : `Đủ ${s.required}`}
										selectionIndicator="none"
										onAction={() => onPick(s)}
									/>
								);
							})}
						</Dropdown.Section>
					))}
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown.Root>
	);
}

function LeadRow({
	lead,
	onSelect,
	onClaim,
	onAction,
	onLockShift,
}: {
	lead: SourcingLead;
	onSelect: (lead: SourcingLead) => void;
	onClaim: (id: string) => void;
	onAction: (id: string, action: ActionDef) => void;
	onLockShift: (id: string, shift: ShiftOption) => void;
}) {
	const owned = lead.pic === null || lead.pic === CURRENT_USER;
	const canAct = ACTION_TABS.includes(lead.tab) && lead.pic !== null;

	return (
		<Table.Row id={lead.id} onAction={() => onSelect(lead)} className="cursor-pointer">
			{/* Thông tin CTV — ảnh, tên, giới tính, mã số */}
			<Table.Cell>
				<div className="flex items-center gap-3 text-left">
					<AvatarProfilePhoto
						size="sm"
						src={getAvatarFor(lead.fullName, lead.id)}
						alt={lead.fullName}
						initials={getInitials(lead.fullName)}
					/>
					<div className="min-w-0">
						<div className="flex items-center gap-1.5">
							<span className="truncate text-sm font-medium text-fg">
								{lead.fullName}
							</span>
							<GenderIcon gender={lead.gender} />
						</div>
						<div className="truncate text-sm text-fg-tertiary">{lead.code}</div>
					</div>
				</div>
			</Table.Cell>
			{/* Nguồn */}
			<Table.Cell>
				<SourceCell lead={lead} />
			</Table.Cell>
			{/* Liên hệ */}
			<Table.Cell>
				<span className="text-sm text-fg">{owned ? lead.phone : maskPhone(lead.phone)}</span>
			</Table.Cell>
			{/* Preference — khách hàng / khu vực */}
			<Table.Cell>
				<div className="text-sm text-fg">
					{lead.districts.join(", ")} - {lead.province}
				</div>
				<div className="mt-1 flex flex-wrap gap-1">
					{lead.preferredCompanies.length === 0 ? (
						<span className="text-sm text-fg-tertiary">—</span>
					) : (
						lead.preferredCompanies.map((c) => (
							<Badge key={c} color="gray" type="pill-color" size="sm">
								{c}
							</Badge>
						))
					)}
				</div>
			</Table.Cell>
			{/* Preference — ca / loại hình */}
			<Table.Cell>
				<div className="text-sm text-fg">
					{lead.shiftPrefs.map((s) => SHIFT_PREF_LABELS[s]).join(", ")}
				</div>
				<div className="text-sm text-fg-tertiary">
					{lead.jobTypePrefs.map((j) => JOBTYPE_PREF_LABELS[j]).join(", ")}
				</div>
			</Table.Cell>
			{/* Hồ sơ — CCCD */}
			<Table.Cell>
				<CccdBadge state={lead.cccdState} />
			</Table.Cell>
			{/* Trạng thái đi làm */}
			<Table.Cell>
				<WorkStatusCell status={lead.workStatus} />
			</Table.Cell>
			{/* Hành động — phụ trách + claim + dropdown + lý do loại */}
			<Table.Cell>
				<div className="flex flex-col items-start gap-1.5">
					{lead.pic === null ? (
						<Button
							color="secondary"
							size="sm"
							iconLeading={<UserPlus className="size-4" />}
							onClick={() => onClaim(lead.id)}
						>
							Nhận lead
						</Button>
					) : (
						<span className="text-sm text-fg">{lead.pic}</span>
					)}
					{canAct ? (
						<>
							<ShiftPicker onPick={(shift) => onLockShift(lead.id, shift)} />
							<Dropdown.Root>
								<Dropdown.Trigger color="secondary" size="sm">
									Hành động khác
								</Dropdown.Trigger>
								<Dropdown.Popover className="w-60">
									<Dropdown.Menu>
										{ACTIONS.filter((a) => a.id !== "lock-shift").map((a) => (
											<Dropdown.Item
												key={a.id}
												label={a.label}
												onAction={() => onAction(lead.id, a)}
											/>
										))}
									</Dropdown.Menu>
								</Dropdown.Popover>
							</Dropdown.Root>
						</>
					) : lead.rejectReason ? (
						<span className="text-sm text-fg-error">{lead.rejectReason}</span>
					) : null}
				</div>
			</Table.Cell>
		</Table.Row>
	);
}

export function CandidatesPage() {
	const [leads, setLeads] = useState<SourcingLead[]>(SOURCING_LEADS);
	const [tab, setTab] = useState<SourcingTab>("todo");
	const [search, setSearch] = useState("");
	const [picFilter, setPicFilter] = useState<string>("all");
	const [timeFilter, setTimeFilter] = useState<TimeWindow>("30");
	const [selected, setSelected] = useState<SourcingLead | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const picOptions = useMemo(() => {
		const names = new Set(leads.map((l) => l.pic).filter((p): p is string => p !== null));
		return Array.from(names).sort();
	}, [leads]);

	const counts = useMemo(() => {
		const c: Record<SourcingTab, number> = {
			todo: 0,
			interviewed: 0,
			"shift-locked": 0,
			"no-show-day1": 0,
			"worked-day1": 0,
			archived: 0,
		};
		for (const l of leads) c[l.tab] += 1;
		return c;
	}, [leads]);

	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		return leads.filter((l) => {
			if (l.tab !== tab) return false;
			if (picFilter === "unclaimed" && l.pic !== null) return false;
			if (picFilter !== "all" && picFilter !== "unclaimed" && l.pic !== picFilter) return false;
			if (!withinWindow(l.lastTouchAt, timeFilter)) return false;
			if (q === "") return true;
			return (
				l.fullName.toLowerCase().includes(q) ||
				l.phone.replace(/\D/g, "").includes(q.replace(/\D/g, "")) ||
				l.code.toLowerCase().includes(q)
			);
		});
	}, [leads, tab, picFilter, timeFilter, search]);

	const openDrawer = (lead: SourcingLead) => {
		setSelected(lead);
		setIsDrawerOpen(true);
	};

	const claimLead = (id: string) => {
		setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, pic: CURRENT_USER } : l)));
	};

	const applyAction = (id: string, action: ActionDef) => {
		setLeads((prev) =>
			prev.map((l) =>
				l.id === id
					? {
						...l,
						tab: action.target,
						lastAction: action.id,
						...(action.isReject ? { rejectReason: action.label } : {}),
					}
					: l
			)
		);
	};

	const lockShift = (id: string, shift: ShiftOption) => {
		setLeads((prev) =>
			prev.map((l) =>
				l.id === id
					? {
						...l,
						tab: "shift-locked",
						lastAction: "lock-shift",
						workStatus: { state: "pending", date: shift.date, warehouse: shift.site },
					}
					: l
			)
		);
	};

	return (
		<PageScaffold
			header={
				<AppPageHeader
					title="Quản lý sourcing"
					// description="Pool ứng viên đa nguồn — triage theo hành động, ghi nhận người phụ trách (PIC) để tính thù lao giới thiệu."
					actions={
						<>
							<Button color="secondary" size="sm">
								Import CSV
							</Button>
							<Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
								Thêm ứng viên
							</Button>
						</>
					}
				/>
			}
		>
			<Tabs
				selectedKey={tab}
				onSelectionChange={(key) => setTab(key as SourcingTab)}
				variant="underline"
			>
				<TabList aria-label="Tab sourcing">
					{TAB_ORDER.map((t) => (
						<Tab key={t} id={t} value={counts[t]}>
							{TAB_LABELS[t]}
						</Tab>
					))}
				</TabList>
			</Tabs>

			<TableCard.Root>
				<div className="flex flex-col gap-4 border-b border-border-secondary px-4 py-4">
					<div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
						<Input
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder="Tìm theo tên, SĐT hoặc mã ứng viên"
							iconLeading={<Search className="size-4" />}
							aria-label="Tìm ứng viên"
						/>
						<select
							value={picFilter}
							onChange={(event) => setPicFilter(event.target.value)}
							aria-label="Lọc theo người phụ trách"
							className="rounded-lg border border-border-secondary bg-bg px-3 py-2 text-sm text-fg shadow-xs focus:outline-none focus:ring-2 focus:ring-border-brand"
						>
							<option value="all">Tất cả PIC</option>
							<option value="unclaimed">Chưa nhận lead</option>
							{picOptions.map((name) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</select>
						<select
							value={timeFilter}
							onChange={(event) => setTimeFilter(event.target.value as TimeWindow)}
							aria-label="Lọc theo thời gian"
							className="rounded-lg border border-border-secondary bg-bg px-3 py-2 text-sm text-fg shadow-xs focus:outline-none focus:ring-2 focus:ring-border-brand"
						>
							{TIME_OPTIONS.map((opt) => (
								<option key={opt.id} value={opt.id}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
					<div className="flex items-center justify-between gap-2 text-sm text-fg-tertiary">
						<span>{filtered.length} ứng viên trong tab này.</span>
						<span className="inline-flex items-center gap-1.5">
							<UserPlus className="size-4" />
							Click tên để xem nhanh
						</span>
					</div>
				</div>

				<div className="overflow-x-auto">
					<Table aria-label="Danh sách sourcing">
						<Table.Header>
							{COLUMNS.map((column) => (
								<Table.Head
									key={column.id}
									id={column.id}
									label={column.name}
									{...(column.isRowHeader && { isRowHeader: true })}
								/>
							))}
						</Table.Header>
						<Table.Body items={filtered}>
							{(lead) => (
								<LeadRow
									lead={lead}
									onSelect={openDrawer}
									onClaim={claimLead}
									onAction={applyAction}
									onLockShift={lockShift}
								/>
							)}
						</Table.Body>
					</Table>
				</div>
			</TableCard.Root>

			<CandidateQuickView
				candidate={selected}
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			/>
		</PageScaffold>
	);
}
