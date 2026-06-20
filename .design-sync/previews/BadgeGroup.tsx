import { BadgeGroup } from "@mvp-ui/ui";

const COLORS = ["gray", "brand", "error", "warning", "success"] as const;
const COPY: Record<(typeof COLORS)[number], { addon: string; text: string }> = {
  gray: { addon: "New feature", text: "We've just released a new feature" },
  brand: { addon: "New feature", text: "We've just released a new feature" },
  error: { addon: "Error", text: "There was a problem with that action" },
  warning: { addon: "Warning", text: "Just to let you know this might be a problem" },
  success: { addon: "Success", text: "You've updated your profile and details" },
};

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
    {children}
  </div>
);

export const PillLeading = () => (
  <Stack>
    {COLORS.map((color) => (
      <BadgeGroup key={color} addonText={COPY[color].addon} color={color} theme="light" align="leading" size="md">
        {COPY[color].text}
      </BadgeGroup>
    ))}
  </Stack>
);

export const PillTrailing = () => (
  <Stack>
    {COLORS.map((color) => (
      <BadgeGroup key={color} addonText={COPY[color].addon} color={color} theme="light" align="trailing" size="lg">
        {COPY[color].text}
      </BadgeGroup>
    ))}
  </Stack>
);

export const ModernLeading = () => (
  <Stack>
    {COLORS.map((color) => (
      <BadgeGroup key={color} addonText={COPY[color].addon} color={color} theme="modern" align="leading" size="md">
        {COPY[color].text}
      </BadgeGroup>
    ))}
  </Stack>
);

export const ModernTrailing = () => (
  <Stack>
    {COLORS.map((color) => (
      <BadgeGroup key={color} addonText={COPY[color].addon} color={color} theme="modern" align="trailing" size="lg">
        {COPY[color].text}
      </BadgeGroup>
    ))}
  </Stack>
);
