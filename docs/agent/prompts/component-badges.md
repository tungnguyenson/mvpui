# Build Button component for MVP UI

## References (read in this order)

1. API & behavior: https://www.untitledui.com/react/components/badges
   - Read all sections including FAQ
   - Note exact prop names (color, size, isLoading, iconLeading, etc.)
   
2. Source code reference (MIT, for learning patterns):
   https://github.com/untitleduico/react/tree/main/components/base/badges
   - Read button.tsx to understand React Aria integration pattern
   - DO NOT copy verbatim — implement using our shadcn pattern instead
   
3. Visual specs: open Figma file: https://www.figma.com/design/B1Afhyf9OX9gITABEJ74h7/%E2%9D%96-Untitled-UI-Figma-%E2%80%93-PRO-VARIABLES--v8.0--KTWJ8mYFqVpN--Copy-?node-id=12-539&p=f&t=IBBRr0Kw7tFu3vyP-0
   - Use Figma MCP tools: get_design_context on the Button component
   - Extract design tokens for every state
   - Match our tokens.css names


## Implementation requirements

- File: packages/ui/src/components/badge.tsx
- Use cva for variants
- Use Radix Slot for asChild pattern (not href — we differ from Untitled here)
- Forward refs
- ALL 9 color variants × 4 sizes
- States: default, hover, active, focus-visible, disabled, loading
- Icon support: iconLeading, iconTrailing, icon-only mode
- Loading state with showTextWhileLoading toggle
- Color tokens MUST come from @mvp-ui/tokens — no hardcoded hex

## Documentation requirements

- File: apps/docs/app/components/badge/page.tsx
- Section per color variant
- Show all sizes per color
- Dedicated sections for: with icon leading, with icon trailing, icon-only, loading, disabled
- Verify each variant visually matches Untitled UI
