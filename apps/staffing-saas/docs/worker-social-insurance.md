# Worker Social Insurance (BHXH)

Quản lý BHXH. Monthly hours / shifts / income tracking per worker, used for Vietnamese social insurance declarations.

## Routes

| Route | Purpose |
|---|---|
| `/worker-social-insurance` | List page with detail drawer |

No dedicated detail route — opens in a drawer from row click.

## Entity shape

```ts
interface SocialInsuranceRecord {
  id: string;                  // worker slug
  workerCode: string;          // "489849"
  fullName: string;
  phone: string;
  dob: string;                 // "DD/MM/YYYY"
  email: string;
  gender: "Nam" | "Nữ";
  nationalId: string;          // CCCD
  address: string;
  region: string;              // "Hồ Chí Minh", "Hà Nội", ...
  registeredAt: string;        // "DD/MM/YYYY"
  monthlyHours: number;        // decimal
  monthlyShifts: number;
  incomeCurrent: number;       // VND, selected month
  incomePrev1: number;
  incomePrev2: number;
}
```

The `monthly*` and `income*` fields are scoped to the **selected reporting month**.

## List page

### Header
Title "Quản lý BHXH" · subtitle "Theo dõi giờ công, số ca và thu nhập 3 tháng gần nhất của cộng tác viên phục vụ kê khai bảo hiểm xã hội."

### Controls
- **Month picker** (Calendar icon) — `Chọn tháng kê khai BHXH`. Options: 6 months (e.g., 05/2026 → 12/2025). Defaults to current month. Updates the dynamic column labels.
- **Search** — fullName / phone / workerCode / nationalId / email (case-insensitive).
- **Download** button — primary, exports for declaration (handler not wired).

### Columns (dynamic per selected month, e.g. for 2026-05)

| ID | Label |
|---|---|
| name | Họ Tên (avatar + badge `workerCode`) |
| region | Khu vực và ngày |
| hours | Giờ làm tháng 05 |
| shifts | Số ca tháng 05 |
| incomeCurrent | Thu nhập tháng 05 (VND) |
| incomePrev1 | Thu nhập tháng 04 |
| incomePrev2 | Thu nhập tháng 03 |

### Footer
`{count} cộng tác viên phù hợp với bộ lọc.`

### Row action
Click row → opens `DetailDrawer`.

## Detail drawer (size `lg`)

### Header
Avatar (lg) + name + `Mã CTV {workerCode}` badge + gender badge.

### Body sections

1. **Thông tin liên hệ** — phone · email · DOB
2. **Căn cước** — CCCD · address
3. **Phân công** — region · registered date
4. **Công + thu nhập {month}**
   - Giờ làm — `monthlyHours` (2 decimals)
   - Số ca — `monthlyShifts`
   - Thu nhập {current month} — VND (highlighted)
   - Thu nhập {previous month}
   - Thu nhập {two months prior}

Month label dynamically reflects the picker.

## Business rules

### What's tracked
3-month rolling income + monthly hours/shifts as the basis for BHXH contribution declaration.

### Eligibility
All workers with the required identity fields (CCCD, address, region, DOB, gender) appear on the list. There is no eligibility filter in the UI — the backend should gate by income threshold and active status.

### Status enum (not yet in UI; for backend planning)
Likely values: `Đang đóng` (active) · `Tạm dừng` (paused) · `Hoàn tất` (submitted) · `Chờ xét duyệt` (pending) · `Từ chối` (rejected). Not present in current code.

### Monthly batch
Month picker implies a monthly submission cycle. `Tải xuống` should output the selected month's declaration file (CSV/XLSX) per region.

### Data sources
- `monthlyHours` / `monthlyShifts` — aggregated from closed [timesheets](./timesheets.md)
- `incomeCurrent` / `incomePrev1` / `incomePrev2` — from [worker-payment-batches](./worker-payment-batches.md)
- Worker identity fields — from [worker-verifications](./worker-verifications.md)

## Cross-references

- **Workers** — same population, master record. See [workers.md](./workers.md).
- **Worker Verifications** — identity (CCCD, MST) validated here. See [worker-verifications.md](./worker-verifications.md).
- **Worker Payment Batches** — income derives from closed batches. See [worker-payment-batches.md](./worker-payment-batches.md).
- **Timesheets** — hours/shifts derive from closed timesheets. See [timesheets.md](./timesheets.md).
