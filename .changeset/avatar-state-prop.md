---
"@mvp-ui/ui": minor
---

Avatar/AvatarProfilePhoto/AvatarLabelGroup: replace `verified` boolean with `state?: "verified" | "blocked" | null` prop. `null` = no badge. Adds `BlockedXIcon` (solid red circle + white X) and exported `AvatarState` type. Decoration priority: `status` > `state` > `count` > `badge`.

Breaking: callers using `verified` must migrate to `state="verified"`.
