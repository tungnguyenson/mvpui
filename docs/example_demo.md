# Building Example Pages

Example pages live at `apps/docs/app/examples/<name>/` and demonstrate full app surfaces (settings, dashboards, auth flows, etc.) using MVP UI components.

---

## File structure

```
apps/docs/app/examples/<name>/
  _app.tsx        ← shared app component (exported, used by both routes)
  page.tsx        ← docs preview page (with header + preview tools)

apps/docs/app/standalone/<name>/
  page.tsx        ← fullscreen standalone route (no docs sidebar)
```

---

## 1. Build the app component (`_app.tsx`)

Extract all app logic into a named export `<Name>App`. No default export.

```tsx
"use client";

export function SettingsApp() {
  return <div className="flex h-screen overflow-hidden ...">...</div>;
}
```

Rules:
- Root element: `flex h-screen overflow-hidden` — constrains height, prevents page scroll
- Dark-safe tokens only: `bg-bg`, `text-fg`, `border-border`, `border-border-secondary`, etc.
- Never hardcode colors or spacing outside the token system

### Mobile responsive pattern

```tsx
{/* Desktop sidebar — hidden on mobile */}
<div className="hidden md:block shrink-0">
  <AppSidebar />
</div>

{/* Mobile top bar */}
<div className="flex shrink-0 items-center justify-between border-b border-border-secondary bg-bg px-4 py-3 md:hidden">
  {/* logo + hamburger button */}
</div>

{/* Mobile nav drawer */}
<Drawer side="left" size="sm" isOpen={navOpen} onOpenChange={setNavOpen} aria-label="Navigation menu" showCloseButton>
  <AppSidebar className="border-r-0 w-full" />
</Drawer>
```

---

## 2. Build the preview page (`page.tsx`)

Wraps `<Name>App` in a docs-style preview with a header and toolbar.

```tsx
"use client";

import { useState } from "react";
import { Maximize2, Moon, Sun } from "lucide-react";
import { ButtonUtility } from "@mvp-ui/ui";
import { SettingsApp } from "./_app";

export default function SettingsExamplePage() {
  const [dark, setDark] = useState(false);

  return (
    <div className="px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-fg tracking-tight">Settings pages</h1>
        <p className="mt-2 max-w-2xl text-base text-fg-secondary">...</p>
      </header>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-semibold text-fg">Settings page example</span>
        <div className="flex items-center gap-1">
          <ButtonUtility
            size="xs" color="tertiary"
            icon={dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark((d) => !d)}
          />
          <ButtonUtility
            size="xs" color="tertiary"
            icon={<Maximize2 className="size-4" />}
            aria-label="Open in new tab"
            onClick={() => window.open("/standalone/<name>", "_blank")}
          />
        </div>
      </div>

      <div
        data-theme={dark ? "dark" : undefined}
        className="overflow-hidden bg-bg rounded-2xl border border-border shadow-lg"
      >
        <SettingsApp />
      </div>
    </div>
  );
}
```

---

## 3. Build the standalone route (`standalone/<name>/page.tsx`)

```tsx
import { SettingsApp } from "../../examples/<name>/_app";

export default function StandaloneSettingsPage() {
  return (
    <div className="h-screen bg-bg">
      <SettingsApp />
    </div>
  );
}
```

Standalone routes render outside the docs layout (no sidebar). They use the root layout only.

---

## 4. Register in nav

Edit `apps/docs/app/nav.ts`. Add a single page or a collapsible group under `examples`:

```ts
// Single page
{ name: "Auth form", href: "/examples/auth-form" },

// Collapsible group (multiple variants)
{
  name: "Settings",
  items: [
    { name: "Settings 01", href: "/examples/settings-01" },
    { name: "Settings 02", href: "/examples/settings-02" },
  ],
},
```

The docs sidebar picks this up automatically — single entries render as links, groups render as collapsible items.

---

## Checklist

- [ ] `_app.tsx` exported as named function, no default export
- [ ] Root element uses `h-screen overflow-hidden` not `min-h-screen`
- [ ] Dark-safe tokens only (no raw `gray-*`, `bg-white`, `text-black`)
- [ ] Mobile top bar + Drawer navigation implemented
- [ ] Standalone route imports from `../../examples/<name>/_app`
- [ ] `window.open` URL matches standalone route
- [ ] Nav entry added to `nav.ts`
- [ ] Build passes: `pnpm --filter docs build`
