# MVP UI

Shared design system for personal SaaS projects — tokens, React components, and AI skill files.

## What's in the box

| Package | Description |
|---|---|
| `@mvp-ui/tokens` | Design tokens as CSS custom properties. Dark-safe semantic aliases. |
| `@mvp-ui/ui` | 55+ React components. React Aria for accessible interactive components. |
| `packages/skill/` | AI agent context files (system, tokens, components, patterns, responsive). |

## Quickstart

### 1. Install

Add both packages as git dependencies (no npm publish yet):

```bash
pnpm add github:tungmvp/mvp-ui#main --filter @your-app/web
```

Or as a git submodule + workspace dep:

```json
{
  "dependencies": {
    "@mvp-ui/ui": "workspace:*",
    "@mvp-ui/tokens": "workspace:*"
  }
}
```

### 2. Configure Tailwind v4

In your CSS entrypoint:

```css
@import "@mvp-ui/tokens/dist/index.css";
@import "tailwindcss";
```

### 3. Configure dark mode

Set `data-theme="dark"` on `<html>` to activate dark theme:

```tsx
<html data-theme={isDark ? "dark" : undefined}>
```

### 4. Import components

```tsx
import { Button, Input, Label, Toggle, Modal, ModalOverlay, Dialog } from "@mvp-ui/ui";
```

## Peer dependencies

```json
{
  "react": "^19",
  "react-dom": "^19",
  "tailwindcss": "^4"
}
```

## Component categories

- **Buttons**: Button, ButtonUtility, CloseButton, SocialButton, AppStoreButtons, ButtonGroup
- **Inputs**: Input, Label, HintText, InputGroup, InputDate, InputFile, InputNumber, InputTags, PinInput
- **Form Controls**: Checkbox, Radio, Toggle, Textarea
- **Components**: Alert, Avatar, Badge, BadgeGroup, Card, Carousel, DatePicker, DateRangePicker, Drawer, Dropdown, EmptyState, FeaturedIcon, FileUploadTrigger, LoadingIndicator, Modal, Pagination, Progress, Section, Select, Slider, Tabs, Tag, Tooltip
- **Forms**: Form, HookForm, FormField (react-hook-form wrapper)
- **Navigation**: AppNav
- **Shared Assets**: SectionDivider, IPhoneMockup, BackgroundPattern, Illustration, CreditCard, QRCode

See [`packages/skill/components.md`](packages/skill/components.md) for the full component index with import paths and usage notes.

## Architecture notes

- **RSC-safe**: tsup config stamps `"use client"` on every output file
- **Dark-safe**: semantic token aliases flip under `[data-theme="dark"]` — raw scale tokens are linted out
- **One component per file**: named exports only; compound components via namespace (e.g. `Carousel.Root`)
- **React Aria**: all interactive components use react-aria-components for accessibility

See [`packages/skill/system.md`](packages/skill/system.md) for full architecture reference.

## Development

```bash
pnpm install
pnpm --filter @mvp-ui/ui build     # build component library
pnpm --filter docs dev             # start docs workbench at localhost:3000
pnpm tsc -b                        # type check all packages
pnpm lint                          # Biome lint + dark-safe check
```

## License

MIT © 2026 TungMVP
