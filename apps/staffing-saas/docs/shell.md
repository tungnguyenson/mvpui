# Dashboard, Shell & Auth

Cross-cutting infrastructure: auth middleware, app shell, navigation, dashboard, shared utilities.

## Auth

### Middleware (`middleware.ts`)
- Session cookie: `session` (string "true"). HttpOnly, SameSite=Lax.
- Auth-protected: everything except `/login`.
- Unauthenticated user → `/login?callbackUrl=<orig>`.
- Authenticated user hitting `/login` → redirect to `/`.
- Matcher: all paths except `api/*`, `_next/*`, `favicon.ico`.

### Login (`app/login/page.tsx` + `actions.ts`)
- Fields: email (required, email-validated), password (required, min 5).
- Checkbox: `Remember me for 30 days` — if checked, cookie maxAge = 30 days; else session-only.
- Forgot password link (placeholder, no flow).
- Contact-admin link (no sign-up flow).
- Demo credentials: `ADMIN_USER` / `ADMIN_PASSWORD` env vars (defaults `admin@example.com` / `admin`).

Backend implementation will replace this with a real auth provider (no signup UI here; admin invites only — see [users.md](./users.md)).

### Logout
`logoutAction()` deletes session cookie. Triggered from header user menu.

## App shell

`AppShell.tsx` provides:

- **Desktop:** collapsible left sidebar + top header + main scroll area. Sidebar collapse state persisted to `localStorage` key `staffing-saas:sidebar-collapsed`.
- **Mobile:** top bar with brand + hamburger → full-screen drawer nav.

### Navigation (`nav.ts`)
6 sections (label / item count):

| Section | Items |
|---|---|
| _(top)_ | Dashboard |
| _(unlabeled)_ | Khách hàng, Cấu hình đối soát |
| Tuyển dụng | Y/c tuyển dụng, Ứng viên |
| Cộng tác viên | Danh sách CTV, Quản lý xác thực, Quản lý vi phạm, Quản lý BHXH, Quản lý SWAT |
| Làm việc | Lịch làm việc, Chấm công, Đối soát, Thưởng, Thanh toán CTV |
| Cấu hình | User, Vai trò |

`APP_ROUTES` constant maps each ID to its href. Lucide icons per item.

### Header (`Header.tsx`)
- **Breadcrumbs** — auto-derived from URL via `breadcrumbsForPath()`, can be overridden per-page with `<SetPageBreadcrumb>` (see `BreadcrumbContext.tsx`). Detail pages must always set the entity name, not the default "Chi tiết".
- **Search** — global command palette (⌘K). Items grouped by nav section.
- **Theme picker** — light / dark / mixed (see below).
- **Notifications** — placeholder Bell icon, no implementation.
- **User menu** — logout action.

### Theme system (`ThemeContext.tsx`)
- Storage key: `staffing-saas:appearance`.
- 3 modes: `light`, `dark`, `mixed` (light content + dark nav).
- Two data attributes on root: `data-theme` (content) + `data-nav-theme` (sidebar).
- Pre-hydration inline script in root layout sets attributes before React mounts (no FOUC).
- Cross-tab sync via custom event `staffing-saas:appearance-change`.

### PageScaffold (`_shell/PageScaffold.tsx`)
Standard page wrapper. Props: `header` (top section, `bg-bg`, `shadow-xs`) and `children` (`bg-bg-secondary`, `flex-col gap-8`). Every list and detail page uses it.

## Dashboard (`/`)

Lives at `(workspace)/page.tsx` → `Dashboard.tsx`.

### Metric cards (4)
1. Số CTV cần tuyển — 1,420 (+18% ↑)
2. Fill rate — 96% (+2% ↑)
3. CTV đang hoạt động — 342 (+8% ↑)
4. CTV không hài lòng — 12 (+5% ↓)

Each has a 12-point sparkline. Variant `framed`, style `text`.

### Module quick-action tiles (4)
- Khách hàng → `/customers`
- Danh sách CTV → `/workers`
- Quản lý xác thực → `/worker-verifications`
- Thanh toán CTV → `/worker-payment-batches`

### Hiring requests panel (left)
Top 3 open hiring requests with role, customer, city, deadline, fill progress bar.

### Verification queue panel (right top)
3 workers needing verification action.

### Payment batches panel (right bottom)
2 recent batches: ID, period, worker count, total amount, status.

### Worker performance table (full width, bottom)
5 active workers (paginated, page size 5). Columns: Worker (avatar+name+phone), Area, Status, Shifts (progress), Rating.

### Header action
`Export data` button (no handler).

## Catch-all route (`(workspace)/[...slug]/page.tsx`)

Catches any undefined nested route. Renders `EmptyState` with title derived via `labelForPath()`:

- known section + sub-route → "Chi tiết {section label}"
- otherwise → "Trang"

Placeholder for in-progress features so the navigation never 404s.

## Shared utilities (`_shared/`)

### `EmptyState.tsx`
Inbox icon, title, description ("chưa có nội dung, đang xây dựng"), placeholder Create button.

### `WorkerAvatar.tsx`
Props: `name`, `id`, `status`, `size`. Status → avatar overlay state:
- `active` / `verified` → `verified` (green badge)
- `locked` / `suspended` / `rejected` → `blocked` (red badge)
- else none

Gender inference from Vietnamese name parts (middle markers like "thị", "văn"; final markers like "trang", "tuấn"). Avatar selected by `hash(id || name)` from pool (10 male + 20 female).

Initials: first char of last two words.

### `_shared/assets.ts`
- `getAvatarFor(name, seedId)` — deterministic avatar URL
- `getCustomerLogo(id)` — returns `{ logo, mark }` from hardcoded 26-customer map (Viec.co CDN URLs)
- Logomark fallback: 15 sample SVGs in `/logos/logomark/`, hash-selected

## Inferred business rules

- **Single admin account in demo.** No multi-tenant scoping in middleware. Backend will need org-level scoping (see [roles.md](./roles.md) for the RBAC model UI already supports).
- **No per-route permission gating in middleware.** All authenticated users see all routes. Backend should enforce server-side; UI permission helpers (`can()`, `effectivePermissions()`) exist in `permissions-data.ts` but are not wired into routing yet.
- **Default landing after login:** `/` (Dashboard).
- **Sidebar collapse and theme** persist per browser via localStorage. Not synced server-side.

## File references

- Auth: [app/login/page.tsx](../app/login/page.tsx), [app/login/actions.ts](../app/login/actions.ts), [middleware.ts](../middleware.ts)
- Root layout: [app/layout.tsx](../app/layout.tsx)
- Shell: [app/components/_shell/AppShell.tsx](../app/components/_shell/AppShell.tsx), [Header.tsx](../app/components/_shell/Header.tsx), [nav.ts](../app/components/_shell/nav.ts), [PageScaffold.tsx](../app/components/_shell/PageScaffold.tsx), [ThemeContext.tsx](../app/components/_shell/ThemeContext.tsx), [BreadcrumbContext.tsx](../app/components/_shell/BreadcrumbContext.tsx)
- Dashboard: [app/components/dashboard/Dashboard.tsx](../app/components/dashboard/Dashboard.tsx)
- Shared: [app/components/_shared/EmptyState.tsx](../app/components/_shared/EmptyState.tsx), [WorkerAvatar.tsx](../app/components/_shared/WorkerAvatar.tsx), [assets.ts](../app/components/_shared/assets.ts)
