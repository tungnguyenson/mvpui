import { Badge, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2 } from "lucide-react";
import {
  CUSTOMER_STATUS_LABELS,
  getCustomerById,
} from "./customers-data";
import { getCustomerDetailExtras } from "./customer-detail-data";
import { CustomerDetailTabs } from "./detail/CustomerDetailTabs";
import { PageScaffold } from "../_shell/PageScaffold";
import { SetPageBreadcrumb } from "../_shell/BreadcrumbContext";
import { APP_ROUTES } from "../_shell/nav";
import { getCustomerLogo } from "../_shared/assets";

export function CustomerDetailPage({ id }: { id: string }) {
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const status = CUSTOMER_STATUS_LABELS[customer.status];
  const extras = getCustomerDetailExtras(customer);

  return (
    <PageScaffold
      header={
        <div className="flex flex-col gap-5">
          <SetPageBreadcrumb
            items={[
              { label: "Dashboard", href: APP_ROUTES.dashboard },
              { label: "Khách hàng", href: APP_ROUTES.customers },
              { label: extras.brand.brandName },
            ]}
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              {(() => {
                const logo = getCustomerLogo(customer.id);
                if (logo) {
                  return (
                    <div className="size-16 shrink-0 overflow-hidden rounded-xl shadow-sm">
                      <img
                        src={logo.mark}
                        alt={`Logo ${customer.name}`}
                        className="size-full object-cover"
                      />
                    </div>
                  );
                }
                return (
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-fg">
                    <Building2 className="size-8" />
                  </div>
                );
              })()}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold text-fg">{extras.brand.brandName}</h1>
                  <Badge color={status.color} type="pill-color" size="sm">
                    ● {status.label}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {extras.brand.serviceTags.map((tag) => (
                    <Badge key={tag} color="success" type="pill-color" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/customers">
                <Button color="secondary" size="sm">
                  Quay lại danh sách
                </Button>
              </Link>
              <Button color="primary" size="sm">
                Tạo hiring request
              </Button>
            </div>
          </div>
        </div>
      }
    >
      <CustomerDetailTabs customerId={customer.id} extras={extras} />
    </PageScaffold>
  );
}
