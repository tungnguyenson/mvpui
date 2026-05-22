"use client";

/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Button, PageHeader, type BreadcrumbItem } from "@mvp-ui/ui";
import { Plus, Upload, Filter } from "lucide-react";
import {
  ComponentDocLayout,
  type DocExample,
} from "../../../_components/docs/ComponentDocLayout";

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Hiring requests" },
];

const SECTIONS: DocExample[] = [
  {
    id: "default",
    title: "Default",
    description:
      "Title only. Hidden on mobile — app-shell sticky top bar shows the same title via breadcrumb context, so this header collapses to nothing on small screens.",
    preview: <PageHeader title="Yêu cầu Tuyển dụng" />,
    code: `<PageHeader title="Yêu cầu Tuyển dụng" />`,
  },
  {
    id: "with-description",
    title: "With description",
    description:
      "Title + supporting copy. Description is also desktop-only. Use for the primary purpose of the page in one sentence.",
    preview: (
      <PageHeader
        title="Yêu cầu Tuyển dụng"
        description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự theo từng tài khoản và khu vực."
      />
    ),
    code: `<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự theo từng tài khoản và khu vực."
/>`,
  },
  {
    id: "with-primary-action",
    title: "With primary action (FAB on mobile)",
    description:
      "The 80% case — a single primary CTA. On desktop it renders as an inline `<Button>` alongside the title. On mobile (`< md`), the title/description column collapses (the app-shell sticky bar already shows the title) and the same action becomes a fixed bottom-right `<FAB>` so users can still reach it. Resize the viewport to compare.",
    preview: (
      <PageHeader
        title="Yêu cầu Tuyển dụng"
        description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự."
        primaryAction={{
          label: "Tạo Y/c tuyển dụng mới",
          icon: Plus,
          href: "/hiring-requests/new",
        }}
      />
    ),
    code: `<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự."
  primaryAction={{
    label: "Tạo Y/c tuyển dụng mới",
    icon: Plus,
    href: "/hiring-requests/new",
  }}
/>`,
  },
  {
    id: "with-actions",
    title: "With actions slot (always inline)",
    description:
      "When the page has multiple buttons (back + save, filter + export + create) use the `actions` slot. This slot is always rendered inline at every viewport — it does NOT become a FAB on mobile, because FABs are designed for a single primary action.",
    preview: (
      <PageHeader
        title="Yêu cầu Tuyển dụng"
        description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự."
        actions={
          <>
            <Button color="secondary" size="sm">Hủy thay đổi</Button>
            <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
              Tạo Y/c tuyển dụng mới
            </Button>
          </>
        }
      />
    ),
    code: `<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự."
  actions={
    <>
      <Button color="secondary" size="sm">Hủy thay đổi</Button>
      <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
        Tạo Y/c tuyển dụng mới
      </Button>
    </>
  }
/>`,
  },
  {
    id: "with-breadcrumbs",
    title: "With breadcrumbs",
    description:
      "Breadcrumb trail renders above the title (desktop only). The home-icon variant is suppressed inside PageHeader because the app shell already owns global navigation.",
    preview: (
      <PageHeader
        title="Yêu cầu Tuyển dụng"
        description="Theo dõi các hiring requests từ khách hàng và mức độ lấp đầy nhu cầu nhân sự."
        breadcrumbs={BREADCRUMBS}
      />
    ),
    code: `<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests."
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Hiring requests" },
  ]}
/>`,
  },
  {
    id: "multiple-actions",
    title: "Multiple actions",
    description:
      "Multi-button action row. Wraps on narrow viewports so secondary actions stay reachable on mobile alongside the primary CTA.",
    preview: (
      <PageHeader
        title="Yêu cầu Tuyển dụng"
        description="Theo dõi các hiring requests từ khách hàng."
        breadcrumbs={BREADCRUMBS}
        actions={
          <>
            <Button color="secondary" size="sm" iconLeading={<Filter className="size-4" />}>
              Bộ lọc
            </Button>
            <Button color="secondary" size="sm" iconLeading={<Upload className="size-4" />}>
              Xuất
            </Button>
            <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
              Tạo Y/c mới
            </Button>
          </>
        }
      />
    ),
    code: `<PageHeader
  title="Yêu cầu Tuyển dụng"
  description="Theo dõi các hiring requests từ khách hàng."
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Hiring requests" },
  ]}
  actions={
    <>
      <Button color="secondary" size="sm" iconLeading={<Filter className="size-4" />}>Bộ lọc</Button>
      <Button color="secondary" size="sm" iconLeading={<Upload className="size-4" />}>Xuất</Button>
      <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>Tạo Y/c mới</Button>
    </>
  }
/>`,
  },
  {
    id: "compact",
    title: "Compact variant",
    description:
      "Tighter spacing and smaller title for dense detail pages where the header competes with content above the fold.",
    preview: (
      <PageHeader
        variant="compact"
        title="Chi tiết Y/c #HR-1042"
        description="Customer: Coopmart • Headcount 12/20 • Deadline 2026-06-15"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Hiring requests", href: "/hiring-requests" },
          { label: "HR-1042" },
        ]}
        actions={
          <Button color="primary" size="sm">
            Lưu thay đổi
          </Button>
        }
      />
    ),
    code: `<PageHeader
  variant="compact"
  title="Chi tiết Y/c #HR-1042"
  description="Customer: Coopmart • Headcount 12/20 • Deadline 2026-06-15"
  breadcrumbs={[...]}
  actions={<Button color="primary" size="sm">Lưu thay đổi</Button>}
/>`,
  },
];

export default function PageHeaderDocsPage() {
  return (
    <ComponentDocLayout
      name="PageHeader"
      tagline="Standard page header block — breadcrumbs, title, description, and action slot. Desktop-only for the text content; the actions row stays visible on mobile so primary CTAs remain reachable when the app-shell sticky bar collapses the title."
      install={{
        usage: `import { PageHeader } from "@mvp-ui/ui";`,
      }}
      sections={SECTIONS}
      tokenReference={[
        { label: "Title", value: "text-xl font-semibold text-fg" },
        { label: "Description", value: "text-base text-fg-tertiary" },
        { label: "Breadcrumbs", value: "Breadcrumbs (showHomeIcon=false)" },
        { label: "Mobile behavior", value: "title/description/breadcrumbs hidden md:flex" },
      ]}
    />
  );
}
