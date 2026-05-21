# Staffing SaaS — Feature Catalog

Reference doc for backend handoff. UI is source of truth; this captures entity shapes, status flows, screens, and business rules inferred from the React code.

## How to read this

Each domain doc has the same shape:

- **Routes** — URL surface, dynamic params, query params
- **Entity shape** — TypeScript interfaces + status enums verbatim (Vietnamese kept as-is)
- **List page** — filters, columns, actions
- **Detail page** — tabs/sections, sub-views, query-param sub-routes
- **Modals / drawers** — triggers, fields
- **Business rules** — status transitions, computed values, side effects, cross-domain coupling
- **Cross-references** — which domains link in/out

Vietnamese labels are kept verbatim — they are the canonical product labels.

## Domains

### Customer-facing
- [Customers](./customers.md) — pipeline (Lead → Onboarding → Hiring → Paused), 8-tab detail with positions, locations, pricing configs, shifts, reconciliation config, documents, users
- [Customer Reconciliations](./customer-reconciliations.md) — read-only list of per-customer reconciliation configs (cycle, invoice profile, contacts, channels). Editing lives in the customer detail page.

### Recruitment
- [Hiring Requests](./hiring-requests.md) — staffing requests from customers, multi-step wizard (basic → schedule → pay → posting), candidate funnel, job posts
- [Candidates](./candidates.md) — applicant pipeline (new → contact → onboarding → hired/rejected/ghosted/blacklist), table + kanban views, conversion to Worker

### Workforce (Cộng tác viên — CTV)
- [Workers](./workers.md) — CTV roster, profile with verification/violations/payment snapshots
- [Worker Verifications](./worker-verifications.md) — document review (CCCD, MST, bank), risk flags, approval lifecycle
- [Worker Violations](./worker-violations.md) — case log, severity, penalty, status escalation
- [Worker Social Insurance (BHXH)](./worker-social-insurance.md) — monthly hours/income tracking for social insurance declaration
- [Worker SWAT](./worker-swat.md) — elite/priority worker tier, contract lifecycle, trial invitations

### Operations
- [Shifts](./shifts.md) — calendar + table views, week/day/customer modes, attendance, operator assignment
- [Timesheets](./timesheets.md) — per-shift attendance records, exceptions, finalize flow
- [Reconciliations](./reconciliations.md) — actual reconciliation runs (period close, invoicing, payment matching)
- [Bonuses](./bonuses.md) — bonus programs (fixed, per-shift, per-hour, tiered), eligibility + payout
- [Worker Payment Batches](./worker-payment-batches.md) — bi-weekly/monthly payment cycles, line items, adjustments, payout via bank/ewallet/cash

### Admin
- [Users](./users.md) — internal staff accounts, multi-role assignment
- [Roles](./roles.md) — RBAC permission grid, system + custom roles
- [Dashboard & Shell](./shell.md) — auth, app shell, navigation, dashboard, shared utilities

## Stack at a glance

- **Framework:** Next.js 16 App Router, React 19, RSC + client islands
- **UI:** `@mvp-ui/ui` (Untitled UI–derived design system) with `react-aria-components` (Tabs, Table, ComboBox, Drawer, Modal)
- **Locale:** Vietnamese (vi-VN). Currency = VND, formatted via `Intl.NumberFormat("vi-VN")`. Dates = `DD/MM/YYYY`.
- **State:** URL-driven for tabs/sub-routes; React local state for filters; `localStorage` for view preferences (shifts)
- **Data:** Mock data lives next to components in `*-data.ts` files. No API layer yet — backend implementation is pending.

## Cross-cutting conventions

- **Detail-page tabs** use `?tab=<id>` query param. Sub-views (e.g. shift edit) use additional query params (`?tab=shifts&shift=<id>`) — switching the outer tab clears the inner sub-route params.
- **Breadcrumbs** are set per-page via `SetPageBreadcrumb` (see [shell.md](./shell.md)). Detail pages must always set the entity name, not "Chi tiết".
- **Empty states** use a consistent copy pattern: `"{count} {entity} phù hợp với bộ lọc"`.
- **Avatars / logos:** `_shared/assets.ts` provides `getAvatarFor(name, seedId)` and `getCustomerLogo(id)`. Logos are deterministic per ID.
- **Status badges:** every status enum has a label map `{ label, color }` where color is one of the design-system tones (`success | warning | error | brand | gray`).

## Inferred entity graph

```
Customer
├── Position (per-customer job templates)
├── Location (per-customer sites)
├── PricingConfig (rate cards per province + service class)
├── Shift (template tied to position + location + pricing)
│   └── HiringRequest (job order using a shift, multiple per shift)
│       ├── JobPost (public-facing post, multiple per HR)
│       └── HiringCandidate (applicant funnel)
├── ReconciliationConfig (cycle + invoice + contacts + channel)
└── Reconciliation Run (per-period statement + invoice + payment)
    └── ReconciliationLineItem (sourced from Timesheets)

Worker (CTV)
├── Verification (docs + risk flags + bank account)
├── Violation (cases + penalty + status escalation)
├── SWAT membership (contract + trial)
├── SocialInsurance record (monthly hours/income)
├── ShiftAssignment (worker × shift × date)
├── AttendanceRecord (worker × shift instance, check-in/out, payout)
└── PaymentBatchLineItem (per-cycle gross/net amount)

PaymentBatch
├── LineItem (per worker)
├── Adjustment (debt / offset / adhoc, requires confirmation)
└── Config (period, allowlist, carry-over)

BonusProgram → BonusAppliedWorker → feeds into PaymentBatch

User (staff)
└── Role (1..N) → Permission (resource × action)
```
