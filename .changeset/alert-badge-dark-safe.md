---
"@mvp-ui/ui": patch
---

Make Alert and Badge dark-theme safe.

Every variant used fixed `{status}-50` bg / `-200` border / `-700` text
tints that did not flip — pale, washed-out on dark surfaces. Alert
(info/success/warning/error) and Badge (default/secondary/success/warning/
error) now use the flipping `--color-{status}-{bg,border,fg}` /
`--color-neutral-{bg,border}` tokens, so each variant inverts correctly
under `[data-theme="dark"]`. No API change.
