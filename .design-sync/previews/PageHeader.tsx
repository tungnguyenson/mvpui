import { PageHeader, Button, type BreadcrumbItem } from "@mvp-ui/ui";
import { Plus, Upload, Filter } from "lucide-react";

const BREADCRUMBS: BreadcrumbItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Hiring requests" },
];

const wrap: React.CSSProperties = { width: 760, maxWidth: "100%" };

export const WithDescription = () => (
  <div style={wrap}>
    <PageHeader
      title="Hiring requests"
      description="Track customer hiring requests and how well staffing demand is being met across each account and region."
    />
  </div>
);

export const WithActions = () => (
  <div style={wrap}>
    <PageHeader
      title="Hiring requests"
      description="Track customer hiring requests and staffing demand."
      actions={
        <>
          <Button color="secondary" size="sm">
            Discard
          </Button>
          <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
            New request
          </Button>
        </>
      }
    />
  </div>
);

export const WithBreadcrumbs = () => (
  <div style={wrap}>
    <PageHeader
      title="Hiring requests"
      description="Track customer hiring requests and staffing demand."
      breadcrumbs={BREADCRUMBS}
      actions={
        <>
          <Button color="secondary" size="sm" iconLeading={<Filter className="size-4" />}>
            Filters
          </Button>
          <Button color="secondary" size="sm" iconLeading={<Upload className="size-4" />}>
            Export
          </Button>
          <Button color="primary" size="sm" iconLeading={<Plus className="size-4" />}>
            New request
          </Button>
        </>
      }
    />
  </div>
);

export const Compact = () => (
  <div style={wrap}>
    <PageHeader
      variant="compact"
      title="Request #HR-1042"
      description="Customer: Coopmart • Headcount 12/20 • Deadline 2026-06-15"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Hiring requests", href: "/hiring-requests" },
        { label: "HR-1042" },
      ]}
      actions={
        <Button color="primary" size="sm">
          Save changes
        </Button>
      }
    />
  </div>
);
