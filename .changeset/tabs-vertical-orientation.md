---
"@mvp-ui/ui": minor
---

Add `orientation="vertical"` to `Tabs` (default remains `"horizontal"`). Vertical layout puts the tab list to the left of the panel and wires arrow-key navigation through react-aria.

- `variant="underline"` + `orientation="vertical"` → left-line indicator on the active tab (Untitled UI "Line" pattern).
- `variant="pill"` + `orientation="vertical"` → brand-tinted active row (Untitled UI "Button primary" pattern).
- Trailing `value` badges align to the row end (`ml-auto`) in vertical layouts.

```tsx
<Tabs defaultSelectedKey="details" orientation="vertical" variant="pill">
  <TabList>
    <Tab id="details">My details</Tab>
    <Tab id="notifications" value={2}>Notifications</Tab>
  </TabList>
  <TabPanel id="details">…</TabPanel>
  <TabPanel id="notifications">…</TabPanel>
</Tabs>
```
