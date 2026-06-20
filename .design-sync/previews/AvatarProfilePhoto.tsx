import { AvatarProfilePhoto } from "@mvp-ui/ui";

const IMG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" fill="#7f56d9"/>
      <circle cx="80" cy="62" r="32" fill="#ffffff" opacity="0.95"/>
      <path d="M24 156c0-33 25-52 56-52s56 19 56 52z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  );

const SIZES = ["sm", "md", "lg"] as const;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>{children}</div>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>{children}</div>
);

export const Sizes = () => (
  <Row>
    {SIZES.map((sz) => (
      <AvatarProfilePhoto key={sz} state="verified" size={sz} src={IMG} alt="Olivia Rhye" />
    ))}
  </Row>
);

export const Variants = () => (
  <Stack>
    <Row>
      {SIZES.map((sz) => (
        <AvatarProfilePhoto key={sz} state="verified" size={sz} src={IMG} alt="Olivia Rhye" />
      ))}
    </Row>
    <Row>
      {SIZES.map((sz) => (
        <AvatarProfilePhoto key={sz} state="verified" size={sz} initials="OR" alt="Olivia Rhye" />
      ))}
    </Row>
    <Row>
      {SIZES.map((sz) => (
        <AvatarProfilePhoto key={sz} state="blocked" size={sz} alt="Olivia Rhye" />
      ))}
    </Row>
  </Stack>
);
