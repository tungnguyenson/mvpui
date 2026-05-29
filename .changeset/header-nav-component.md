---
"@mvp-ui/ui": minor
---

Add `HeaderNav` component to `@mvp-ui/ui`. Application top-bar navigation adapted from Untitled UI React. One prop-driven component (not a family of variants):

```tsx
import { HeaderNav } from "@mvp-ui/ui";

<HeaderNav
  activeHref="/projects/active"
  items={[
    { id: "dashboard", label: "Dashboard", href: "/dashboard" },
    {
      id: "projects",
      label: "Projects",
      href: "/projects",
      items: [
        { id: "active", label: "Active", href: "/projects/active" },
        { id: "archived", label: "Archived", href: "/projects/archived" },
      ],
    },
  ]}
  logo={<UntitledLogo className="h-8" />}
  actions={<DemoActions />}
/>;
```

- `centered` centers the nav between logo and actions.
- A secondary row auto-derives from the active item's `items` (or an explicit `subItems` prop); `secondaryType="buttons"` (default) or `"tabs"` (underline links).
- Active detection is prefix-match (`/projects` is active on `/projects/active`); `current` on an item overrides.
- `logo` and `actions` are consumer-owned slots; below the `lg` breakpoint the bar collapses to a hamburger that opens a `Drawer` with the nav list and an optional `mobileFooter` slot.

All surfaces use dark-safe semantic tokens.
