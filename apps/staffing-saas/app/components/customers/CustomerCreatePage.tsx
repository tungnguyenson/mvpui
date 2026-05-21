"use client";

import { Button } from "@mvp-ui/ui";
import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";

export function CustomerCreatePage() {
  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-5">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Khách hàng", href: APP_ROUTES.customers },
              { label: "Onboarding khách hàng mới" },
            ]}
          />
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Rocket className="size-7" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-fg">
                Onboarding khách hàng mới
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-fg-tertiary">
                Quy trình tạo và onboarding khách hàng mới — thu thập thông tin
                pháp lý, người liên hệ, địa điểm, vị trí, cấu hình ca và pricing.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border-secondary bg-bg-secondary px-6 py-24 text-center">
        <div className="flex size-14 items-center justify-center rounded-xl border border-border-secondary bg-bg">
          <Rocket className="size-6 text-fg-brand" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-fg">Coming soon</h2>
        <p className="mt-1 max-w-md text-sm text-fg-tertiary">
          Flow onboarding khách hàng mới đang được xây dựng. Tạm thời vui lòng
          quay lại danh sách khách hàng.
        </p>
        <div className="mt-6">
          <Link href={APP_ROUTES.customers}>
            <Button
              color="secondary"
              size="sm"
              iconLeading={<ArrowLeft className="size-4" />}
            >
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>
    </PageScaffold>
  );
}
