import { Avatar, AvatarCompanyIcon, AvatarCount } from "@mvp-ui/ui";

// Deterministic inline portrait (percent-encoded SVG data URI) — no network
// fetch, so image cells never collapse on a failed pravatar/untitledui load.
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

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>{children}</div>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
);

export const Sizes = () => (
  <Row>
    {SIZES.map((sz) => (
      <Avatar key={sz} size={sz} src={IMG} alt="Olivia Rhye" />
    ))}
  </Row>
);

export const Fallbacks = () => (
  <Stack>
    <Row>
      {SIZES.map((sz) => (
        <Avatar key={sz} size={sz} initials="OR" alt="Olivia Rhye" />
      ))}
    </Row>
    <Row>
      {SIZES.map((sz) => (
        <Avatar key={sz} size={sz} alt="Olivia Rhye" />
      ))}
    </Row>
  </Stack>
);

export const StatusAndState = () => (
  <Row>
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" status="online" />
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" status="offline" />
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" state="verified" />
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" state="blocked" />
  </Row>
);

export const Badges = () => (
  <Row>
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" badge={<AvatarCount count={5} />} />
    <Avatar size="lg" src={IMG} alt="Olivia Rhye" badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size="lg" />} />
    <Avatar size="lg" border src={IMG} alt="Olivia Rhye" status="online" />
    <Avatar size="lg" initials="OR" alt="Olivia Rhye" badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size="lg" />} />
  </Row>
);
