---
"@mvp-ui/ui": minor
---

Add `PageHeader` and `FAB` components to `@mvp-ui/ui`.

## `PageHeader`

Standard page-top block consolidating the breadcrumb + title + description +
actions pattern previously hand-rolled across every list and detail page.

```tsx
import { PageHeader } from "@mvp-ui/ui";
import { Plus } from "lucide-react";

// Single primary CTA — inline button on desktop, FAB on mobile
<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests từ khách hàng."
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Hiring requests" },
  ]}
  primaryAction={{
    label: "Tạo Y/c tuyển dụng mới",
    icon: Plus,
    href: "/hiring-requests/new",
  }}
/>

// Multi-button row — always inline, never a FAB
<PageHeader
  title="Vai trò ABC"
  actions={
    <>
      <Button color="secondary">Quay lại</Button>
      <Button color="primary">Lưu thay đổi</Button>
    </>
  }
/>
```

Mobile behavior:
- `title`, `description`, `breadcrumbs`, and `children` are `hidden md:flex` so
  the app-shell sticky top bar (which already shows the page title) is the
  single source of contextual chrome on small screens.
- `primaryAction` portals to a fixed bottom-right `<FAB>` on mobile so the
  primary CTA stays reachable when the title collapses.
- `actions` slot is always rendered inline at every breakpoint — multi-button
  rows stay visible on mobile (FAB is reserved for the single-button case).
- Pass `linkAs={NextLink}` to route `primaryAction.href` through a framework
  router with prefetch instead of a plain `<a>`.

`children` slot replaces the title/description column for detail pages whose
header needs a leading icon, inline status badges, or tag chips.

`variant="compact"` reduces vertical rhythm and drops the title to `text-lg`
for dense detail pages.

The breadcrumb trail renders with `showHomeIcon={false}` — pages live inside an
app shell that already provides home navigation, so the home glyph would be
redundant.

## `FAB`

Circular floating action button — `size-14`, `shadow-lg`, pinned to the
viewport bottom-right with `env(safe-area-inset-bottom)` clearance for iOS
notches. Usable standalone but designed to back `PageHeader`'s `primaryAction`
slot.

```tsx
import { FAB } from "@mvp-ui/ui";
import { Plus } from "lucide-react";

<FAB
  label="Tạo Y/c tuyển dụng"
  icon={Plus}
  href="/hiring-requests/new"
/>;
```

Supports `color="primary"|"secondary"`, `position="fixed"|"static"`, and a
`linkAs` slot for framework Link components.
