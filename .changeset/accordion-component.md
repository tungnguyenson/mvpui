---
"@mvp-ui/ui": minor
"@mvp-ui/tokens": minor
---

Add `Accordion` component to `@mvp-ui/ui`. Vertically stacked, expandable panels built on `@radix-ui/react-accordion`, styled with Untitled UI tokens. API mirrors shadcn/ui:

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@mvp-ui/ui";

<Accordion type="single" collapsible defaultValue="info">
  <AccordionItem value="info">
    <AccordionTrigger>Thông tin chung</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>;
```

`AccordionTrigger` accepts an optional `trailing` slot for badges/counts and a
`hideChevron` flag.

Tokens package adds `--animate-accordion-down` / `--animate-accordion-up`
keyframes driven by Radix's `--radix-accordion-content-height` CSS var.
