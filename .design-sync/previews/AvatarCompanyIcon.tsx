import { Avatar, AvatarCompanyIcon } from "@mvp-ui/ui";

// AvatarCompanyIcon is absolutely positioned at the bottom-right of an Avatar —
// it is only meaningful composed inside its parent via the `badge` slot.
const IMG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#7f56d9"/>
      <circle cx="60" cy="46" r="24" fill="#ffffff" opacity="0.95"/>
      <path d="M18 116c0-25 19-40 42-40s42 15 42 40z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  );
const COMPANY =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <rect width="48" height="48" rx="8" fill="#444ce7"/>
      <path d="M24 12l10 6v12l-10 6-10-6V18z" fill="#ffffff"/>
    </svg>`,
  );

const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

export const OnAvatar = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    {SIZES.map((sz) => (
      <Avatar
        key={sz}
        size={sz}
        src={IMG}
        alt="Olivia Rhye"
        badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />}
      />
    ))}
  </div>
);

export const OnInitials = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    {SIZES.map((sz) => (
      <Avatar
        key={sz}
        size={sz}
        initials="OR"
        alt="Olivia Rhye"
        badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size={sz} />}
      />
    ))}
  </div>
);
