# Universal Search — Header Search Bar & Command Menu

Global search surface for the staffing-saas app. Two entry points share one data set and one matcher: the header search input (visual trigger) and the Command Menu modal (`⌘K` / `Ctrl+K`).

Owned by app shell. Source files:

- [`apps/staffing-saas/app/components/_shell/Header.tsx`](../../apps/staffing-saas/app/components/_shell/Header.tsx) — wires trigger + keyboard shortcut + `CommandMenu`.
- [`apps/staffing-saas/app/components/_shell/search/buildSearchItems.ts`](../../apps/staffing-saas/app/components/_shell/search/buildSearchItems.ts) — assembles searchable items from each domain fixture.
- [`packages/ui/src/components/command-menu.tsx`](../../packages/ui/src/components/command-menu.tsx) — `CommandMenu` + diacritic-insensitive matching.

## Surfaces

| Surface | Behavior |
|---|---|
| **Header search bar** | Read-only visual trigger. Click or focus → opens the Command Menu modal. Same code path as `⌘K`. No inline results — avoids two parallel result UIs. |
| **Command Menu (`⌘K`)** | Modal overlay. Live filtering as user types. Grouped result list. Enter or click navigates to the result's detail route. |

## Searchable data

All entries are built once at module load from the in-repo fixtures (no async fetch). Demo-scale only.

| Group label (vi) | Source array | Module |
|---|---|---|
| `Điều hướng` | `NAV_SECTIONS` | [`nav.ts`](../../apps/staffing-saas/app/components/_shell/nav.ts) |
| `Khách hàng` | `CUSTOMERS` | [`customers-data.ts`](../../apps/staffing-saas/app/components/customers/customers-data.ts) |
| `Y/c tuyển dụng` | `HIRING_REQUESTS` | [`hiring-requests-data.ts`](../../apps/staffing-saas/app/components/hiring-requests/hiring-requests-data.ts) |
| `Ca làm việc` | `SHIFTS` | [`shifts-data.ts`](../../apps/staffing-saas/app/components/shifts/shifts-data.ts) |
| `Cộng tác viên` | `WORKERS` | [`workers-data.ts`](../../apps/staffing-saas/app/components/workers/workers-data.ts) |

## Fields & routes

Each row below describes one entity type: the visible label, the dim secondary line, the hidden keywords that participate in matching, and the destination route opened on select.

### Khách hàng (Customer)

| Slot | Value |
|---|---|
| `label` | `customer.name` |
| `keywords` | `name` |
| `icon` | `Building2` (lucide) |
| `route` | `/customers/{id}` |

### Y/c tuyển dụng (Hiring Request)

| Slot | Value |
|---|---|
| `label` | `{code} — {title}` (e.g. `HR-2401 — CTV bán hàng cuối tuần`) |
| `description` | `customer · area` |
| `keywords` | `id`, `code`, `title`, `customer`, `area` |
| `icon` | `UserPlus` |
| `route` | `/hiring-requests/{id}` |

### Ca làm việc (Shift)

| Slot | Value |
|---|---|
| `label` | `{code} — {name}` (e.g. `SH-0312-A — Bảo vệ ca đêm`) |
| `description` | `customer · schedule` |
| `keywords` | `id`, `code`, `name`, `customer`, `site`, `region` |
| `icon` | `Calendar` |
| `route` | `/shifts/{id}` |

### Cộng tác viên (Worker)

| Slot | Value |
|---|---|
| `label` | `worker.name` |
| `description` | `worker.phone · worker.city` |
| `keywords` | `id`, `name`, `phone`, `...tags` |
| `icon` | `HardHat` |
| `route` | `/workers/{id}` |

### Điều hướng (Navigation)

| Slot | Value |
|---|---|
| `label` | nav item label (e.g. `Khách hàng`) |
| `description` | section label, when present (e.g. `Cộng tác viên`) |
| `route` | nav item `href` |

## Matching rules

All implemented in `CommandMenu` via React Aria `defaultFilter`.

- **Substring match**, case-insensitive.
- **Diacritic-insensitive (Vietnamese-aware).** Both the haystack and the query are normalized before comparing:
  - Unicode NFD decompose + strip `\p{Diacritic}` → `Bích` → `bich`, `Đà Nẵng` → `Da Nang`.
  - Explicit `đ → d`, `Đ → D` (these letters aren't decomposed by NFD).
  - Then lowercased.
- **All three of `label`, `description`, `keywords` participate.** Each `CommandMenuItem` joins them into a single `textValue` that React Aria filters against. Keywords are matched but never rendered — useful for IDs, phone numbers, codes that shouldn't clutter the visible row.
- **No debounce.** Matching is synchronous and runs in <30ms per keystroke at the current index size (~70 items).
- **Normalize cache.** `normalizeForSearch` is memoized in a process-wide `Map`. NFD decompose is the dominant per-keystroke cost; caching keeps repeated calls free.
- **Shift dedupe.** `SHIFTS` is generated as ~1k daily instances of repeating templates. The search index keeps only one item per `(customerId, name)` to avoid bloating the listbox — operators jump from there to the full shifts page.

### Query examples

| Query | Matches |
|---|---|
| `bich` | Worker named `Bích...` |
| `0902` | Worker phones containing `0902` |
| `HR-2401` | Specific hiring request by code |
| `da nang` | Items mentioning `Đà Nẵng` (diacritic-insensitive) |
| `acme` | Customer name + any HR/shift whose `customer` field is Acme |

## Empty state

When no item matches, the body renders `Không tìm thấy kết quả.` (passed in as `emptyMessage` prop in `Header.tsx`).

The current design intentionally **does not** include "recent items" or "quick actions" suggestions on empty query — kept out of scope for the MVP demo.

## How to add a new searchable entity

1. Open [`buildSearchItems.ts`](../../apps/staffing-saas/app/components/_shell/search/buildSearchItems.ts).
2. Add a new `xxxItems(): CommandItem[]` function that maps the entity's array to `CommandItem`s. Set `id` to the destination href, pick a lucide `icon`, and fill `label` / `description` / `keywords`.
3. Add the group label to the local `GROUP` constant.
4. Append the new function's output inside `buildSearchItems()`.

No changes to `CommandMenu` are required — diacritic normalization and keyword matching are baked into the component.

## Known limitations

- **Static data.** The set is built once at module load. New entities created at runtime (e.g. after an optimistic create) are not in the search index until reload.
- **No ranking.** Items are not scored — they appear in the order produced by `buildSearchItems()` (nav first, then customers, HRs, shifts, workers).
- **Linear scan.** Acceptable at demo scale (low-thousands of rows). At higher scale, replace `defaultFilter` with a prebuilt index (e.g. trigram or `MiniSearch`).
