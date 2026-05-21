# Worker SWAT

SWAT = elite / priority worker tier. Tracks trial invitations → official contracts; surfaces timesheet and payslip views for this cohort.

## Routes

| Route | Purpose |
|---|---|
| `/worker-swat` | Hub page with 4 tabs |
| `/worker-swat?tab=invite` | Trial invitation list |
| `/worker-swat?tab=list` | SWAT contract roster (default) |
| `/worker-swat?tab=timesheet` | Timesheet view |
| `/worker-swat?tab=payslip` | Payslip view |

No detail page — actions happen inline / via modals.

## Entity shape

```ts
interface SwatContractRecord {
  id: string;
  worker: {
    name: string;
    phone: string;
    dob: string;                  // "DD/MM/YYYY"
    gender: "Nam" | "Nữ";
    age: number;
  };
  company: { name: string; city: string };
  contract: {
    type: "official" | "trial";
    status: "active" | "expired" | "missing";
    startDate: string;
    endDate: string;
    fileUrl?: string;
  };
  note?: {
    title: string;
    timestamp: string;            // "DD/MM/YYYY HH:mm"
    author: string;
  };
}

interface InviteRecord {
  id: string;
  worker: { name; phone; dob; gender; age };
  company: { name; city };
  totalHours: { hours: number; period: string };       // "Tháng 4/2026"
  totalIncome: { amount: number; period: string };
  status: "pending" | "approved" | "rejected" | "unreachable";
  note?: string;
}
```

### Contract status

| Status | Label | Color |
|---|---|---|
| `active` | (Còn hiệu lực) | success |
| `expired` | (Hết hạn) | sky/blue |
| `missing` | Chưa có | error |

### Contract type

| Type | Label | Color |
|---|---|---|
| `official` | Chính thức | success |
| `trial` | Thử việc | sky/blue |

### Invite status tabs
Chờ xử lý (pending) · Đồng ý (approved) · Từ chối (rejected) · Không LH được (unreachable) · Tất cả.

## Tab: SWAT list (`tab=list`)

### Filters
- Search — name / phone / worker code
- Status filter — contract status
- Type filter — official / trial / all

### Columns
1. Họ tên (link)
2. Thông tin — phone, DOB, gender + age (pills)
3. Công ty — name + city
4. Loại hợp đồng — type badge + status badge (if not missing)
5. Thời gian — start / end date (stacked)
6. Hợp đồng — link icon if `fileUrl`; else `Upload` button + "Chưa có" badge
7. Ghi chú — optional note (title + timestamp + author)
8. Actions — dropdown:
   - `Ký tiếp H/Đ` (renew) — if status ≠ expired
   - `Kết thúc H/Đ` (terminate) — if status = active

## Tab: Invite Trial (`tab=invite`)

### Filters
- Status tabs (pending / approved / rejected / unreachable / all) with counts
- Search — name / phone

### Columns
Họ tên · Thông tin · Công ty · Tổng giờ công (`{hours}h` + period) · Tổng thu nhập (VND + period) · Ghi chú · Actions dropdown.

### Actions per row
- `Đồng ý` (approve) — moves to SWAT contracts with trial contract
- `Từ chối` (reject)
- `Không LH được` (mark unreachable)

## Tab: Timesheet (`tab=timesheet`)

- Month selector (MM-YYYY)
- Search — name / phone / worker code
- Download timesheet (XLSX/CSV)
- Columns: shift type, clock in/out, breaks, adhoc hours, confirmed hours, day/night regular, day/night overtime
- Currently empty (no SWAT-scoped timesheet data integrated)

## Tab: Payslip (`tab=payslip`)

- Search by worker
- Upload payroll batch (XLSX)
- Download bank account list (TKNH = Tài khoản ngân hàng)
- Columns: worker, info, contract type, recent 3 payslips, full history
- Currently empty

## Modals / drawers

Expected (not implemented):
1. **Promote to SWAT** — from invite → approve → create trial contract
2. **Terminate** — active → expired
3. **Renew** — extend non-expired contract
4. **Upload contract file** — file picker, stores `fileUrl`
5. **Add note** — title + body, stamps `timestamp` + `author`
6. **Batch invite** — CSV of workerIds

## Business rules

### Contract lifecycle
```
(invited) → trial active → official active → expired
                       ↓
                   terminated (action) → expired
```

- **Trial → Official**: promotion criteria not in code; likely hours/reliability driven.
- **Terminate**: action available only when `status = active`.

### Eligibility for invite
Invitee list shows `totalHours` + `totalIncome` per worker → minimum engagement implied. No explicit threshold visible.

### Demotion
No "demote to non-SWAT" action; contract simply expires.

### Audit
Every contract note stores `timestamp` + `author`. Example: "Cập nhật hợp đồng thử việc" / "Thi Nguyễn" / "03/11/2025 11:50".

### File requirement
Active contracts should have `fileUrl`. UI surfaces "Chưa có" error badge if missing.

### State machines

**Contract status / type**

| From | To | Trigger |
|---|---|---|
| `missing` | `active` (trial) | invite `approved` + trial contract uploaded |
| `active` (trial) | `active` (official) | promote (manual; criteria off-doc) |
| `active` | `expired` | `endDate` reached or `Kết thúc H/Đ` action |
| `expired` | `active` | `Ký tiếp H/Đ` (renew) |

Contract type (`trial` ↔ `official`) is set on promotion; no demote action.

**InviteRecord.status**

| From | To | Trigger | Side effect |
|---|---|---|---|
| (create) | `pending` | system enqueues invite | |
| `pending` | `approved` | `Đồng ý` action | create trial contract |
| `pending` | `rejected` | `Từ chối` action | terminal |
| `pending` | `unreachable` | `Không LH được` action | terminal |

All non-pending terminal.

## Cross-references

- **Workers** — same workers as [workers.md](./workers.md); SWAT is a subset / tier.
- **Hiring Requests** — SWAT members are prioritized for high-demand shifts (rule not in code).
- **Timesheets** — feeds the SWAT timesheet tab. See [timesheets.md](./timesheets.md).
- **Worker Payment Batches** — feeds the payslip tab. See [worker-payment-batches.md](./worker-payment-batches.md).
