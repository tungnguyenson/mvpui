import { BadgeWithDot, Button } from "@mvp-ui/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2 } from "lucide-react";
import {
  CUSTOMER_STATUS_LABELS,
  getCustomerById,
} from "./customers-data";
import { getCustomerDetailExtras } from "./customer-detail-data";
import { CustomerDetailTabs } from "./detail/CustomerDetailTabs";
import { AppPageHeader } from "../_shell/AppPageHeader";
import { PageScaffold } from "../_shell/PageScaffold";
import { APP_ROUTES } from "../_shell/nav";
import { getCustomerLogo } from "../_shared/assets";
import { SetHeaderActions } from "../_shell/HeaderActionsContext";

export function CustomerDetailPage({ id }: { id: string }) {
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const status = CUSTOMER_STATUS_LABELS[customer.status];
  const extras = getCustomerDetailExtras(customer);

  const hiringHref = `/hiring-requests/new?customerId=${customer.id}`;

  return (
    <>
      <SetHeaderActions
        items={[{ id: "create-hiring-request", label: "Tạo Y/c tuyển dụng", href: hiringHref }]}
      />
    <PageScaffold
      header={
        <AppPageHeader
          breadcrumbs={[
            { label: "Dashboard", href: APP_ROUTES.dashboard },
            { label: "Khách hàng", href: APP_ROUTES.customers },
            { label: extras.brand.brandName },
          ]}
          actions={
            <div className="flex items-center gap-2">
              <Link href="/customers">
                <Button color="secondary" size="sm" className="hidden sm:flex">
                  Quay lại danh sách
                </Button>
              </Link>
              <Link href={hiringHref} className="hidden sm:flex">
                <Button color="primary" size="sm">
                  Tạo Y/c tuyển dụng
                </Button>
              </Link>
            </div>
          }
        >
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
              </div>
              <BadgeWithDot color={status.color} type="pill-color" size="sm">
                {status.label}
              </BadgeWithDot>
              {/* <div className="mt-3 flex flex-wrap gap-2">
                {extras.brand.serviceTags.map((tag) => (
                  <Badge key={tag} color="success" type="pill-color" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div> */}
            </div>
          </div>
        </AppPageHeader>
      }
    >
      <CustomerDetailTabs customerId={customer.id} extras={extras} />
    </PageScaffold>
    </>
  );
}
