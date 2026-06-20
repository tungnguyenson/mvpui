import { Breadcrumbs } from "@mvp-ui/ui";

const ITEMS = [
  { label: "Home", href: "/home" },
  { label: "Settings", href: "/settings" },
  { label: "..." },
  { label: "Team" },
];

const PROJECT_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Website redesign" },
];

export const Default = () => <Breadcrumbs items={ITEMS} />;

export const SlashDivider = () => <Breadcrumbs items={ITEMS} divider="slash" />;

export const TextWithLine = () => (
  <div className="flex w-full flex-col gap-4">
    <Breadcrumbs items={ITEMS} variant="text-with-line" />
    <Breadcrumbs items={ITEMS} variant="text-with-line" divider="slash" />
  </div>
);

export const Button = () => (
  <div className="flex flex-col gap-4">
    <Breadcrumbs items={ITEMS} variant="button" />
    <Breadcrumbs items={ITEMS} variant="button" divider="slash" />
  </div>
);

export const WithoutHomeIcon = () => (
  <Breadcrumbs items={PROJECT_ITEMS} showHomeIcon={false} />
);
