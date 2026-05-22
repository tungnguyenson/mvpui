"use client";

import { PageHeader, type PageHeaderProps } from "@mvp-ui/ui";
import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { SetPageBreadcrumb } from "./BreadcrumbContext";
import { type AppBreadcrumb } from "./nav";

export interface AppPageHeaderProps extends Omit<PageHeaderProps, "breadcrumbs" | "linkAs"> {
  /**
   * Override the breadcrumb trail. Pass on detail pages where the auto-derived
   * trail (`breadcrumbsForPath`) returns a generic "Chi tiết" entry and you
   * want a specific entity label. Omit on list pages — the trail is derived
   * automatically from the current pathname.
   */
  breadcrumbs?: AppBreadcrumb[];
}

function NextLinkAdapter({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Staffing-saas wrapper around `<PageHeader>`:
 * - Publishes a custom `breadcrumbs` trail to the app-shell sticky top bar via
 *   `SetPageBreadcrumb` so the mobile title and desktop top-bar breadcrumb stay
 *   in sync on detail pages.
 * - Renders `primaryAction.href` through Next.js `<Link>` for client-side
 *   navigation + prefetch on both the desktop button and mobile FAB.
 */
export function AppPageHeader({ breadcrumbs, ...rest }: AppPageHeaderProps) {
  return (
    <>
      {breadcrumbs ? <SetPageBreadcrumb items={breadcrumbs} /> : null}
      <PageHeader linkAs={NextLinkAdapter} {...rest} />
    </>
  );
}
