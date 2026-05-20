import { UserPlus } from "lucide-react";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import { HiringRequestConfigForm } from "./config";

export function HiringRequestCreatePage() {
  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-5">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Y/c tuyển dụng", href: APP_ROUTES.hiringRequests },
              { label: "Tạo mới" },
            ]}
          />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-fg">
                <UserPlus className="size-7" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-fg">
                  Tạo Y/c tuyển dụng mới
                </h1>
                <p className="mt-1 max-w-3xl text-sm text-fg-tertiary">
                  Khai báo thông tin cơ bản, lịch làm việc, lương thưởng và cấu
                  hình đăng tin cho hiring request mới.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <HiringRequestConfigForm mode="create" />
    </PageScaffold>
  );
}
