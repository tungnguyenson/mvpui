# @mvp-ui/tokens

Design tokens for the MVP UI design system — CSS custom properties + TypeScript constants.

## Importing

### CSS (Tailwind v4 — recommended)

In your app's `globals.css`:

```css
@import "tailwindcss";
@import "@mvp-ui/tokens/theme.css";
```

This gives you:
- All raw CSS vars (`var(--brand-600)`, `var(--radius-md)`, etc.)
- Tailwind utilities (`bg-primary`, `text-fg`, `rounded-md`, etc.)

### CSS (raw tokens only, no Tailwind)

```css
@import "@mvp-ui/tokens/tokens.css";
```

### TypeScript (rare — for canvas/chart inline values)

```ts
import { tokens } from "@mvp-ui/tokens/tokens";

const primary = tokens.color.brand["600"]; // "#7f56d9"
```

## Token categories

| Category | CSS prefix | Tailwind utilities |
|---|---|---|
| Brand | `--brand-*` | `bg-brand-*`, `text-brand-*` |
| Gray | `--gray-*` | `bg-gray-*`, `text-gray-*` |
| Success / Warning / Error | `--success-*` etc. | `bg-success-*` etc. |
| Semantic colors | `--color-*` | `bg-primary`, `text-fg`, `border-border` |
| Radius | `--radius-*` | `rounded-sm`, `rounded-md`, `rounded-xl` |
| Shadow | `--shadow-*` | `shadow-xs`, `shadow-md` |
| Spacing | `--spacing-*` | `p-xs`, `gap-lg` |
| Typography | `--font-*`, `--text-*` | `font-sans`, `text-sm` |

## Customizing

Override token values **after** the import in your globals.css:

```css
@import "tailwindcss";
@import "@mvp-ui/tokens/theme.css";

:root {
  --brand-600: #your-brand-color;
}
```

Do not edit this package directly — override in consumer project.
