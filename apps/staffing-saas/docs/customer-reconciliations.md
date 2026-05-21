# Customer Reconciliations (Config)

Cấu hình đối soát. Read-only list view of every customer's reconciliation configuration (cycle, invoice profile, contacts, channel). Editing happens inside the customer detail page.

For the actual reconciliation runs (period close, invoicing, payment matching) see [reconciliations.md](./reconciliations.md).

## Routes

| Route | Purpose |
|---|---|
| `/customer-reconciliations` | List page (read-only) + detail drawer |
| `/customers/[id]?tab=reconciliation` | Edit reconciliation config for one customer |

## Entity shape

### List-page record

```ts
interface CustomerReconciliationConfig {
  id: string;                         // customer id, e.g. "ghn-sorting"
  accountNumber: string;              // "1591"
  companyName: string;                // legal name
  brandName: string | null;
  logoUrl: string;
  taxId: string;                      // MST
  statementDueRule: string;           // "Ngày 1", "Ngày 28 tháng M+1"
  invoiceDueRule: string;
  paymentTermDays: number;            // 15 / 30 / 45
  invoiceIssuanceMethod: string;
  paymentDocs: string[];              // doc-type keys
  contacts: ReconciliationContact[];
  note: string | null;
}

interface ReconciliationContact {
  name: string;
  phone: string;
  email?: string;
  role?: string;                      // "Người nhận hồ sơ thanh toán", ...
}
```

### Edit-view shape (from customer detail)

```ts
interface CustomerReconciliation {
  cycle: { perMonth: string | null; startDay: string | null; endDay: string | null };
  invoiceProfile: {
    statementDueRule: string | null;
    invoiceDueRule: string | null;
    debtCutoffRule: string | null;       // "Theo ngày phát sinh ca"
    paymentTermDays: string | null;
    issuanceMethod: string | null;
    templateFile: string | null;
    templateLinkUrl: string | null;
    requiredDocs: string[];
  };
  contacts: CustomerReconciliationContact[];
  channel: {
    kind: string | null;                  // "Zalo"
    bookingGroupUrl: string | null;
    reconciliationGroupUrl: string | null;
  };
  note: string | null;
}

interface CustomerReconciliationContact {
  id: string;
  role: string;                            // "Đối soát" | "Thanh toán" | "Giám sát"
  fullName: string;
  phone: string;
  email: string;
  coverageArea: string;
}
```

### Payment doc types

| Key | Label |
|---|---|
| `einvoice` | Hóa đơn điện tử |
| `paymentRequest` | Đề nghị thanh toán |
| `signedHardcopy` | Sao kê bản cứng - có chữ ký + dấu |
| `contractCopy` | Bản sao hợp đồng |
| `shippingProof` | Chứng từ giao nhận |

## List page

### Filters
- **Company Name** — substring (case-insensitive)
- **Tax ID** — substring (case-insensitive)

### Columns (5)
1. Company name (logo + companyName + optional brandName) — row header
2. Tax ID — monospace
3. TH ra sao kê — `statementDueRule`
4. TH ra hóa đơn — `invoiceDueRule`
5. Payment term — `paymentTermDays` (header tooltip)

### Row action
Click row → opens detail drawer.

### Pagination
8 items per page. Footer: `X-Y of Z items`.

## Detail drawer (size `lg`)

Read-only view of full `ConfigDetail`. Title "Chi tiết cấu hình đối soát". Footer:
- `Đóng`
- `Edit` — navigates to `/customers/[id]?tab=reconciliation`

## Edit view (under customer detail)

5 editable sections — each with its own modal:

1. **Chu kỳ đối soát** — `perMonth`, `startDay`, `endDay`
2. **Hồ sơ thanh toán & Hóa đơn** — `statementDueRule`, `invoiceDueRule`, `debtCutoffRule`, `paymentTermDays`, `issuanceMethod`, `templateFile`, `templateLinkUrl`, `requiredDocs`
3. **Đầu mối liên hệ** — table of `CustomerReconciliationContact` (role, fullName, phone, email, coverageArea); Add / Edit / Delete per row
4. **Kênh làm việc** — `channel.kind`, `bookingGroupUrl`, `reconciliationGroupUrl`
5. **Ghi chú** — note

Each modal shows current values with `Value` component (bold if set, "—" if missing).

## Business rules

### Cycle definition
- `perMonth` — `"1"` (monthly), `"2"` (biweekly), or custom count
- `startDay` / `endDay` — relative dates (e.g. "26 tháng trước" → "25 tháng này")
- Used to segment work periods into reconciliation runs

### Due deadlines
- Both `statementDueRule` and `invoiceDueRule` can be relative (e.g. "Ngày 28 tháng M+1")
- `debtCutoffRule` defines when transactions lock into a cycle ("Theo ngày phát sinh ca")

### Payment term
`paymentTermDays` is numeric days from invoice date. Common: 15 / 30 / 45.

### Contact roles
- `Đối soát` — reconciliation coordinator
- `Thanh toán` — payment processor
- `Giám sát` — oversight / approver

Multiple contacts per role allowed (redundancy / coverage areas).

### Communication channel
- Primary observed: Zalo
- Two URLs supported: `bookingGroupUrl` (job orders) and `reconciliationGroupUrl` (statements / invoices)

### Required docs
Examples per customer: "Bảng đối soát", "Hóa đơn GTGT", "Biên bản xác nhận khối lượng".

## Cross-references

- **Customers** — config belongs to a customer; full record in [customers.md](./customers.md).
- **Reconciliations (runs)** — consume this config for cycle window, payment term, contact list, required-doc checklist. See [reconciliations.md](./reconciliations.md).
- **Timesheets** — `debtCutoffRule` decides which timesheets fall in which cycle. See [timesheets.md](./timesheets.md).
