# Candidates

Applicant funnel. A candidate becomes a [Worker](./workers.md) (CTV) once converted.

## Routes

| Route | Purpose |
|---|---|
| `/candidates` | List page (table or kanban) |
| `/candidates/[id]` | Detail page with 5 tabs |

Filter/view state lives in component state, not URL.

## Entity shape

```ts
type CandidateStage =
  | "new"          // Mới nhận
  | "contact"      // Liên hệ
  | "onboarding"   // Onboarding
  | "hired"        // Đã nhận việc (terminal)
  | "rejected"     // Từ chối (terminal)
  | "ghosted"      // Mất liên lạc (terminal)
  | "blacklist";   // Blacklist (terminal)

type CandidateSource = "facebook" | "zalo" | "tiktok" | "referral" | "direct";
type DocumentState = "missing" | "submitted" | "verified" | "rejected";

interface CandidateRecord {
  id: string;
  code: string;                      // "C-2401"
  fullName: string;
  phone: string;
  email?: string;
  dob: string;                       // "DD/MM/YYYY"
  gender: "male" | "female";
  city: string;
  district: string;
  appliedPosition: string;
  hiringRequestId?: string;
  hiringRequestCode?: string;        // "HR-2401"
  workerId?: string;                 // set after conversion
  stage: CandidateStage;
  source: CandidateSource;
  recruiter: string;
  score: number;                     // 0–100 match score
  appliedAt: string;
  lastTouchAt: string;
  experience: string;
  skills: string[];
  expectedPay?: string;              // "₫55.000 / giờ"
  notesShort?: string;
  documents: CandidateDocumentRow[];
  interactions: CandidateInteraction[];
  interviews: CandidateInterview[];
  notes: CandidateNote[];
}

interface CandidateDocumentRow {
  id: string;                        // "cccd", "health", ...
  label: string;                     // "CMND/CCCD"
  state: DocumentState;
  note?: string;
}

interface CandidateInteraction {
  id: string;
  at: string;                        // "DD/MM/YYYY HH:MM"
  channel: "call" | "sms" | "zalo" | "system" | "note" | "interview";
  actor: string;                     // person or "Hệ thống"
  summary: string;
  detail?: string;
}

interface CandidateInterview {
  id: string;
  at: string;
  mode: "Online" | "Trực tiếp" | "Ca thử";
  interviewer: string;
  outcome: "Đạt" | "Không đạt" | "Chờ kết quả" | "Đã hẹn";
  note?: string;
}

interface CandidateNote {
  id: string;
  at: string;
  actor: string;                     // recruiter name
  body: string;
}
```

### Stage labels & terminal flags

| Stage | Label | Color | Terminal? |
|---|---|---|---|
| `new` | Mới nhận | gray | no |
| `contact` | Liên hệ | warning | no |
| `onboarding` | Onboarding | brand | no |
| `hired` | Đã nhận việc | success | **yes** |
| `rejected` | Từ chối | error | **yes** |
| `ghosted` | Mất liên lạc | gray | **yes** |
| `blacklist` | Blacklist | error | **yes** |

`STAGE_ORDER = ["new", "contact", "onboarding", "hired"]` (active pipeline).

### Document state labels

| State | Label | Color |
|---|---|---|
| `missing` | Thiếu | gray |
| `submitted` | Đã gửi | warning |
| `verified` | Đã xác thực | success |
| `rejected` | Bị loại | error |

### Source labels
`facebook → Facebook`, `zalo → Zalo`, `tiktok → TikTok`, `referral → Giới thiệu`, `direct → Trực tiếp`.

## List page

### Filters
- **View toggle** — `Bảng` (table) / `Kanban`. Default kanban.
- **Search** — fullName / phone / code / email (case-insensitive).
- **Source dropdown** — table view only. "Tất cả nguồn" + each source.
- **Stage pills** — table view only. "Tất cả" + every stage.

### Header actions
- `Import CSV` (secondary)
- `Thêm ứng viên` (primary)

### Table columns (7)
Ứng viên (avatar + name + code + phone) · Vị trí ứng tuyển (+ HR code) · Nguồn · Stage (badge) · Match score (color by threshold: ≥85 success / 65–84 default / <65 tertiary) · Phụ trách · Liên hệ gần nhất.

Row click → opens `CandidateQuickView` drawer (not detail page).

### Kanban
Horizontal scrolling columns, one per stage (`STAGE_ORDER` + terminal stages). Card shows avatar (with state indicator), name, code, score, source badge, HR code, notesShort or applied position, recruiter + last touch.

### Empty state
`"{N} ứng viên phù hợp với bộ lọc hiện tại."` + hint `"Click vào ứng viên để xem nhanh"`.

## Detail page

Header: avatar (with state indicator for `hired`/`blacklist`) · name · stage badge · source badge · `{code} • {phone} • {district}, {city}` · short note · applied position panel (with HR link).

### Header actions (conditional)
- `Quay lại danh sách`
- `Chuyển thành CTV` (primary) — **shown only if stage ∉ {hired, rejected, blacklist, ghosted}**
- `Mở hồ sơ CTV` (primary) — **shown only if `workerId` set**, links to `/workers/{workerId}`

### Tabs

1. **Tổng quan** — metric cards (score, source, document count {verified}/{total}, recruiter); contact info panel (phone, email, district/city, DOB, expected pay); applied position panel (HR code, experience, skills as badges). If `workerId` set: confirmation card "Đã chuyển thành CTV" with link.
2. **Hồ sơ (Documents)** — list of `CandidateDocumentRow` with state badges.
3. **Phỏng vấn (Interviews)** — per-interview card: mode, date, outcome badge, interviewer, note. Outcome colors: `Đạt`=success, `Không đạt`=error, else warning.
4. **Tương tác (Interactions)** — timeline with channel icon per row.
5. **Ghi chú (Notes)** — actor + timestamp + body.

## Modals / drawers

### CandidateQuickView (drawer, size `lg`)
Triggered by row click on list page. Contains avatar, stage + source badges, short note, quick metric grid (score, doc count, applied position, recruiter, contact info, expected pay), skills, latest interview, latest interaction, document state list. Footer: `Đóng` / `Xem chi tiết` (→ `/candidates/{id}`).

## Business rules

### Stage transitions
- `new → contact | rejected | ghosted | blacklist`
- `contact → onboarding | rejected | ghosted | blacklist`
- `onboarding → hired | rejected | ghosted`
- `hired | rejected | ghosted | blacklist` — terminal, no further transitions

### Conversion to Worker
Triggered by `Chuyển thành CTV` action. Backend must:
1. Transition stage → `hired`
2. Create a `WorkerRecord` (see [workers.md](./workers.md))
3. Set `candidate.workerId = newWorker.id`

Candidate record stays as historical reference; subsequent shift / pay management happens via Workers UI.

### Status side effects
- `ghosted` should be auto-triggered after N failed contact attempts (rule not in code; inferred).
- `blacklist` is a manual / fraud-detection flag; can be applied to a phone number to block re-application.

### Document rules
Each doc moves `missing → submitted → verified` (or `rejected` at any point). A rejected doc must be resubmitted.

Base required doc set (from sample data): CMND/CCCD, selfie with ID, bank account, health check, worker contract.

### Last-touch logic
`lastTouchAt` = most recent timestamp across interactions, interviews, and notes.

### Avatar state on detail
- `stage === "hired"` → verified state
- `stage === "blacklist"` → blocked state

### State machines

**CandidateStage**

| From | To | Trigger | Guard / side effect |
|---|---|---|---|
| `new` | `contact` | recruiter reaches out | first interaction logged |
| `contact` | `onboarding` | interview passed or trial scheduled | |
| `onboarding` | `hired` | `Chuyển thành CTV` action | create `WorkerRecord`, set `candidate.workerId` |
| `new` / `contact` / `onboarding` | `rejected` | manual rejection | reason in note |
| `new` / `contact` / `onboarding` | `ghosted` | N failed contact attempts (auto rule, not in code) | |
| any | `blacklist` | fraud / policy flag | phone-level block |

Terminal: `hired`, `rejected`, `ghosted`, `blacklist`. No path back.

**DocumentState** (per `CandidateDocumentRow`)

| From | To | Trigger |
|---|---|---|
| `missing` | `submitted` | worker uploads |
| `submitted` | `verified` | reviewer approves |
| `submitted` / `verified` | `rejected` | reviewer denies |
| `rejected` | `submitted` | worker resubmits |

**CandidateInterview.outcome**: `Đã hẹn → Chờ kết quả → (Đạt | Không đạt)`.

## Cross-references

- **Hiring Requests** — `hiringRequestId` → `/hiring-requests/{id}`. See [hiring-requests.md](./hiring-requests.md).
- **Workers** — `workerId` → `/workers/{id}` after conversion. See [workers.md](./workers.md).
