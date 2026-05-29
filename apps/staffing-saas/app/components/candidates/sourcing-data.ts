/**
 * Sourcing lead model — layer on top of `candidates-data.ts`.
 *
 * UI demo only. Maps the existing ATS pipeline records into the lead-triage
 * model from the PM spec (tabs + 8 actions + attribution). See
 * docs/staffing_saas/sourcing.md.
 */

import { CANDIDATES, type CandidateRecord } from "./candidates-data";

// ─── Tabs ────────────────────────────────────────────────────────────────

export type SourcingTab =
	| "todo"
	| "interviewed"
	| "shift-locked"
	| "no-show-day1"
	| "worked-day1"
	| "archived";

export const TAB_ORDER: SourcingTab[] = [
	"todo",
	"interviewed",
	"shift-locked",
	"no-show-day1",
	"worked-day1",
	"archived",
];

export const TAB_LABELS: Record<SourcingTab, string> = {
	todo: "Sourcing (To-do)",
	interviewed: "Đã chốt PV",
	"shift-locked": "Đã chốt ca",
	"no-show-day1": "Không đi làm Day-1",
	"worked-day1": "Đã đi làm Day-1",
	archived: "Lưu trữ",
};

/** Tabs that allow acting on a lead. Others are show-only. */
export const ACTION_TABS: SourcingTab[] = ["todo", "no-show-day1"];

// ─── Actions ─────────────────────────────────────────────────────────────

export type SourcingAction =
	| "knm-1"
	| "knm-2"
	| "knm-3"
	| "unreachable"
	| "has-job"
	| "enough-people"
	| "lock-shift"
	| "lock-interview";

export interface ActionDef {
	id: SourcingAction;
	label: string;
	/** Tab the lead moves to after this action. */
	target: SourcingTab;
	/** Marks the lead as rejected → surfaces the reject-reason column. */
	isReject?: boolean;
}

export const ACTIONS: ActionDef[] = [
	{ id: "knm-1", label: "KNM lần 1", target: "todo" },
	{ id: "knm-2", label: "KNM lần 2", target: "todo" },
	{ id: "knm-3", label: "KNM lần 3", target: "archived", isReject: true },
	{ id: "unreachable", label: "Tắt ngang máy / Thuê bao", target: "archived", isReject: true },
	{ id: "has-job", label: "Đã có việc / Không còn nhu cầu", target: "archived", isReject: true },
	{ id: "enough-people", label: "Chưa có việc hợp / Đủ người", target: "archived", isReject: true },
	{ id: "lock-shift", label: "Chốt ca làm", target: "shift-locked" },
	{ id: "lock-interview", label: "Chốt PV", target: "interviewed" },
];

export const ACTION_LABELS: Record<SourcingAction, string> = ACTIONS.reduce(
	(acc, a) => {
		acc[a.id] = a.label;
		return acc;
	},
	{} as Record<SourcingAction, string>
);

// ─── Preferences ───────────────────────────────────────────────────────────

export type ShiftPref = "morning" | "afternoon-evening" | "night";
export type JobTypePref = "part-time" | "full-time";

export const SHIFT_PREF_LABELS: Record<ShiftPref, string> = {
	morning: "Sáng",
	"afternoon-evening": "Chiều - Tối",
	night: "Đêm",
};

export const JOBTYPE_PREF_LABELS: Record<JobTypePref, string> = {
	"part-time": "Bán thời gian / linh hoạt",
	"full-time": "Toàn thời gian",
};

// ─── Lead record ───────────────────────────────────────────────────────────

export interface SourcingLead extends CandidateRecord {
	tab: SourcingTab;
	/** URL owner username (referral link), or null = organic inflow. */
	refCode: string | null;
	/** Người phụ trách; null → cần "Nhận lead". */
	pic: string | null;
	/** Người giới thiệu (≠ recruiter); null = organic. */
	referrer: string | null;
	lastAction: SourcingAction | null;
	rejectReason?: string;
	province: string;
	districts: string[];
	preferredCompanies: string[];
	shiftPrefs: ShiftPref[];
	jobTypePrefs: JobTypePref[];
	cccdFront: boolean;
	cccdBack: boolean;
	availableFrom: string;
	over18Confirmed: boolean;
}

// ─── Augmentation overrides (per record, demo variety) ──────────────────────

interface LeadOverride {
	tab?: SourcingTab;
	pic?: string | null;
	refCode?: string | null;
	referrer?: string | null;
	lastAction?: SourcingAction | null;
	rejectReason?: string;
	preferredCompanies: string[];
	shiftPrefs: ShiftPref[];
	jobTypePrefs: JobTypePref[];
	availableFrom: string;
}

const OVERRIDES: Record<string, LeadOverride> = {
	// Unclaimed organic lead → demo "Nhận lead"
	"cand-001": {
		pic: null,
		refCode: null,
		preferredCompanies: ["Shopee Express", "GHN"],
		shiftPrefs: ["morning", "afternoon-evening"],
		jobTypePrefs: ["full-time"],
		availableFrom: "12/06/2026",
	},
	"cand-002": {
		lastAction: "knm-1",
		refCode: null,
		preferredCompanies: ["GHN"],
		shiftPrefs: ["afternoon-evening", "night"],
		jobTypePrefs: ["part-time"],
		availableFrom: "23/05/2026",
	},
	"cand-003": {
		refCode: "toandv",
		referrer: "Đinh Văn Toàn",
		lastAction: "knm-2",
		preferredCompanies: ["GHTK", "Lazada Logistics"],
		shiftPrefs: ["night"],
		jobTypePrefs: ["full-time"],
		availableFrom: "25/05/2026",
	},
	"cand-004": {
		tab: "interviewed",
		preferredCompanies: ["Con Cưng", "Bách Hoá Xanh"],
		shiftPrefs: ["morning"],
		jobTypePrefs: ["full-time"],
		availableFrom: "21/05/2026",
	},
	"cand-005": {
		tab: "shift-locked",
		refCode: "ctv-ref",
		referrer: "Vũ Thị Hà",
		lastAction: "lock-shift",
		preferredCompanies: ["Vincom Retail"],
		shiftPrefs: ["afternoon-evening"],
		jobTypePrefs: ["part-time"],
		availableFrom: "20/05/2026",
	},
	"cand-006": {
		tab: "worked-day1",
		lastAction: "lock-shift",
		preferredCompanies: ["Bách Hoá Xanh"],
		shiftPrefs: ["morning", "afternoon-evening"],
		jobTypePrefs: ["part-time"],
		availableFrom: "10/05/2026",
	},
	"cand-007": {
		tab: "archived",
		lastAction: "enough-people",
		rejectReason: "Không đủ điều kiện sức khoẻ ca đêm.",
		preferredCompanies: ["GHTK"],
		shiftPrefs: ["night"],
		jobTypePrefs: ["full-time"],
		availableFrom: "18/05/2026",
	},
	"cand-008": {
		tab: "archived",
		lastAction: "knm-3",
		rejectReason: "Không phản hồi sau 3 lần liên hệ.",
		preferredCompanies: ["Vincom Retail", "Highlands"],
		shiftPrefs: ["morning"],
		jobTypePrefs: ["part-time"],
		availableFrom: "16/05/2026",
	},
	"cand-009": {
		tab: "archived",
		lastAction: "unreachable",
		rejectReason: "Trùng SĐT với worker đã blacklist.",
		preferredCompanies: ["Shopee Express"],
		shiftPrefs: ["morning"],
		jobTypePrefs: ["part-time"],
		availableFrom: "12/05/2026",
	},
	// Chốt ca rồi nhưng đối soát không có công → Day-1 no-show
	"cand-010": {
		tab: "no-show-day1",
		lastAction: "lock-shift",
		preferredCompanies: ["Lazada Logistics", "GHN"],
		shiftPrefs: ["afternoon-evening"],
		jobTypePrefs: ["part-time"],
		availableFrom: "22/05/2026",
	},
	"cand-011": {
		tab: "interviewed",
		lastAction: "lock-interview",
		preferredCompanies: ["GHTK", "Lazada Logistics"],
		shiftPrefs: ["night"],
		jobTypePrefs: ["full-time"],
		availableFrom: "24/05/2026",
	},
	// Unclaimed organic lead → demo "Nhận lead"
	"cand-012": {
		pic: null,
		refCode: null,
		preferredCompanies: ["Shopee Express", "Con Cưng"],
		shiftPrefs: ["morning", "afternoon-evening"],
		jobTypePrefs: ["full-time"],
		availableFrom: "19/06/2026",
	},
};

const STAGE_TO_TAB: Record<CandidateRecord["stage"], SourcingTab> = {
	new: "todo",
	contact: "todo",
	onboarding: "shift-locked",
	hired: "worked-day1",
	rejected: "archived",
	ghosted: "archived",
	blacklist: "archived",
};

function augment(record: CandidateRecord): SourcingLead {
	const o = OVERRIDES[record.id];
	const cccd = record.documents.find((d) => d.id === "cccd");
	const hasCccd = cccd?.state === "verified" || cccd?.state === "submitted";
	return {
		...record,
		tab: o?.tab ?? STAGE_TO_TAB[record.stage],
		refCode: o?.refCode ?? null,
		pic: o?.pic === undefined ? record.recruiter : o.pic,
		referrer: o?.referrer ?? null,
		lastAction: o?.lastAction ?? null,
		...(o?.rejectReason ? { rejectReason: o.rejectReason } : {}),
		province: record.city,
		districts: [record.district],
		preferredCompanies: o?.preferredCompanies ?? [],
		shiftPrefs: o?.shiftPrefs ?? ["morning"],
		jobTypePrefs: o?.jobTypePrefs ?? ["part-time"],
		cccdFront: hasCccd,
		cccdBack: cccd?.state === "verified",
		availableFrom: o?.availableFrom ?? record.appliedAt,
		over18Confirmed: true,
	};
}

export const SOURCING_LEADS: SourcingLead[] = CANDIDATES.map(augment);
