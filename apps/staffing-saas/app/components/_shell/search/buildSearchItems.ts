import type { CommandItem } from "@mvp-ui/ui";
import { Building2, Calendar, HardHat, UserPlus } from "lucide-react";
import { CUSTOMERS } from "../../customers/customers-data";
import { HIRING_REQUESTS } from "../../hiring-requests/hiring-requests-data";
import { SHIFTS } from "../../shifts/shifts-data";
import { WORKERS } from "../../workers/workers-data";

const GROUP = {
  customers: "Khách hàng",
  hiringRequests: "Y/c tuyển dụng",
  shifts: "Ca làm việc",
  workers: "Cộng tác viên",
} as const;

function customerItems(): CommandItem[] {
  return CUSTOMERS.map((customer) => ({
    id: `/customers/${customer.id}`,
    label: customer.name,
    keywords: [customer.name],
    group: GROUP.customers,
    icon: Building2,
  }));
}

function hiringRequestItems(): CommandItem[] {
  return HIRING_REQUESTS.map((request) => ({
    id: `/hiring-requests/${request.id}`,
    label: `${request.code} — ${request.title}`,
    description: `${request.customer} · ${request.area}`,
    keywords: [
      request.id,
      request.code,
      request.title,
      request.customer,
      request.area,
    ],
    group: GROUP.hiringRequests,
    icon: UserPlus,
  }));
}

function shiftItems(): CommandItem[] {
  // Shifts repeat the same template across many days. For Cmd+K we only need
  // one searchable entry per unique (customer, name) — operators jump to the
  // shifts page from there. Without this dedupe the index balloons to ~1k+
  // items and typing lags noticeably.
  const seen = new Set<string>();
  const unique = SHIFTS.filter((shift) => {
    const key = `${shift.customerId}|${shift.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique.map((shift) => ({
    id: `/shifts/${shift.id}`,
    label: `${shift.code} — ${shift.name}`,
    description: `${shift.customer} · ${shift.schedule}`,
    keywords: [
      shift.id,
      shift.code,
      shift.name,
      shift.customer,
      shift.site,
      shift.region,
    ],
    group: GROUP.shifts,
    icon: Calendar,
  }));
}

function workerItems(): CommandItem[] {
  return WORKERS.map((worker) => ({
    id: `/workers/${worker.id}`,
    label: worker.name,
    description: `${worker.phone} · ${worker.city}`,
    keywords: [
      worker.id,
      worker.name,
      worker.phone,
      ...worker.tags,
    ],
    group: GROUP.workers,
    icon: HardHat,
  }));
}

export function buildSearchItems(): CommandItem[] {
  return [
    ...customerItems(),
    ...hiringRequestItems(),
    ...shiftItems(),
    ...workerItems(),
  ];
}
