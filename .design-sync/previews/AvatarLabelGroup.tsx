import { AvatarLabelGroup, AvatarCompanyIcon } from "@mvp-ui/ui";

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

const SIZES = ["sm", "md", "lg"] as const;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
    {children}
  </div>
);

export const Sizes = () => (
  <Stack>
    {SIZES.map((sz) => (
      <AvatarLabelGroup
        key={sz}
        size={sz}
        src={IMG}
        alt="Olivia Rhye"
        title="Olivia Rhye"
        subtitle="olivia@untitledui.com"
      />
    ))}
  </Stack>
);

export const Decorated = () => (
  <Stack>
    <AvatarLabelGroup size="md" src={IMG} alt="Olivia Rhye" title="Olivia Rhye" subtitle="olivia@untitledui.com" status="online" />
    <AvatarLabelGroup size="md" src={IMG} alt="Phoenix Baker" title="Phoenix Baker" subtitle="phoenix@untitledui.com" state="verified" />
    <AvatarLabelGroup size="md" src={IMG} alt="Lana Steiner" title="Lana Steiner" subtitle="lana@untitledui.com" badge={<AvatarCompanyIcon src={COMPANY} alt="Layers Inc." size="md" />} />
    <AvatarLabelGroup size="md" initials="DW" alt="Demi Wilkinson" title="Demi Wilkinson" subtitle="demi@untitledui.com" />
  </Stack>
);
